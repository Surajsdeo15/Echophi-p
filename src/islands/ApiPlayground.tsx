import { useEffect, useMemo, useState } from "preact/hooks";
import { API_SECTIONS, loadPortalOperations, type ApiOperation } from "../data/api-catalog";
import {
  callPartner,
  loadApiKey,
  loadGateway,
  saveApiKey,
  saveGateway,
  toCurl,
  type PartnerResponse,
} from "../lib/partnerApi";
import { formatJson, getPathParam, setPathParam } from "../lib/playground/params";
import { validatePartnerRequest } from "../lib/playground/validateRequest";
import ConversationCreateEnhancer from "./ConversationCreateEnhancer";

const ops = loadPortalOperations();
const DEFAULT_GATEWAY = "https://echophi.variphi.com";

type RequestTab = "params" | "body" | "headers" | "curl";

function pickInitial(search: string): ApiOperation {
  const params = new URLSearchParams(search);
  const initialId = params.get("op") ?? "get:/me";
  return (
    ops.find((o) => o.id === initialId) ??
    ops.find((o) => o.path === "/me") ??
    ops[0]
  );
}

function statusLabel(status: number): string {
  const map: Record<number, string> = {
    200: "OK",
    201: "Created",
    202: "Accepted",
    204: "No Content",
    400: "Bad Request",
    401: "Unauthorized",
    403: "Forbidden",
    404: "Not Found",
    409: "Conflict",
    422: "Unprocessable",
    429: "Too Many Requests",
    500: "Server Error",
    502: "Bad Gateway",
    503: "Unavailable",
  };
  return map[status] ?? "";
}

function formatBytes(n: number): string {
  if (n < 1024) return `${n} B`;
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} kb`;
  return `${(n / (1024 * 1024)).toFixed(1)} mb`;
}

export default function ApiPlayground() {
  const initial = useMemo(
    () => (typeof window !== "undefined" ? pickInitial(window.location.search) : ops[0]),
    [],
  );

  const [gateway, setGateway] = useState(DEFAULT_GATEWAY);
  const [apiKey, setApiKey] = useState("");
  const [selectedId, setSelectedId] = useState(initial?.id ?? "");
  const [paramsJson, setParamsJson] = useState(initial?.exampleParams ?? "{}");
  const [body, setBody] = useState(initial?.exampleBody ?? "");
  const [busy, setBusy] = useState(false);
  const [result, setResult] = useState<PartnerResponse | null>(null);
  const [error, setError] = useState("");
  const [tab, setTab] = useState<RequestTab>(() =>
    initial?.hasBody || initial?.exampleBody ? "body" : "params",
  );
  const [editorStatus, setEditorStatus] = useState("");
  const [hydrated, setHydrated] = useState(false);
  const [configOpen, setConfigOpen] = useState(false);

  useEffect(() => {
    setGateway(loadGateway());
    setApiKey(loadApiKey());
    const next = pickInitial(window.location.search);
    setSelectedId(next.id);
    setParamsJson(next.exampleParams || "{}");
    setBody(next.exampleBody);
    setTab(next.hasBody || next.exampleBody ? "body" : "params");
    setHydrated(true);
  }, []);

  const selected = useMemo(
    () => ops.find((o) => o.id === selectedId),
    [selectedId],
  );
  const showBody = Boolean(selected?.hasBody);
  const showConversationEnhancer =
    selected?.method === "POST" && selected?.path === "/conversations";

  const validated = useMemo(() => {
    if (!selected) return null;
    return validatePartnerRequest({ op: selected, paramsJson, bodyJson: body });
  }, [selected, paramsJson, body]);

  const requestPath = validated?.ok ? validated.path : selected?.path ?? "";

  const requestHeadersJson = useMemo(() => {
    const headers: Record<string, string> = {
      Accept: "application/json",
    };
    if (apiKey.trim()) headers["X-Api-Key"] = apiKey.trim();
    if (
      selected &&
      (selected.method === "POST" ||
        selected.method === "PATCH" ||
        selected.method === "PUT")
    ) {
      headers["Idempotency-Key"] = "<generated-on-send>";
      if (showBody) headers["Content-Type"] = "application/json";
    }
    return JSON.stringify(headers, null, 2);
  }, [apiKey, selected, showBody]);

  function onSelect(id: string) {
    const op = ops.find((o) => o.id === id);
    setSelectedId(id);
    if (op) {
      setParamsJson(op.exampleParams || "{}");
      setBody(op.exampleBody);
      setResult(null);
      setError("");
      setEditorStatus("");
      setTab(op.hasBody || op.exampleBody ? "body" : "params");
      const url = new URL(window.location.href);
      url.searchParams.set("op", id);
      window.history.replaceState({}, "", url);
    }
  }

  async function onSubmit(e: Event) {
    e.preventDefault();
    if (!selected) return;
    saveApiKey(apiKey.trim());
    saveGateway(gateway.trim());

    const check = validatePartnerRequest({
      op: selected,
      paramsJson,
      bodyJson: body,
    });
    if (!check.ok) {
      setError(check.error);
      setEditorStatus(check.error);
      setTab(selected.hasBody && check.error.startsWith("Body") ? "body" : "params");
      return;
    }

    setBusy(true);
    setError("");
    setEditorStatus("");
    try {
      const res = await callPartner({
        gateway: gateway.trim(),
        method: selected.method,
        path: check.path,
        apiKey: apiKey.trim(),
        body: check.body,
        idempotencyKey:
          selected.method === "POST" ||
          selected.method === "PATCH" ||
          selected.method === "PUT"
            ? crypto.randomUUID()
            : undefined,
      });
      setResult(res);
    } catch (err) {
      setResult(null);
      setError(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }

  function onFormat() {
    if (tab === "params") {
      const r = formatJson(paramsJson || "{}");
      if (!r.ok) {
        setEditorStatus(`Invalid JSON: ${r.error}`);
        return;
      }
      setParamsJson(r.text);
      setEditorStatus("Formatted.");
      return;
    }
    if (tab === "body") {
      const r = formatJson(body);
      if (!r.ok) {
        setEditorStatus(`Invalid JSON: ${r.error}`);
        return;
      }
      setBody(r.text);
      setEditorStatus("Formatted.");
    }
  }

  function onValidate() {
    if (!selected) return;
    const check = validatePartnerRequest({
      op: selected,
      paramsJson,
      bodyJson: body,
    });
    setEditorStatus(check.ok ? "Request is valid." : check.error);
  }

  const curl = toCurl({
    gateway: gateway.trim(),
    method: selected?.method ?? "GET",
    path: validated?.ok ? validated.path : requestPath,
    apiKey: apiKey.trim(),
    body: validated?.ok ? validated.body : body.trim() || undefined,
  });

  let pretty = result?.bodyText ?? "";
  if (result?.bodyText) {
    try {
      pretty = JSON.stringify(JSON.parse(result.bodyText), null, 2);
    } catch {
      /* keep raw */
    }
  }

  const responseBytes = result?.bodyText ? new TextEncoder().encode(result.bodyText).length : 0;

  if (!hydrated) {
    return <div class="playground-empty">Loading playground…</div>;
  }

  return (
    <form class="playground" onSubmit={onSubmit}>
      {/* 3. Collapsible config strip */}
      <div class={`playground-config${configOpen ? " is-open" : ""}`}>
        <button
          type="button"
          class="playground-config__toggle"
          aria-expanded={configOpen}
          aria-controls="playground-config-panel"
          onClick={() => setConfigOpen((v) => !v)}
        >
          <span class="playground-config__gear" aria-hidden="true">
            ⚙
          </span>
          <span>Config</span>
          <span class="playground-config__summary">
            {selected ? `${selected.method} ${selected.path}` : "—"}
            {apiKey.trim() ? " · key set" : " · no key"}
          </span>
          <span class="playground-config__chevron" aria-hidden="true">
            {configOpen ? "▴" : "▾"}
          </span>
        </button>

        <div
          id="playground-config-panel"
          class="playground-config__panel"
          hidden={!configOpen}
        >
          <div class="playground-field">
            <label for="gateway">Gateway origin</label>
            <input
              id="gateway"
              value={gateway}
              onInput={(e) => setGateway((e.target as HTMLInputElement).value)}
              placeholder="https://echophi.variphi.com"
            />
          </div>
          <div class="playground-field">
            <label for="key">X-Api-Key</label>
            <input
              id="key"
              type="password"
              autocomplete="off"
              value={apiKey}
              onInput={(e) => setApiKey((e.target as HTMLInputElement).value)}
              placeholder="vp_live_…"
            />
          </div>
          <div class="playground-field">
            <label for="op">Operation</label>
            <select
              id="op"
              value={selectedId}
              onChange={(e) => onSelect((e.target as HTMLSelectElement).value)}
            >
              {API_SECTIONS.map((section) => (
                <optgroup key={section.id} label={section.title}>
                  {ops
                    .filter((o) => o.sectionId === section.id)
                    .map((o) => (
                      <option key={o.id} value={o.id}>
                        {o.method} {o.path}
                      </option>
                    ))}
                </optgroup>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* 4. Request bar */}
      <div class="playground-reqbar">
        {selected && (
          <span class={`method ${selected.method.toLowerCase()}`}>{selected.method}</span>
        )}
        <code class="playground-reqbar__path">{requestPath || "—"}</code>
        <button class="playground-send" type="submit" disabled={busy}>
          {busy ? "Sending…" : "Send request"}
        </button>
      </div>

      {/* 5. 50/50 REQUEST | RESPONSE */}
      <div class="playground-split">
        <section class="playground-pane playground-pane--request" aria-label="Request">
          <header class="playground-pane__head">
            <h2 class="playground-pane__title">Request</h2>
            <div class="playground-tabs" role="tablist" aria-label="Request panels">
              {(
                [
                  ["params", "Params", false],
                  ["body", "Body", !showBody],
                  ["headers", "Headers", false],
                  ["curl", "cURL", false],
                ] as const
              ).map(([id, label, disabled]) => (
                <button
                  type="button"
                  role="tab"
                  aria-selected={tab === id}
                  class={tab === id ? "is-active" : undefined}
                  onClick={() => setTab(id)}
                  disabled={disabled}
                >
                  {label}
                </button>
              ))}
            </div>
          </header>

          <div class="playground-pane__body">
            {tab === "params" && (
              <div class="playground-panel" role="tabpanel">
                <div class="playground-toolbar">
                  <span class="playground-toolbar-label">Params JSON</span>
                  <button type="button" class="playground-btn-sm" onClick={onFormat}>
                    Format
                  </button>
                  <button type="button" class="playground-btn-sm" onClick={onValidate}>
                    Validate
                  </button>
                  {editorStatus && (
                    <span class="playground-toolbar-status">{editorStatus}</span>
                  )}
                </div>
                {selected && selected.pathParams.length > 0 && (
                  <div class="playground-path-fields">
                    {selected.pathParams.map((p) => (
                      <div class="playground-field" key={p.name}>
                        <label for={`path-param-${p.name}`}>path.{p.name}</label>
                        <input
                          id={`path-param-${p.name}`}
                          value={getPathParam(paramsJson, p.name)}
                          onInput={(e) => {
                            setParamsJson(
                              setPathParam(
                                paramsJson,
                                p.name,
                                (e.target as HTMLInputElement).value.trim(),
                              ),
                            );
                            setEditorStatus("");
                          }}
                          placeholder="Paste id (e.g. agt_… / conv_…)"
                          autocomplete="off"
                          spellcheck={false}
                        />
                      </div>
                    ))}
                  </div>
                )}
                <p class="playground-hint">
                  Paste ids into the fields above (or edit <code>path</code> /{" "}
                  <code>query</code> JSON). For <code>POST /conversations</code>, put{" "}
                  <code>agent_id</code> in the <strong>Body</strong> tab.
                </p>
                <textarea
                  class="playground-editor"
                  value={paramsJson}
                  onInput={(e) => {
                    setParamsJson((e.target as HTMLTextAreaElement).value);
                    setEditorStatus("");
                  }}
                  aria-label="Request params JSON"
                  spellcheck={false}
                />
              </div>
            )}

            {tab === "body" && showBody && (
              <div class="playground-panel" role="tabpanel">
                <div class="playground-toolbar">
                  <span class="playground-toolbar-label">Body JSON</span>
                  <button type="button" class="playground-btn-sm" onClick={onFormat}>
                    Format
                  </button>
                  <button type="button" class="playground-btn-sm" onClick={onValidate}>
                    Validate
                  </button>
                  {editorStatus && (
                    <span class="playground-toolbar-status">{editorStatus}</span>
                  )}
                </div>
                {showConversationEnhancer && (
                  <ConversationCreateEnhancer
                    gateway={gateway}
                    apiKey={apiKey}
                    body={body}
                    setBody={setBody}
                    onGenerated={() => setTab("body")}
                  />
                )}
                <textarea
                  class="playground-editor"
                  value={body}
                  onInput={(e) => {
                    setBody((e.target as HTMLTextAreaElement).value);
                    setEditorStatus("");
                  }}
                  aria-label="Request JSON body"
                  spellcheck={false}
                />
              </div>
            )}

            {tab === "headers" && (
              <div class="playground-panel" role="tabpanel">
                <div class="playground-toolbar">
                  <span class="playground-toolbar-label">Request headers</span>
                </div>
                <p class="playground-hint">
                  Headers sent with each request. <code>Idempotency-Key</code> is generated
                  on send for mutating methods.
                </p>
                <textarea
                  class="playground-editor"
                  value={requestHeadersJson}
                  readOnly
                  aria-label="Request headers JSON"
                  spellcheck={false}
                />
              </div>
            )}

            {tab === "curl" && (
              <div class="playground-panel" role="tabpanel">
                <pre class="docs-pre playground-curl">{curl}</pre>
              </div>
            )}
          </div>
        </section>

        <section class="playground-pane playground-pane--response" aria-label="Response">
          <header class="playground-pane__head">
            <h2 class="playground-pane__title">Response</h2>
          </header>

          <div class="playground-pane__body">
            <div class="playground-panel playground-panel--response">
              {error && <p class="status-bad">{error}</p>}

              {!result && !error && (
                <p class="playground-empty">
                  Responses appear here after Send.
                </p>
              )}

              {result && (
                <>
                  <div class="playground-status-strip">
                    <strong class={result.ok ? "status-ok" : "status-bad"}>
                      {result.status}
                      {statusLabel(result.status) ? ` ${statusLabel(result.status)}` : ""}
                    </strong>
                    <span aria-hidden="true">·</span>
                    <span>{result.durationMs} ms</span>
                    <span aria-hidden="true">·</span>
                    <span>{formatBytes(responseBytes)}</span>
                    {result.headers["x-request-id"] && (
                      <>
                        <span aria-hidden="true">·</span>
                        <span>req {result.headers["x-request-id"]}</span>
                      </>
                    )}
                  </div>
                  <textarea
                    class="playground-editor"
                    value={pretty}
                    readOnly
                    aria-label="Response JSON"
                    spellcheck={false}
                  />
                </>
              )}
            </div>
          </div>
        </section>
      </div>
    </form>
  );
}
