import Image from "next/image";
import type { ReactNode } from "react";

const STAR_CLIP =
  "[clip-path:polygon(50%_0%,61%_35%,98%_35%,68%_57%,79%_91%,50%_70%,21%_91%,32%_57%,2%_35%,39%_35%)]";

type Props = {
  children?: ReactNode;
};

const Bulb = ({ delay }: { delay: number }) => (
  <span
    aria-hidden
    className="h-2.5 w-2.5 rounded-full bg-orange-200 ring-1 ring-orange-500 shadow-[0_0_10px_3px_rgba(249,115,22,0.85)] animate-pulse"
    style={{ animationDelay: `${delay}s` }}
  />
);

const TOP_BULB_COUNT = 4;
const BOTTOM_BULB_COUNT = 4;
const SIDE_BULB_COUNT = 5;
const STAGGER = 0.13;

const range = (n: number) => Array.from({ length: n });

export const HeroImage = ({ children }: Props) => {
  return (
    <div className="relative mt-12">
      <div className="relative animate-[float_4s_ease-in-out_infinite]">
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

        <div className="relative -rotate-1 rounded-[1.75rem] bg-white p-3 border-[3px] border-orange-400 animate-[neonBlink_3.5s_infinite] transition-transform hover:rotate-0">
          <div className="pointer-events-none absolute -top-[5px] left-4 right-4 z-30 flex justify-around">
            {range(TOP_BULB_COUNT).map((_, i) => (
              <Bulb key={`t-${i}`} delay={i * STAGGER} />
            ))}
          </div>
          <div className="pointer-events-none absolute -bottom-[5px] left-4 right-4 z-30 flex justify-around">
            {range(BOTTOM_BULB_COUNT).map((_, i) => (
              <Bulb key={`b-${i}`} delay={(TOP_BULB_COUNT + i) * STAGGER} />
            ))}
          </div>
          <div className="pointer-events-none absolute -left-[5px] bottom-4 top-4 z-30 flex flex-col justify-around">
            {range(SIDE_BULB_COUNT).map((_, i) => (
              <Bulb
                key={`l-${i}`}
                delay={(TOP_BULB_COUNT + BOTTOM_BULB_COUNT + i) * STAGGER}
              />
            ))}
          </div>
          <div className="pointer-events-none absolute -right-[5px] bottom-4 top-4 z-30 flex flex-col justify-around">
            {range(SIDE_BULB_COUNT).map((_, i) => (
              <Bulb
                key={`r-${i}`}
                delay={
                  (TOP_BULB_COUNT +
                    BOTTOM_BULB_COUNT +
                    SIDE_BULB_COUNT +
                    i) *
                  STAGGER
                }
              />
            ))}
          </div>

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
    </div>
  );
};
