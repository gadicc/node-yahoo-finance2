import { sprintf } from "@std/fmt/printf";
import { describe, it as _it } from "@std/testing/bdd";
import { type Async, expect as _expect, type Expected } from "@std/expect";
import type { Global } from "@jest/types";
import { getType } from "jest-get-type";
import fetchCache, { fetchCacheSetup } from "./fetchCache.ts";

import testSymbols from "./testSymbols.ts";
import createYahooFinance from "../src/createYahooFinance.ts";
import { disallowAdditionalProps } from "../src/lib/validateAndCoerceTypes.ts";
import { suppressNotices } from "../src/lib/notices.ts";

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

interface ExtendedExpected<IsAsync = false> extends Expected<IsAsync> {
  toBeType: (type: ReturnType<typeof getType>) => unknown;
  not: IsAsync extends true ? Async<ExtendedExpected<true>>
    : ExtendedExpected<false>;
  resolves: Async<ExtendedExpected<true>>;
  rejects: Async<ExtendedExpected<true>>;
}

_expect.extend({
  toBeType(
    context,
    expected: ReturnType<typeof getType>,
  ) {
    const type = getType(context.value);
    const pass = type === expected;
    const toBe = context.isNot ? "to NOT be" : "to be";
    return {
      pass: context.isNot ? !pass : pass,
      message: () => `Expected "${type}" ${toBe} "${expected}"`,
    };
  },
});

const expect = _expect<ExtendedExpected>;

const setupCache = fetchCacheSetup;

/**
 * Like `createYahooFinance` but with some common settings for testing,
 * e.g. `disallowAdditionalProps`
 * @param opts
 * @returns
 */
export function createTestYahooFinance<
  T extends Parameters<typeof createYahooFinance>[0],
>(
  opts: T,
): ReturnType<typeof createYahooFinance<T>> {
  // Note: currently these are global and can't be undone without reloading deno.
  disallowAdditionalProps();
  suppressNotices(["yahooSurvey"]);

  return createYahooFinance(opts);
}

export { testSymbols };
export { fetchCache, fetchCacheSetup, setupCache };
export { describe, expect, it };
