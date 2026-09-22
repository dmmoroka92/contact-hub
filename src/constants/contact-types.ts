export const CONTACT_TYPES = [
  "work",
  "client",
  "recruiter",
  "personal",
] as const;

export type ContactType =
  (typeof CONTACT_TYPES)[number];