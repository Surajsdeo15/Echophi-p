import type { ChannelKey } from "./home";

/**
 * Single source for home Use Cases section + /use-cases page.
 * Strings copied exactly from the prototype USE_CASES_LIST.
 */
export const USE_CASES = [
  {
    slug: "customer-support",
    title: "Customer Support",
    tagline: "Resolve more, escalate smarter",
    scenario:
      "AI agents handle routine volume end to end and hand the hard cases to your team with full context.",
    channels: ["voice", "whatsapp", "email", "sms"] as ChannelKey[],
    stat: "—%",
    statLabel: "tickets resolved without a human",
  },
  {
    slug: "sales-marketing",
    title: "Sales & Marketing Outreach",
    tagline: "Conversations that convert",
    scenario: "Personalized outbound at scale that actually holds a two-way conversation.",
    channels: ["voice", "whatsapp", "sms"] as ChannelKey[],
    stat: "—%",
    statLabel: "lift in qualified meetings",
  },
  {
    slug: "payment-order-recovery",
    title: "Payment & Order Recovery",
    tagline: "Recover revenue, respectfully",
    scenario:
      "Timely, on-brand nudges that resolve the blocker, escalating to a live call when needed.",
    channels: ["sms", "whatsapp", "voice"] as ChannelKey[],
    stat: "—%",
    statLabel: "of at-risk revenue recovered",
  },
  {
    slug: "recruitment-screening",
    title: "Recruitment Screening",
    tagline: "Screen every applicant, fairly",
    scenario:
      "A consistent first-round screen for every applicant, scheduling the qualified ones automatically.",
    channels: ["voice", "email"] as ChannelKey[],
    stat: "—%",
    statLabel: "faster time-to-first-screen",
  },
  {
    slug: "appointment-reminders",
    title: "Appointment Reminders",
    tagline: "Cut no-shows, keep calendars full",
    scenario: "Two-way reminders that let people confirm, reschedule or cancel in a tap.",
    channels: ["sms", "whatsapp", "voice"] as ChannelKey[],
    stat: "—%",
    statLabel: "reduction in no-shows",
  },
  {
    slug: "lead-qualification",
    title: "Lead Qualification",
    tagline: "Respond in seconds, route the best",
    scenario:
      "Qualify inbound leads the moment they arrive and route the best-fit ones to sales.",
    channels: ["voice", "whatsapp", "sms"] as ChannelKey[],
    stat: "—s",
    statLabel: "median speed-to-lead",
  },
] as const;

export type UseCase = (typeof USE_CASES)[number];

export const USE_CASES_PAGE = {
  hero: {
    eyebrow: "Use cases",
    title: "One platform, matched to the conversations that move your business",
    sub: "Filter by channel, or jump straight to the one that sounds like your team.",
  },
  callout: {
    badge: "Quality & Human Review",
    title: "Whatever the use case, every conversation is scored and human-reviewed",
    body: "The same quality layer runs behind every workflow.",
    link: "See how we ensure quality",
  },
  cta: {
    title: "Not sure which fits? We'll map it with you.",
    primaryLabel: "Book a demo",
    secondaryLabel: "See the quality layer",
  },
} as const;
