// @enableNewMutationAliasingModel
import {ValidateMemoization} from 'shared-runtime';

const Codes = {
  en: {name: 'English'},
  ja: {name: 'Japanese'},
  ko: {name: 'Korean'},
  zh: {name: 'Chinese'},
};

function Component(a) {
  let keys;
  if (a) {
    keys = Object.keys(Codes);
  } else {
    return null;
  }
  const options = keys.map(code => {
    // In the old inference model, `keys` was assumed to be mutated bc
    // this callback captures its input into its output, and the return
    // is treated as a mutation since it's a function expression. The new
    // model understands that `code` is captured but not mutated.
    const country = Codes[code];
    return {
      name: country.name,
      code,
    };
  });
  return (
    <>
      <ValidateMemoization inputs={[]} output={keys} onlyCheckCompiled={true} />
      <ValidateMemoization
        inputs={[]}
        output={options}
        onlyCheckCompiled={true}
      />
    </>
  );
}

export const FIXTURE_ENTRYPOINT = {
  fn: Component,
  params: [{a: false}],
  sequentialRenders: [
    {a: false},
    {a: true},
    {a: true},
    {a: false},
    {a: true},
    {a: false},
  ],
};
