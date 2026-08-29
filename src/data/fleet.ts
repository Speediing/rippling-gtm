import type { JobId } from "./types";

export type FleetBot = {
  id: string;
  name: string;
  blurb: string;
  color: string;
  jobId?: JobId;
  mark?: string;
  seat?: boolean;
};

export const FLEET: FleetBot[] = [
  {
    id: "rep",
    name: "Every sales rep",
    blurb: "The human stays in control. Their agents keep the surrounding work moving.",
    color: "#F4E9F0",
    mark: "AE",
    seat: true,
  },
  {
    id: "inbox",
    name: "Sourced answers",
    blurb: "Checks approved material and leaves the buyer reply in Drafts.",
    jobId: "sourced-answer",
    color: "#D6A4C8",
  },
  {
    id: "research",
    name: "Account research",
    blurb: "Reads public sources and prepares a narrow brief for review.",
    jobId: "account-research",
    color: "#79005D",
  },
];
