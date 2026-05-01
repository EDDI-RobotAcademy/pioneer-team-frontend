export type PeriodPreset = "today" | "last_7_days" | "last_30_days";

export type Period =
  | { type: "preset"; preset: PeriodPreset }
  | { type: "custom"; from: string; to: string };

export const DEFAULT_PERIOD: Period = {
  type: "preset",
  preset: "last_7_days",
};

export const PRESET_LABELS: Record<PeriodPreset, string> = {
  today: "오늘",
  last_7_days: "최근 7일",
  last_30_days: "최근 30일",
};

export const periodEquals = (a: Period, b: Period): boolean => {
  if (a.type === "preset" && b.type === "preset") {
    return a.preset === b.preset;
  }
  if (a.type === "custom" && b.type === "custom") {
    return a.from === b.from && a.to === b.to;
  }
  return false;
};
