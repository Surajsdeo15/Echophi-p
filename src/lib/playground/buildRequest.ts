export type RequestParams = {
  path?: Record<string, unknown>;
  query?: Record<string, unknown>;
};

export function parseParamsJson(
  raw: string,
): { ok: true; value: RequestParams } | { ok: false; error: string } {
  const trimmed = raw.trim();
  if (!trimmed) return { ok: true, value: {} };
  try {
    const parsed = JSON.parse(trimmed) as unknown;
    if (parsed === null || typeof parsed !== "object" || Array.isArray(parsed)) {
      return { ok: false, error: "Params must be a JSON object" };
    }
    const obj = parsed as Record<string, unknown>;
    const path = obj.path;
    const query = obj.query;
    if (path !== undefined && (path === null || typeof path !== "object" || Array.isArray(path))) {
      return { ok: false, error: "params.path must be an object" };
    }
    if (
      query !== undefined &&
      (query === null || typeof query !== "object" || Array.isArray(query))
    ) {
      return { ok: false, error: "params.query must be an object" };
    }
    return {
      ok: true,
      value: {
        path: path as Record<string, unknown> | undefined,
        query: query as Record<string, unknown> | undefined,
      },
    };
  } catch (err) {
    return { ok: false, error: err instanceof Error ? err.message : String(err) };
  }
}

export function buildRequestPath(
  template: string,
  params: RequestParams,
): { ok: true; path: string } | { ok: false; error: string } {
  const pathValues = params.path ?? {};
  let out = template;
  const needed = [...template.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
  for (const name of needed) {
    const raw = pathValues[name];
    const val = raw == null ? "" : String(raw).trim();
    if (!val) {
      return { ok: false, error: `Missing required path param: ${name}` };
    }
    if (val.includes("…") || /(^|[_\s])\.\.\.($|[_\s])/.test(val) || val.endsWith("...")) {
      return { ok: false, error: `Replace placeholder for path.${name}` };
    }
    out = out.replaceAll(`{${name}}`, encodeURIComponent(val));
  }
  if (out.includes("{")) {
    return { ok: false, error: `Unresolved path placeholders in ${out}` };
  }

  const query = params.query ?? {};
  const qs = new URLSearchParams();
  for (const [k, v] of Object.entries(query)) {
    if (v === undefined || v === null || v === "") continue;
    qs.set(k, String(v));
  }
  const q = qs.toString();
  return { ok: true, path: q ? `${out}?${q}` : out };
}
