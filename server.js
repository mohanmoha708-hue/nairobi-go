const http = require("node:http");
const fs = require("node:fs");
const path = require("node:path");
const { TextractClient, DetectDocumentTextCommand } = require("@aws-sdk/client-textract");
const { hasExpectedImageSignature, recognizesKenyanNationalId } = require("./id-verification");

const ROOT = __dirname;
const MAX_IMAGE_BYTES = 5 * 1024 * 1024;
const MAX_REQUEST_BYTES = 7 * 1024 * 1024;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const RATE_LIMIT_MAX_REQUESTS = 10;
const rateLimits = new Map();
const publicFiles = new Map([
  ["/", ["index.html", "text/html; charset=utf-8"]],
  ["/index.html", ["index.html", "text/html; charset=utf-8"]],
  ["/app.js", ["app.js", "text/javascript; charset=utf-8"]],
  ["/styles.css", ["styles.css", "text/css; charset=utf-8"]],
  ["/nairobi-go-logo.png", ["nairobi-go-logo.png", "image/png"]],
  ["/googlec27434440b8a810c.html", ["googlec27434440b8a810c.html", "text/html; charset=utf-8"]]
]);
const textract = new TextractClient({ region: process.env.AWS_REGION || "us-east-1" });

function respond(response, status, body) {
  response.writeHead(status, {
    "content-type": "application/json; charset=utf-8",
    "cache-control": "no-store",
    "x-content-type-options": "nosniff"
  });
  response.end(JSON.stringify(body));
}

function readJson(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    let tooLarge = false;
    request.on("data", chunk => {
      size += chunk.length;
      if (size > MAX_REQUEST_BYTES) {
        tooLarge = true;
        chunks.length = 0;
        return;
      }
      if (!tooLarge) chunks.push(chunk);
    });
    request.on("end", () => {
      if (tooLarge) {
        reject(Object.assign(new Error("Request too large"), { statusCode: 413 }));
        return;
      }
      try {
        resolve(JSON.parse(Buffer.concat(chunks).toString("utf8")));
      } catch {
        reject(Object.assign(new Error("Invalid JSON"), { statusCode: 400 }));
      }
    });
    request.on("error", reject);
  });
}

function allowRequest(ip, now = Date.now()) {
  const current = rateLimits.get(ip);
  if (!current || current.resetAt <= now) {
    rateLimits.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW_MS });
    return true;
  }
  if (current.count >= RATE_LIMIT_MAX_REQUESTS) return false;
  current.count += 1;
  return true;
}

function verifyNationalId(request, response) {
  const ip = request.socket.remoteAddress || "unknown";
  if (!allowRequest(ip)) {
    respond(response, 429, { error: "rate_limited" });
    return;
  }

  readJson(request).then(async payload => {
    const { side, mimeType, imageBase64 } = payload || {};
    if (!["front", "back"].includes(side)
      || typeof imageBase64 !== "string"
      || !["image/jpeg", "image/png"].includes(mimeType)
      || !/^(?:[A-Za-z0-9+/]{4})*(?:[A-Za-z0-9+/]{2}==|[A-Za-z0-9+/]{3}=)?$/.test(imageBase64)) {
      respond(response, 400, { error: "invalid_request" });
      return;
    }

    const imageBytes = Buffer.from(imageBase64, "base64");
    if (!imageBytes.length || imageBytes.length > MAX_IMAGE_BYTES
      || !hasExpectedImageSignature(imageBytes, mimeType)) {
      respond(response, 400, { error: "invalid_image" });
      return;
    }

    try {
      const result = await textract.send(new DetectDocumentTextCommand({
        Document: { Bytes: imageBytes }
      }));
      const lines = (result.Blocks || [])
        .filter(block => block.BlockType === "LINE" && typeof block.Text === "string")
        .map(block => block.Text);
      const verified = recognizesKenyanNationalId(side, lines);
      respond(response, verified ? 200 : 422, {
        verified,
        error: verified ? undefined : "document_not_recognized"
      });
    } catch (error) {
      console.error("National ID text check failed:", error.name || "UnknownError");
      respond(response, 503, { error: "verification_unavailable" });
    }
  }).catch(error => {
    respond(response, error.statusCode || 400, {
      error: error.statusCode === 413 ? "request_too_large" : "invalid_request"
    });
  });
}

function serveFile(request, response, pathname) {
  const asset = publicFiles.get(pathname);
  if (request.method !== "GET" || !asset) {
    response.writeHead(404, { "content-type": "text/plain; charset=utf-8" });
    response.end("Not found");
    return;
  }

  fs.readFile(path.join(ROOT, asset[0]), (error, contents) => {
    if (error) {
      console.error("Could not read public app asset:", asset[0], error.code || "UnknownError");
      response.writeHead(500, { "content-type": "text/plain; charset=utf-8" });
      response.end("Unable to load app asset");
      return;
    }
    response.writeHead(200, {
      "content-type": asset[1],
      "cache-control": "no-cache",
      "x-content-type-options": "nosniff"
    });
    response.end(contents);
  });
}

const server = http.createServer((request, response) => {
  let pathname;
  try {
    pathname = new URL(request.url, "http://localhost").pathname;
  } catch {
    response.writeHead(400);
    response.end();
    return;
  }

  if (pathname === "/api/verify-national-id") {
    if (request.method !== "POST") {
      respond(response, 405, { error: "method_not_allowed" });
      return;
    }
    verifyNationalId(request, response);
    return;
  }

  serveFile(request, response, pathname);
});

const port = Number(process.env.PORT || 3000);
const host = process.env.HOST || "127.0.0.1";
server.listen(port, host, () => {
  console.log(`Nairobi Go is running at http://${host}:${port}`);
});
