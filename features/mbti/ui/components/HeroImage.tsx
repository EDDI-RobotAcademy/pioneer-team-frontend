import Image from "next/image";
import type { ReactNode } from "react";

const STAR_CLIP =
  "[clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]";

type Props = {
  children?: ReactNode;
};

export const HeroImage = ({ children }: Props) => {
  return (
    <div className="relative">
      <div
        aria-hidden
        className={`absolute -left-3 -top-4 z-10 h-7 w-7 bg-yellow-400 ${STAR_CLIP}`}
      />
      <div
        aria-hidden
        className={`absolute -right-2 -top-2 z-10 h-5 w-5 bg-rose-400 ${STAR_CLIP}`}
      />
      <div
        aria-hidden
        className={`absolute -right-4 bottom-6 z-10 h-6 w-6 bg-sky-400 ${STAR_CLIP}`}
      />

      <div className="relative -rotate-1 rounded-[1.75rem] bg-white p-3 shadow-xl ring-2 ring-amber-100 transition-transform hover:rotate-0">
        <div className="relative h-[min(72vh,40rem)] aspect-[572/1024] overflow-hidden rounded-2xl">
          <Image
            src="/images/mbti/feel_logic.png"
            alt="감성적 공감 vs 인지적 공감 비교"
            fill
            priority
            sizes="(max-width: 640px) 320px, 360px"
            className="object-cover"
          />
        </div>
        {children && (
          <div className="pointer-events-none absolute inset-x-0 bottom-10 z-20 flex justify-center">
            <div className="pointer-events-auto">{children}</div>
          </div>
        )}
      </div>
    </div>
  );
};
