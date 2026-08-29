import type { Artifact, CroJob, SlideCard } from "./types";

export const EXAMPLE_DECK_SLIDES: SlideCard[] = [
  {
    n: 1,
    kicker: "Meeting map",
    title: "One employee event",
    body: "Map where a hire starts separate work across HR, Payroll, and IT.",
  },
  {
    n: 2,
    kicker: "Working path",
    title: "One shared record",
    body: "Show how the same employee record can carry the handoff across teams.",
  },
  {
    n: 3,
    kicker: "Next step",
    title: "Review the current process",
    body: "Bring the HR and IT owners together to confirm the handoffs.",
  },
];

const MEETING_PACK: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: "Example account meeting pack",
  eyebrow: "Ready for review",
  sections: [
    {
      heading: "Current process",
      body: "A new hire starts separate work across HR, Payroll, and IT.",
    },
    {
      heading: "Rippling point of view",
      body: "One employee record can connect those teams on one platform.",
    },
    {
      heading: "Next meeting",
      body: "Review the handoffs with the HR and IT owners before choosing a starting point.",
    },
  ],
};

const SOURCED_REPLY: Extract<Artifact, { kind: "gmail" }> = {
  kind: "gmail",
  title: "Sourced buyer reply",
  to: "Customer team",
  subject: "How HR and IT can work from one employee record",
  body: "Rippling connects HR, Payroll, IT, and Finance products on one platform. The draft below links each answer to approved product material. Please review it before sending.",
};

const ACCOUNT_BRIEF: Extract<Artifact, { kind: "one-pager" }> = {
  kind: "one-pager",
  title: "Example account brief",
  eyebrow: "Draft only",
  sections: [
    {
      heading: "What is public",
      body: "The company site and open roles show where HR and IT work may overlap.",
    },
    {
      heading: "Working idea",
      body: "Test whether one employee record could remove repeated handoffs across those teams.",
    },
    {
      heading: "First outreach",
      body: "Open with the public signal, ask one process question, and keep the claim narrow.",
    },
  ],
};

export const JOBS: CroJob[] = [
  {
    id: "live-deck",
    number: 1,
    title: "Update the room while it is live",
    trigger: "A customer call starts",
    backgroundAction: "following approved notes and updating the open meeting pack",
    problem:
      "A fixed deck makes the customer translate the pitch into their own process. The useful version changes as the room gets clearer.",
    botJob:
      "Grok Bot follows the approved notes, maps the process being discussed, and updates the open meeting pack while the seller stays in the conversation.",
    storyboard: [
      {
        when: "Call starts",
        label: "The seller opens the room. Grok Bot starts with the approved meeting context.",
        scene: "call",
        visual: {
          kind: "live-call",
          title: "Example account working session",
          people: [
            { initials: "YOU", name: "Seller" },
            { initials: "HR", name: "HR lead" },
            { initials: "IT", name: "IT lead" },
          ],
        },
      },
      {
        when: "During discovery",
        label: "The current handoff takes shape without asking the seller to stop and write it down.",
        scene: "notes",
        visual: {
          kind: "deck-update",
          eyebrow: "Live call map",
          headline: "One employee event. Separate handoffs.",
          product: "HR, Payroll, and IT",
          status: "Current process mapped",
        },
      },
      {
        when: "Before the call ends",
        label: "The open deck now carries a narrow Rippling point of view and a practical next step.",
        scene: "deck",
        visual: {
          kind: "deck-update",
          eyebrow: "Next step",
          headline: "Review the handoff with both owners",
          product: "One employee record",
          status: "Meeting pack updated",
        },
      },
      {
        when: "Ready for review",
        label: "The final artifact is a meeting pack the seller can check before sharing.",
        scene: "send",
        artifact: MEETING_PACK,
      },
    ],
    unlock:
      "The seller stays in the conversation while the meeting pack catches up to the room.",
    outcome:
      "One live call ends with a current meeting pack and a clear review point.",
    clips: ["03-slides-granola"],
    demo: {
      title: "Room",
      subtitle: "Approved notes to meeting pack",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "room",
          name: "Room",
          role: "bot",
          persona: "Turns the live process map into a reviewable meeting pack",
          color: "#79005D",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "room",
          kind: "routine",
          body: "The customer call started. I am following the approved notes and holding every draft for review.",
        },
        {
          id: "m2",
          from: "room",
          kind: "text",
          body: "The discussion now covers the handoff between HR, Payroll, and IT. I am mapping the current process in the open deck.",
        },
        {
          id: "m3",
          from: "room",
          kind: "draft",
          draftLabel: "Meeting pack",
          artifact: MEETING_PACK,
        },
        {
          id: "m4",
          from: "room",
          kind: "system",
          body: "Nothing shared. The meeting pack stays a draft until you approve it.",
        },
      ],
    },
  },
  {
    id: "sourced-answer",
    number: 2,
    title: "Answer the buyer without an internal chase",
    trigger: "A customer question lands",
    backgroundAction: "checking approved product material and drafting a sourced reply",
    problem:
      "A product question can turn into a long search across docs and internal threads. The buyer waits while the seller rebuilds an answer.",
    botJob:
      "Grok Bot checks the approved product material, keeps the sources attached, and drafts a reply. Any open point stays visible for a person.",
    storyboard: [
      {
        when: "Question arrives",
        label: "A buyer asks how HR and IT can share one employee record.",
        scene: "notes",
        visual: {
          kind: "procurement-email",
          sender: "Customer team",
          subject: "Question about employee records",
          questions: 1,
        },
      },
      {
        when: "Sources checked",
        label: "Grok Bot checks approved product pages and internal notes, then marks the remaining review point.",
        scene: "inspect",
        visual: {
          kind: "answers-found",
          sources: [
            { name: "Product material", answer: "Platform context found" },
            { name: "Internal notes", answer: "Account language checked" },
            { name: "Open point", answer: "Held for a person" },
          ],
          status: "Ready to draft",
        },
      },
      {
        when: "Ready for review",
        label: "The final artifact is a sourced reply. It has not been sent.",
        scene: "send",
        visual: {
          kind: "reply-ready",
          to: "Customer team",
          subject: "How HR and IT can work from one employee record",
          status: "Reply ready",
        },
        artifact: SOURCED_REPLY,
      },
    ],
    unlock:
      "The seller starts with a sourced draft instead of searching for the same answer again.",
    outcome:
      "One buyer question becomes a sourced reply with the open point called out.",
    clips: ["01-morning-inbox"],
    demo: {
      title: "Answers",
      subtitle: "Buyer question to sourced draft",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "answers",
          name: "Answers",
          role: "bot",
          persona: "Checks approved product material and drafts a sourced reply",
          color: "#D6A4C8",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "answers",
          kind: "routine",
          body: "A buyer question landed. I am checking approved product material and account notes. Nothing will be sent.",
        },
        {
          id: "m2",
          from: "answers",
          kind: "draft",
          draftLabel: "Questions and sources",
          artifact: {
            kind: "questions",
            title: "Review before reply",
            items: [
              "Confirm the shared employee record explanation.",
              "Check whether the account has a separate access question.",
            ],
          },
        },
        {
          id: "m3",
          from: "answers",
          kind: "draft",
          draftLabel: "Gmail reply",
          artifact: SOURCED_REPLY,
        },
        {
          id: "m4",
          from: "answers",
          kind: "system",
          body: "The sourced reply is in Drafts. The open point stays at the top.",
        },
      ],
    },
  },
  {
    id: "account-research",
    number: 3,
    title: "Build the account brief before outreach",
    trigger: "An account enters the target list",
    backgroundAction: "reading public sources and preparing a narrow account brief",
    problem:
      "A name on a target list is not a reason to reach out. The seller still needs a public signal, a useful question, and a reason this account may care.",
    botJob:
      "Grok Bot reads approved public sources, separates facts from the working idea, and prepares an account brief. The seller chooses the message.",
    storyboard: [
      {
        when: "Account enters the list",
        label: "Grok Bot starts with the company site, careers page, and public newsroom.",
        scene: "inspect",
        visual: {
          kind: "account-research",
          account: "Example account",
          sources: ["Company site", "Careers", "Newsroom"],
          signal: "HR and IT work may overlap",
        },
      },
      {
        when: "Context organized",
        label: "Known facts stay separate from the working idea.",
        scene: "notes",
        visual: {
          kind: "three-why",
          items: [
            { label: "Public fact", answer: "Source attached" },
            { label: "Working idea", answer: "Marked as a hypothesis" },
            { label: "First question", answer: "Kept narrow" },
          ],
        },
      },
      {
        when: "Drafts prepared",
        label: "The seller gets a brief and two draft channels. Nothing has been sent.",
        scene: "map",
        visual: {
          kind: "outreach-ready",
          person: "Customer team",
          channels: ["Email", "Account page"],
          status: "Drafts ready",
        },
      },
      {
        when: "Ready for review",
        label: "The final artifact is an account brief with sources and one opening question.",
        scene: "send",
        artifact: ACCOUNT_BRIEF,
      },
    ],
    unlock:
      "The seller reviews a point of view built from public facts instead of starting from a blank page.",
    outcome:
      "One account in the list becomes a sourced brief and two held drafts.",
    clips: ["02-prospecting-pg"],
    demo: {
      title: "Research",
      subtitle: "Public sources to account brief",
      participants: [
        { id: "you", name: "You", role: "you" },
        {
          id: "research",
          name: "Research",
          role: "bot",
          persona: "Reads public sources and prepares the account brief",
          color: "#402530",
        },
      ],
      messages: [
        {
          id: "m1",
          from: "research",
          kind: "routine",
          body: "Example account entered the target list. I am reading approved public sources and keeping facts separate from the working idea.",
        },
        {
          id: "m2",
          from: "research",
          kind: "text",
          body: "The company site and careers page point to work shared by HR and IT. I am drafting one process question, not making a claim.",
        },
        {
          id: "m3",
          from: "research",
          kind: "draft",
          draftLabel: "Account brief",
          artifact: ACCOUNT_BRIEF,
        },
        {
          id: "m4",
          from: "research",
          kind: "draft",
          draftLabel: "Email draft",
          artifact: {
            kind: "gmail",
            title: "First outreach",
            to: "Customer team",
            subject: "A question about the HR and IT handoff",
            body: "I noticed your public roles touch both HR and IT operations. How does a new hire move between those teams today? I put the short context in one page if useful.",
          },
        },
        {
          id: "m5",
          from: "research",
          kind: "system",
          body: "Nothing sent. The account brief and email remain drafts.",
        },
      ],
    },
  },
];

export function getJob(id: string): CroJob | undefined {
  return JOBS.find((job) => job.id === id);
}
