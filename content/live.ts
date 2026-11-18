import data from "./live-status.json";

export type LiveResult = { ok: boolean; status: number | null };
export type LiveStatus = { checkedAt: string | null; results: Record<string, LiveResult> };

// Written by scripts/check-live.mjs in CI before every build.
export const live = data as LiveStatus;
