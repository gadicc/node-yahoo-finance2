const fs = require("fs");
const globby = require("globby");

(async function () {
  const states = {};
  const all = { data: [] };
  const files = await globby([
    "./tests/http/quote-*",
    "./tests/http/old/quote-*",
  ]);
  const allKeys = new Set();

  for (let file of files) {
    const result = JSON.parse(fs.readFileSync(file)).response.bodyJson;
    const quote = result.quoteResponse.result[0];
    //const price = result.quoteSummary.result[0].price;

    const marketState = quote.marketState;
    const keys = Object.keys(quote);

    keys.forEach((key) => allKeys.add(key));
    states[marketState] = states[marketState] || { data: [] };
    states[marketState].data.push(keys);
    all.data.push(keys);
  }

  all.always = new Set();
  all.sometimes = new Set();
  all.never = new Set(allKeys);

  for (let state of Object.values(states)) {
    state.always = new Set();
    state.sometimes = new Set();
    state.never = new Set(allKeys);

    state.data.forEach((keys) => {
      keys.forEach((key) => {
        if (state.never.has(key)) {
          state.never.delete(key);
          state.always.add(key);
        }
        if (all.never.has(key)) {
          all.never.delete(key);
          all.always.add(key);
        }
      });
      state.always.forEach((key) => {
        if (!keys.includes(key)) {
          state.always.delete(key);
          state.sometimes.add(key);
        }
      });
      all.always.forEach((key) => {
        if (!keys.includes(key)) {
          all.always.delete(key);
          all.sometimes.add(key);
        }
      });
    });

    state.setSize = state.data.length;
    delete state.data;
  }

  all.setSize = all.data.length;
  delete all.data;

  //console.log(states);
  //
  console.log({
    name: "all",
    always: Array.from(all.always).sort().join(", "),
    sometimes: Array.from(all.sometimes).sort().join(", "),
    never: Array.from(all.never).sort().join(", "),
  });

  for (let [name, state] of Object.entries(states)) {
    console.log({
      name,
      always: Array.from(difference(state.always, all.always))
        .sort()
        .join(", "),
      sometimes: Array.from(difference(state.sometimes, all.sometimes))
        .sort()
        .join(", "),
      never: Array.from(difference(state.never, all.never)).sort().join(", "),
    });
  }
})();

// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Set
function difference(setA, setB) {
  let _difference = new Set(setA);
  for (let elem of setB) {
    _difference.delete(elem);
  }
  return _difference;
}
