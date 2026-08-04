import { parseParamsJson, type RequestParams } from "./buildRequest";

export function getPathParam(paramsJson: string, name: string): string {
  const parsed = parseParamsJson(paramsJson);
  if (!parsed.ok) return "";
  const v = parsed.value.path?.[name];
  return v == null ? "" : String(v);
}

export function setPathParam(paramsJson: string, name: string, value: string): string {
  const parsed = parseParamsJson(paramsJson);
  const base: RequestParams = parsed.ok ? { ...parsed.value } : {};
  const path = { ...(base.path ?? {}) };
  path[name] = value;
  base.path = path;
  return JSON.stringify(base, null, 2);
}

export function formatJson(raw: string): { ok: true; text: string } | { ok: false; error: string } {
  try {
    return { ok: true, text: JSON.stringify(JSON.parse(raw || "{}"), null, 2) };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}
