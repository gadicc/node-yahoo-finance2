import { sprintf } from "@std/fmt/printf";
import { describe, it as _it } from "@std/testing/bdd";
import { expect } from "@std/expect";
import type { Global } from "@jest/types";
import fetchCache, { fetchCacheSetup } from "./fetchCache.ts";
import testSymbols from "./testSymbols.ts";

function each(table: Global.EachTable) {
  const _table = table.map((item) => Array.isArray(item) ? item : [item]);

  return function (
    name: string,
    fn: Global.EachTestFn<Global.BlockFn>,
    timeout?: number,
  ) {
    if (timeout) throw new Error("timeout not implemented yet");

    for (const row of _table) {
      const _name = sprintf(name, ...row);
      _it(_name, () => fn(...row));
    }
  };
}

const it = _it as typeof _it & { each: typeof each };
Object.assign(it, { each });

const setupCache = fetchCacheSetup;

export { testSymbols };
export { fetchCache, fetchCacheSetup, setupCache };
export { describe, expect, it };
