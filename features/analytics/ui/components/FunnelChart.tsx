"use client";

import type { FunnelStageMetric } from "@/features/analytics/domain/model/funnelMetric";

const STAGE_COLORS: Record<string, string> = {
  LAND: "#6366F1",
  IMPRESSION: "#3B82F6",
  START: "#0EA5E9",
  CONVERT: "#10B981",
};

const STAGE_FALLBACK_COLOR = "#6B7280";

const STAGE_LABELS: Record<string, { name: string; description: string }> = {
  LAND: {
    name: "사이트 진입",
    description: "외부에서 들어와 페이지를 처음 열었어요",
  },
  IMPRESSION: {
    name: "콘텐츠 노출",
    description: "메인 테스트 카드가 화면에 노출됐어요",
  },
  START: {
    name: "테스트 시작",
    description: "시작 버튼을 눌러 문항으로 진입했어요",
  },
  CONVERT: {
    name: "결과 도달",
    description: "마지막 문항까지 끝내고 결과 화면을 봤어요",
  },
};

const FALLBACK_LABEL = {
  name: "단계",
  description: "정의되지 않은 이벤트 타입",
};

type Props = {
  stages: readonly FunnelStageMetric[];
};

const isEmpty = (stages: readonly FunnelStageMetric[]): boolean =>
  stages.length === 0 || stages.every((s) => s.count === 0);

const computeWidthRatio = (count: number, baseCount: number): number => {
  if (baseCount === 0) return 0;
  return count / baseCount;
};

const normalizeEventType = (raw: string | undefined | null): string =>
  String(raw ?? "")
    .trim()
    .toUpperCase()
    .replace(/[\s-]+/g, "_");

export const FunnelChart = ({ stages }: Props) => {
  if (isEmpty(stages)) {
    return <FunnelEmptyState />;
  }

  const baseCount = stages[0].count;

  return (
    <div className="space-y-5">
      <div className="border-b border-zinc-200 pb-3">
        <p className="text-sm font-black text-zinc-900">단계별 전환율</p>
        <p className="mt-1 text-xs leading-5 text-zinc-500">
          사용자가 사이트에 진입한 뒤 결과까지 도달하는 흐름이에요. 우측의
          <span className="font-bold text-indigo-600"> %</span>는 직전 단계
          대비 전환율을 의미합니다.
        </p>
      </div>

      {stages.map((stage, index) => {
        const normalized = normalizeEventType(stage.event_type);
        const widthRatio = computeWidthRatio(stage.count, baseCount);
        const color = STAGE_COLORS[normalized] ?? STAGE_FALLBACK_COLOR;
        const label = STAGE_LABELS[normalized] ?? FALLBACK_LABEL;

        return (
          <div key={`stage-${index}-${stage.event_type}`}>
            <div className="mb-1.5 flex items-baseline justify-between gap-3">
              <div className="flex items-baseline gap-2">
                <span className="text-sm font-bold text-zinc-900 sm:text-base">
                  {label.name}
                </span>
                <span className="rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[10px] uppercase tracking-wider text-zinc-500">
                  {String(stage.event_type ?? "(none)")}
                </span>
              </div>
              <div className="flex items-baseline gap-3 sm:gap-4">
                <span className="font-mono text-xs text-zinc-700 sm:text-sm">
                  {stage.count.toLocaleString()}
                  <span className="ml-0.5 text-zinc-400">회</span>
                </span>
                {typeof stage.conversion_rate === "number" && (
                  <span className="font-mono text-xs font-bold text-indigo-600 sm:text-sm">
                    {(stage.conversion_rate * 100).toFixed(1)}
                    <span className="ml-0.5 text-indigo-400">%</span>
                  </span>
                )}
              </div>
            </div>
            <div className="relative h-8 w-full overflow-hidden rounded-md bg-zinc-100 sm:h-10">
              <div
                className="h-full rounded-md transition-[width] duration-500 ease-out"
                style={{
                  width: `${widthRatio * 100}%`,
                  backgroundColor: color,
                }}
              />
            </div>
            <p className="mt-1.5 text-xs leading-5 text-zinc-500">
              {label.description}
            </p>
          </div>
        );
      })}
    </div>
  );
};

const FunnelEmptyState = () => (
  <div className="rounded-2xl border-2 border-dashed border-zinc-200 bg-zinc-50 p-12 text-center">
    <p className="text-sm font-bold text-zinc-500">
      표시할 데이터가 아직 없어요.
    </p>
    <p className="mt-1 text-xs text-zinc-400">
      이벤트가 수집되면 여기에 단계별 전환율이 표시됩니다.
    </p>
  </div>
);
