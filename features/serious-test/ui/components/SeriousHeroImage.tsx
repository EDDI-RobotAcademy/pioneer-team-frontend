import Image from "next/image";
import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  src: string;
  alt: string;
};

export const SeriousHeroImage = ({ children, src, alt }: Props) => {
  return (
    <div className="relative">
      <div className="relative rounded-xl bg-[#1E293B] p-2 ring-1 ring-[#334155] shadow-2xl">
        <div className="relative h-[min(80vh,46rem)] aspect-[572/1024] overflow-hidden rounded-lg">
          <Image
            src={src}
            alt={alt}
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
