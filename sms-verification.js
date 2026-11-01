const {
  createHash,
  randomBytes,
  randomInt,
  timingSafeEqual
} = require("node:crypto");

const CODE_TTL_MS = 5 * 60 * 1000;
const RATE_LIMIT_WINDOW_MS = 15 * 60 * 1000;
const MAX_SENDS_PER_PHONE = 3;
const MAX_SENDS_PER_IP = 6;
const MAX_VERIFY_ATTEMPTS = 5;

function isKenyanPhone(phone) {
  return typeof phone === "string" && /^\+254[17]\d{8}$/.test(phone);
}

function createSmsVerification({
  env = process.env,
  fetchImpl = globalThis.fetch,
  now = Date.now,
  makeCode = () => String(randomInt(0, 1_000_000)).padStart(6, "0")
} = {}) {
  const challenges = new Map();
  const sendLimits = new Map();

  function configurationError() {
    if (!env.AFRICASTALKING_USERNAME || !env.AFRICASTALKING_API_KEY
      || !["sandbox", "production"].includes(env.AFRICASTALKING_ENVIRONMENT || "sandbox")) {
      return "sms_not_configured";
    }
    return typeof fetchImpl === "function" ? null : "sms_service_unavailable";
  }

  function allowSend(key, limit) {
    const currentTime = now();
    const current = sendLimits.get(key);
    if (!current || current.resetAt <= currentTime) {
      sendLimits.set(key, { count: 1, resetAt: currentTime + RATE_LIMIT_WINDOW_MS });
      return true;
    }
    if (current.count >= limit) return false;
    current.count += 1;
    return true;
  }

  function cleanExpired() {
    const currentTime = now();
    for (const [phone, challenge] of challenges) {
      if (challenge.expiresAt <= currentTime) challenges.delete(phone);
    }
    for (const [key, limit] of sendLimits) {
      if (limit.resetAt <= currentTime) sendLimits.delete(key);
    }
  }

  async function sendSms(phone, code) {
    const username = env.AFRICASTALKING_USERNAME;
    const apiKey = env.AFRICASTALKING_API_KEY;
    const configError = configurationError();
    if (configError) return { ok: false, error: configError };

    const environment = env.AFRICASTALKING_ENVIRONMENT || "sandbox";
    const endpoint = environment === "production"
      ? "https://api.africastalking.com/version1/messaging"
      : "https://api.sandbox.africastalking.com/version1/messaging";
    const body = new URLSearchParams({
      username,
      to: phone,
      message: `Your Nairobi Go verification code is ${code}. It expires in 5 minutes.`
    });
    if (env.AFRICASTALKING_SENDER_ID) body.set("from", env.AFRICASTALKING_SENDER_ID);

    let response;
    try {
      response = await fetchImpl(endpoint, {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/x-www-form-urlencoded",
          apiKey
        },
        body,
        signal: AbortSignal.timeout(10_000)
      });
    } catch {
      return { ok: false, error: "sms_service_unavailable" };
    }

    let result;
    try {
      result = await response.json();
    } catch {
      return { ok: false, error: "sms_send_failed" };
    }
    const recipients = result?.SMSMessageData?.Recipients;
    const accepted = response.ok && Array.isArray(recipients)
      && recipients.some(recipient => recipient.number === phone
        && (recipient.statusCode === 101 || recipient.status === "Success"));
    return accepted ? { ok: true } : { ok: false, error: "sms_send_failed" };
  }

  return {
    async sendCode(phone, ip) {
      if (!isKenyanPhone(phone)) return { ok: false, error: "invalid_phone" };
      const configError = configurationError();
      if (configError) return { ok: false, error: configError };
      cleanExpired();
      if (!allowSend(`phone:${phone}`, MAX_SENDS_PER_PHONE)
        || !allowSend(`ip:${ip || "unknown"}`, MAX_SENDS_PER_IP)) {
        return { ok: false, error: "rate_limited" };
      }

      const code = makeCode();
      const delivery = await sendSms(phone, code);
      if (!delivery.ok) return delivery;

      const salt = randomBytes(16);
      challenges.set(phone, {
        salt,
        codeHash: createHash("sha256").update(salt).update(code).digest(),
        expiresAt: now() + CODE_TTL_MS,
        attempts: 0
      });
      return { ok: true };
    },

    verifyCode(phone, code) {
      if (!isKenyanPhone(phone) || typeof code !== "string" || !/^\d{6}$/.test(code)) {
        return { ok: false, error: "invalid_code" };
      }
      cleanExpired();
      const challenge = challenges.get(phone);
      if (!challenge) return { ok: false, error: "code_not_requested" };
      if (challenge.attempts >= MAX_VERIFY_ATTEMPTS) {
        challenges.delete(phone);
        return { ok: false, error: "too_many_attempts" };
      }

      challenge.attempts += 1;
      const candidate = createHash("sha256").update(challenge.salt).update(code).digest();
      if (!timingSafeEqual(challenge.codeHash, candidate)) {
        if (challenge.attempts >= MAX_VERIFY_ATTEMPTS) challenges.delete(phone);
        return {
          ok: false,
          error: challenge.attempts >= MAX_VERIFY_ATTEMPTS ? "too_many_attempts" : "invalid_code"
        };
      }

      challenges.delete(phone);
      return { ok: true };
    }
  };
}

module.exports = { createSmsVerification, isKenyanPhone };
