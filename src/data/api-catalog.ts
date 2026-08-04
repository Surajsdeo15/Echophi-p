export type ParamDef = {
  name: string;
  required: boolean;
  in: "path" | "query";
};

export type ApiOperation = {
  id: string;
  method: string;
  path: string;
  summary: string;
  sectionId: string;
  sectionTitle: string;
  hasBody: boolean;
  exampleBody: string;
  pathParams: ParamDef[];
  queryParams: ParamDef[];
  bodyRequired: string[];
  exampleParams: string;
};

export type ApiSection = {
  id: string;
  title: string;
  blurb: string;
  ops: { method: string; path: string; summary: string }[];
};

export const API_SECTIONS: ApiSection[] = [
  {
    id: "getting-started",
    title: "Getting started",
    blurb: "Introspect the API key and confirm tenant workspace.",
    ops: [
      { method: "GET", path: "/me", summary: "Get current API identity" },
      { method: "GET", path: "/reference/statuses", summary: "List status catalogs" },
    ],
  },
  {
    id: "agents",
    title: "Agents",
    blurb: "List existing agents to obtain an agent_id before starting a call.",
    ops: [
      { method: "GET", path: "/agents", summary: "List agents" },
      { method: "GET", path: "/agents/{id}", summary: "Get agent by id" },
    ],
  },
  {
    id: "conversations",
    title: "Conversations",
    blurb:
      "Start a call with an existing agent, then fetch status, transcript, recording, and intent-filter extraction.",
    ops: [
      { method: "POST", path: "/conversations", summary: "Start conversation with agent" },
      { method: "GET", path: "/conversations", summary: "List conversations" },
      { method: "GET", path: "/conversations/{id}", summary: "Get conversation" },
      {
        method: "GET",
        path: "/conversations/{id}/transcript",
        summary: "Get conversation transcript",
      },
      {
        method: "GET",
        path: "/conversations/{id}/recording",
        summary: "Get conversation recording metadata",
      },
      {
        method: "GET",
        path: "/conversations/{id}/extraction",
        summary: "Get intent filter extraction",
      },
    ],
  },
  {
    id: "webhooks",
    title: "Webhooks",
    blurb: "Per-tenant outbound endpoints with HMAC signing.",
    ops: [
      { method: "GET", path: "/webhook-endpoints", summary: "List webhook endpoints" },
      { method: "POST", path: "/webhook-endpoints", summary: "Create webhook endpoint" },
      { method: "PATCH", path: "/webhook-endpoints/{id}", summary: "Update webhook endpoint" },
      { method: "DELETE", path: "/webhook-endpoints/{id}", summary: "Delete webhook endpoint" },
      {
        method: "GET",
        path: "/webhook-endpoints/{id}/deliveries",
        summary: "List deliveries",
      },
      {
        method: "GET",
        path: "/webhook-endpoints/{id}/deliveries/{delivery_id}",
        summary: "Get delivery",
      },
      {
        method: "POST",
        path: "/webhook-endpoints/{id}/rotate-secret",
        summary: "Rotate signing secret",
      },
      {
        method: "POST",
        path: "/webhook-endpoints/{id}/test",
        summary: "Send test delivery",
      },
    ],
  },
];

function pathParamsFromTemplate(path: string): ParamDef[] {
  const names = [...path.matchAll(/\{(\w+)\}/g)].map((m) => m[1]);
  return names.map((name) => ({ name, required: true, in: "path" as const }));
}

function defaultParamsJson(path: string, pathParams: ParamDef[]): string {
  const pathObj: Record<string, string> = {};
  for (const p of pathParams) pathObj[p.name] = "";
  const doc: { path?: Record<string, string> } = {};
  if (Object.keys(pathObj).length) doc.path = pathObj;
  return JSON.stringify(doc, null, 2);
}

function defaultBody(method: string, path: string): string {
  if (method === "POST" && path === "/conversations") {
    return JSON.stringify(
      {
        agent_id: "",
        phone_number: "+15551234567",
        variables: { customer_name: "Ada", order_id: "123" },
      },
      null,
      2,
    );
  }
  if (method === "POST" && path === "/webhook-endpoints") {
    return JSON.stringify(
      {
        url: "https://example.com/webhooks/echophi",
        events: ["conversation.*"],
        api_version: "v1",
      },
      null,
      2,
    );
  }
  if (method === "PATCH" && path === "/webhook-endpoints/{id}") {
    return JSON.stringify({ status: "active" }, null, 2);
  }
  return method === "POST" || method === "PATCH" || method === "PUT" ? "{\n  \n}" : "";
}

export function loadPortalOperations(): ApiOperation[] {
  const out: ApiOperation[] = [];
  for (const section of API_SECTIONS) {
    for (const spec of section.ops) {
      const pathParams = pathParamsFromTemplate(spec.path);
      const hasBody =
        spec.method === "POST" || spec.method === "PATCH" || spec.method === "PUT";
      const bodyRequired =
        spec.method === "POST" && spec.path === "/conversations"
          ? ["agent_id", "phone_number"]
          : [];
      out.push({
        id: `${spec.method.toLowerCase()}:${spec.path}`,
        method: spec.method,
        path: spec.path,
        summary: spec.summary,
        sectionId: section.id,
        sectionTitle: section.title,
        hasBody,
        exampleBody: defaultBody(spec.method, spec.path),
        pathParams,
        queryParams: [],
        bodyRequired,
        exampleParams: defaultParamsJson(spec.path, pathParams),
      });
    }
  }
  return out;
}

export function portalSectionsWithOps() {
  const ops = loadPortalOperations();
  return API_SECTIONS.map((section) => ({
    section,
    ops: ops.filter((o) => o.sectionId === section.id),
  }));
}
