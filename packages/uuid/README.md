<div align="center">

[![License: CC0-1.0](https://img.shields.io/badge/License-CC0_1.0-brightgreen.svg)](./LICENSE)
[![NPM Version](https://img.shields.io/npm/v/%40agoralabs-sh%2Fuuid)](https://www.npmjs.com/package/%40agoralabs-sh/uuid)

</div>

<div align="center">

![GitHub Release](https://img.shields.io/github/v/release/agoralabs-sh/avm-tools?filter=%40agoralabs-sh%2Fuuid*)
![GitHub Release](https://img.shields.io/github/v/release/agoralabs-sh/avm-tools?include_prereleases&filter=%40agoralabs-sh%2Fuuid*&label=pre-release)

</div>

<h1 align="center">
  @agoralabs/uuid
</h1>

<p align="center">
  A UUID v4 utility package that allows generation and encoding/decoding.
</p>

---

### Table of Contents

* [1. Getting Started](#-1-getting-started)
  - [1.1. Installation](#11-installation)
  - [1.2. API Reference](#12-api-reference)
    - [1.2.1. `generate([options])`](#121-generateoptions)
    - [1.2.2. `decode(value)`](#122-decodevalue)
    - [1.2.3. `encode(value, [options])`](#123-encodevalue-options)
    - [1.2.4. `IExtraOptions`](#124-iextraoptions)
* [2. Appendix](#-2-appendix)
  - [2.1. Useful Commands](#21-useful-commands)
* [3. How To Contribute](#-3-how-to-contribute)
* [4. License](#-4-license)
* [5. Credits](#-5-credits)

## 🪄 1. Getting Started

### 1.1. Installation

You can install the types using:
```shell
npm add @agoralabs-sh/uuid
```

<sup>[Back to top ^][table-of-contents]</sup>

### 1.2. API Reference

#### 1.2.1. `generate([options])`

> Generates a random UUID v4 string.

##### Parameters

| Name    | Type                                  | Required | Default | Description                                                  |
|---------|---------------------------------------|----------|---------|--------------------------------------------------------------|
| options | [`IExtraOptions`](#124-iextraoptions) | no       | -       | Options that allows the UUID to to be returned to uppercase. |

##### Returns

| Type     | Description              |
|----------|--------------------------|
| `string` | A random UUID v4 string. |

##### Example

```typescript
import { generate } from '@agoralabs-sh/uuid';

const uuid = generate();

console.log(uuid);
// 18b0e62a-21c6-4e27-a813-825716f0fedb
```

<sup>[Back to top ^][table-of-contents]</sup>

#### 1.2.2. `decode(value)`

> Decodes the UUID into a byte array. This removes any hyphens and case is preserved.

##### Parameters

| Name  | Type     | Required | Default | Description        |
|-------|----------|----------|---------|--------------------|
| value | `string` | yes      | -       | The UUID to decode |

##### Returns

| Type         | Description        |
|--------------|--------------------|
| `Uint8Array` | The UUID as bytes. |

##### Example

```typescript
import { decode } from '@agoralabs-sh/uuid';

const decoded = decode('18b0e62a-21c6-4e27-a813-825716f0fedb');

console.log(decoded);
// [24, 176, 230, 42, 33, 198, 78, 39, 168, 19, 130, 87, 22, 240, 254, 219]
```

<sup>[Back to top ^][table-of-contents]</sup>

#### 1.2.3. `encode(value, [options])`

> Encodes the UUID into the human-readable format with hyphens added.

##### Parameters

| Name    | Type                                  | Required | Default | Description                                                  |
|---------|---------------------------------------|----------|---------|--------------------------------------------------------------|
| value   | `Uint8Array`                          | yes      | -       | A UUID byte array.                                           |
| options | [`IExtraOptions`](#124-iextraoptions) | no       | -       | Options that allows the UUID to to be returned to uppercase. |

##### Returns

| Type     | Description                                         |
|----------|-----------------------------------------------------|
| `string` | The encoded UUID string as a human-readable string. |

##### Example

```typescript
import { encode } from '@agoralabs-sh/uuid';

const uuid = encode(new Uint8Array([24, 176, 230, 42, 33, 198, 78, 39, 168, 19, 130, 87, 22, 240, 254, 219]));

console.log(uuid);
// 18b0e62a-21c6-4e27-a813-825716f0fedb
```

<sup>[Back to top ^][table-of-contents]</sup>

#### 1.2.4. `IExtraOptions`

| Name      | Type                                                     | Required | Default | Description                                   |
|-----------|----------------------------------------------------------|----------|---------|-----------------------------------------------|
| uppercase | `boolean`                                                | no       | `false` | Whether the UUID is transformed to uppercase. |

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 2. Appendix

### 2.1. Useful Commands

| Command                   | Description                                                                 |
|---------------------------|-----------------------------------------------------------------------------|
| `pnpm run build`          | Generates build and TypeScript declaration files to the `dist/` directory.  |
| `pnpm run clean`          | Deletes the `dist/` directory and the `tsconfig.*.tsbuildinfo` files.       |
| `pnpm run generate:index` | Generates/overwrites the main `index.ts` file used for exporting all files. |
| `pnpm run lint`           | Runs the linter based on the rules in `eslint.config.mjs`.                  |
| `pnpm run prettier`       | Runs the prettier based on the rules in `prettier.config.mjs`.              |

<sup>[Back to top ^][table-of-contents]</sup>

## 👏 3. How To Contribute

Please read the [**Contributing Guide**][contribute] to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

## 📄 4. License

Please refer to the [LICENSE][license] file.

<sup>[Back to top ^][table-of-contents]</sup>

## 🫶 5. Credits

* The generation of the UUID is thanks to the amazing [@dhest](https://github.com/dchest) and their amazing [@stablelib](https://github.com/StableLib/stablelib) library.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->
[contribute]: ../../CONTRIBUTING.md
[license]: LICENSE
[table-of-contents]: #table-of-contents

