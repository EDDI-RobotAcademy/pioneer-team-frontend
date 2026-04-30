"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useConvertTracking } from "@/features/tracking/application/hooks/useConvertTracking";
import { resultContentId } from "@/features/tracking/domain/contentId";
import { PlayfulShareMenu } from "@/features/playful-test/ui/components/PlayfulShareMenu";
import { PLAYFUL_TOKENS } from "@/features/playful-test/ui/tokens/playfulTokens";

type Props = {
  testContentId: string;
  testTitle: string;
  resultImageDir: string;
  typeCode: string;
  description: string;
};

export const PlayfulResultCard = ({
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
      className="flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border-4 px-6 py-8 shadow-xl"
      style={{
        backgroundColor: PLAYFUL_TOKENS.resultBg,
        borderColor: PLAYFUL_TOKENS.resultRing,
      }}
    >
      <span
        className="rounded-full px-3 py-1 text-xs font-bold text-white"
        style={{ backgroundColor: PLAYFUL_TOKENS.resultAccent }}
      >
        {testTitle}
      </span>
      <div className="relative aspect-square w-48 overflow-hidden rounded-2xl bg-white/60 ring-1 ring-zinc-200">
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
        style={{ color: PLAYFUL_TOKENS.resultPrimary }}
      >
        {typeCode}
      </h2>
      <p className="text-center text-sm font-medium leading-6 text-zinc-700">
        {description}
      </p>
      <PlayfulShareMenu
        shareUrl={shareUrl}
        shareTitle={`${testTitle}: ${typeCode}`}
        accentColor={PLAYFUL_TOKENS.resultAccent}
      />
    </section>
  );
};
