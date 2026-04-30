"use client";

import type { ReactNode } from "react";
import { useImpressionTracking } from "@/features/tracking/application/hooks/useImpressionTracking";

type Props = {
  contentId: string;
  children: ReactNode;
  threshold?: number;
  className?: string;
};

export const ImpressionTracker = ({
  contentId,
  children,
  threshold,
  className,
}: Props) => {
  const ref = useImpressionTracking<HTMLDivElement>({
    contentId,
    threshold,
  });
  return (
    <div ref={ref} className={className}>
      {children}
    </div>
  );
};
