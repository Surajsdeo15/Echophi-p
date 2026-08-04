export type ChannelKey = "voice" | "whatsapp" | "email" | "sms";

export const CONTACT = {
  tel: "+1 (555) 000-0000",
  telHref: "tel:+15550000000",
  whatsappHref: "https://wa.me/15550000000",
  emailHref: "mailto:hello@echophi.com",
  smsHref: "sms:+15550000000",
} as const;

export const CHANNELS: Record<
  ChannelKey,
  { key: ChannelKey; label: string }
> = {
  voice: { key: "voice", label: "Voice" },
  whatsapp: { key: "whatsapp", label: "WhatsApp" },
  email: { key: "email", label: "Email" },
  sms: { key: "sms", label: "SMS" },
};

export const CHANNEL_ORDER: ChannelKey[] = [
  "voice",
  "whatsapp",
  "email",
  "sms",
];

export const TICKER = CHANNEL_ORDER.map((key) => ({
  key,
  label: CHANNELS[key].label,
  score: { voice: "98.2%", whatsapp: "99.1%", email: "97.8%", sms: "99.4%" }[
    key
  ],
}));

export const NAV_PRIMARY = [
  { label: "Channels", href: "/#channels" },
  { label: "Document", href: "/docs/getting-started" },
  { label: "Quality", href: "/quality" },
  { label: "Use cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
] as const;

export const NAV_DOCUMENT = [
  {
    label: "Docs",
    href: "/docs/getting-started",
    description: "Guides and getting started",
  },
  {
    label: "API Reference",
    href: "/api-reference",
    description: "Endpoints and schemas",
  },
  {
    label: "Playground",
    href: "/playground",
    description: "Try the API live",
  },
] as const;

export const DEMO = {
  voice: {
    kind: "transcript" as const,
    chip: "Human-reviewed",
    actionLabel: "Call the live agent",
    actionHref: CONTACT.telHref,
    lines: [
      { who: "Caller", text: "Hi, I need to reschedule my delivery for tomorrow." },
      {
        who: "Agent",
        text: "Of course — I can move it to tomorrow between 9 and 11am. Shall I confirm?",
        meta: "0.9s",
      },
      { who: "Caller", text: "Perfect, yes." },
      {
        who: "Agent",
        text: "Done — you'll get a text confirmation shortly.",
        meta: "0.8s",
      },
    ],
  },
  whatsapp: {
    kind: "chat" as const,
    chip: "Quality-checked",
    actionLabel: "Message us on WhatsApp",
    actionHref: CONTACT.whatsappHref,
    lines: [
      { who: "Customer", text: "Is my order shipped yet?" },
      {
        who: "Echophi",
        text: "Yes! It's out for delivery and arrives today by 6pm 📦",
        self: true,
      },
      { who: "Customer", text: "Amazing, thank you!" },
      {
        who: "Echophi",
        text: "Anytime — reply here if you need to change the window.",
        self: true,
      },
    ],
  },
  email: {
    kind: "email" as const,
    chip: "Human-reviewed",
    actionLabel: "Email the agent",
    actionHref: CONTACT.emailHref,
    emailFrom: "Echophi Support <support@echophi.com>",
    emailSubject: "Re: Invoice for last month",
    lines: [
      { who: "You wrote", text: "Can I get an invoice for last month?" },
      {
        who: "Echophi",
        text: "Absolutely — I've attached March's invoice and updated the billing email on your account.",
        self: true,
      },
    ],
  },
  sms: {
    kind: "sms" as const,
    chip: "Quality-checked",
    actionLabel: "Text the agent",
    actionHref: CONTACT.smsHref,
    lines: [
      {
        who: "Echophi",
        text: "REMIND — appointment tomorrow 10am? Reply R to reschedule.",
        self: true,
      },
      { who: "You", text: "Confirmed 👍" },
      {
        who: "Echophi",
        text: "Great, you're set for 10:00 AM. Reply STOP to opt out.",
        self: true,
      },
    ],
  },
};

export const TRUST_INDUSTRIES = [
  "Financial Services",
  "Healthcare",
  "E-commerce",
  "Insurance",
  "Logistics",
  "Telecom",
] as const;

export const SIGNAL_CHIPS_INNER = [
  { label: "COMPLIANCE FLAGGED", tone: "flag" as const },
  { label: "SENTIMENT NEGATIVE", tone: "flag" as const },
  { label: "LATENCY 2.1S", tone: "flag" as const },
  { label: "ESCALATION TRIGGERED", tone: "flag" as const },
] as const;

export const SIGNAL_CHIPS_OUTER = [
  { label: "CALL RESOLVED", tone: "ok" as const },
  { label: "IDENTITY VERIFIED", tone: "ok" as const },
  { label: "HUMAN REVIEWED", tone: "ok" as const },
  { label: "TEMPLATE APPROVED", tone: "ok" as const },
] as const;

export const CHANNEL_OVERVIEW = [
  {
    key: "voice" as const,
    label: "Voice",
    blurb:
      "Natural, low-latency AI voice agents for inbound and outbound calls — every call scored.",
    mediaLabel: "Screenshot: live call transcript",
    iconPath:
      "M6.5 4h3l1.5 4-2 1.5a12 12 0 005.5 5.5l1.5-2 4 1.5v3a2 2 0 01-2 2A16 16 0 014.5 6a2 2 0 012-2z",
  },
  {
    key: "whatsapp" as const,
    label: "WhatsApp",
    blurb:
      "Two-way WhatsApp Business with templates, media and buttons — compliant on every chat.",
    mediaLabel: "Screenshot: WhatsApp thread",
    iconPath:
      "M4 20l1.4-4.2A8 8 0 1112 20a8 8 0 01-4.5-1.4L4 20zM8.5 9.5c0 3 2.5 5.5 5.5 5.5",
  },
  {
    key: "email" as const,
    label: "Email",
    blurb:
      "AI-drafted, human-approved email that clears the queue without losing your brand voice.",
    mediaLabel: "Screenshot: email draft view",
    iconPath:
      "M4 5h16a1 1 0 011 1v12a1 1 0 01-1 1H4a1 1 0 01-1-1V6a1 1 0 011-1zM3.5 6l8.5 7 8.5-7",
  },
  {
    key: "sms" as const,
    label: "SMS",
    blurb:
      "Reliable transactional and two-way SMS — concise, compliant and delivered.",
    mediaLabel: "Screenshot: SMS conversation",
    iconPath:
      "M4 5h16a1 1 0 011 1v10a1 1 0 01-1 1H9l-4 3v-3H4a1 1 0 01-1-1V6a1 1 0 011-1zM7 10h.01M11 10h.01M15 10h.01",
  },
];

export const COMPARISON_ROWS = [
  {
    label: "Channels covered",
    tools: "One channel each",
    diy: "Whatever you build",
    echophi: "Voice, WhatsApp, Email, SMS",
  },
  {
    label: "Human review loop",
    tools: "Rarely included",
    diy: "You staff and build it",
    echophi: "Built in, every channel",
  },
  {
    label: "Compliance (HIPAA/GDPR/SOC 2)",
    tools: "Varies by vendor",
    diy: "Your team's responsibility",
    echophi: "Built in from day one",
  },
  {
    label: "Time to launch",
    tools: "Weeks per channel",
    diy: "Months, ongoing upkeep",
    echophi: "Days, unified rollout",
  },
  {
    label: "Quality improves over time",
    tools: "Manual, per tool",
    diy: "Only if you invest in it",
    echophi: "Continuous feedback loop",
  },
];

export const LIFECYCLE = [
  {
    n: 1,
    numLabel: "01",
    title: "Simulate",
    verified: false,
    desc: "Thousands of realistic scenarios stress-test agents before launch.",
  },
  {
    n: 2,
    numLabel: "02",
    title: "Deploy",
    verified: false,
    desc: "Ship to any channel with guardrails enforced from day one.",
  },
  {
    n: 3,
    numLabel: "03",
    title: "Monitor",
    verified: false,
    desc: "Score every live conversation for accuracy, compliance and tone.",
  },
  {
    n: 4,
    numLabel: "04",
    title: "Human Review",
    verified: true,
    desc: "Reviewers grade flagged conversations, feeding judgment back in.",
  },
  {
    n: 5,
    numLabel: "05",
    title: "Improve",
    verified: true,
    desc: "Insights retrain scoring and prompts — quality compounds.",
  },
];

/** @deprecated import from ./use-cases — re-exported so existing imports keep working */
export { USE_CASES } from "./use-cases";

export const PROOF_STATS = [
  { caption: "Avg. first response", value: "—", suffix: undefined },
  { caption: "Resolution rate", value: "—%", suffix: undefined },
  { caption: "CSAT", value: "—", suffix: undefined },
  {
    caption: "Conversations human-reviewed",
    value: "—%",
    suffix: undefined,
  },
];

export const SECURITY_BADGES = [
  {
    label: "HIPAA",
    iconPath: "M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z",
  },
  {
    label: "GDPR",
    iconPath: "M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4zM9 12l2 2 4-4",
  },
  {
    label: "SOC 2",
    iconPath: "M12 3l7 4v5c0 4.5-3 8-7 9-4-1-7-4.5-7-9V7l7-4z",
  },
  {
    label: "PCI DSS",
    iconPath: "M4 8h16v10H4zM4 11h16M8 14h4",
  },
  {
    label: "STAR",
    iconPath:
      "M12 3l2.5 5.5L20 9l-4 4 1 6-5-3-5 3 1-6-4-4 5.5-.5z",
  },
];

export const SECURITY_CHECKS = [
  {
    title: "Encryption everywhere",
    desc: "TLS in transit. AES-256 at rest. No exceptions.",
    tags: "TLS · AES-256",
  },
  {
    title: "Data residency",
    desc: "Choose US, EU, or APAC. Your data stays where you need it.",
    tags: "US · EU · APAC",
  },
  {
    title: "Audit-ready",
    desc: "Full access logs, RBAC, and compliance reports on demand.",
    tags: "LOGS · RBAC · REPORTS",
  },
];

export const HOME_FAQS = [
  {
    q: "What is a virtual omnichannel platform?",
    a: "A virtual omnichannel platform runs AI-driven conversations across Voice, WhatsApp, Email and SMS from one system, instead of stitching together separate single-channel tools.",
  },
  {
    q: "How is Echophi different from a voice-only AI platform?",
    a: "Voice-only platforms optimize one channel. Echophi runs Voice, WhatsApp, Email and SMS under the same quality layer, so scoring, compliance and human review work the same way everywhere a customer reaches you.",
  },
  {
    q: "Does Echophi replace human agents?",
    a: "No. Echophi automates routine conversation volume and routes flagged or complex conversations to human reviewers, who also grade a sample of every channel to keep the AI accurate.",
  },
  {
    q: "What counts as the quality and human-feedback layer?",
    a: "Every conversation is scored automatically for accuracy, compliance and tone; a sample is reviewed by humans; and that judgment feeds back into prompts and scoring so quality compounds over time.",
  },
  {
    q: "Do developers have API access?",
    a: "Yes. Voice, WhatsApp, Email and SMS are each reachable through documented APIs and webhooks, with the same quality scoring available on every event.",
  },
  {
    q: "Is Echophi compliant with HIPAA, GDPR and SOC 2?",
    a: "Yes. Echophi supports HIPAA, GDPR, SOC 2 and PCI DSS requirements, with encryption in transit and at rest and a choice of US, EU or APAC data residency.",
  },
];

export const CTA_BAND = {
  title: "Ready to put a quality layer on every conversation?",
  sub: "See Echophi run across Voice, WhatsApp, Email and SMS.",
  primaryLabel: "Book a demo",
  secondaryLabel: "Talk to our AI now",
  secondaryHref: CONTACT.telHref,
};

export const FOOTER_PRODUCT = [
  { label: "Voice", href: "/channels/voice" },
  { label: "WhatsApp", href: "/channels/whatsapp" },
  { label: "Email", href: "/channels/email" },
  { label: "SMS", href: "/channels/sms" },
  { label: "Quality layer", href: "/quality" },
  { label: "Use Cases", href: "/use-cases" },
  { label: "Pricing", href: "/pricing" },
];

export const FOOTER_COMPANY = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
];
