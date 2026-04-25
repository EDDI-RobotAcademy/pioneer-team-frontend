"use client";

import { useMbtiIntro } from "@/features/mbti/application/hooks/useMbtiIntro";
import { HeroImage } from "@/features/mbti/ui/components/HeroImage";
import { StartTestButton } from "@/features/mbti/ui/components/StartTestButton";
import { BrandLogo } from "@/ui/components/BrandLogo";

export const MbtiIntroPage = () => {
  const { isIntroVisible, isStarting, onStartTest } = useMbtiIntro();

  if (!isIntroVisible && !isStarting) {
    return null;
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-amber-50">
      <header className="relative mx-auto flex w-full max-w-5xl shrink-0 items-center justify-between px-6 py-3 sm:px-10">
        <BrandLogo />
        <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-bold text-zinc-700 shadow-sm ring-1 ring-zinc-100">
          오늘 뭐하고 놀까?
        </span>
      </header>

      <main className="relative mx-auto flex w-full max-w-5xl flex-1 flex-col items-center justify-center px-6 pb-6 sm:px-10">
        <HeroImage>
          <StartTestButton onStart={onStartTest} isStarting={isStarting} />
        </HeroImage>
      </main>
    </div>
  );
};
