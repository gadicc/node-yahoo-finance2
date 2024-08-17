import _env from "../src/env-test";
import _opts from "../src/lib/options";
import _fetch from "../src/lib/yahooFinanceFetch";
import _moduleExec from "../src/lib/moduleExec";

export default function genYf(extend: object): any {
  return {
    _env,
    _opts: {
      ..._opts,
      validation: {
        ...(_opts?.validation ?? {}),
        _internalThrowOnAdditionalProperties: true,
      },
    },
    _fetch,
    _moduleExec,
    ...extend,
  };
}
