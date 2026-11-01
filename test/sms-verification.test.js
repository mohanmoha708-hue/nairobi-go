const test = require("node:test");
const assert = require("node:assert/strict");
const { createSmsVerification, isKenyanPhone } = require("../sms-verification");

const PHONE = "+254712345678";

function successfulSmsFetch(calls) {
  return async (url, options) => {
    calls.push({ url, options });
    return {
      ok: true,
      json: async () => ({
        SMSMessageData: {
          Recipients: [{ number: options.body.get("to"), statusCode: 101, status: "Success" }]
        }
      })
    };
  };
}

test("validates Kenya mobile numbers in international format", () => {
  assert.equal(isKenyanPhone(PHONE), true);
  assert.equal(isKenyanPhone("+254112345678"), true);
  assert.equal(isKenyanPhone("0712345678"), false);
  assert.equal(isKenyanPhone("+254312345678"), false);
});

test("sends a code through the configured Africa's Talking environment and verifies it once", async () => {
  const calls = [];
  const sms = createSmsVerification({
    env: {
      AFRICASTALKING_USERNAME: "sandbox",
      AFRICASTALKING_API_KEY: "test-key",
      AFRICASTALKING_ENVIRONMENT: "sandbox"
    },
    fetchImpl: successfulSmsFetch(calls),
    makeCode: () => "123456"
  });

  assert.deepEqual(await sms.sendCode(PHONE, "127.0.0.1"), { ok: true });
  assert.equal(calls.length, 1);
  assert.equal(calls[0].url, "https://api.sandbox.africastalking.com/version1/messaging");
  assert.equal(calls[0].options.headers.apiKey, "test-key");
  assert.equal(calls[0].options.body.get("to"), PHONE);
  assert.match(calls[0].options.body.get("message"), /123456/);
  assert.deepEqual(sms.verifyCode(PHONE, "123456"), { ok: true });
  assert.deepEqual(sms.verifyCode(PHONE, "123456"), { ok: false, error: "code_not_requested" });
});

test("does not create a challenge when SMS configuration is missing or delivery fails", async () => {
  const unconfigured = createSmsVerification({ env: {} });
  assert.deepEqual(await unconfigured.sendCode(PHONE, "127.0.0.1"), {
    ok: false,
    error: "sms_not_configured"
  });
  assert.deepEqual(unconfigured.verifyCode(PHONE, "123456"), {
    ok: false,
    error: "code_not_requested"
  });

  const failed = createSmsVerification({
    env: { AFRICASTALKING_USERNAME: "sandbox", AFRICASTALKING_API_KEY: "test-key" },
    fetchImpl: async () => ({ ok: false, json: async () => ({}) })
  });
  assert.deepEqual(await failed.sendCode(PHONE, "127.0.0.1"), {
    ok: false,
    error: "sms_send_failed"
  });
});

test("expires codes and limits incorrect verification attempts", async () => {
  let currentTime = 0;
  const sms = createSmsVerification({
    env: { AFRICASTALKING_USERNAME: "sandbox", AFRICASTALKING_API_KEY: "test-key" },
    fetchImpl: successfulSmsFetch([]),
    now: () => currentTime,
    makeCode: () => "123456"
  });

  await sms.sendCode(PHONE, "127.0.0.1");
  for (let attempt = 0; attempt < 4; attempt += 1) {
    assert.deepEqual(sms.verifyCode(PHONE, "000000"), { ok: false, error: "invalid_code" });
  }
  assert.deepEqual(sms.verifyCode(PHONE, "000000"), { ok: false, error: "too_many_attempts" });
  assert.deepEqual(sms.verifyCode(PHONE, "123456"), { ok: false, error: "code_not_requested" });

  await sms.sendCode(PHONE, "127.0.0.1");
  currentTime = 5 * 60 * 1000;
  assert.deepEqual(sms.verifyCode(PHONE, "123456"), { ok: false, error: "code_not_requested" });
});

test("rate limits SMS sends by phone and source IP", async () => {
  let deliveries = 0;
  const distinctNumbers = Array.from({ length: 7 }, (_, index) => `+25471234567${index}`);
  const sms = createSmsVerification({
    env: { AFRICASTALKING_USERNAME: "sandbox", AFRICASTALKING_API_KEY: "test-key" },
    fetchImpl: successfulSmsFetch({ push: () => deliveries += 1 }),
    makeCode: () => "123456"
  });

  for (let count = 0; count < 3; count += 1) {
    assert.deepEqual(await sms.sendCode(PHONE, "127.0.0.1"), { ok: true });
  }
  assert.deepEqual(await sms.sendCode(PHONE, "127.0.0.1"), {
    ok: false,
    error: "rate_limited"
  });
  assert.equal(deliveries, 3);

  for (let index = 0; index < 6; index += 1) {
    assert.deepEqual(await sms.sendCode(distinctNumbers[index], "192.0.2.1"), { ok: true });
  }
  assert.deepEqual(await sms.sendCode(distinctNumbers[6], "192.0.2.1"), {
    ok: false,
    error: "rate_limited"
  });
  assert.equal(deliveries, 9);
});
