import options from "./options.js";
const logger = options.logger || console;

type Notice = {
  id: string;
  text: string;
  level?: keyof typeof logger;
  onceOnly?: boolean;
  suppress?: boolean;
};

const notices = {
  yahooSurvey: {
    id: "yahooSurvey",
    text:
      "Please consider completing the survey at https://bit.ly/yahoo-finance-api-feedback " +
      "if you haven't already; for more info see " +
      "https://github.com/gadicc/node-yahoo-finance2/issues/764#issuecomment-2056623851.",
    onceOnly: true,
  } as Notice,
};

export function showNotice(id: keyof typeof notices) {
  const n = notices[id];
  if (!n) throw new Error(`Unknown notice id: ${id}`);

  if (n.suppress) return;
  if (n.onceOnly) n.suppress = true;

  const text =
    n.text +
    // (n.onceOnly ? " (only shown once)" : "") +
    "  You can supress this message in future with `yahooFinance.supressNotices(['" +
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
