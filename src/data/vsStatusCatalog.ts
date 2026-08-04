/** Reports VS catalog (mirrors core internal/reports/statuscodes.go). Not on Partner conversation APIs. */
export type VsStatusEntry = {
  code: string;
  callStatus: string;
  callResult: string;
  description: string;
};

export const VS_STATUS_CATALOG_VERSION = "v1";

export const VS_STATUS_CATALOG: VsStatusEntry[] = [
  // VS2xxx — Successful
  { code: "VS2000", callStatus: "Completed", callResult: "Completed", description: "Call completed successfully." },
  { code: "VS2001", callStatus: "Completed", callResult: "Promise To Pay", description: "Customer promised to pay." },
  { code: "VS2002", callStatus: "Completed", callResult: "Interested", description: "Customer expressed interest." },
  { code: "VS2003", callStatus: "Completed", callResult: "Not Interested", description: "Customer is not interested." },
  { code: "VS2004", callStatus: "Completed", callResult: "Callback Scheduled", description: "A callback was scheduled." },
  { code: "VS2005", callStatus: "Completed", callResult: "Transferred", description: "Call was transferred." },
  { code: "VS2006", callStatus: "Completed", callResult: "Verified", description: "Verification completed." },
  {
    code: "VS2007",
    callStatus: "Completed",
    callResult: "Information Collected",
    description: "Required information was collected.",
  },

  // VS3xxx — Customer outcomes
  { code: "VS3001", callStatus: "No Answer", callResult: "No Answer", description: "Customer did not answer the call." },
  { code: "VS3002", callStatus: "Busy", callResult: "Busy", description: "Customer line was busy." },
  { code: "VS3003", callStatus: "Rejected", callResult: "Rejected", description: "Customer rejected the call." },
  { code: "VS3004", callStatus: "Voicemail", callResult: "Voicemail", description: "Call reached voicemail." },
  {
    code: "VS3005",
    callStatus: "Disconnected",
    callResult: "Call Dropped",
    description: "Call disconnected unexpectedly.",
  },
  {
    code: "VS3006",
    callStatus: "Invalid Number",
    callResult: "Invalid Number",
    description: "Phone number is invalid.",
  },
  { code: "VS3007", callStatus: "DND", callResult: "DND", description: "Number is on do-not-disturb." },

  // VS4xxx — Platform errors
  { code: "VS4001", callStatus: "Failed", callResult: "Dispatch Failed", description: "Call could not be dispatched." },
  { code: "VS4002", callStatus: "Failed", callResult: "Media Timeout", description: "Media connection timed out." },
  { code: "VS4003", callStatus: "Failed", callResult: "Network Error", description: "A network error occurred." },
  {
    code: "VS4004",
    callStatus: "Failed",
    callResult: "Provider Error",
    description: "Telephony provider reported an error.",
  },
  { code: "VS4005", callStatus: "Failed", callResult: "AI Runtime Error", description: "AI runtime failed during the call." },
  { code: "VS4006", callStatus: "Failed", callResult: "STT Error", description: "Speech-to-text failed." },
  { code: "VS4007", callStatus: "Failed", callResult: "TTS Error", description: "Text-to-speech failed." },
  { code: "VS4008", callStatus: "Failed", callResult: "Recording Error", description: "Recording failed." },
  {
    code: "VS4009",
    callStatus: "Failed",
    callResult: "Internal Error",
    description: "An internal platform error occurred.",
  },

  // VS5xxx — Business rules
  { code: "VS5001", callStatus: "Cancelled", callResult: "Cancelled", description: "Call was cancelled." },
  { code: "VS5002", callStatus: "Skipped", callResult: "Frequency Cap", description: "Skipped due to frequency cap." },
  {
    code: "VS5003",
    callStatus: "Skipped",
    callResult: "Outside Schedule",
    description: "Skipped outside calling schedule.",
  },
  { code: "VS5004", callStatus: "Skipped", callResult: "Retry Exhausted", description: "Maximum retries reached." },
  { code: "VS5005", callStatus: "Skipped", callResult: "Blacklisted", description: "Number is blacklisted." },
  { code: "VS5006", callStatus: "Skipped", callResult: "Consent Missing", description: "Required consent is missing." },
];

export function vsStatusRanges(): { title: string; prefix: string; entries: VsStatusEntry[] }[] {
  return [
    { title: "VS2xxx — Successful", prefix: "VS2", entries: VS_STATUS_CATALOG.filter((e) => e.code.startsWith("VS2")) },
    { title: "VS3xxx — Customer outcomes", prefix: "VS3", entries: VS_STATUS_CATALOG.filter((e) => e.code.startsWith("VS3")) },
    { title: "VS4xxx — Platform errors", prefix: "VS4", entries: VS_STATUS_CATALOG.filter((e) => e.code.startsWith("VS4")) },
    { title: "VS5xxx — Business rules", prefix: "VS5", entries: VS_STATUS_CATALOG.filter((e) => e.code.startsWith("VS5")) },
  ];
}
