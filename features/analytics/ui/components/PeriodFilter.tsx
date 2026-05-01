"use client";

import { useState, type FormEvent } from "react";
import { usePeriodFilter } from "@/features/analytics/application/hooks/usePeriodFilter";
import {
  PRESET_LABELS,
  type PeriodPreset,
} from "@/features/analytics/domain/model/period";

const PRESETS: readonly PeriodPreset[] = [
  "today",
  "last_7_days",
  "last_30_days",
];

export const PeriodFilter = () => {
  const { period, select } = usePeriodFilter();
  const [showCustom, setShowCustom] = useState(period.type === "custom");
  const [from, setFrom] = useState(period.type === "custom" ? period.from : "");
  const [to, setTo] = useState(period.type === "custom" ? period.to : "");

  const onApplyCustom = (e: FormEvent) => {
    e.preventDefault();
    if (!from || !to) return;
    select({ type: "custom", from, to });
  };

  return (
    <div className="space-y-3">
      <div className="flex flex-wrap items-center gap-2">
        {PRESETS.map((preset) => {
          const isSelected =
            period.type === "preset" && period.preset === preset;
          return (
            <button
              key={preset}
              type="button"
              onClick={() => {
                setShowCustom(false);
                select({ type: "preset", preset });
              }}
              aria-pressed={isSelected}
              className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
                isSelected
                  ? "bg-indigo-600 text-white"
                  : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
              }`}
            >
              {PRESET_LABELS[preset]}
            </button>
          );
        })}
        <button
          type="button"
          onClick={() => setShowCustom((prev) => !prev)}
          aria-pressed={period.type === "custom" || showCustom}
          className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
            period.type === "custom"
              ? "bg-indigo-600 text-white"
              : showCustom
                ? "bg-indigo-100 text-indigo-700"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
          }`}
        >
          사용자 지정
        </button>
      </div>
      {showCustom && (
        <form
          onSubmit={onApplyCustom}
          className="flex flex-wrap items-center gap-2 rounded-md bg-zinc-50 p-3 ring-1 ring-zinc-200"
        >
          <label className="flex items-center gap-1 text-xs text-zinc-600">
            <span>시작</span>
            <input
              type="date"
              value={from}
              onChange={(e) => setFrom(e.target.value)}
              className="rounded border border-zinc-300 px-2 py-1 text-xs"
            />
          </label>
          <span className="text-zinc-400">~</span>
          <label className="flex items-center gap-1 text-xs text-zinc-600">
            <span>종료</span>
            <input
              type="date"
              value={to}
              onChange={(e) => setTo(e.target.value)}
              className="rounded border border-zinc-300 px-2 py-1 text-xs"
            />
          </label>
          <button
            type="submit"
            disabled={!from || !to}
            className="rounded-md bg-indigo-600 px-3 py-1.5 text-xs font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
          >
            적용
          </button>
        </form>
      )}
    </div>
  );
};
