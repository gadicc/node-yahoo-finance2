import _env from "../src/env-test";
import _opts from "../src/lib/options";
import _fetch from "../src/lib/yahooFinanceFetch";
import _moduleExec from "../src/lib/moduleExec";
import _moduleExecTypebox from "../src/lib/moduleExecTypebox";

export default function genYf(extend: object): any {
  return {
    _env,
    _opts,
    _fetch,
    _moduleExec,
    _moduleExecTypebox,
    ...extend,
  };
}
