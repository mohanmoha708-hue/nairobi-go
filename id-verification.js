const MIME_SIGNATURES = {
  "image/jpeg": buffer => buffer.length >= 3
    && buffer[0] === 0xff && buffer[1] === 0xd8 && buffer[2] === 0xff,
  "image/png": buffer => buffer.length >= 8
    && buffer.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))
};

function hasExpectedImageSignature(buffer, mimeType) {
  return Boolean(MIME_SIGNATURES[mimeType]?.(buffer));
}

function recognizesKenyanNationalId(side, lines) {
  const text = lines.join(" ").toUpperCase().replace(/[^A-Z0-9]+/g, " ").trim();
  if (!text) return false;

  if (side === "front") {
    const identifiesKenya = text.includes("KENYA");
    const identityCardTerms = [
      "IDENTITY CARD",
      "NATIONAL ID",
      "ID NUMBER",
      "ID NO"
    ];
    return identifiesKenya && identityCardTerms.some(term => text.includes(term));
  }

  if (side === "back") {
    const distinctiveTerms = ["FINGERPRINT", "DISTRICT OF BIRTH"];
    const kenyanSerialTerms = ["SERIAL NUMBER", "SERIAL NO"];
    return distinctiveTerms.some(term => text.includes(term))
      || (text.includes("KENYA") && kenyanSerialTerms.some(term => text.includes(term)));
  }

  return false;
}

module.exports = { hasExpectedImageSignature, recognizesKenyanNationalId };
