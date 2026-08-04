export const APP_ORIGIN = "https://echophi.variphi.com";
export const DEFAULT_GATEWAY = "https://echophi.variphi.com";
export const GOVERN_PARTNER_URL = `${APP_ORIGIN}/govern/partner-api`;
export const API_PREFIX = "/api/external/v1";
export const API_KEY_ENV = "ECHOPHI_API_KEY";

export type DocsNavItem = { href: string; label: string };
export type DocsNavSection = { title: string; items: DocsNavItem[] };

export const DOCS_NAV: DocsNavSection[] = [
  {
    title: "Start",
    items: [
      { href: "/docs/getting-started", label: "Getting Started" },
      { href: "/docs/quickstart", label: "Quickstart" },
      { href: "/docs/authentication", label: "Authentication" },
    ],
  },
  {
    title: "Core concepts",
    items: [
      { href: "/docs/conversations", label: "Conversations" },
      { href: "/docs/rest-webhooks", label: "REST + Webhooks" },
      { href: "/docs/event-lifecycle", label: "Event lifecycle" },
      { href: "/docs/api-versioning", label: "API versioning" },
      { href: "/docs/rate-limits", label: "Rate limits" },
    ],
  },
  {
    title: "Webhook guides",
    items: [
      { href: "/docs/receive-webhooks", label: "Receive Webhooks" },
      { href: "/docs/verify-hmac", label: "Verify HMAC" },
      { href: "/docs/testing-webhook-site", label: "Test with webhook.site" },
      { href: "/docs/testing-ngrok", label: "ngrok" },
      { href: "/docs/testing-hookdeck", label: "Hookdeck" },
      { href: "/docs/retry-policy", label: "Retry policy" },
    ],
  },
  {
    title: "Help",
    items: [
      { href: "/docs/common-errors", label: "Common errors" },
      { href: "/docs/status-codes", label: "Status codes" },
    ],
  },
];
