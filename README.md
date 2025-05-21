# subject-identifiers
Typescript implementation of RFC 9493 Subject Identifiers for Security Event Tokens

Subject Identifier types as defined in RFC 9493 (Security Event Subject Identifiers)
https://www.rfc-editor.org/rfc/rfc9493

Each identifier format is a JSON object with a "format" property and required fields.
This file provides TypeScript types for each format and a union type for all.

## Install

```sh
npm i subject-identifiers
```

## Usage

When working with subject identifiers that comply with RFC 9493, you can use the
provided typeguard methods to ensure that at runtime the data matches the particular
identifier format.

```ts
import { isEmailIdentifier } from "subject-identifiers";

const identifier = ...

if (isEmailIdentifier(identifier)) {
  // the resolved type for Identifier is now EmailIdentifier
  console.log(identifier.email)
} else {
  console.error("Encountered non-email identifier", { identifier });
}
```