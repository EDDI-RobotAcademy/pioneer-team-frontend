"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useConvertTracking } from "@/features/tracking/application/hooks/useConvertTracking";
import { ceoTestResultContentId } from "@/features/tracking/domain/contentId";
import { MbtiShareMenu } from "@/features/mbti/ui/components/MbtiShareMenu";

const TOKENS = {
  bgColor: "#EEF2FF",
  ringColor: "#A5B4FC",
  primaryColor: "#4F46E5",
  accentColor: "#6667AB",
};

type Props = {
  typeCode: string;
  description: string;
};

export const MbtiResultCard = ({ typeCode, description }: Props) => {
  const [shareUrl, setShareUrl] = useState("");

  useEffect(() => {
    if (typeof window === "undefined") return;
    const url = new URL(window.location.href);
    url.searchParams.set("type_code", typeCode);
    setShareUrl(url.toString());
  }, [typeCode]);

  useConvertTracking({
    contentId: ceoTestResultContentId(typeCode),
    metadata: { type_code: typeCode },
  });

  return (
    <section
      className="flex w-full max-w-md flex-col items-center gap-5 rounded-3xl border-4 px-6 py-8 shadow-xl"
      style={{
        backgroundColor: TOKENS.bgColor,
        borderColor: TOKENS.ringColor,
      }}
    >
      <span
        className="rounded-full px-3 py-1 text-xs font-bold text-white"
        style={{ backgroundColor: TOKENS.accentColor }}
      >
        세계적인 CEO 유형
      </span>
      <div className="relative aspect-square w-48 overflow-hidden rounded-2xl bg-white/60 ring-1 ring-zinc-200">
        <Image
          src={`/images/ceo_type/${typeCode}.png`}
          alt={`${typeCode} 결과 이미지`}
          fill
          priority
          sizes="192px"
          className="object-contain"
        />
      </div>
      <h2
        className="text-3xl font-black tracking-tight"
        style={{ color: TOKENS.primaryColor }}
      >
        {typeCode}
      </h2>
      <p className="text-center text-sm font-medium leading-6 text-zinc-700">
        {description}
      </p>
      <MbtiShareMenu
        shareUrl={shareUrl}
        shareTitle={`나의 CEO 유형: ${typeCode}`}
        accentColor={TOKENS.accentColor}
      />
    </section>
  );
};
