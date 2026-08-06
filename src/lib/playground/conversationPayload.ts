export function buildConversationPayload(
  agentId: string,
  variableNames: string[],
  phoneNumber = "+15551234567",
): string {
  const variables: Record<string, string> = {};
  for (const name of variableNames) {
    variables[name] = "";
  }
  return JSON.stringify(
    {
      agent_id: agentId,
      phone_number: phoneNumber,
      ...(variableNames.length ? { variables } : {}),
    },
    null,
    2,
  );
}
