import options from "./options.js";
const logger = options.logger || console;

type Notice = {
  id: string;
  text: string;
  level?: keyof typeof logger;
  onceOnly?: boolean;
  suppress?: boolean;
};

const notices: Record<string, Notice> = {
  yahooSurvey: {
    id: "yahooSurvey",
    text:
      "Please consider completing the survey at https://bit.ly/yahoo-finance-api-feedback " +
      "if you haven't already; for more info see " +
      "https://github.com/gadicc/node-yahoo-finance2/issues/764#issuecomment-2056623851.",
    onceOnly: true,
  },
  ripHistorical: {
    id: "ripHistorical",
    text:
      "[Deprecated] historical() relies on an API that Yahoo have removed.  We'll " +
      "map this request to chart() for convenience, but, please consider using " +
      "chart() directly instead; for more info see " +
      "https://github.com/gadicc/node-yahoo-finance2/issues/795.",
    level: "warn",
    onceOnly: true,
  },
};

export function showNotice(id: keyof typeof notices) {
  const n = notices[id];
  if (!n) throw new Error(`Unknown notice id: ${id}`);

  if (n.suppress) return;
  if (n.onceOnly) n.suppress = true;

  const text =
    n.text +
    (n.onceOnly ? "  This will only be shown once, but you" : "You") +
    " can suppress this message in future with `yahooFinance.suppressNotices(['" +
    id +
    "'])`.";
  const level = n.level || "info";
  logger[level](text);
}

export function suppressNotices(noticeIds: (keyof typeof notices)[]) {
  noticeIds.forEach((id) => {
    const n = notices[id];
    if (!n) logger.error(`Unknown notice id: ${id}`);
    n.suppress = true;
  });
}
