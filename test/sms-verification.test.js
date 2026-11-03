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
  assert.equal(calls[0].options.headers.Accept, "application/json");
  assert.equal(calls[0].options.headers["Content-Type"], "application/x-www-form-urlencoded");
  assert.equal(calls[0].options.headers.apiKey, "test-key");
  assert.equal(calls[0].options.body.get("username"), "sandbox");
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

test("logs safe Africa's Talking diagnostics and detects normalized recipient numbers", async () => {
  const logEntries = [];
  const sms = createSmsVerification({
    env: {
      AFRICASTALKING_USERNAME: "sandbox",
      AFRICASTALKING_API_KEY: "private-api-key",
      AFRICASTALKING_ENVIRONMENT: "sandbox"
    },
    fetchImpl: async () => ({
      ok: true,
      status: 201,
      json: async () => ({
        SMSMessageData: {
          Recipients: [
            {
              number: "+254 712 345 678",
              statusCode: 403,
              statusMessage: "Failed for +254712345678 code 123456 private-api-key"
            }
          ]
        }
      })
    }),
    makeCode: () => "123456",
    logger: { info: (...args) => logEntries.push(args) }
  });

  assert.deepEqual(await sms.sendCode(PHONE, "127.0.0.1"), {
    ok: false,
    error: "sms_send_failed"
  });
  assert.equal(logEntries.length, 1);
  assert.equal(logEntries[0][0], "Africa's Talking SMS response");
  const diagnostic = JSON.parse(logEntries[0][1]);
  assert.deepEqual(diagnostic, {
    httpStatus: 201,
    providerReturnedError: true,
    responseParsed: true,
    hasExpectedRecipientData: true,
    recipients: [{
      statusCode: 403,
      statusMessage: "Failed for [redacted] code [redacted] [redacted]"
    }]
  });
  assert.doesNotMatch(logEntries[0][1], /254712345678|123456|private-api-key/);
});

test("accepts normalized recipient numbers only with recognized provider status codes", async () => {
  for (const statusCode of [100, 101, 102]) {
    const sms = createSmsVerification({
      env: { AFRICASTALKING_USERNAME: "sandbox", AFRICASTALKING_API_KEY: "test-key" },
      fetchImpl: async () => ({
        ok: true,
        status: 201,
        json: async () => ({
          SMSMessageData: {
            Recipients: [{ number: "+254 712 345 678", statusCode, status: "Queued" }]
          }
        })
      }),
      logger: { info: () => {} }
    });

    assert.deepEqual(await sms.sendCode(PHONE, "127.0.0.1"), { ok: true });
  }
});

test("rejects HTTP-success responses when the provider reports a failed recipient", async () => {
  const sms = createSmsVerification({
    env: { AFRICASTALKING_USERNAME: "sandbox", AFRICASTALKING_API_KEY: "test-key" },
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      json: async () => ({
        SMSMessageData: {
          Recipients: [{ number: PHONE, statusCode: 403, status: "InvalidPhoneNumber" }]
        }
      })
    }),
    logger: { info: () => {} }
  });

  assert.deepEqual(await sms.sendCode(PHONE, "127.0.0.1"), {
    ok: false,
    error: "sms_send_failed"
  });
});

test("reports provider-level errors returned in the SMS message summary", async () => {
  const logEntries = [];
  const sms = createSmsVerification({
    env: { AFRICASTALKING_USERNAME: "sandbox", AFRICASTALKING_API_KEY: "test-key" },
    fetchImpl: async () => ({
      ok: true,
      status: 200,
      json: async () => ({ SMSMessageData: { Message: "InvalidRequest", Recipients: [] } })
    }),
    logger: { info: (...args) => logEntries.push(args) }
  });

  assert.deepEqual(await sms.sendCode(PHONE, "127.0.0.1"), {
    ok: false,
    error: "sms_send_failed"
  });
  assert.equal(JSON.parse(logEntries[0][1]).providerReturnedError, true);
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
