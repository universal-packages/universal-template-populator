# Template Populator

[![npm version](https://badge.fury.io/js/@universal-packages%2Ftemplate-populator.svg)](https://www.npmjs.com/package/@universal-packages/template-populator)
[![Testing](https://github.com/universal-packages/universal-template-populator/actions/workflows/testing.yml/badge.svg)](https://github.com/universal-packages/universal-template-populator/actions/workflows/testing.yml)
[![codecov](https://codecov.io/gh/universal-packages/universal-template-populator/branch/main/graph/badge.svg?token=CXPJSN8IGL)](https://codecov.io/gh/universal-packages/universal-template-populator)

For that well known thing that some libraries do to initialize a project by populating a directory with a boilerplate of files with your project name all over the place, that what this does, exactly the part where the template files are transferred and processed.

## Install

```shell
npm install @universal-packages/template-populator
```

## populateTemplates()

Reads deeply into a template directory structure and reconstructs it in another location processing the template files

```js
import { populateTemplates } from '@universal-packages/template-populator'

async function test() {
  await populateTemplates('./templates', 'project/directory')
}

test()
```

Lets say `./templates` looks like this in disk:

```text
templates
  |- app
    |- App.js.template
    |- models
      |- User.js.template
  |- config
    |- db.json.template
    |- secrets
      |- api.ymal.template
```

We will end up with something like

```text
project/directory
  |- app
    |- App.js
    |- models
      |- User.js
  |- config
    |- db.json
    |- secrets
      |- api.ymal
```

## Options

- `override` `boolean`
  If the file already exists in the destination location, should i be overrided or should it be let alone

- **`replacementVariables`** `string[]`
  Provide variables to be replaced in the template files with the format {{ variable }}

  ```text
  export class {{ className }} extends {{ classExtension }} {
    ...
  }
  ```

- **`templateExtension`** `string`
  By default `.template` files are goint to be the ones being mapped, but you can change which extension should be used.

## transferTemplateFile()

Reads the spcified template file replace any vairables in it and save it to the destination location. So basicaly handles just one file.

```js
import { transferTemplateFile } from '@universal-packages/template-populator'

async function test() {
  await transferTemplateFile('./templates/App.js.template', 'project/directory/App.js')
}
```
## Options

- `override` `boolean`
  If the file already exists in the destination location, should i be overrided or should it be let alone

- **`replacementVariables`** `string[]`
  Provide variables to be replaced in the template files with the format {{ variable }}

  ```text
  export class {{ className }} extends {{ classExtension }} {
    ...
  }
  ```

## Typescript

This library is developed in TypeScript and shipped fully typed.

## Contributing

The development of this library in the open on GitHub, and we are grateful to the community for contributing bugfixes and improvements. Read below to learn how you can take part in improving this library.

- [Code of Conduct](./CODE_OF_CONDUCT.md)
- [Contributing Guide](./CONTRIBUTING.md)

### License

[MIT licensed](./LICENSE).
```
