import {expectType, expectError} from 'tsd'
import {parsing, transform} from './index.js'

for (const testCase of parsing) {
  expectType<string>(testCase.input)

  if ('error' in testCase) {
    if (testCase.error){
      expectType<`n_${string}`>(testCase.name)
    } else {
      expectType<`y_${string}`>(testCase.name)
    }
  } else {
    expectType<`i_${string}`>(testCase.name)
  }
}

for (const testCase of transform) {
  expectType<string>(testCase.name)
  expectType<string>(testCase.input)
  expectError(transform[0].error)
}
