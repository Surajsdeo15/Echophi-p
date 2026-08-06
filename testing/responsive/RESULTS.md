# Echophi Responsive Testing Results

Generated: 2026-08-05T09:55:55.204Z
Base URL: http://localhost:5174

## Executive Summary

| Metric | Result | Target |
|--------|--------|--------|
| Pages tested | 30 | 30 |
| Total checks | 144 | — |
| Passed | 0 | — |
| Failed | 144 | 0 P0/P1 before release |
| P0 issues | 2 | 0 |
| P1 issues | 1 | 0 |
| P2 issues | 284 | — |
| Horizontal scroll (G1) failures | 4 | 0 |

## Interactive Tests

| Test | Pass | Notes |
|------|------|-------|
| N1 | PASS | Drawer opens |
| N2 | PASS | Document links and Get API key in drawer |
| N1_focusTrap | PASS | Focus in drawer |
| N1_escape | PASS | Escape closes drawer |
| N4 | PASS | V10 drawer / V11 desktop — burger:true links:false |
| N4 | PASS | V10 drawer / V11 desktop — burger:false links:true |
| D1 | PASS | Docs sidebar opens |
| D1_close | PASS | Docs sidebar closes on second click |
| D5 | PASS | Desktop sidebar visible, toggle hidden |
| H3 | PASS | 4 channel tabs at 320px |
| H4 | PASS | Tab panel fits viewport after switch |
| H2 | PASS | Hero two-column at 1024px |
| P3 | PASS | Playground header fits at 320px |
| P1 | PASS | Playground single column at 320px |
| P2 | PASS | Playground two-column at 768px |
| P4 | PASS | Conversation enhancer fits viewport |
| FAQ | FAIL | FAQ failed to open |
| C1_form | PASS | Form fields full width at 320px |
| C1_aria | PASS | Contact form has aria-label |

## Smoke Matrix (/, playground, docs/getting-started × V1, V9, V11)

| Page | V1 L | V1 D | V9 L | V9 D | V11 L | V11 D |
|------|------|------|------|------|-------|-------|
| / | FAIL | FAIL | FAIL | FAIL | FAIL | FAIL |
| /playground | FAIL | FAIL | FAIL | FAIL | FAIL | FAIL |
| /docs/getting-started | FAIL | FAIL | FAIL | FAIL | FAIL | FAIL |

## Full Sweep (all pages × V2, V11)

| Page | V2 L | V2 D | V11 L | V11 D |
|------|------|------|-------|-------|
| / | FAIL | FAIL | FAIL | FAIL |
| /about | FAIL | FAIL | FAIL | FAIL |
| /pricing | FAIL | FAIL | FAIL | FAIL |
| /quality | FAIL | FAIL | FAIL | FAIL |
| /use-cases | FAIL | FAIL | FAIL | FAIL |
| /contact | FAIL | FAIL | FAIL | FAIL |
| /channels/voice | FAIL | FAIL | FAIL | FAIL |
| /channels/whatsapp | FAIL | FAIL | FAIL | FAIL |
| /channels/email | FAIL | FAIL | FAIL | FAIL |
| /channels/sms | FAIL | FAIL | FAIL | FAIL |
| /docs/getting-started | FAIL | FAIL | FAIL | FAIL |
| /docs/quickstart | FAIL | FAIL | FAIL | FAIL |
| /docs/authentication | FAIL | FAIL | FAIL | FAIL |
| /docs/conversations | FAIL | FAIL | FAIL | FAIL |
| /docs/integration | FAIL | FAIL | FAIL | FAIL |
| /docs/event-lifecycle | FAIL | FAIL | FAIL | FAIL |
| /docs/rest-webhooks | FAIL | FAIL | FAIL | FAIL |
| /docs/receive-webhooks | FAIL | FAIL | FAIL | FAIL |
| /docs/verify-hmac | FAIL | FAIL | FAIL | FAIL |
| /docs/rate-limits | FAIL | FAIL | FAIL | FAIL |
| /docs/retry-policy | FAIL | FAIL | FAIL | FAIL |
| /docs/api-versioning | FAIL | FAIL | FAIL | FAIL |
| /docs/common-errors | FAIL | FAIL | FAIL | FAIL |
| /docs/status-codes | FAIL | FAIL | FAIL | FAIL |
| /docs/testing-hookdeck | FAIL | FAIL | FAIL | FAIL |
| /docs/testing-ngrok | FAIL | FAIL | FAIL | FAIL |
| /docs/testing-webhook-site | FAIL | FAIL | FAIL | FAIL |
| /docs/index | FAIL | FAIL | FAIL | FAIL |
| /api-reference | FAIL | FAIL | FAIL | FAIL |
| /playground | FAIL | FAIL | FAIL | FAIL |

## Findings Log

| ID | Page | Viewport | Theme | Severity | Test | Expected | Actual | Screenshot |
|----|------|----------|-------|----------|------|----------|--------|------------|
| RESP-001 | / | V1 (320px) | light | P2 | G1-G7 | G2_gutter | Check failed | home__V1__light.png |
| RESP-002 | / | V1 (320px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | home__V1__light.png |
| RESP-003 | / | V1 (320px) | dark | P2 | G1-G7 | G2_gutter | Check failed | home__V1__dark.png |
| RESP-004 | / | V1 (320px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | home__V1__dark.png |
| RESP-005 | / | V9 (768px) | light | P2 | G1-G7 | G2_gutter | Check failed | home__V9__light.png |
| RESP-006 | / | V9 (768px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | home__V9__light.png |
| RESP-007 | / | V9 (768px) | dark | P2 | G1-G7 | G2_gutter | Check failed | home__V9__dark.png |
| RESP-008 | / | V9 (768px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | home__V9__dark.png |
| RESP-009 | / | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | home__V11__light.png |
| RESP-010 | / | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | home__V11__light.png |
| RESP-011 | / | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | home__V11__dark.png |
| RESP-012 | / | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | home__V11__dark.png |
| RESP-013 | /playground | V1 (320px) | light | P2 | G1-G7 | G2_gutter | Check failed | playground__V1__light.png |
| RESP-014 | /playground | V1 (320px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V1__light.png |
| RESP-015 | /playground | V1 (320px) | dark | P2 | G1-G7 | G2_gutter | Check failed | playground__V1__dark.png |
| RESP-016 | /playground | V1 (320px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V1__dark.png |
| RESP-017 | /playground | V9 (768px) | light | P2 | G1-G7 | G2_gutter | Check failed | playground__V9__light.png |
| RESP-018 | /playground | V9 (768px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V9__light.png |
| RESP-019 | /playground | V9 (768px) | dark | P2 | G1-G7 | G2_gutter | Check failed | playground__V9__dark.png |
| RESP-020 | /playground | V9 (768px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V9__dark.png |
| RESP-021 | /playground | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | playground__V11__light.png |
| RESP-022 | /playground | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V11__light.png |
| RESP-023 | /playground | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | playground__V11__dark.png |
| RESP-024 | /playground | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V11__dark.png |
| RESP-025 | /docs/getting-started | V1 (320px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V1__light.png |
| RESP-026 | /docs/getting-started | V1 (320px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V1__light.png |
| RESP-027 | /docs/getting-started | V1 (320px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V1__dark.png |
| RESP-028 | /docs/getting-started | V1 (320px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V1__dark.png |
| RESP-029 | /docs/getting-started | V9 (768px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V9__light.png |
| RESP-030 | /docs/getting-started | V9 (768px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V9__light.png |
| RESP-031 | /docs/getting-started | V9 (768px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V9__dark.png |
| RESP-032 | /docs/getting-started | V9 (768px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V9__dark.png |
| RESP-033 | /docs/getting-started | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V11__light.png |
| RESP-034 | /docs/getting-started | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V11__light.png |
| RESP-035 | /docs/getting-started | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V11__dark.png |
| RESP-036 | /docs/getting-started | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V11__dark.png |
| RESP-037 | / | V6 (639px) | light | P2 | G1-G7 | G2_gutter | Check failed | home__V6__light.png |
| RESP-038 | / | V6 (639px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | home__V6__light.png |
| RESP-039 | / | V7 (640px) | light | P2 | G1-G7 | G2_gutter | Check failed | home__V7__light.png |
| RESP-040 | / | V7 (640px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | home__V7__light.png |
| RESP-041 | / | V8 (767px) | light | P2 | G1-G7 | G2_gutter | Check failed | home__V8__light.png |
| RESP-042 | / | V8 (767px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | home__V8__light.png |
| RESP-043 | / | V10 (1023px) | light | P2 | G1-G7 | G2_gutter | Check failed | home__V10__light.png |
| RESP-044 | / | V10 (1023px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | home__V10__light.png |
| RESP-045 | /playground | V6 (639px) | light | P2 | G1-G7 | G2_gutter | Check failed | playground__V6__light.png |
| RESP-046 | /playground | V6 (639px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V6__light.png |
| RESP-047 | /playground | V7 (640px) | light | P2 | G1-G7 | G2_gutter | Check failed | playground__V7__light.png |
| RESP-048 | /playground | V7 (640px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V7__light.png |
| RESP-049 | /playground | V8 (767px) | light | P2 | G1-G7 | G2_gutter | Check failed | playground__V8__light.png |
| RESP-050 | /playground | V8 (767px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V8__light.png |
| RESP-051 | /playground | V10 (1023px) | light | P2 | G1-G7 | G2_gutter | Check failed | playground__V10__light.png |
| RESP-052 | /playground | V10 (1023px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V10__light.png |
| RESP-053 | /docs/getting-started | V6 (639px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V6__light.png |
| RESP-054 | /docs/getting-started | V6 (639px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V6__light.png |
| RESP-055 | /docs/getting-started | V7 (640px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V7__light.png |
| RESP-056 | /docs/getting-started | V7 (640px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V7__light.png |
| RESP-057 | /docs/getting-started | V8 (767px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V8__light.png |
| RESP-058 | /docs/getting-started | V8 (767px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V8__light.png |
| RESP-059 | /docs/getting-started | V10 (1023px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V10__light.png |
| RESP-060 | /docs/getting-started | V10 (1023px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V10__light.png |
| RESP-061 | / | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | home__V2__light.png |
| RESP-062 | / | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | home__V2__light.png |
| RESP-063 | / | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | home__V2__dark.png |
| RESP-064 | / | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | home__V2__dark.png |
| RESP-065 | /about | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | about__V2__light.png |
| RESP-066 | /about | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | about__V2__light.png |
| RESP-067 | /about | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | about__V2__dark.png |
| RESP-068 | /about | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | about__V2__dark.png |
| RESP-069 | /about | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | about__V11__light.png |
| RESP-070 | /about | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | about__V11__light.png |
| RESP-071 | /about | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | about__V11__dark.png |
| RESP-072 | /about | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | about__V11__dark.png |
| RESP-073 | /pricing | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | pricing__V2__light.png |
| RESP-074 | /pricing | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | pricing__V2__light.png |
| RESP-075 | /pricing | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | pricing__V2__dark.png |
| RESP-076 | /pricing | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | pricing__V2__dark.png |
| RESP-077 | /pricing | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | pricing__V11__light.png |
| RESP-078 | /pricing | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | pricing__V11__light.png |
| RESP-079 | /pricing | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | pricing__V11__dark.png |
| RESP-080 | /pricing | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | pricing__V11__dark.png |
| RESP-081 | /quality | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | quality__V2__light.png |
| RESP-082 | /quality | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | quality__V2__light.png |
| RESP-083 | /quality | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | quality__V2__dark.png |
| RESP-084 | /quality | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | quality__V2__dark.png |
| RESP-085 | /quality | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | quality__V11__light.png |
| RESP-086 | /quality | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | quality__V11__light.png |
| RESP-087 | /quality | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | quality__V11__dark.png |
| RESP-088 | /quality | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | quality__V11__dark.png |
| RESP-089 | /use-cases | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | use-cases__V2__light.png |
| RESP-090 | /use-cases | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | use-cases__V2__light.png |
| RESP-091 | /use-cases | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | use-cases__V2__dark.png |
| RESP-092 | /use-cases | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | use-cases__V2__dark.png |
| RESP-093 | /use-cases | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | use-cases__V11__light.png |
| RESP-094 | /use-cases | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | use-cases__V11__light.png |
| RESP-095 | /use-cases | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | use-cases__V11__dark.png |
| RESP-096 | /use-cases | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | use-cases__V11__dark.png |
| RESP-097 | /contact | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | contact__V2__light.png |
| RESP-098 | /contact | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | contact__V2__light.png |
| RESP-099 | /contact | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | contact__V2__dark.png |
| RESP-100 | /contact | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | contact__V2__dark.png |
| RESP-101 | /contact | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | contact__V11__light.png |
| RESP-102 | /contact | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | contact__V11__light.png |
| RESP-103 | /contact | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | contact__V11__dark.png |
| RESP-104 | /contact | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | contact__V11__dark.png |
| RESP-105 | /channels/voice | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | channels_voice__V2__light.png |
| RESP-106 | /channels/voice | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | channels_voice__V2__light.png |
| RESP-107 | /channels/voice | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | channels_voice__V2__dark.png |
| RESP-108 | /channels/voice | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | channels_voice__V2__dark.png |
| RESP-109 | /channels/voice | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | channels_voice__V11__light.png |
| RESP-110 | /channels/voice | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | channels_voice__V11__light.png |
| RESP-111 | /channels/voice | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | channels_voice__V11__dark.png |
| RESP-112 | /channels/voice | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | channels_voice__V11__dark.png |
| RESP-113 | /channels/whatsapp | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | channels_whatsapp__V2__light.png |
| RESP-114 | /channels/whatsapp | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | channels_whatsapp__V2__light.png |
| RESP-115 | /channels/whatsapp | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | channels_whatsapp__V2__dark.png |
| RESP-116 | /channels/whatsapp | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | channels_whatsapp__V2__dark.png |
| RESP-117 | /channels/whatsapp | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | channels_whatsapp__V11__light.png |
| RESP-118 | /channels/whatsapp | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | channels_whatsapp__V11__light.png |
| RESP-119 | /channels/whatsapp | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | channels_whatsapp__V11__dark.png |
| RESP-120 | /channels/whatsapp | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | channels_whatsapp__V11__dark.png |
| RESP-121 | /channels/email | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | channels_email__V2__light.png |
| RESP-122 | /channels/email | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | channels_email__V2__light.png |
| RESP-123 | /channels/email | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | channels_email__V2__dark.png |
| RESP-124 | /channels/email | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | channels_email__V2__dark.png |
| RESP-125 | /channels/email | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | channels_email__V11__light.png |
| RESP-126 | /channels/email | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | channels_email__V11__light.png |
| RESP-127 | /channels/email | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | channels_email__V11__dark.png |
| RESP-128 | /channels/email | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | channels_email__V11__dark.png |
| RESP-129 | /channels/sms | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | channels_sms__V2__light.png |
| RESP-130 | /channels/sms | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | channels_sms__V2__light.png |
| RESP-131 | /channels/sms | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | channels_sms__V2__dark.png |
| RESP-132 | /channels/sms | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | channels_sms__V2__dark.png |
| RESP-133 | /channels/sms | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | channels_sms__V11__light.png |
| RESP-134 | /channels/sms | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | channels_sms__V11__light.png |
| RESP-135 | /channels/sms | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | channels_sms__V11__dark.png |
| RESP-136 | /channels/sms | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | channels_sms__V11__dark.png |
| RESP-137 | /docs/getting-started | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V2__light.png |
| RESP-138 | /docs/getting-started | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V2__light.png |
| RESP-139 | /docs/getting-started | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_getting-started__V2__dark.png |
| RESP-140 | /docs/getting-started | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_getting-started__V2__dark.png |
| RESP-141 | /docs/quickstart | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_quickstart__V2__light.png |
| RESP-142 | /docs/quickstart | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_quickstart__V2__light.png |
| RESP-143 | /docs/quickstart | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_quickstart__V2__dark.png |
| RESP-144 | /docs/quickstart | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_quickstart__V2__dark.png |
| RESP-145 | /docs/quickstart | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_quickstart__V11__light.png |
| RESP-146 | /docs/quickstart | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_quickstart__V11__light.png |
| RESP-147 | /docs/quickstart | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_quickstart__V11__dark.png |
| RESP-148 | /docs/quickstart | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_quickstart__V11__dark.png |
| RESP-149 | /docs/authentication | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_authentication__V2__light.png |
| RESP-150 | /docs/authentication | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_authentication__V2__light.png |
| RESP-151 | /docs/authentication | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_authentication__V2__dark.png |
| RESP-152 | /docs/authentication | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_authentication__V2__dark.png |
| RESP-153 | /docs/authentication | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_authentication__V11__light.png |
| RESP-154 | /docs/authentication | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_authentication__V11__light.png |
| RESP-155 | /docs/authentication | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_authentication__V11__dark.png |
| RESP-156 | /docs/authentication | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_authentication__V11__dark.png |
| RESP-157 | /docs/conversations | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_conversations__V2__light.png |
| RESP-158 | /docs/conversations | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_conversations__V2__light.png |
| RESP-159 | /docs/conversations | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_conversations__V2__dark.png |
| RESP-160 | /docs/conversations | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_conversations__V2__dark.png |
| RESP-161 | /docs/conversations | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_conversations__V11__light.png |
| RESP-162 | /docs/conversations | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_conversations__V11__light.png |
| RESP-163 | /docs/conversations | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_conversations__V11__dark.png |
| RESP-164 | /docs/conversations | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_conversations__V11__dark.png |
| RESP-165 | /docs/integration | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_integration__V2__light.png |
| RESP-166 | /docs/integration | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_integration__V2__light.png |
| RESP-167 | /docs/integration | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_integration__V2__dark.png |
| RESP-168 | /docs/integration | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_integration__V2__dark.png |
| RESP-169 | /docs/integration | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_integration__V11__light.png |
| RESP-170 | /docs/integration | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_integration__V11__light.png |
| RESP-171 | /docs/integration | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_integration__V11__dark.png |
| RESP-172 | /docs/integration | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_integration__V11__dark.png |
| RESP-173 | /docs/event-lifecycle | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_event-lifecycle__V2__light.png |
| RESP-174 | /docs/event-lifecycle | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_event-lifecycle__V2__light.png |
| RESP-175 | /docs/event-lifecycle | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_event-lifecycle__V2__dark.png |
| RESP-176 | /docs/event-lifecycle | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_event-lifecycle__V2__dark.png |
| RESP-177 | /docs/event-lifecycle | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_event-lifecycle__V11__light.png |
| RESP-178 | /docs/event-lifecycle | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_event-lifecycle__V11__light.png |
| RESP-179 | /docs/event-lifecycle | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_event-lifecycle__V11__dark.png |
| RESP-180 | /docs/event-lifecycle | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_event-lifecycle__V11__dark.png |
| RESP-181 | /docs/rest-webhooks | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_rest-webhooks__V2__light.png |
| RESP-182 | /docs/rest-webhooks | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_rest-webhooks__V2__light.png |
| RESP-183 | /docs/rest-webhooks | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_rest-webhooks__V2__dark.png |
| RESP-184 | /docs/rest-webhooks | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_rest-webhooks__V2__dark.png |
| RESP-185 | /docs/rest-webhooks | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_rest-webhooks__V11__light.png |
| RESP-186 | /docs/rest-webhooks | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_rest-webhooks__V11__light.png |
| RESP-187 | /docs/rest-webhooks | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_rest-webhooks__V11__dark.png |
| RESP-188 | /docs/rest-webhooks | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_rest-webhooks__V11__dark.png |
| RESP-189 | /docs/receive-webhooks | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Unclipped overflow: [{"sel":"li","left":36,"right":418},{"se | docs_receive-webhooks__V2__light.png |
| RESP-190 | /docs/receive-webhooks | V2 (375px) | light | P0 | G1-G7 | G6_noUnclippedOverflow | Unclipped overflow: [{"sel":"li","left":36,"right":418},{"se | docs_receive-webhooks__V2__light.png |
| RESP-191 | /docs/receive-webhooks | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Unclipped overflow: [{"sel":"li","left":36,"right":418},{"se | docs_receive-webhooks__V2__light.png |
| RESP-192 | /docs/receive-webhooks | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Unclipped overflow: [{"sel":"li","left":36,"right":418},{"se | docs_receive-webhooks__V2__dark.png |
| RESP-193 | /docs/receive-webhooks | V2 (375px) | dark | P0 | G1-G7 | G6_noUnclippedOverflow | Unclipped overflow: [{"sel":"li","left":36,"right":418},{"se | docs_receive-webhooks__V2__dark.png |
| RESP-194 | /docs/receive-webhooks | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Unclipped overflow: [{"sel":"li","left":36,"right":418},{"se | docs_receive-webhooks__V2__dark.png |
| RESP-195 | /docs/receive-webhooks | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_receive-webhooks__V11__light.png |
| RESP-196 | /docs/receive-webhooks | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_receive-webhooks__V11__light.png |
| RESP-197 | /docs/receive-webhooks | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_receive-webhooks__V11__dark.png |
| RESP-198 | /docs/receive-webhooks | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_receive-webhooks__V11__dark.png |
| RESP-199 | /docs/verify-hmac | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_verify-hmac__V2__light.png |
| RESP-200 | /docs/verify-hmac | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_verify-hmac__V2__light.png |
| RESP-201 | /docs/verify-hmac | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_verify-hmac__V2__dark.png |
| RESP-202 | /docs/verify-hmac | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_verify-hmac__V2__dark.png |
| RESP-203 | /docs/verify-hmac | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_verify-hmac__V11__light.png |
| RESP-204 | /docs/verify-hmac | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_verify-hmac__V11__light.png |
| RESP-205 | /docs/verify-hmac | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_verify-hmac__V11__dark.png |
| RESP-206 | /docs/verify-hmac | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_verify-hmac__V11__dark.png |
| RESP-207 | /docs/rate-limits | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_rate-limits__V2__light.png |
| RESP-208 | /docs/rate-limits | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_rate-limits__V2__light.png |
| RESP-209 | /docs/rate-limits | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_rate-limits__V2__dark.png |
| RESP-210 | /docs/rate-limits | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_rate-limits__V2__dark.png |
| RESP-211 | /docs/rate-limits | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_rate-limits__V11__light.png |
| RESP-212 | /docs/rate-limits | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_rate-limits__V11__light.png |
| RESP-213 | /docs/rate-limits | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_rate-limits__V11__dark.png |
| RESP-214 | /docs/rate-limits | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_rate-limits__V11__dark.png |
| RESP-215 | /docs/retry-policy | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_retry-policy__V2__light.png |
| RESP-216 | /docs/retry-policy | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_retry-policy__V2__light.png |
| RESP-217 | /docs/retry-policy | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_retry-policy__V2__dark.png |
| RESP-218 | /docs/retry-policy | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_retry-policy__V2__dark.png |
| RESP-219 | /docs/retry-policy | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_retry-policy__V11__light.png |
| RESP-220 | /docs/retry-policy | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_retry-policy__V11__light.png |
| RESP-221 | /docs/retry-policy | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_retry-policy__V11__dark.png |
| RESP-222 | /docs/retry-policy | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_retry-policy__V11__dark.png |
| RESP-223 | /docs/api-versioning | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_api-versioning__V2__light.png |
| RESP-224 | /docs/api-versioning | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_api-versioning__V2__light.png |
| RESP-225 | /docs/api-versioning | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_api-versioning__V2__dark.png |
| RESP-226 | /docs/api-versioning | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_api-versioning__V2__dark.png |
| RESP-227 | /docs/api-versioning | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_api-versioning__V11__light.png |
| RESP-228 | /docs/api-versioning | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_api-versioning__V11__light.png |
| RESP-229 | /docs/api-versioning | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_api-versioning__V11__dark.png |
| RESP-230 | /docs/api-versioning | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_api-versioning__V11__dark.png |
| RESP-231 | /docs/common-errors | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_common-errors__V2__light.png |
| RESP-232 | /docs/common-errors | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_common-errors__V2__light.png |
| RESP-233 | /docs/common-errors | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_common-errors__V2__dark.png |
| RESP-234 | /docs/common-errors | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_common-errors__V2__dark.png |
| RESP-235 | /docs/common-errors | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_common-errors__V11__light.png |
| RESP-236 | /docs/common-errors | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_common-errors__V11__light.png |
| RESP-237 | /docs/common-errors | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_common-errors__V11__dark.png |
| RESP-238 | /docs/common-errors | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_common-errors__V11__dark.png |
| RESP-239 | /docs/status-codes | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_status-codes__V2__light.png |
| RESP-240 | /docs/status-codes | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_status-codes__V2__light.png |
| RESP-241 | /docs/status-codes | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_status-codes__V2__dark.png |
| RESP-242 | /docs/status-codes | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_status-codes__V2__dark.png |
| RESP-243 | /docs/status-codes | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_status-codes__V11__light.png |
| RESP-244 | /docs/status-codes | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_status-codes__V11__light.png |
| RESP-245 | /docs/status-codes | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_status-codes__V11__dark.png |
| RESP-246 | /docs/status-codes | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_status-codes__V11__dark.png |
| RESP-247 | /docs/testing-hookdeck | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-hookdeck__V2__light.png |
| RESP-248 | /docs/testing-hookdeck | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-hookdeck__V2__light.png |
| RESP-249 | /docs/testing-hookdeck | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-hookdeck__V2__dark.png |
| RESP-250 | /docs/testing-hookdeck | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-hookdeck__V2__dark.png |
| RESP-251 | /docs/testing-hookdeck | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-hookdeck__V11__light.png |
| RESP-252 | /docs/testing-hookdeck | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-hookdeck__V11__light.png |
| RESP-253 | /docs/testing-hookdeck | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-hookdeck__V11__dark.png |
| RESP-254 | /docs/testing-hookdeck | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-hookdeck__V11__dark.png |
| RESP-255 | /docs/testing-ngrok | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-ngrok__V2__light.png |
| RESP-256 | /docs/testing-ngrok | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-ngrok__V2__light.png |
| RESP-257 | /docs/testing-ngrok | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-ngrok__V2__dark.png |
| RESP-258 | /docs/testing-ngrok | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-ngrok__V2__dark.png |
| RESP-259 | /docs/testing-ngrok | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-ngrok__V11__light.png |
| RESP-260 | /docs/testing-ngrok | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-ngrok__V11__light.png |
| RESP-261 | /docs/testing-ngrok | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-ngrok__V11__dark.png |
| RESP-262 | /docs/testing-ngrok | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-ngrok__V11__dark.png |
| RESP-263 | /docs/testing-webhook-site | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-webhook-site__V2__light.png |
| RESP-264 | /docs/testing-webhook-site | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-webhook-site__V2__light.png |
| RESP-265 | /docs/testing-webhook-site | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-webhook-site__V2__dark.png |
| RESP-266 | /docs/testing-webhook-site | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-webhook-site__V2__dark.png |
| RESP-267 | /docs/testing-webhook-site | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-webhook-site__V11__light.png |
| RESP-268 | /docs/testing-webhook-site | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-webhook-site__V11__light.png |
| RESP-269 | /docs/testing-webhook-site | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | docs_testing-webhook-site__V11__dark.png |
| RESP-270 | /docs/testing-webhook-site | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | docs_testing-webhook-site__V11__dark.png |
| RESP-271 | /docs/index | V2 (undefinedpx) | light | P2 | G1-G7 | http | Check failed | — |
| RESP-272 | /docs/index | V2 (undefinedpx) | dark | P2 | G1-G7 | http | Check failed | — |
| RESP-273 | /docs/index | V11 (undefinedpx) | light | P2 | G1-G7 | http | Check failed | — |
| RESP-274 | /docs/index | V11 (undefinedpx) | dark | P2 | G1-G7 | http | Check failed | — |
| RESP-275 | /api-reference | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | api-reference__V2__light.png |
| RESP-276 | /api-reference | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | api-reference__V2__light.png |
| RESP-277 | /api-reference | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | api-reference__V2__dark.png |
| RESP-278 | /api-reference | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | api-reference__V2__dark.png |
| RESP-279 | /api-reference | V11 (1024px) | light | P2 | G1-G7 | G2_gutter | Check failed | api-reference__V11__light.png |
| RESP-280 | /api-reference | V11 (1024px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | api-reference__V11__light.png |
| RESP-281 | /api-reference | V11 (1024px) | dark | P2 | G1-G7 | G2_gutter | Check failed | api-reference__V11__dark.png |
| RESP-282 | /api-reference | V11 (1024px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | api-reference__V11__dark.png |
| RESP-283 | /playground | V2 (375px) | light | P2 | G1-G7 | G2_gutter | Check failed | playground__V2__light.png |
| RESP-284 | /playground | V2 (375px) | light | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V2__light.png |
| RESP-285 | /playground | V2 (375px) | dark | P2 | G1-G7 | G2_gutter | Check failed | playground__V2__dark.png |
| RESP-286 | /playground | V2 (375px) | dark | P2 | G1-G7 | G4_tapTargets | Check failed | playground__V2__dark.png |
| RESP-287 | / | 375px | light | P1 | FAQ | Pass | FAQ failed to open | — |

## Known Risk Areas — Manual Follow-up

These items need human visual review even when automated checks pass:
- HeroDemo tab wrapping aesthetics at 320px
- Playground rail usability on 768px tablets
- Pricing tilt card hover on touch devices
- Long API endpoint path readability on api-reference
- Contact page at exactly 400px width
