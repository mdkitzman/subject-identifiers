import assert from "node:assert";
import test, { describe } from "node:test";
import {
  isAccountIdentifier,
  isEmailIdentifier,
  isIssSubIdentifier,
  isOpaqueIdentifier,
  isPhoneNumberIdentifier,
  isDidIdentifier,
  isUriIdentifier,
  isAliasesIdentifier,
  AccountIdentifier,
  EmailIdentifier,
  IssSubIdentifier,
  OpaqueIdentifier,
  PhoneNumberIdentifier,
  DidIdentifier,
  UriIdentifier,
  AliasesIdentifier,
} from "../lib/index.js";

describe("subject-identifiers", () => {
  test("isAccountIdentifier", () => {
    const valid: AccountIdentifier = {
      format: "account",
      uri: "acct:alice@example.com",
    };
    assert.ok(isAccountIdentifier(valid));

    assert.ok(!isAccountIdentifier(null));
    assert.ok(!isAccountIdentifier(undefined));
    assert.ok(!isAccountIdentifier({ format: "account" }));
    assert.ok(
      !isAccountIdentifier({ format: "email", email: "alice@example.com" }),
    );
  });

  test("isEmailIdentifier", () => {
    const valid: EmailIdentifier = {
      format: "email",
      email: "alice@example.com",
    };
    assert.ok(isEmailIdentifier(valid));
    
    assert.ok(!isEmailIdentifier(null));
    assert.ok(!isEmailIdentifier(undefined));
    assert.ok(!isEmailIdentifier({ format: "email" }));
    assert.ok(
      !isEmailIdentifier({ format: "account", uri: "acct:alice@example.com" }),
    );
  });

  test("isIssSubIdentifier", () => {
    const valid: IssSubIdentifier = {
      format: "iss_sub",
      iss: "issuer",
      sub: "subject",
    };
    assert.ok(isIssSubIdentifier(valid));
    
    assert.ok(!isIssSubIdentifier(null));
    assert.ok(!isIssSubIdentifier(undefined));
    assert.ok(!isIssSubIdentifier({ format: "iss_sub", iss: "issuer" }));
    assert.ok(
      !isIssSubIdentifier({ format: "account", uri: "acct:alice@example.com" }),
    );
  });

  test("isOpaqueIdentifier", () => {
    const valid: OpaqueIdentifier = { format: "opaque", id: "opaque-id" };
    assert.ok(isOpaqueIdentifier(valid));
    
    assert.ok(!isOpaqueIdentifier(null));
    assert.ok(!isOpaqueIdentifier(undefined));
    assert.ok(!isOpaqueIdentifier({ format: "opaque" }));
    assert.ok(
      !isOpaqueIdentifier({ format: "email", email: "alice@example.com" }),
    );
  });

  test("isPhoneNumberIdentifier", () => {
    const valid: PhoneNumberIdentifier = {
      format: "phone_number",
      phone_number: "+12025550123",
    };
    assert.ok(isPhoneNumberIdentifier(valid));
    
    assert.ok(!isPhoneNumberIdentifier(null));
    assert.ok(!isPhoneNumberIdentifier(undefined));
    assert.ok(!isPhoneNumberIdentifier({ format: "phone_number" }));
    assert.ok(
      !isPhoneNumberIdentifier({
        format: "account",
        uri: "acct:alice@example.com",
      }),
    );
  });

  test("isDidIdentifier", () => {
    const valid: DidIdentifier = {
      format: "did",
      url: "did:example:123456789abcdefghi",
    };
    assert.ok(isDidIdentifier(valid));
    
    assert.ok(!isDidIdentifier(null));
    assert.ok(!isDidIdentifier(undefined));
    assert.ok(!isDidIdentifier({ format: "did" }));
    assert.ok(
      !isDidIdentifier({ format: "account", uri: "acct:alice@example.com" }),
    );
  });

  test("isUriIdentifier", () => {
    const valid: UriIdentifier = {
      format: "uri",
      uri: "https://example.com/user/alice",
    };
    assert.ok(isUriIdentifier(valid));
    
    assert.ok(!isUriIdentifier(null));
    assert.ok(!isUriIdentifier(undefined));
    assert.ok(!isUriIdentifier({ format: "uri" }));
    assert.ok(
      !isUriIdentifier({ format: "account", uri: "acct:alice@example.com" }),
    );
  });

  test("isAliasesIdentifier", () => {
    const valid: AliasesIdentifier = {
      format: "aliases",
      identifiers: [
        { format: "email", email: "alice@example.com" },
        { format: "phone_number", phone_number: "+12025550123" },
      ],
    };
    assert.ok(isAliasesIdentifier(valid));

    assert.ok(!isAliasesIdentifier(null));
    assert.ok(!isAliasesIdentifier(undefined));
    // Nested aliases should not be valid
    const invalid = {
      format: "aliases",
      identifiers: [{ format: "aliases", identifiers: [] }],
    };
    assert.ok(!isAliasesIdentifier(invalid));
    assert.ok(!isAliasesIdentifier({ format: "aliases" }));
  });
});
