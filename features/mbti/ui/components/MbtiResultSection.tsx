"use client";

import type { EmpathyTypeId } from "@/features/mbti/domain/model/empathyType";
import { useConvertTracking } from "@/features/tracking/application/hooks/useConvertTracking";
import { mbtiResultContentId } from "@/features/tracking/domain/contentId";

type Props = {
  empathyType: EmpathyTypeId;
};

export const MbtiResultSection = ({ empathyType }: Props) => {
  useConvertTracking({
    contentId: mbtiResultContentId(empathyType),
    metadata: { mbti_type: empathyType },
  });

  return (
    <div className="text-center text-2xl font-black text-zinc-900">
      모든 문항에 응답했어요
    </div>
  );
};
