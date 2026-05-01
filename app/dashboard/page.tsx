"use client";

import { useDashboardGate } from "@/features/auth/application/hooks/useDashboardGate";
import { PasswordGate } from "@/features/auth/ui/components/PasswordGate";

export default function Page() {
  const { isChecking, isUnlocked, unlock } = useDashboardGate();

  if (isChecking) {
    return null;
  }

  if (!isUnlocked) {
    return <PasswordGate onSubmit={(password) => unlock(password)} />;
  }

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
      <div className="rounded-2xl bg-white p-8 shadow ring-1 ring-zinc-200">
        <h1 className="text-2xl font-black text-zinc-900">대시보드</h1>
        <p className="mt-2 text-sm text-zinc-500">
          (다음 backlog에서 funnel/KPI 구현)
        </p>
      </div>
    </div>
  );
}
