import type { ChannelKey } from "./home";
import { CONTACT } from "./home";

/**
 * Channel page copy — sourced from the product prototype CHANNEL_CONTENT /
 * QUALITY_CALLOUT_COPY. Kept separate from home Quality Layer (LIFECYCLE) and
 * QUALITY_CHECKS so shared LAYOUT never overwrites channel-specific TEXT.
 */
export type ChannelPage = {
  key: ChannelKey;
  label: string;
  dotVar: string;
  title: string;
  sub: string;
  aside: string;
  primaryCta: string;
  secondaryCta: string;
  secondaryHref: string;
  howTitle: string;
  howItWorks: { numLabel: string; title: string; desc: string }[];
  checksTitle: string;
  checks: { title: string; desc: string }[];
  useTitle: string;
  useCases: { title: string; desc: string }[];
  callout: {
    badge: string;
    title: string;
    body: string;
    cta: string;
  };
  faqs: { q: string; a: string }[];
  ctaTitle: string;
};

export const CHANNEL_PAGES: Record<ChannelKey, ChannelPage> = {
  voice: {
    key: "voice",
    label: "Voice",
    dotVar: "--ch-voice",
    title: "AI Voice Agents, Quality-Checked on Every Call",
    sub: "Natural, low-latency, multilingual voice agents handle inbound and outbound calls end to end — and our quality layer scores every single call.",
    aside:
      "Runs on our existing production voice stack (ElevenLabs) — natural, low-latency, multilingual output is already built. This is the quality and orchestration layer on top.",
    primaryCta: "Book a demo",
    secondaryCta: "Hear a sample call",
    secondaryHref: CONTACT.telHref,
    howTitle: "From ringing to reviewed, on every call",
    howItWorks: [
      {
        numLabel: "01",
        title: "Call connects",
        desc: "Inbound calls are answered instantly; outbound campaigns dial on schedule.",
      },
      {
        numLabel: "02",
        title: "AI handles the call",
        desc: "The agent follows your scripts and business logic, in real time.",
      },
      {
        numLabel: "03",
        title: "Escalate when needed",
        desc: "Complex moments hand off to a human with full context and transcript.",
      },
      {
        numLabel: "04",
        title: "Every call scored",
        desc: "The quality layer grades accuracy, compliance, sentiment and resolution.",
      },
    ],
    checksTitle: "What we check on every call",
    checks: [
      {
        title: "Identity verification",
        desc: "Confirms verification steps before any sensitive action.",
      },
      {
        title: "Compliance phrases",
        desc: "Verifies disclosures and scripted language were actually spoken.",
      },
      {
        title: "Tone & sentiment",
        desc: "Tracks caller mood and agent tone across the whole call.",
      },
      {
        title: "Hallucination checks",
        desc: "Flags any claim not grounded in your knowledge base.",
      },
    ],
    useTitle: "Where voice agents earn their keep",
    useCases: [
      {
        title: "Support lines",
        desc: "Answer, triage and resolve inbound calls 24/7.",
      },
      {
        title: "Outbound sales calls",
        desc: "Qualify, pitch and book at scale.",
      },
      {
        title: "Screening interviews",
        desc: "Run first-round candidate screens automatically.",
      },
    ],
    callout: {
      badge: "Quality & Human Review",
      title: "Every call is scored — and the tough ones reviewed by a human",
      body: "Accuracy, compliance phrases, tone and resolution are checked on every single call.",
      cta: "See how we score every call",
    },
    faqs: [
      {
        q: "How do you make sure the AI doesn't say something wrong on a call?",
        a: "Answers are grounded in your approved knowledge base, and every call runs through hallucination and compliance-phrase checks. Humans review flagged or high-risk calls.",
      },
      {
        q: "Can the AI transfer to a human agent?",
        a: "Yes — sensitive or complex moments escalate to a human with the full transcript and context.",
      },
      {
        q: "What languages are supported?",
        a: "The voice stack supports natural, low-latency output across many languages.",
      },
      {
        q: "How do you measure call quality?",
        a: "Every call is scored for accuracy, compliance, sentiment and resolution the moment it ends.",
      },
    ],
    ctaTitle: "Hear a Echophi voice agent handle a real call",
  },

  whatsapp: {
    key: "whatsapp",
    label: "WhatsApp",
    dotVar: "--ch-whatsapp",
    title: "AI WhatsApp Agents, Quality-Checked on Every Chat",
    sub: "Two-way WhatsApp Business conversations — templates, click-to-chat and rich media — handled by AI and scored by our quality layer.",
    aside:
      "Built on the WhatsApp Business Platform — approved templates and interactive messages are already supported. This is the quality layer on top.",
    primaryCta: "Book a demo",
    secondaryCta: "See a sample chat",
    secondaryHref: CONTACT.whatsappHref,
    howTitle: "From first tap to reviewed, on every thread",
    howItWorks: [
      {
        numLabel: "01",
        title: "Conversation starts",
        desc: "Customers tap click-to-chat, or you open with an approved template.",
      },
      {
        numLabel: "02",
        title: "AI handles the thread",
        desc: "The agent replies with text, media and buttons, following your flows.",
      },
      {
        numLabel: "03",
        title: "Escalate when needed",
        desc: "Hand off to a human in the same thread with full history.",
      },
      {
        numLabel: "04",
        title: "Every chat scored",
        desc: "The quality layer grades accuracy, tone, compliance and resolution.",
      },
    ],
    checksTitle: "What we check on every chat",
    checks: [
      {
        title: "Template compliance",
        desc: "Approved templates used correctly, within session-window rules.",
      },
      {
        title: "Opt-in / opt-out handling",
        desc: "Honors STOP/HELP instantly; only messages consented contacts.",
      },
      {
        title: "Media & link safety",
        desc: "Reviews attachments and links before they're sent.",
      },
      {
        title: "Resolution",
        desc: "Confirms the conversation resolved the customer's need.",
      },
    ],
    useTitle: "Where WhatsApp agents earn their keep",
    useCases: [
      {
        title: "Customer support",
        desc: "Resolve questions with media and buttons.",
      },
      {
        title: "Sales & re-engagement",
        desc: "Restart conversations with approved templates.",
      },
      {
        title: "Appointment reminders",
        desc: "Confirm or reschedule with a single tap.",
      },
    ],
    callout: {
      badge: "Quality & Human Review",
      title: "Every chat is checked for compliance — and reviewed when it matters",
      body: "Template use, opt-in status and tone are verified on every conversation.",
      cta: "See how we check every chat",
    },
    faqs: [
      {
        q: "How do you make sure the AI sends the right template message?",
        a: "Every outbound message is checked against approved templates and the 24-hour window rules before it sends.",
      },
      {
        q: "Do you respect WhatsApp opt-in rules?",
        a: "Yes — we only message contacts with valid opt-in, verified on every conversation.",
      },
      {
        q: "Can it send images, buttons and documents?",
        a: "Yes — the agent uses WhatsApp's rich and interactive message types.",
      },
      {
        q: "How is chat quality measured?",
        a: "Every conversation is scored for accuracy, tone, template compliance and resolution.",
      },
    ],
    ctaTitle: "See a Echophi WhatsApp agent in action",
  },

  email: {
    key: "email",
    label: "Email",
    dotVar: "--ch-email",
    title: "AI Email Agents, Quality-Checked on Every Reply",
    sub: "Conversational email at scale — the AI drafts, your rules approve, threads stay tidy and on-brand, and every reply is scored.",
    aside:
      "Connects to your existing mailboxes and sending infrastructure — this is the quality and orchestration layer on top.",
    primaryCta: "Book a demo",
    secondaryCta: "See a sample thread",
    secondaryHref: CONTACT.emailHref,
    howTitle: "From inbox to reviewed, on every reply",
    howItWorks: [
      {
        numLabel: "01",
        title: "Email arrives",
        desc: "Inbound email is routed by intent; outbound sequences send on schedule.",
      },
      {
        numLabel: "02",
        title: "AI drafts the reply",
        desc: "Matches your brand tone and pulls from your knowledge base.",
      },
      {
        numLabel: "03",
        title: "Approve & send",
        desc: "Auto-send trusted replies, or route to a human for approval.",
      },
      {
        numLabel: "04",
        title: "Every reply scored",
        desc: "The quality layer grades accuracy, tone-match and threading.",
      },
    ],
    checksTitle: "What we check on every reply",
    checks: [
      {
        title: "Factual accuracy",
        desc: "Flags statements not grounded in your knowledge base.",
      },
      {
        title: "Tone-matching",
        desc: "Confirms replies match your brand voice and formatting.",
      },
      {
        title: "Thread continuity",
        desc: "Keeps replies in the right thread with subjects and quoting intact.",
      },
      {
        title: "Disclosures & PII",
        desc: "Checks sensitive data is handled per policy.",
      },
    ],
    useTitle: "Where email agents earn their keep",
    useCases: [
      {
        title: "Support inboxes",
        desc: "Clear shared inboxes fast with accurate replies.",
      },
      {
        title: "Sales follow-up",
        desc: "Keep sequences personal without manual drafting.",
      },
      {
        title: "Billing & collections",
        desc: "Send invoices and reminders with the right tone.",
      },
    ],
    callout: {
      badge: "Quality & Human Review",
      title: "Every draft is reviewed before it's trusted to send",
      body: "Factual accuracy, brand tone and threading are checked on every reply.",
      cta: "See how we review every draft before it's trusted",
    },
    faqs: [
      {
        q: "How do you make sure the AI doesn't send a wrong or off-brand email?",
        a: "Every draft is checked for factual grounding and brand-tone match, with optional human approval before sending.",
      },
      {
        q: "Does it keep replies in the right thread?",
        a: "Yes — threading correctness is checked on every reply.",
      },
      {
        q: "Can a human approve before sending?",
        a: "Yes — you choose which replies auto-send and which route for approval.",
      },
      {
        q: "How is email quality measured?",
        a: "Every reply is scored for accuracy, tone-match, threading and resolution.",
      },
    ],
    ctaTitle: "See a Echophi email agent draft and send",
  },

  sms: {
    key: "sms",
    label: "SMS",
    dotVar: "--ch-sms",
    title: "AI SMS Agents, Quality-Checked on Every Message",
    sub: "Two-way and transactional SMS that reaches anyone — concise, compliant, delivered, and scored by our quality layer.",
    aside:
      "Runs on your existing SMS carrier and numbers — sending and STOP/HELP handling are already supported. This is the quality layer on top.",
    primaryCta: "Book a demo",
    secondaryCta: "See a sample thread",
    secondaryHref: CONTACT.smsHref,
    howTitle: "From send to reviewed, on every message",
    howItWorks: [
      {
        numLabel: "01",
        title: "Message goes out / in",
        desc: "Trigger transactional alerts or run two-way campaigns.",
      },
      {
        numLabel: "02",
        title: "AI handles the reply",
        desc: "Concise, on-brand messages with STOP/HELP handled automatically.",
      },
      {
        numLabel: "03",
        title: "Escalate when needed",
        desc: "Hand off to a human for anything complex or sensitive.",
      },
      {
        numLabel: "04",
        title: "Every message scored",
        desc: "The quality layer checks compliance, delivery and tone.",
      },
    ],
    checksTitle: "What we check on every message",
    checks: [
      {
        title: "Opt-in / opt-out compliance",
        desc: "Honors STOP/HELP instantly and only messages consented numbers.",
      },
      {
        title: "Delivery confirmation",
        desc: "Tracks delivered vs. failed and retries appropriately.",
      },
      {
        title: "Length & segmentation",
        desc: "Stays within SMS limits to avoid costly over-segmentation.",
      },
      {
        title: "Required disclosures",
        desc: "Checks sender identity and required terms are included.",
      },
    ],
    useTitle: "Where SMS agents earn their keep",
    useCases: [
      {
        title: "Reminders & alerts",
        desc: "Cut no-shows with timely two-way texts.",
      },
      {
        title: "Customer support",
        desc: "Handle quick questions over text.",
      },
      {
        title: "Lead qualification",
        desc: "Qualify inbound leads by text fast.",
      },
    ],
    callout: {
      badge: "Quality & Human Review",
      title: "Every message is audited for compliance and delivery",
      body: "Opt-out handling, delivery and length are checked on every text.",
      cta: "See how we audit every message",
    },
    faqs: [
      {
        q: "How do you handle opt-out (STOP) requests?",
        a: "STOP and HELP are handled instantly, and opted-out numbers are suppressed on every send.",
      },
      {
        q: "How do you make sure messages actually get delivered?",
        a: "We track delivery receipts for every message and retry or fall back on failure.",
      },
      {
        q: "Do you stay within SMS character limits?",
        a: "Yes — message length and segmentation are checked on every send.",
      },
      {
        q: "How is SMS quality measured?",
        a: "Every message is scored for compliance, delivery, tone and resolution.",
      },
    ],
    ctaTitle: "See a Echophi SMS agent in action",
  },
};
