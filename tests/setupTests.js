import { suppressNotices } from "../src/lib/notices";
suppressNotices(["yahooSurvey"]);

import { toBeType } from "jest-tobetype";

expect.extend({
  toBeType,
});
