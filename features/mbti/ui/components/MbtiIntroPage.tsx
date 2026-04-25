"use client";

import dynamic from "next/dynamic";
import { useMbtiIntro } from "@/features/mbti/application/hooks/useMbtiIntro";
import { HeroImage } from "@/features/mbti/ui/components/HeroImage";
import { StartTestButton } from "@/features/mbti/ui/components/StartTestButton";
import { BrandLogo } from "@/ui/components/BrandLogo";

const AmusementParkScene = dynamic(
  () =>
    import("@/ui/components/AmusementParkScene").then((m) => ({
      default: m.AmusementParkScene,
    })),
  { ssr: false },
);

const FLAG_COLORS = [
  "bg-rose-400",
  "bg-amber-400",
  "bg-sky-400",
  "bg-lime-400",
];
const TRIANGLE_CLIP = "[clip-path:polygon(0_0,100%_0,50%_100%)]";
const STAR_CLIP =
  "[clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]";

export const MbtiIntroPage = () => {
  const { isIntroVisible, isStarting, onStartTest } = useMbtiIntro();

  if (!isIntroVisible && !isStarting) {
    return null;
  }

  return (
    <div className="relative flex h-screen flex-col overflow-hidden bg-amber-50">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-40 [background-image:radial-gradient(circle,#fdba74_1.5px,transparent_1.5px)] [background-size:26px_26px]"
      />

      <div aria-hidden className="pointer-events-none absolute inset-0">
        <div className="absolute -left-24 top-32 h-64 w-64 rounded-full bg-rose-300/35 blur-3xl" />
        <div className="absolute -right-16 top-10 h-72 w-72 rounded-full bg-sky-300/35 blur-3xl" />
        <div className="absolute bottom-0 left-1/3 h-80 w-80 rounded-full bg-lime-300/35 blur-3xl" />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 opacity-70"
      >
        <AmusementParkScene />
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-2 h-px bg-zinc-400/30"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-2 flex justify-around px-2"
      >
        {Array.from({ length: 18 }).map((_, i) => (
          <div
            key={i}
            className={`h-4 w-4 ${FLAG_COLORS[i % FLAG_COLORS.length]} ${TRIANGLE_CLIP} shadow-sm`}
          />
        ))}
      </div>

      <div
        aria-hidden
        className={`pointer-events-none absolute left-8 top-28 h-5 w-5 bg-yellow-400 ${STAR_CLIP}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute right-12 top-40 h-4 w-4 bg-rose-400 ${STAR_CLIP}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute left-20 bottom-32 h-6 w-6 bg-sky-400 ${STAR_CLIP}`}
      />
      <div
        aria-hidden
        className={`pointer-events-none absolute right-20 bottom-24 h-5 w-5 bg-lime-500 ${STAR_CLIP}`}
      />

      <header className="relative mx-auto mt-3 flex w-full max-w-5xl shrink-0 items-center justify-between px-6 py-3 sm:px-10">
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
