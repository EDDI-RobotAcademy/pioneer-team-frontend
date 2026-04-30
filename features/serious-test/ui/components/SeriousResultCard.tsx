"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useConvertTracking } from "@/features/tracking/application/hooks/useConvertTracking";
import { resultContentId } from "@/features/tracking/domain/contentId";
import { SeriousShareMenu } from "@/features/serious-test/ui/components/SeriousShareMenu";
import { SERIOUS_TOKENS } from "@/features/serious-test/ui/tokens/seriousTokens";

type Props = {
  testContentId: string;
  testTitle: string;
  resultImageDir: string;
  typeCode: string;
  description: string;
};

export const SeriousResultCard = ({
  testContentId,
  testTitle,
  resultImageDir,
  typeCode,
  description,
}: Props) => {
  const shareUrl = useMemo(() => {
    if (typeof window === "undefined") return "";
    const url = new URL(window.location.href);
    url.searchParams.set("type_code", typeCode);
    return url.toString();
  }, [typeCode]);

  useConvertTracking({
    contentId: resultContentId(testContentId, typeCode),
    metadata: { type_code: typeCode },
  });

  return (
    <section
      className="flex w-full max-w-md flex-col items-center gap-5 rounded-xl border px-6 py-8 shadow-2xl"
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
      <div className="relative aspect-square w-48 overflow-hidden rounded-lg bg-black/20 ring-1 ring-[#334155]">
        <Image
          src={`${resultImageDir}/${typeCode}.png`}
          alt={`${typeCode} 결과 이미지`}
          fill
          priority
          sizes="192px"
          className="object-contain"
        />
      </div>
      <h2
        className="text-3xl font-black tracking-tight"
        style={{ color: SERIOUS_TOKENS.resultPrimary }}
      >
        {typeCode}
      </h2>
      <p className="text-center text-sm font-medium leading-6 text-zinc-300">
        {description}
      </p>
      <SeriousShareMenu
        shareUrl={shareUrl}
        shareTitle={`${testTitle}: ${typeCode}`}
        accentColor={SERIOUS_TOKENS.resultAccent}
      />
    </section>
  );
};
