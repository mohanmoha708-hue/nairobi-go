const test = require("node:test");
const assert = require("node:assert/strict");
const { hasExpectedImageSignature, recognizesKenyanNationalId } = require("../id-verification");

test("recognizes Kenyan National ID front text and rejects unrelated text", () => {
  assert.equal(
    recognizesKenyanNationalId("front", ["REPUBLIC OF KENYA", "IDENTITY CARD", "ID NUMBER"]),
    true
  );
  assert.equal(recognizesKenyanNationalId("front", ["HOLIDAY PHOTO", "NAIROBI KENYA"]), false);
  assert.equal(
    recognizesKenyanNationalId("front", ["PASSPORT", "REPUBLIC OF KENYA", "NAME", "DATE OF BIRTH"]),
    false
  );
});

test("recognizes Kenyan National ID reverse-side text and rejects unrelated text", () => {
  assert.equal(recognizesKenyanNationalId("back", ["DISTRICT OF BIRTH", "SERIAL NO"]), true);
  assert.equal(recognizesKenyanNationalId("back", ["INVOICE", "DATE OF ISSUE", "SERIAL NO"]), false);
  assert.equal(recognizesKenyanNationalId("back", ["PASSPORT", "PLACE OF ISSUE", "DATE OF ISSUE"]), false);
});

test("accepts only matching JPEG and PNG image signatures", () => {
  assert.equal(hasExpectedImageSignature(Buffer.from([0xff, 0xd8, 0xff]), "image/jpeg"), true);
  assert.equal(
    hasExpectedImageSignature(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), "image/png"),
    true
  );
  assert.equal(hasExpectedImageSignature(Buffer.from("%PDF-1.7"), "image/png"), false);
  assert.equal(hasExpectedImageSignature(Buffer.from("photo"), "image/jpeg"), false);
});
