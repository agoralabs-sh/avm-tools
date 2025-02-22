<h1 align="center">
  AVM Tools
</h1>

<p align="center">
  A monorepo that contains types, utilities and general tools that help developers navigate the AVM ecosystem.
</p>

---

### Table Of Contents

* [1. Overview](#-1-overview)
  - [1.1. Monorepo Project Structure](#11-monorepo-project-structure)
* [2. Getting Started](#-2-getting-started)
  - [2.1. Requirements](#21-requirements)
  - [2.2. Installation](#22-installation)
* [3. Appendix](#-3-appendix)
  - [3.1. Packages](#31-packages)
* [4. How To Contribute](#-4-how-to-contribute)

## 🗂️ 1. Overview

### 1.1. Monorepo Project Structure

The repo follows the following structure:

```text
.
├─ packages
│   ├── <package>
│   │   ├── .lintstagedrc.mjs
│   │   ├── LICENSE
│   │   ├── package.json       <-- contains package dependencies and is used to run package-level scripts
│   │   ├── README.md
│   │   ├── release.config.mjs <-- semantic release configuration
│   │   └── ...
│   └── ...                    <-- other packages
├── package.json               <-- root package.json that contains top-level dependencies and tools
└── ...
```

#### Root `package.json`

The root `package.json` utilizes `pnpm`'s workspace feature. The root `package.json` should only reference packages that are used at the root level or are utilities/tools.

#### `packages/` Directory

The `packages/` directory contains, as the name suggests, the packages of the monorepo.

#### `packages/<package>` Directory

Each package **SHOULD** reflect the name of the package, i.e. the `packages/sigillum/` and **SHOULD** contain the following files and directories:

* `.lintstagedrc.mjs` - Scripts to run on the pre-commit hook. This file is **REQUIRED**, however, if there are no scripts to run, use an empty file.
* `LICENSE` - The license for the package.
* `package.json` - The package's dependencies and is used to run package-level scripts.
* `README.md` - Contains installation and usage instructions relevant to the package.
* `release.config.mjs` - The local `semantic-release` configuration.

## 🪄 2. Getting Started

### 2.1. Requirements

* Install [Node v20.18.0+](https://nodejs.org/en/)
* Install [pnpm v10.3.0+](https://pnpm.io/installation)

<sup>[Back to top ^][table-of-contents]</sup>

### 2.2. Installation

1. Install the dependencies using:

```shell
pnpm install
```

<sup>[Back to top ^][table-of-contents]</sup>

## 📑 3. Appendix

### 3.1. Packages

| Name                                                        | Visibility | Description                                                                                                                       | Package                                                                                                                           |
|-------------------------------------------------------------|------------|-----------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------|
| [`@agoralabs/bytes`](./packages/bytes/README.md)            | `public`   | Utilities for handling byte arrays.                                                                                               | [![NPM Version](https://img.shields.io/npm/v/%40agoralabs-sh%2Fbytes)](https://www.npmjs.com/package/%40agoralabs-sh/bytes)       |
| [`@agoralabs/uuid`](./packages/uuid/README.md)              | `public`   | A UUID v4 utility package that allows generation and encoding/decoding.                                                           | [![NPM Version](https://img.shields.io/npm/v/%40agoralabs-sh%2Fuuid)](https://www.npmjs.com/package/%40agoralabs-sh/uuid)         |
| [`@agoralabs-sh/vip030026`](./packages/vip030036/README.md) | `public`   | Various utilities and tools that allow for the creation and manipulation of credentials that conform to the VIP-03-0026 standard. | [![NPM Version](https://img.shields.io/npm/v/%40agoralabs-sh%vip030026)](https://www.npmjs.com/package/%40agoralabs-sh/vip030026) |

<sup>[Back to top ^][table-of-contents]</sup>

## 👏 4. How To Contribute

Please read the [**Contributing Guide**](./CONTRIBUTING.md) to learn about the development process.

<sup>[Back to top ^][table-of-contents]</sup>

<!-- links -->
[table-of-contents]: #table-of-contents
