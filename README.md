# nuxt-toc

[![npm version][npm-version-src]][npm-version-href]
[![npm downloads][npm-downloads-src]][npm-downloads-href]
[![License][license-src]][license-href]
[![Nuxt][nuxt-src]][nuxt-href]

<div align="center">
  <img src="./logo.png" alt="logo" width="150">
</div>

A Nuxt module for table of contents (TOC) component in your Nuxt Content projects.

<div align="center">
  <img src="./image.png" alt="example">
</div>


- [✨  Release Notes](https://github.com/hanyujie2002/nuxt-toc/releases)
<!-- - 🏀 Online playground -->
<!-- - 📖  Documentation -->

## Features

- 📑  Automatically generates a TOC from your content
- 🔗  Links to sections within your content
- 🎨  Customizable styles and active state handling

## Quick Setup

Install the module to your Nuxt application with one command:

```bash
npx nuxi module add nuxt-toc
```

## Quick Start

```vue
<template>
    <ContentDoc />
    <TableOfContents />
</template>
```

## Props

| **Prop**           | **Type** | **Default** | **Description**                                                                                     |
|--------------------|----------|-------------|-----------------------------------------------------------------------------------------------------|
| `path`             | String   | `''`        | The path to the content for which the TOC is generated. **If not set, `nuxt-toc` will default to using the current URI as the path**.                                    |
| `isSubListShown`   | Boolean  | `true`      | Determines whether the sublist within the TOC is shown.                                             |
| `title`            | String   | `'Table of Contents'` | The title of the TOC.                                                                               |
| `isSublistNested`  | Boolean  | `true`      | Determines whether the sublist within the TOC is nested.                                            |

## Styling

| **ID/Class**                | **Type** | **Description**                                                                                     |
|-----------------------------|----------|-----------------------------------------------------------------------------------------------------|
| `toc-container`             | ID       | The container for the table of contents (TOC).                                                      |
| `toc-container`             | Class    | Styles the TOC container.                                                                           |
| `toc-item`                  | Class    | General class for TOC items.                                                                        |
| `toc-topitem`               | Class    | Specific class for top-level TOC items.                                                             |
| `active-toc-item`           | Class    | Applied to active TOC items.                                                                        |
| `active-toc-topitem`        | Class    | Applied to active top-level TOC items.                                                              |
| `toc-link`                  | Class    | General class for TOC links.                                                                        |
| `toc-toplink`               | Class    | Specific class for top-level TOC links.                                                             |
| `active-toc-link`           | Class    | Applied to active TOC links.                                                                        |
| `active-toc-toplink`        | Class    | Applied to active top-level TOC links.                                                              |
| `toc-sublist`               | Class    | Styles the sublist within the TOC.                                                                  |
| `toc-subitem`               | Class    | Specific class for sub-level TOC items.                                                             |
| `active-toc-subitem`        | Class    | Applied to active sub-level TOC items.                                                              |
| `toc-sublink`               | Class    | Specific class for sub-level TOC links.                                                             |
| `active-toc-sublink`        | Class    | Applied to active sub-level TOC links.                                                              |
| `toc-item-${link.id}`       | ID       | Dynamically generated ID for each TOC item, based on the `link.id`.                                 |
| `toc-item-${link.id}`       | Class    | Dynamically generated class for each TOC item, based on the `link.id`.                              |
| `active-toc-item`           | Class    | Applied to active TOC items, dynamically based on `activeTocIds` or `lastVisibleHeading`.           |
| `active-toc-topitem`        | Class    | Applied to active top-level TOC items, dynamically based on `activeTocIds` or `lastVisibleHeading`. |
| `active-toc-link`           | Class    | Applied to active TOC links, dynamically based on `activeTocIds` or `lastVisibleHeading`.           |
| `active-toc-toplink`        | Class    | Applied to active top-level TOC links, dynamically based on `activeTocIds` or `lastVisibleHeading`. |
| `active-toc-subitem`        | Class    | Applied to active sub-level TOC items, dynamically based on `activeTocIds` or `lastVisibleHeading`. |
| `active-toc-sublink`        | Class    | Applied to active sub-level TOC links, dynamically based on `activeTocIds` or `lastVisibleHeading`. |

[npm-version-src]: https://img.shields.io/npm/v/nuxt-toc/latest.svg?style=flat&colorA=020420&colorB=00DC82
[npm-version-href]: https://npmjs.com/package/nuxt-toc

[npm-downloads-src]: https://img.shields.io/npm/dm/nuxt-toc.svg?style=flat&colorA=020420&colorB=00DC82
[npm-downloads-href]: https://npmjs.com/package/nuxt-toc

[license-src]: https://img.shields.io/npm/l/nuxt-toc.svg?style=flat&colorA=020420&colorB=00DC82
[license-href]: https://npmjs.com/package/nuxt-toc

[nuxt-src]: https://img.shields.io/badge/Nuxt-020420?logo=nuxt.js
[nuxt-href]: https://nuxt.com
