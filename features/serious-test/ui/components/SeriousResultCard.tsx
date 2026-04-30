"use client";

import Image from "next/image";
import { useMemo } from "react";
import { useConvertTracking } from "@/features/tracking/application/hooks/useConvertTracking";
import { resultContentId } from "@/features/tracking/domain/contentId";
import { SeriousShareMenu } from "@/features/serious-test/ui/components/SeriousShareMenu";
import { SERIOUS_TOKENS } from "@/features/serious-test/ui/tokens/seriousTokens";
import { findCeoProfile } from "@/features/serious-test/domain/data/ceoProfiles";

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
  const profile = findCeoProfile(typeCode);

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

  const headingName = profile?.name ?? "세계적 CEO";
  const shareTitleSuffix = profile ? profile.name : typeCode;

  return (
    <section
      className="flex w-full max-w-lg flex-col items-center gap-5 rounded-xl border px-6 py-8 shadow-2xl"
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
      <div className="relative aspect-[9/16] w-60 overflow-hidden rounded-lg ring-1 ring-[#334155]">
        <Image
          src={`${resultImageDir}/${typeCode}.png`}
          alt={profile ? `${profile.name} 결과 이미지` : "결과 이미지"}
          fill
          priority
          sizes="240px"
          className="object-cover"
        />
      </div>
      <div className="flex flex-col items-center gap-1">
        <h2
          className="text-3xl font-black tracking-tight"
          style={{ color: SERIOUS_TOKENS.resultPrimary }}
        >
          {headingName}
        </h2>
        {profile && (
          <p
            className="text-sm font-bold"
            style={{ color: SERIOUS_TOKENS.resultAccent }}
          >
            {profile.company}
          </p>
        )}
      </div>
      <p className="text-center text-sm font-medium leading-6 text-zinc-200">
        {description}
      </p>
      {profile && (
        <p className="text-center text-xs leading-5 text-zinc-400">
          {profile.description}
        </p>
      )}
      <SeriousShareMenu
        shareUrl={shareUrl}
        shareTitle={`${testTitle}: ${shareTitleSuffix}`}
        accentColor={SERIOUS_TOKENS.resultAccent}
      />
    </section>
  );
};
