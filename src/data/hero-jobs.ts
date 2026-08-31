export const HERO_JOB_IDS = [
  "target-account-research",
  "account-brief",
  "meeting-prep",
  "live-deck-update",
  "follow-up-pack",
  "sourced-buyer-answer",
  "deal-room-review",
  "forecast-review",
] as const;

export type HeroJobId = (typeof HERO_JOB_IDS)[number];

const HERO_JOB_COUNT: 8 = HERO_JOB_IDS.length;
void HERO_JOB_COUNT;

type HeroSender = "user" | "bot";

export type HeroThreadLine = {
  readonly sender: HeroSender;
  readonly body: string;
};

type ClosedThread = readonly [HeroThreadLine, ...HeroThreadLine[]];

export type HeroJob = {
  readonly label: string;
  readonly agent: string;
  readonly trigger: string;
  readonly account: string;
  readonly context: string;
  readonly signal: string;
  readonly artifact: string;
  readonly thread: ClosedThread;
};

export const HERO_JOBS: { readonly [K in HeroJobId]: HeroJob } = {
  "target-account-research": {
    label: "Target-account research",
    agent: "Grok Bot",
    trigger: "Acme enters the target list",
    account: "Acme",
    context: "Public site and careers page",
    signal: "Public roles touch both HRIS and IT operations",
    artifact: "Account brief",
    thread: [
      {
        sender: "user",
        body: "Acme just hit the list. Research it and leave me a brief.",
      },
      {
        sender: "bot",
        body: "Account brief is ready. Careers page points to HRIS and IT on one platform. Draft only.",
      },
    ],
  },
  "account-brief": {
    label: "Account brief",
    agent: "Grok Bot",
    trigger: "You open Acme before outreach",
    account: "Acme",
    context: "HRIS, payroll, IT, and spend on one employee graph",
    signal: "The brief starts with one process question",
    artifact: "Account brief",
    thread: [
      {
        sender: "user",
        body: "Write the account brief before I send anything.",
      },
      {
        sender: "bot",
        body: "Account brief is parked. One employee graph across HRIS, payroll, IT, and spend. Nothing sent.",
      },
    ],
  },
  "meeting-prep": {
    label: "Meeting prep",
    agent: "Grok Bot",
    trigger: "Tomorrow's meeting appears on the calendar",
    account: "Acme",
    context: "Agenda covers the HRIS and IT handoff",
    signal: "The meeting brief keeps open questions at the top",
    artifact: "Meeting brief",
    thread: [
      {
        sender: "user",
        body: "Prep me for tomorrow. I want a meeting brief, not a product tour.",
      },
      {
        sender: "bot",
        body: "Meeting brief is ready. Open with the split between payroll and IT. Draft only.",
      },
    ],
  },
  "live-deck-update": {
    label: "Live deck update",
    agent: "Grok Bot",
    trigger: "The customer call starts",
    account: "Acme",
    context: "Live discovery. Granola is in.",
    signal: "Approved notes map the payroll and IT handoff",
    artifact: "Updated slides",
    thread: [
      {
        sender: "user",
        body: "The approved notes show a payroll and IT handoff. Put that on the open deck.",
      },
      {
        sender: "bot",
        body: "Updated slides are in the deck. Current process first, then the Rippling point of view. Still on the call.",
      },
    ],
  },
  "follow-up-pack": {
    label: "Follow-up pack",
    agent: "Grok Bot",
    trigger: "The call ends",
    account: "Acme",
    context: "Same-day follow-up for IT and HRIS",
    signal: "Next meeting needs both owners in the room",
    artifact: "Follow-up pack",
    thread: [
      {
        sender: "user",
        body: "Build the follow-up pack while this is still fresh.",
      },
      {
        sender: "bot",
        body: "Follow-up pack is drafted. Note, one-pager, and a Gmail sitting in Drafts. Nothing sent.",
      },
    ],
  },
  "sourced-buyer-answer": {
    label: "Sourced buyer answer",
    agent: "Grok Bot",
    trigger: "A buyer question lands overnight",
    account: "Acme",
    context: "Inbox. Product knowledge and internal notes.",
    signal: "How payroll and IT share one employee record",
    artifact: "Sourced reply",
    thread: [
      {
        sender: "user",
        body: "They asked how payroll and IT share one record. Find the answer and draft the reply.",
      },
      {
        sender: "bot",
        body: "Sourced reply is waiting. The draft explains how one employee record can support both workflows. Not sent.",
      },
    ],
  },
  "deal-room-review": {
    label: "Deal-room review",
    agent: "Grok Bot",
    trigger: "You open the deal room before forecast",
    account: "Acme",
    context: "Open deal. HRIS, IT, and spend owners.",
    signal: "IT owner is on the thread. Spend owner is not.",
    artifact: "Open-issues list",
    thread: [
      {
        sender: "user",
        body: "Review the deal room and list what is still open.",
      },
      {
        sender: "bot",
        body: "Open-issues list is ready. Spend owner is missing. Access question is unanswered. Draft only.",
      },
    ],
  },
  "forecast-review": {
    label: "Forecast review",
    agent: "Grok Bot",
    trigger: "Weekly forecast review starts",
    account: "Acme",
    context: "This week's commit conversation",
    signal: "Next step is dated. Signer meeting is not.",
    artifact: "Forecast note",
    thread: [
      {
        sender: "user",
        body: "Write the forecast note for Acme. Gaps only. No numbers.",
      },
      {
        sender: "bot",
        body: "Forecast note is parked. Dated next step is on the calendar. Signer meeting is not. Nothing posted.",
      },
    ],
  },
};
