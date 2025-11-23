import {expectType, expectError} from 'tsd'
import {parsing, transform} from './index.js'

expectType<string>(parsing[0].name)
expectType<string>(parsing[0].input)
expectType<boolean | undefined>(parsing[0].error)

expectType<string>(transform[0].name)
expectType<string>(transform[0].input)
expectError(transform[0].error)
