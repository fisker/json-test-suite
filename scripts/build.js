import assert from 'node:assert'
import {inspect} from 'node:util'
import {outdent} from 'outdent'
import {parse} from 'yaml'
import {downloadFile, readZipFile, writeTextFile} from './utilities.js'

const ZIP_URL =
  'https://github.com/nst/JSONTestSuite/archive/refs/heads/master.zip'
const CACHE_FILE = new URL('../.cache/json-test-suite.zip', import.meta.url)
const DATA_DIRECTORY = new URL('../data/', import.meta.url)

await Promise.any(
  [ZIP_URL, `https://ghfast.top/${ZIP_URL}`].map((url) =>
    downloadFile({url, cacheFile: CACHE_FILE}),
  ),
)

function* getData(feature) {
  const FIXTURE_FILENAME_PREFIX = `JSONTestSuite-master/test_${feature}/`

  for (const file of readZipFile(
    CACHE_FILE,
    (file) =>
      !file.isDirectory && file.entryName.startsWith(FIXTURE_FILENAME_PREFIX),
  )) {
    const name = file.name.slice(FIXTURE_FILENAME_PREFIX.length)
    if (feature === 'parsing') {
      assert.ok(
        /^[iny]_[^/]+\.json$/.test(name),
        `Unexpected test file: ${file.name}`,
      )
    } else if (feature === 'transform') {
      assert.ok(
        /^[^/]+\.json$/.test(name),
        `Unexpected test file: ${file.name}`,
      )
    } else {
      throw new Error(`Unexpected feature '${feature}'.`)
    }

    const testCase = {name}

    // https://github.com/nst/JSONTestSuite/blob/1ef36fa01286573e846ac449e8683f8833c5b26a/README.md?plain=1#L19-Le21
    if (feature === 'parsing') {
      if (name.startsWith('y_')) {
        testCase.error = false
      } else if (name.startsWith('n_')) {
        testCase.error = true
      }
    }

    testCase.input = file.data

    yield testCase
  }
}

const features = ['parsing', 'transform']
await Promise.all([
  ...features.map(async (feature) => {
    const data = [...getData(feature)]
    await writeTextFile(
      new URL(`${feature}.js`, DATA_DIRECTORY),
      `export default ${JSON.stringify(data, undefined, 2)}`,
    )
  }),

  writeTextFile(
    new URL('../index.js', import.meta.url),
    features
      .map(
        (feature) =>
          `export {default as ${feature}} from './data/${feature}.js'`,
      )
      .join('\n'),
  ),

  writeTextFile(
    new URL('../index.d.ts', import.meta.url),
    features
      .map((feature) =>
        feature === 'parsing'
          ? outdent`
            export const ${feature}: {
              readonly name: string,
              readonly error?: boolean,
              readonly input: string,
            }[]
          `
          : outdent`
            export const ${feature}: {
              readonly name: string,
              readonly input: string,
            }[]
          `,
      )
      .join('\n\n'),
  ),
])
