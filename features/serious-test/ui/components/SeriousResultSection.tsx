"use client";

import { useAtomValue } from "jotai";
import { resultAtom } from "@/features/test-core/application/atoms/resultAtom";
import { SeriousResultCard } from "@/features/serious-test/ui/components/SeriousResultCard";
import { SERIOUS_TOKENS } from "@/features/serious-test/ui/tokens/seriousTokens";

type Props = {
  testContentId: string;
  testTitle: string;
  resultImageDir: string;
};

export const SeriousResultSection = ({
  testContentId,
  testTitle,
  resultImageDir,
}: Props) => {
  const result = useAtomValue(resultAtom);

  if (result.status === "SUCCESS") {
    return (
      <SeriousResultCard
        testContentId={testContentId}
        testTitle={testTitle}
        resultImageDir={resultImageDir}
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
          className="w-full rounded-md bg-rose-900/40 px-4 py-3 text-center text-xs font-bold text-rose-200 ring-1 ring-rose-700/50"
        >
          결과를 불러오지 못했어요. 잠시 후 다시 시도해주세요.
        </div>
        <section
          className="flex w-full flex-col items-center gap-5 rounded-xl border px-6 py-8 shadow-2xl"
          style={{
            backgroundColor: SERIOUS_TOKENS.resultBg,
            borderColor: SERIOUS_TOKENS.resultRing,
          }}
        >
          <span
            className="rounded-md px-3 py-1 text-xs font-bold text-zinc-900"
            style={{ backgroundColor: SERIOUS_TOKENS.resultAccent }}
          >
            {testTitle}
          </span>
          <h2
            className="text-3xl font-black tracking-tight"
            style={{ color: SERIOUS_TOKENS.resultPrimary }}
          >
            —
          </h2>
          <p className="text-center text-sm font-medium leading-6 text-zinc-400">
            결과를 표시할 수 없습니다.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="text-center text-base font-bold text-zinc-300">
      결과를 불러오는 중...
    </div>
  );
};
