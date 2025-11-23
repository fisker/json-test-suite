// Generated file, do NOT edit

type ParsingMustAccept = {
  readonly name: `y_${string}`,
  readonly error: false,
  readonly input: string,
}

type ParsingMustReject = {
  readonly name: `n_${string}`,
  readonly error: true,
  readonly input: string,
}

type ParsingFree = {
  readonly name: `i_${string}`,
  readonly input: string,
}

type TestCase = {
  readonly name: string,
  readonly input: string,
}

export const parsing: (ParsingMustAccept | ParsingMustReject | ParsingFree)[]
export const transform: TestCase[]
