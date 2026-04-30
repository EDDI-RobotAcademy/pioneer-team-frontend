"use client";

import { useAtomValue } from "jotai";
import { resultAtom } from "@/features/mbti/application/atoms/resultAtom";
import { MbtiResultCard } from "@/features/mbti/ui/components/MbtiResultCard";

const FALLBACK_TOKENS = {
  bgColor: "#EEF2FF",
  ringColor: "#A5B4FC",
  primaryColor: "#4F46E5",
  accentColor: "#6667AB",
};

export const MbtiResultSection = () => {
  const result = useAtomValue(resultAtom);

  if (result.status === "SUCCESS") {
    return (
      <MbtiResultCard
        typeCode={result.typeCode}
        description={result.description}
      />
    );
  }

  if (result.status === "FAILED") {
    return (
      <div className="flex w-full max-w-md flex-col items-center gap-3">
        <div
          role="alert"
          className="w-full rounded-2xl bg-rose-50 px-4 py-3 text-center text-xs font-bold text-rose-600 ring-1 ring-rose-200"
        >
          결과를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </div>
        <section
          className="flex w-full flex-col items-center gap-5 rounded-3xl border-4 px-6 py-8 shadow-xl"
          style={{
            backgroundColor: FALLBACK_TOKENS.bgColor,
            borderColor: FALLBACK_TOKENS.ringColor,
          }}
        >
          <span
            className="rounded-full px-3 py-1 text-xs font-bold text-white"
            style={{ backgroundColor: FALLBACK_TOKENS.accentColor }}
          >
            세계적인 CEO 유형
          </span>
          <h2
            className="text-3xl font-black tracking-tight"
            style={{ color: FALLBACK_TOKENS.primaryColor }}
          >
            —
          </h2>
          <p className="text-center text-sm font-medium leading-6 text-zinc-500">
            결과를 표시할 수 없습니다.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="text-center text-base font-bold text-zinc-700">
      결과를 불러오는 중...
    </div>
  );
};
