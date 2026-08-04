import { buildRequestPath, parseParamsJson } from "./buildRequest";
import type { ApiOperation } from "../../data/api-catalog";

export type ValidationResult =
  | { ok: true; path: string; body?: string }
  | { ok: false; error: string };

export function validatePartnerRequest(opts: {
  op: ApiOperation;
  paramsJson: string;
  bodyJson: string;
}): ValidationResult {
  const parsed = parseParamsJson(opts.paramsJson);
  if (!parsed.ok) return { ok: false, error: `Params: ${parsed.error}` };

  const built = buildRequestPath(opts.op.path, parsed.value);
  if (!built.ok) return { ok: false, error: built.error };

  for (const p of opts.op.pathParams) {
    if (!p.required) continue;
    const v = parsed.value.path?.[p.name];
    if (v == null || String(v).trim() === "") {
      return { ok: false, error: `Missing required path param: ${p.name}` };
    }
  }

  if (!opts.op.hasBody) {
    return { ok: true, path: built.path };
  }

  const bodyRaw = opts.bodyJson.trim();
  if (!bodyRaw) {
    return { ok: false, error: "Request body is required" };
  }

  let bodyObj: Record<string, unknown>;
  try {
    const parsedBody = JSON.parse(bodyRaw) as unknown;
    if (parsedBody === null || typeof parsedBody !== "object" || Array.isArray(parsedBody)) {
      return { ok: false, error: "Body must be a JSON object" };
    }
    bodyObj = parsedBody as Record<string, unknown>;
  } catch (err) {
    return { ok: false, error: `Body: ${err instanceof Error ? err.message : String(err)}` };
  }

  const required = [...opts.op.bodyRequired];
  if (opts.op.method === "POST" && opts.op.path === "/conversations") {
    for (const key of ["agent_id", "phone_number"]) {
      if (!required.includes(key)) required.push(key);
    }
  }

  for (const key of required) {
    const v = bodyObj[key];
    if (v == null || (typeof v === "string" && !v.trim())) {
      return { ok: false, error: `Missing required body field: ${key}` };
    }
    if (typeof v === "string" && (v.includes("…") || v === "..." || /_(?:\.\.\.|…)$/.test(v))) {
      return { ok: false, error: `Replace placeholder for body.${key}` };
    }
  }

  return { ok: true, path: built.path, body: JSON.stringify(bodyObj) };
}
