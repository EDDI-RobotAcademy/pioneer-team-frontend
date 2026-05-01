"use client";

import { useDashboardGate } from "@/features/analytics/application/hooks/useDashboardGate";
import { PasswordGate } from "@/features/analytics/ui/components/PasswordGate";
import { FunnelDashboard } from "@/features/analytics/ui/components/FunnelDashboard";

export default function Page() {
  const { isChecking, isUnlocked, isSubmitting, errorMessage, submit } =
    useDashboardGate();

  if (isChecking) return null;

  if (!isUnlocked) {
    return (
      <PasswordGate
        onSubmit={(password) => {
          void submit(password);
        }}
        isSubmitting={isSubmitting}
        errorMessage={errorMessage ?? undefined}
      />
    );
  }

  return <FunnelDashboard />;
}
