import assert from 'node:assert/strict'
import test from 'node:test'
import * as jsonTestSuite from './index.js'

for (const feature of ['parsing', 'transform']) {
  test(feature, () => {
    const testCases = jsonTestSuite[feature]

    assert.ok(Array.isArray(testCases) && testCases.length > 1)
    for (const testCase of testCases) {
      assert.equal(typeof testCase.name, 'string')
      assert.equal(typeof testCase.input, 'string')
      if (feature === 'parsing') {
        assert.ok(/^[iny]_[^/]+\.json$/.test(testCase.name))
      } else {
        assert.ok(/^[^/]+\.json$/.test(testCase.name))
      }

      if (feature === 'parsing') {
        const {name} = testCase
        if (name.startsWith('y_')) {
          assert.deepEqual(Object.keys(testCase), ['name', 'error', 'input'])
          assert.equal(
            testCase.error,
            false,
            `Missing 'error: false' for '${name}'.`,
          )
        } else if (name.startsWith('n_')) {
          assert.deepEqual(Object.keys(testCase), ['name', 'error', 'input'])
          assert.equal(
            testCase.error,
            true,
            `Missing 'error: true' for '${name}'.`,
          )
        }
        continue
      }

      assert.ok(!Object.hasOwn(testCase, 'error'))
      assert.deepEqual(Object.keys(testCase), ['name', 'input'])
    }
  })
}
