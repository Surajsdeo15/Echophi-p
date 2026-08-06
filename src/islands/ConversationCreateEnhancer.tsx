import { useCallback, useEffect, useState } from "preact/hooks";
import { callPartner } from "../lib/partnerApi";
import { buildConversationPayload } from "../lib/playground/conversationPayload";

type AgentListItem = {
  id: string;
  display_name?: string;
};

type AgentDetail = AgentListItem & {
  variables?: { name: string }[];
};

type Props = {
  gateway: string;
  apiKey: string;
  body: string;
  setBody: (next: string) => void;
  onGenerated?: () => void;
};

export default function ConversationCreateEnhancer({
  gateway,
  apiKey,
  body,
  setBody,
  onGenerated,
}: Props) {
  const [agents, setAgents] = useState<AgentListItem[]>([]);
  const [agentId, setAgentId] = useState("");
  const [detail, setDetail] = useState<AgentDetail | null>(null);
  const [busy, setBusy] = useState(false);
  const [msg, setMsg] = useState("");

  const loadAgents = useCallback(async () => {
    if (!gateway.trim() || !apiKey.trim()) {
      setMsg("Set gateway and API key first.");
      return;
    }
    setBusy(true);
    setMsg("");
    try {
      const res = await callPartner({
        gateway: gateway.trim(),
        method: "GET",
        path: "/agents?page=1&page_size=50",
        apiKey: apiKey.trim(),
      });
      if (!res.ok) {
        setMsg(`List agents failed (${res.status})`);
        return;
      }
      const parsed = JSON.parse(res.bodyText) as { data?: AgentListItem[] };
      const list = parsed.data ?? [];
      setAgents(list);
      if (!agentId && list[0]?.id) setAgentId(list[0].id);
      setMsg(list.length ? `Loaded ${list.length} agent(s)` : "No agents in workspace");
    } catch (err) {
      setMsg(err instanceof Error ? err.message : String(err));
    } finally {
      setBusy(false);
    }
  }, [gateway, apiKey, agentId]);

  useEffect(() => {
    if (!agentId || !gateway.trim() || !apiKey.trim()) {
      setDetail(null);
      return;
    }
    let cancelled = false;
    (async () => {
      setBusy(true);
      setMsg("");
      try {
        const res = await callPartner({
          gateway: gateway.trim(),
          method: "GET",
          path: `/agents/${encodeURIComponent(agentId)}`,
          apiKey: apiKey.trim(),
        });
        if (cancelled) return;
        if (!res.ok) {
          setDetail(null);
          setMsg(`Get agent failed (${res.status})`);
          return;
        }
        const parsed = JSON.parse(res.bodyText) as { data?: AgentDetail };
        setDetail(parsed.data ?? null);
        const n = parsed.data?.variables?.length ?? 0;
        setMsg(n ? `${n} variable(s) from agent scripts` : "No template variables on this agent");
      } catch (err) {
        if (!cancelled) setMsg(err instanceof Error ? err.message : String(err));
      } finally {
        if (!cancelled) setBusy(false);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [agentId, gateway, apiKey]);

  function onGenerate() {
    if (!agentId) {
      setMsg("Select an agent first.");
      return;
    }
    const names = (detail?.variables ?? []).map((v) => v.name);
    const next = buildConversationPayload(agentId, names);
    if (body.trim() && body.trim() !== next.trim()) {
      const ok = window.confirm("Replace the current JSON body with a generated payload?");
      if (!ok) return;
    }
    setBody(next);
    onGenerated?.();
    setMsg("Payload generated — edit Body tab, then Send.");
  }

  const vars = detail?.variables ?? [];

  return (
    <div class="playground-enhancer">
      <label class="playground-enhancer__label">Agent variables</label>
      <p class="playground-enhancer__hint">
        Load agents, then Generate Payload into the Body tab.
      </p>
      <div class="playground-enhancer__row">
        <button
          type="button"
          class="playground-btn-sm"
          disabled={busy}
          onClick={() => void loadAgents()}
        >
          {busy ? "Loading…" : "Load agents"}
        </button>
      </div>
      <select
        class="playground-enhancer__select"
        aria-label="Agent"
        value={agentId}
        onChange={(e) => setAgentId((e.target as HTMLSelectElement).value)}
        disabled={!agents.length}
      >
        <option value="">Select agent…</option>
        {agents.map((a) => (
          <option key={a.id} value={a.id}>
            {a.display_name || a.id}
          </option>
        ))}
      </select>
      {agentId && (
        <div class="playground-enhancer__id-row">
          <code class="playground-enhancer__id" title="Agent id">
            {agentId}
          </code>
          <button
            type="button"
            class="playground-btn-sm"
            onClick={() => {
              void navigator.clipboard.writeText(agentId).then(
                () =>
                  setMsg(
                    "Agent id copied — paste into Body agent_id (or path.id on GET agent).",
                  ),
                () => setMsg("Could not copy — select the id manually."),
              );
            }}
          >
            Copy id
          </button>
        </div>
      )}
      {vars.length > 0 && (
        <ul class="playground-var-chips">
          {vars.map((v) => (
            <li key={v.name}>
              <code>{v.name}</code>
            </li>
          ))}
        </ul>
      )}
      <button
        type="button"
        class="playground-enhancer__generate"
        disabled={!agentId}
        onClick={onGenerate}
      >
        Generate Payload
      </button>
      {msg && <p class="playground-enhancer__msg">{msg}</p>}
    </div>
  );
}
