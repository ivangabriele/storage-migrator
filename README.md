# local-storage-migrator

[![License][img-license]][lnk-license] [![NPM Version][img-npm]][lnk-npm]
[![Unit Tests][img-unit-tests]][lnk-unit-tests] [![Coverage][img-coverage]][lnk-coverage]

Manage your local storage migrations like you would with a database.

---

- [Features](#features)
- [Usage](#usage)
  - [Installation](#installation)
  - [Migration file](#migration-file)
  - [Vanilla JS/TS Initialization](#vanilla-jsts-initialization)
  - [React Hook Initialization](#react-hook-initialization)
- [Contributing](#contributing)

---

## Features

- [x] JS library
- [x] React hook

## Usage

### Installation

```sh
npm i -E local-storage-migrator
```

### Migration file

```ts
import { type LocalStorageMigration } from 'local-storage-migrator'

export const MIGRATIONS: LocalStorageMigration[] = [
  {
    description: 'Rename "oldKey" to "newKey"',
    operations: [
      {
        from: 'oldKey',
        to: 'newKey',
        type: LocalStorageMigrationOperationType.RENAME_KEY,
      },
    ],
  },
  {
    description: 'Delete "deprecatedKey"',
    operations: [
      {
        key: 'deprecatedKey',
        type: LocalStorageMigrationOperationType.DELETE_KEY,
      },
    ],
  },
  {
    description: 'Rename JSON property key "oldJsonKey" to "newJsonKey"',
    operations: [
      {
        key: 'jsonKey1',
        newJsonKey: 'newJsonKey',
        oldJsonKey: 'oldJsonKey',
        type: LocalStorageMigrationOperationType.RENAME_JSON_VALUE_PROPERTY_KEY,
      },
    ],
  },
  {
    description: 'Update JSON property value from `OLD_VALUE` to `NEW_VALUE`',
    operations: [
      {
        jsonKey: 'key',
        key: 'jsonKey2',
        newJsonValue: 'NEW_VALUE',
        oldJsonValue: 'OLD_VALUE',
        type: LocalStorageMigrationOperationType.UPDATE_JSON_VALUE_PROPERTY_VALUE,
      },
    ],
  },
]
```

### Vanilla JS/TS Initialization

```ts
import { LocalStorageMigrator, type LocalStorageMigration } from 'local-storage-migrator'

import { MIGRATIONS } from '...'

const localStorageMigrator = new LocalStorageMigrator(MIGRATIONS)

localStorageMigrator.run()
```

### React Hook Initialization

```tsx
import { useLocalStorageMigrator } from 'local-storage-migrator'

import { MIGRATIONS } from '...'

export function App() {
  useLocalStorageMigrator(MIGRATIONS)

  return <div>My App</div>
}
```

## Contributing

Please read the [contributing document](CONTRIBUTING.md) for setup and contributing instructions.

---

[img-coverage]:
  https://img.shields.io/codecov/c/github/ivangabriele/local-storage-migrator?flag=unit&style=for-the-badge
[img-license]: https://img.shields.io/github/license/ivangabriele/local-storage-migrator?style=for-the-badge
[img-npm]: https://img.shields.io/npm/v/local-storage-migrator?style=for-the-badge
[img-unit-tests]:
  https://img.shields.io/github/actions/workflow/status/ivangabriele/local-storage-migrator/check.yml?branch=main&label=Unit&style=for-the-badge
[lnk-coverage]: https://app.codecov.io/gh/ivangabriele/local-storage-migrator
[lnk-license]: https://github.com/ivangabriele/local-storage-migrator/blob/main/LICENSE
[lnk-npm]: https://www.npmjs.com/package/local-storage-migrator
[lnk-unit-tests]: https://github.com/ivangabriele/local-storage-migrator/actions?query=branch%3Amain++
