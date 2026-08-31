import type { ClipId, JobId } from "./types";

export type SiteKind =
  | "granola"
  | "figma"
  | "gong"
  | "sfdc-account"
  | "sfdc-opp"
  | "sheets"
  | "gmail"
  | "slack"
  | "gdoc"
  | "linkedin"
  | "research"
  | "page"
  | "clip";

export type ChromeTab = {
  id: string;
  host: string;
  label: string;
};

export type ComputerBeat = {
  pill: string;
  host: string;
  path?: string;
  title: string;
  site: SiteKind;
  clip?: ClipId;
  tabs: ChromeTab[];
};

const granola = { id: "granola", host: "granola.app", label: "Granola" };
const figma = { id: "figma", host: "figma.com", label: "Figma" };
const gmail = { id: "gmail", host: "mail.google.com", label: "Gmail" };
const gdoc = { id: "gdoc", host: "docs.google.com", label: "Docs" };
const web = { id: "web", host: "acme.com", label: "Public site" };

export const SCREENS: Record<JobId, Record<string, ComputerBeat>> = {
  "live-deck": {
    m1: {
      pill: "Opening the approved notes",
      host: "granola.app",
      path: "/notes/acme-working-session",
      title: "Acme working session",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m2: {
      pill: "Mapping the current process",
      host: "granola.app",
      path: "/notes/acme-working-session",
      title: "Acme working session",
      site: "granola",
      tabs: [granola, figma, gmail],
    },
    m3: {
      pill: "Updating the meeting pack",
      host: "figma.com",
      path: "/file/acme-meeting-pack",
      title: "Acme meeting pack",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
    m4: {
      pill: "Holding the draft for review",
      host: "figma.com",
      path: "/file/acme-meeting-pack",
      title: "Acme meeting pack",
      site: "figma",
      tabs: [granola, figma, gmail],
    },
  },
  "sourced-answer": {
    m1: {
      pill: "Opening the buyer question",
      host: "mail.google.com",
      path: "/mail/u/0/#inbox",
      title: "Inbox",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m2: {
      pill: "Checking approved sources",
      host: "docs.google.com",
      path: "/document/d/product-sources",
      title: "Approved product sources",
      site: "gdoc",
      tabs: [gmail, gdoc],
    },
    m3: {
      pill: "Drafting the sourced reply",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
    m4: {
      pill: "Leaving the reply in Drafts",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [gmail, gdoc],
    },
  },
  "account-research": {
    m1: {
      pill: "Reading approved public sources",
      host: "acme.com",
      path: "/",
      title: "Acme",
      site: "research",
      tabs: [web, gdoc, gmail],
    },
    m2: {
      pill: "Separating facts from the working idea",
      host: "acme.com",
      path: "/careers",
      title: "Acme careers",
      site: "clip",
      clip: "02-prospecting-pg",
      tabs: [web, gdoc, gmail],
    },
    m3: {
      pill: "Writing the account brief",
      host: "docs.google.com",
      path: "/document/d/acme-account-brief",
      title: "Acme account brief",
      site: "gdoc",
      tabs: [web, gdoc, gmail],
    },
    m4: {
      pill: "Drafting the first email",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, gdoc, gmail],
    },
    m5: {
      pill: "Parking every draft",
      host: "mail.google.com",
      path: "/mail/u/0/#drafts",
      title: "Drafts",
      site: "gmail",
      tabs: [web, gdoc, gmail],
    },
  },
};

export function beatFor(
  jobId: JobId,
  messageId: string | undefined,
): ComputerBeat | undefined {
  if (!messageId) return undefined;
  return SCREENS[jobId]?.[messageId];
}
