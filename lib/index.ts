/**
 * Subject Identifier types as defined in RFC 9493 (Security Event Subject Identifiers)
 * https://www.rfc-editor.org/rfc/rfc9493
 *
 * Each identifier format is a JSON object with a "format" property and required fields.
 * This file provides TypeScript types for each format and a union type for all.
 */

/**
 * Account Identifier Format ("account")
 * See RFC 9493 Section 3.2.1
 *
 * AccountIdentifier represents an account-based subject identifier.
 * - format: MUST be "account"
 * - uri: MUST be a valid "acct:" URI as per RFC 7565, identifying the account.
 * @link https://www.rfc-editor.org/rfc/rfc9493#section-3.2.1
 * @example
 * ```json
 * {
 *  "format": "account",
 *  "uri": "acct:alice@example.com"
 * }
 * ```
 */
export type AccountIdentifier = {
  format: "account";
  uri: string; // "acct:" URI as per RFC 7565
}

/**
 * Email Identifier Format ("email")
 * See RFC 9493 Section 3.2.2
 *
 * EmailIdentifier represents an email-based subject identifier.
 * - format: MUST be "email"
 * - email: MUST be a valid RFC 5322 addr-spec (email address).
 * @link https://www.rfc-editor.org/rfc/rfc9493#section-3.2.2
 * @example
 * ```json
 * {
 *  "format": "email",
 *  "email": "alice@example.com"
 * }
 * ```
 */
export type EmailIdentifier = {
  format: "email";
  email: string; // RFC 5322 addr-spec
}

/**
 * Issuer and Subject Identifier Format ("iss_sub")
 * See RFC 9493 Section 3.2.3
 *
 * IssSubIdentifier represents a subject identified by an issuer and subject value pair.
 * - format: MUST be "iss_sub"
 * - iss: The issuer identifier, as in JWT "iss" claim.
 * - sub: The subject identifier, as in JWT "sub" claim.
 * @link https://www.rfc-editor.org/rfc/rfc9493#section-3.2.3
 * @example
 * ```json
 * {
 *  "format": "iss_sub",
 *  "iss": "https://issuer.example.com",
 *  "sub": "user123"
 * }
 * ```
 */
export type IssSubIdentifier = {
  format: "iss_sub";
  iss: string; // issuer (as in JWT "iss" claim)
  sub: string; // subject (as in JWT "sub" claim)
}

/**
 * Opaque Identifier Format ("opaque")
 * See RFC 9493 Section 3.2.4
 *
 * OpaqueIdentifier represents a subject identifier that is an opaque string.
 * - format: MUST be "opaque"
 * - id: An opaque string, such as a UUID or database ID.
 * @link https://www.rfc-editor.org/rfc/rfc9493#section-3.2.4
 * @example
 * ```json
 * {
 *  "format": "opaque",
 *  "id": "550e8400-e29b-41d4-a716-446655440000"
 * }
 * ```
 */
export type OpaqueIdentifier = {
  format: "opaque";
  id: string; // Opaque string, e.g., UUID or database ID
}

/**
 * Phone Number Identifier Format ("phone_number")
 * See RFC 9493 Section 3.2.5
 *
 * PhoneNumberIdentifier represents a subject identified by a phone number.
 * - format: MUST be "phone_number"
 * - phone_number: MUST be a phone number in E.164 format.
 * @link https://www.rfc-editor.org/rfc/rfc9493#section-3.2.5
 * @example
 * ```json
 * {
 *  "format": "phone_number",
 *  "phone_number": "+12025550123"
 * }
 * ```
 */
export type PhoneNumberIdentifier = {
  format: "phone_number";
  phone_number: string; // E.164 format
}

/**
 * Decentralized Identifier (DID) Format ("did")
 * See RFC 9493 Section 3.2.6
 *
 * DidIdentifier represents a subject identified by a Decentralized Identifier (DID).
 * - format: MUST be "did"
 * - url: A DID URL, which may be a bare DID or include path, query, or fragment.
 * @link https://www.rfc-editor.org/rfc/rfc9493#section-3.2.6
 * @example
 * ```json
 * {
 *  "format": "did",
 *  "url": "did:example:123456789abcdefghi"
 * }
 * ```
 */
export type DidIdentifier = {
  format: "did";
  url: string; // DID URL (may be bare DID)
}

/**
 * Uniform Resource Identifier (URI) Format ("uri")
 * See RFC 9493 Section 3.2.7
 *
 * UriIdentifier represents a subject identified by a URI.
 * - format: MUST be "uri"
 * - uri: Any valid URI as per RFC 3986.
 * @link https://www.rfc-editor.org/rfc/rfc9493#section-3.2.7
 * @example
 * ```json
 * {
 *  "format": "uri",
 *  "uri": "https://example.com/user/alice"
 * }
 * ```
 */
export type UriIdentifier = {
  format: "uri";
  uri: string; // Any valid URI (RFC 3986)
}

/**
 * Aliases Identifier Format ("aliases")
 * See RFC 9493 Section 3.2.8
 *
 * AliasesIdentifier represents a set of alternative subject identifiers for the same subject.
 * - format: MUST be "aliases"
 * - identifiers: An array of SubjectIdentifier objects, excluding nested AliasesIdentifier.
 *   (No AliasesIdentifier inside identifiers array.)
 * @link https://www.rfc-editor.org/rfc/rfc9493#section-3.2.8
 * @example
 * ```json
 * {
 *   "format": "aliases",
 *   "identifiers": [
 *     { "format": "email", "email": "alice@example.com" },
 *     { "format": "phone_number", "phone_number": "+12025550123" }
 *   ]
 * }
 * ```
 */
type NonAliasedIdentifier = Exclude<SubjectIdentifier, AliasesIdentifier>;
export type AliasesIdentifier = {
  format: "aliases";
  identifiers: NonAliasedIdentifier[];
}

// Union type for all Subject Identifiers
export type SubjectIdentifier =
  | AccountIdentifier
  | EmailIdentifier
  | IssSubIdentifier
  | OpaqueIdentifier
  | PhoneNumberIdentifier
  | DidIdentifier
  | UriIdentifier
  | AliasesIdentifier;

function hasMembers<T>(obj: unknown, ...members: (keyof T)[]): obj is T {
  return (
    typeof obj === "object" &&
    obj !== null &&
    members.every((member) => Object.hasOwn(obj, member))
  );
}

export function isAccountIdentifier(obj: unknown): obj is AccountIdentifier {
  return (
    hasMembers<AccountIdentifier>(obj, "format", "uri") &&
    obj.format === "account" &&
    typeof obj.uri === "string"
  );
}

export function isEmailIdentifier(obj: unknown): obj is EmailIdentifier {
  return (
    hasMembers<EmailIdentifier>(obj, "format", "email") &&
    obj.format === "email" &&
    typeof obj.email === "string"
  );
}

export function isIssSubIdentifier(obj: unknown): obj is IssSubIdentifier {
  return (
    hasMembers<IssSubIdentifier>(obj, "format", "iss", "sub") &&
    obj.format === "iss_sub" &&
    typeof obj.iss === "string" &&
    typeof obj.sub === "string"
  );
}

export function isOpaqueIdentifier(obj: unknown): obj is OpaqueIdentifier {
  return (
    hasMembers<OpaqueIdentifier>(obj, "format", "id") &&
    obj.format === "opaque" &&
    typeof obj.id === "string"
  );
}

export function isPhoneNumberIdentifier(
  obj: unknown,
): obj is PhoneNumberIdentifier {
  return (
    hasMembers<PhoneNumberIdentifier>(obj, "format", "phone_number") &&
    obj.format === "phone_number" &&
    typeof obj.phone_number === "string"
  );
}

export function isDidIdentifier(obj: unknown): obj is DidIdentifier {
  return (
    hasMembers<DidIdentifier>(obj, "format", "url") &&
    obj.format === "did" &&
    typeof obj.url === "string"
  );
}

export function isUriIdentifier(obj: unknown): obj is UriIdentifier {
  return (
    hasMembers<UriIdentifier>(obj, "format", "uri") &&
    obj.format === "uri" &&
    typeof obj.uri === "string"
  );
}

function isNonAliasesIdentifier(obj: unknown): obj is NonAliasedIdentifier {
  return (
    isAccountIdentifier(obj) ||
    isEmailIdentifier(obj) ||
    isIssSubIdentifier(obj) ||
    isOpaqueIdentifier(obj) ||
    isPhoneNumberIdentifier(obj) ||
    isDidIdentifier(obj) ||
    isUriIdentifier(obj)
  );
}

export function isAliasesIdentifier(obj: unknown): obj is AliasesIdentifier {
  return (
    hasMembers<AliasesIdentifier>(obj, "format", "identifiers") &&
    obj.format === "aliases" &&
    Array.isArray(obj.identifiers) &&
    obj.identifiers.every(isNonAliasesIdentifier)
  );
}
