"use client";

import { useEffect } from "react";
import { useFunnelMetrics } from "@/features/analytics/application/hooks/useFunnelMetrics";
import { FunnelChart } from "@/features/analytics/ui/components/FunnelChart";
import { PeriodFilter } from "@/features/analytics/ui/components/PeriodFilter";
import { ContentFilter } from "@/features/analytics/ui/components/ContentFilter";

export const FunnelDashboard = () => {
  const { state, refetch } = useFunnelMetrics();

  useEffect(() => {
    void refetch();
  }, [refetch]);

  return (
    <div className="mx-auto max-w-3xl px-4 py-8 sm:px-6 sm:py-10">
      <header className="flex items-center justify-between">
        <h1 className="text-xl font-black text-zinc-900 sm:text-2xl">
          이벤트 전환율 대시보드
        </h1>
        <button
          type="button"
          onClick={() => void refetch()}
          disabled={state.status === "LOADING"}
          className="rounded-md bg-zinc-100 px-3 py-2 text-xs font-bold text-zinc-700 transition-colors hover:bg-zinc-200 disabled:cursor-not-allowed disabled:opacity-60 sm:px-4 sm:text-sm"
        >
          새로고침
        </button>
      </header>

      <div className="mt-6 space-y-4">
        <div>
          <p className="mb-1.5 text-xs font-bold text-zinc-500">기간</p>
          <PeriodFilter />
        </div>
        <div>
          <p className="mb-1.5 text-xs font-bold text-zinc-500">콘텐츠</p>
          <ContentFilter />
        </div>
      </div>

      <section className="mt-6 rounded-2xl bg-white p-4 shadow-sm ring-1 ring-zinc-200 sm:p-6">
        {(state.status === "IDLE" || state.status === "LOADING") && (
          <div className="py-12 text-center text-sm text-zinc-500">
            데이터를 불러오는 중...
          </div>
        )}
        {state.status === "FAILED" && (
          <div role="alert" className="py-8 text-center">
            <p className="text-sm font-bold text-rose-600">{state.reason}</p>
            <button
              type="button"
              onClick={() => void refetch()}
              className="mt-3 rounded-md bg-rose-600 px-4 py-2 text-sm font-bold text-white transition-colors hover:bg-rose-700"
            >
              다시 시도
            </button>
          </div>
        )}
        {state.status === "SUCCESS" && (
          <FunnelChart stages={state.data.stages} />
        )}
      </section>

      {state.status === "SUCCESS" &&
        typeof state.data.overall_conversion_rate === "number" && (
          <div className="mt-6 rounded-xl bg-indigo-50 p-4 text-center ring-1 ring-indigo-200">
            <p className="text-xs font-bold text-indigo-700">전체 전환율</p>
            <p className="mt-1 font-mono text-2xl font-black text-indigo-700">
              {(state.data.overall_conversion_rate * 100).toFixed(1)}%
            </p>
          </div>
        )}
    </div>
  );
};
