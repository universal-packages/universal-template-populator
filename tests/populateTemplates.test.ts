import { traverse } from '@universal-packages/directory-traversal'
import fs from 'fs'
import path from 'path'

import { populateTemplates } from '../src'

afterEach((): void => {
  fs.rmSync('./tmp', { recursive: true, force: true })
})

describe('populateTemplates', (): void => {
  it('transfer files form one point to another', async (): Promise<void> => {
    let result = await populateTemplates('./tests/__fixtures__/', './tmp')
    expect(result).toEqual([
      {
        from: expect.stringMatching(/__fixtures__\/app\/entry.ts.template/),
        to: expect.stringMatching(/tmp\/app\/entry.ts/),
        name: 'entry.ts',
        action: 'COPIED'
      },
      {
        from: expect.stringMatching(/__fixtures__\/app\/controllers\/controller.ts.template/),
        to: expect.stringMatching(/tmp\/app\/controllers\/controller.ts/),
        name: 'controller.ts',
        action: 'COPIED'
      },
      {
        from: expect.stringMatching(/__fixtures__\/app\/models\/model.ts.template/),
        to: expect.stringMatching(/tmp\/app\/models\/model.ts/),
        name: 'model.ts',
        action: 'COPIED'
      },
      {
        from: expect.stringMatching(/__fixtures__\/config\/config.yml.template/),
        to: expect.stringMatching(/tmp\/config\/config.yml/),
        name: 'config.yml',
        action: 'COPIED'
      },
      {
        from: expect.stringMatching(/__fixtures__\/lib\/aux.ts.template/),
        to: expect.stringMatching(/tmp\/lib\/aux.ts/),
        name: 'aux.ts',
        action: 'COPIED'
      }
    ])

    result = await populateTemplates('./tests/__fixtures__/', './tmp')
    expect(result).toEqual([
      {
        from: expect.stringMatching(/__fixtures__\/app\/entry.ts.template/),
        to: expect.stringMatching(/tmp\/app\/entry.ts/),
        name: 'entry.ts',
        action: 'IGNORED'
      },
      {
        from: expect.stringMatching(/__fixtures__\/app\/controllers\/controller.ts.template/),
        to: expect.stringMatching(/tmp\/app\/controllers\/controller.ts/),
        name: 'controller.ts',
        action: 'IGNORED'
      },
      {
        from: expect.stringMatching(/__fixtures__\/app\/models\/model.ts.template/),
        to: expect.stringMatching(/tmp\/app\/models\/model.ts/),
        name: 'model.ts',
        action: 'IGNORED'
      },
      {
        from: expect.stringMatching(/__fixtures__\/config\/config.yml.template/),
        to: expect.stringMatching(/tmp\/config\/config.yml/),
        name: 'config.yml',
        action: 'IGNORED'
      },
      {
        from: expect.stringMatching(/__fixtures__\/lib\/aux.ts.template/),
        to: expect.stringMatching(/tmp\/lib\/aux.ts/),
        name: 'aux.ts',
        action: 'IGNORED'
      }
    ])

    result = await populateTemplates('./tests/__fixtures__/', './tmp', { override: true })
    expect(result).toEqual([
      {
        from: expect.stringMatching(/__fixtures__\/app\/entry.ts.template/),
        to: expect.stringMatching(/tmp\/app\/entry.ts/),
        name: 'entry.ts',
        action: 'OVERRIDDEN'
      },
      {
        from: expect.stringMatching(/__fixtures__\/app\/controllers\/controller.ts.template/),
        to: expect.stringMatching(/tmp\/app\/controllers\/controller.ts/),
        name: 'controller.ts',
        action: 'OVERRIDDEN'
      },
      {
        from: expect.stringMatching(/__fixtures__\/app\/models\/model.ts.template/),
        to: expect.stringMatching(/tmp\/app\/models\/model.ts/),
        name: 'model.ts',
        action: 'OVERRIDDEN'
      },
      {
        from: expect.stringMatching(/__fixtures__\/config\/config.yml.template/),
        to: expect.stringMatching(/tmp\/config\/config.yml/),
        name: 'config.yml',
        action: 'OVERRIDDEN'
      },
      {
        from: expect.stringMatching(/__fixtures__\/lib\/aux.ts.template/),
        to: expect.stringMatching(/tmp\/lib\/aux.ts/),
        name: 'aux.ts',
        action: 'OVERRIDDEN'
      }
    ])

    const targetDirectory = await traverse('./tmp')
    expect(targetDirectory).toMatchObject({
      path: path.resolve('tmp'),
      files: [],
      directories: [
        {
          path: path.resolve('tmp/app'),
          files: [path.resolve('tmp/app/entry.ts')],
          directories: [
            {
              path: path.resolve('tmp/app/controllers'),
              files: [path.resolve('tmp/app/controllers/controller.ts')],
              directories: []
            },
            {
              path: path.resolve('tmp/app/models'),
              files: [path.resolve('tmp/app/models/model.ts')],
              directories: []
            }
          ]
        },
        {
          path: path.resolve('tmp/config'),
          files: [path.resolve('tmp/config/config.yml')],
          directories: []
        },
        {
          path: path.resolve('tmp/lib'),
          files: [path.resolve('tmp/lib/aux.ts')],
          directories: []
        }
      ]
    })
  })

  it('replace variables in files', async (): Promise<void> => {
    await populateTemplates('./tests/__fixtures__/', './tmp', { replacementVariables: { className: 'SuperApp', classExtension: 'CoreApp' } })

    expect(fs.readFileSync('./tmp/app/entry.ts').toString()).toEqual('export class SuperApp extends CoreApp {}')
  })
})
