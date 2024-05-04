import { isTime } from "./datetime";

// There is reasonable coverage for most of this module already, so these tests aren't extensive.
// Just plugging the gaps in test coverage
describe("isTime", () => {
  it("Should correctly identify a time given in the non-zulu TZ as a valid time", () => {
    expect(isTime("20:20:39+00:00")).toBe(true);
  });
  it("Should correctly identify a time given in a TZ behind Zulu as a valid time", () => {
    expect(isTime("20:20:39-10:00")).toBe(true);
  });
  it("Should correctly reject a time given in the non-zulu TZ with impossible values", () => {
    expect(isTime("35:61:39+00:00")).toBe(false);
  });
});
