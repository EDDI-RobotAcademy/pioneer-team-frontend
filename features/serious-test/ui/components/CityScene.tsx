"use client";

import Image from "next/image";

export const CityScene = () => {
  return (
    <div className="absolute inset-0">
      <Image
        src="/images/ceo/city.png"
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[#0F172A]/60 via-[#0F172A]/30 to-[#0F172A]/85" />
    </div>
  );
};
