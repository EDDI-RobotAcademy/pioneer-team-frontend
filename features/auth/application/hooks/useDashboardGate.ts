"use client";

import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { gateAtom } from "@/features/auth/application/atoms/gateAtom";
import {
  clearGateToken,
  readGateToken,
  writeGateToken,
} from "@/features/auth/infrastructure/storage/gateStorage";

export const useDashboardGate = () => {
  const [state, setState] = useAtom(gateAtom);

  useEffect(() => {
    if (state.status !== "IDLE") return;
    const token = readGateToken();
    setState(token ? { status: "UNLOCKED", token } : { status: "LOCKED" });
  }, [state.status, setState]);

  const unlock = useCallback(
    (token: string) => {
      writeGateToken(token);
      setState({ status: "UNLOCKED", token });
    },
    [setState],
  );

  const lock = useCallback(() => {
    clearGateToken();
    setState({ status: "LOCKED" });
  }, [setState]);

  return {
    state,
    isChecking: state.status === "IDLE",
    isLocked: state.status === "LOCKED",
    isUnlocked: state.status === "UNLOCKED",
    unlock,
    lock,
  };
};
