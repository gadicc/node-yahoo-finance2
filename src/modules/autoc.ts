export default async function autoc(): Promise<any> {
  throw new Error(
    "Yahoo decomissioned their autoc server sometime before 20 Nov 2021 " +
      "(see https://github.com/gadicc/node-yahoo-finance2/issues/337])). " +
      "Use `search` instead (just like they do)."
  );
}
