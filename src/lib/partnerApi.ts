import { API_PREFIX, DEFAULT_GATEWAY } from "../data/docs";

const KEY_STORAGE = "echophi_partner_api_key";
const GATEWAY_STORAGE = "echophi_partner_gateway";

export function loadApiKey(): string {
  try {
    return sessionStorage.getItem(KEY_STORAGE) ?? "";
  } catch {
    return "";
  }
}

export function saveApiKey(key: string) {
  try {
    if (key) sessionStorage.setItem(KEY_STORAGE, key);
    else sessionStorage.removeItem(KEY_STORAGE);
  } catch {
    /* ignore */
  }
}

export function loadGateway(): string {
  try {
    return sessionStorage.getItem(GATEWAY_STORAGE) ?? DEFAULT_GATEWAY;
  } catch {
    return DEFAULT_GATEWAY;
  }
}

export function saveGateway(url: string) {
  try {
    sessionStorage.setItem(GATEWAY_STORAGE, url.replace(/\/$/, ""));
  } catch {
    /* ignore */
  }
}

export type PartnerResponse = {
  ok: boolean;
  status: number;
  headers: Record<string, string>;
  bodyText: string;
  durationMs: number;
};

export async function callPartner(opts: {
  gateway: string;
  method: string;
  path: string;
  apiKey: string;
  body?: string;
  idempotencyKey?: string;
}): Promise<PartnerResponse> {
  const base = opts.gateway.replace(/\/$/, "");
  const path = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const url = `${base}${API_PREFIX}${path}`;
  const headers: Record<string, string> = { Accept: "application/json" };
  if (opts.apiKey) headers["X-Api-Key"] = opts.apiKey;
  if (opts.body) headers["Content-Type"] = "application/json";
  if (opts.idempotencyKey) headers["Idempotency-Key"] = opts.idempotencyKey;

  const started = performance.now();
  const res = await fetch(url, {
    method: opts.method,
    headers,
    body:
      opts.body && opts.method !== "GET" && opts.method !== "HEAD"
        ? opts.body
        : undefined,
  });
  const durationMs = Math.round(performance.now() - started);
  const bodyText = await res.text();
  const outHeaders: Record<string, string> = {};
  res.headers.forEach((v, k) => {
    outHeaders[k] = v;
  });
  return { ok: res.ok, status: res.status, headers: outHeaders, bodyText, durationMs };
}

export function toCurl(opts: {
  gateway: string;
  method: string;
  path: string;
  apiKey: string;
  body?: string;
}): string {
  const base = opts.gateway.replace(/\/$/, "");
  const path = opts.path.startsWith("/") ? opts.path : `/${opts.path}`;
  const url = `${base}${API_PREFIX}${path}`;
  const lines = [
    `curl -sS -X ${opts.method} '${url}'`,
    `  -H 'X-Api-Key: ${opts.apiKey || "$ECHOPHI_API_KEY"}'`,
  ];
  if (opts.body && opts.method !== "GET") {
    lines.push(`  -H 'Content-Type: application/json'`);
    lines.push(`  -d '${opts.body.replace(/'/g, "'\\''")}'`);
  }
  return lines.join(" \\\n");
}
