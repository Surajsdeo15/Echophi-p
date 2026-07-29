import { LIFECYCLE, type ChannelKey } from "./home";

export const QUALITY_HERO = {
  eyebrow: "The Quality Layer",
  title: "How We Keep Every AI Conversation Accountable",
  sub: "AI agents can sound completely confident and still be wrong. Echophi wraps every conversation in a closed loop of simulation, live monitoring and human review.",
  primaryCta: "See a real quality report",
  secondaryCta: "Book a demo",
} as const;

export const QUALITY_PROBLEM = {
  eyebrow: "The problem",
  title: "Confident and wrong is the default failure mode",
  cards: [
    {
      title: "Missed escalations",
      desc: "The agent pushes ahead on a case it should have handed to a human.",
    },
    {
      title: "Compliance misses",
      desc: "A required disclosure or verification step gets skipped.",
    },
    {
      title: "Tone drift",
      desc: "Responses slide off-brand — too curt or tone-deaf.",
    },
    {
      title: "Hallucinated answers",
      desc: "The agent states something not in your knowledge base.",
    },
    {
      title: "Unresolved issues left open",
      desc: "The conversation ends politely but nothing was solved.",
    },
  ],
} as const;

const LIFECYCLE_DETAILS = [
  "Scenarios are generated from real transcripts and edge cases — adversarial customers, ambiguous requests, multi-turn traps.",
  "Compliance phrases, escalation rules and brand tone are attached as policy at deploy time, not left to the model's discretion.",
  "The scoring model runs on 100% of conversations in real time. Anything under threshold gets flagged automatically.",
  "Trained reviewers see the full transcript and the AI's score. Their grade becomes labeled training data.",
  "Reviewer judgments retrain the scoring model itself, so it gets sharper at catching the same failure next time.",
] as const;

export const QUALITY_LIFECYCLE = {
  eyebrow: "Our lifecycle",
  title: "One closed loop, running on every conversation",
  sub: "Click any step for more detail. Steps 4–5 are where humans teach the system.",
  steps: LIFECYCLE.map((s, i) => ({
    ...s,
    detail: LIFECYCLE_DETAILS[i],
  })),
} as const;

export const QUALITY_CHECKS = {
  eyebrow: "What gets checked",
  title: "The right checks for each channel",
  byChannel: {
    voice: [
      {
        t: "Identity verification",
        d: "Confirms verification steps before any sensitive action.",
      },
      {
        t: "Compliance phrases",
        d: "Verifies disclosures and scripted language were actually spoken.",
      },
      {
        t: "Tone & sentiment",
        d: "Tracks caller mood and agent tone across the whole call.",
      },
      {
        t: "Hallucination checks",
        d: "Flags any claim not grounded in your knowledge base.",
      },
    ],
    whatsapp: [
      {
        t: "Template compliance",
        d: "Approved templates used correctly, within session-window rules.",
      },
      {
        t: "Opt-in / opt-out handling",
        d: "Honors STOP/HELP instantly; only messages consented contacts.",
      },
      {
        t: "Media & link safety",
        d: "Reviews attachments and links before they're sent.",
      },
      {
        t: "Resolution",
        d: "Confirms the conversation resolved the customer's need.",
      },
    ],
    email: [
      {
        t: "Factual accuracy",
        d: "Flags statements not grounded in your knowledge base.",
      },
      {
        t: "Tone-matching",
        d: "Confirms replies match your brand voice and formatting.",
      },
      {
        t: "Thread continuity",
        d: "Keeps replies in the right thread with subjects and quoting intact.",
      },
      {
        t: "Disclosures & PII",
        d: "Checks sensitive data is handled per policy.",
      },
    ],
    sms: [
      {
        t: "Opt-in / opt-out compliance",
        d: "Honors STOP/HELP instantly and only messages consented numbers.",
      },
      {
        t: "Delivery confirmation",
        d: "Tracks delivered vs. failed and retries appropriately.",
      },
      {
        t: "Length & segmentation",
        d: "Stays within SMS limits to avoid costly over-segmentation.",
      },
      {
        t: "Required disclosures",
        d: "Checks sender identity and required terms are included.",
      },
    ],
  } satisfies Record<ChannelKey, readonly { t: string; d: string }[]>,
} as const;

export const QUALITY_HUMAN = {
  eyebrow: "Human-in-the-loop",
  title: "Humans don't just review conversations — they teach the system",
  sub: "Every correction improves every future score — not just the one in front of you. The scoring model retrains on reviewer judgment, so the human share shrinks over time even as coverage stays complete.",
  cards: [
    {
      title: "Human reviewers",
      desc: "Grade flagged conversations",
      featured: false,
    },
    {
      title: "The AI judge",
      desc: "Retrains on their feedback",
      featured: true,
    },
    {
      title: "Every future conversation",
      desc: "Scored more accurately",
      featured: false,
    },
  ],
} as const;

export const QUALITY_DASHBOARD = {
  eyebrow: "The dashboard",
  title: "Quality you can see, today",
  videoCaption: "Video: 2-min walkthrough of the quality dashboard",
  liveLabel: "Live — today",
  stats: [
    { caption: "Conversations reviewed", value: "—" },
    { caption: "Average quality score", value: "—", suffix: "%" },
    { caption: "Escalations caught", value: "—" },
  ],
} as const;

export const QUALITY_FAQS = [
  {
    q: "Is AI customer service safe?",
    a: "It is when it's accountable. Echophi scores every conversation for accuracy, compliance and escalation, routing risky ones to humans.",
  },
  {
    q: "How do you audit AI conversations?",
    a: "Every conversation is scored and stored with its transcript. Flagged conversations are reviewed by humans, and history is searchable.",
  },
  {
    q: "What happens if the AI gets something wrong?",
    a: "Flagged conversations route to a human whose correction becomes training signal for the scoring model.",
  },
  {
    q: "Do humans review every conversation?",
    a: "The AI judge scores 100% automatically; humans focus on flagged and high-risk ones plus a sample.",
  },
  {
    q: "How is conversation quality actually scored?",
    a: "Grounding, compliance, tone, escalation correctness and resolution — plus channel-specific checks.",
  },
  {
    q: "How is this different from CSAT surveys?",
    a: "CSAT samples opinions after the fact. Echophi scores the actual content of every conversation as it happens.",
  },
] as const;

/** Hero scorecard rows — labels from What gets checked (voice). */
export const QUALITY_REPORT_ROWS = [
  { id: "identity", label: "Identity verification", status: "PASS" as const },
  { id: "compliance", label: "Compliance phrases", status: "PASS" as const },
  { id: "tone", label: "Tone & sentiment", status: "FLAGGED" as const },
  { id: "hallucination", label: "Hallucination checks", status: "PASS" as const },
] as const;

export const QUALITY_REPORT = {
  header: "QUALITY REPORT",
  channel: "Voice",
  chip: "Human-reviewed",
} as const;
