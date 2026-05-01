"use client";

import { useAtom } from "jotai";
import { useCallback, useEffect } from "react";
import { gateAtom } from "@/features/auth/application/atoms/gateAtom";
import { INITIAL_LOCKED_DETAIL } from "@/features/auth/domain/state/gateState";
import {
  clearGateVerified,
  readGateVerified,
  writeGateVerified,
} from "@/features/auth/infrastructure/storage/gateStorage";
import { verifyDashboardPassword } from "@/features/auth/infrastructure/api/gateApi";

const ERROR_MESSAGES: Record<"WRONG_PASSWORD" | "NETWORK_ERROR", string> = {
  WRONG_PASSWORD: "비밀번호가 일치하지 않아요.",
  NETWORK_ERROR: "잠시 후 다시 시도해주세요.",
};

export const useDashboardGate = () => {
  const [state, setState] = useAtom(gateAtom);

  useEffect(() => {
    if (state.status !== "IDLE") return;
    setState(
      readGateVerified()
        ? { status: "UNLOCKED" }
        : { status: "LOCKED", detail: INITIAL_LOCKED_DETAIL },
    );
  }, [state.status, setState]);

  const submit = useCallback(
    async (password: string): Promise<void> => {
      setState({
        status: "LOCKED",
        detail: { isSubmitting: true, errorMessage: null },
      });
      const result = await verifyDashboardPassword(password);
      if (result.success) {
        writeGateVerified(true);
        setState({ status: "UNLOCKED" });
        return;
      }
      setState({
        status: "LOCKED",
        detail: {
          isSubmitting: false,
          errorMessage: ERROR_MESSAGES[result.reason],
        },
      });
    },
    [setState],
  );

  const lock = useCallback(() => {
    clearGateVerified();
    setState({ status: "LOCKED", detail: INITIAL_LOCKED_DETAIL });
  }, [setState]);

  const lockedDetail =
    state.status === "LOCKED" ? state.detail : INITIAL_LOCKED_DETAIL;

  return {
    state,
    isChecking: state.status === "IDLE",
    isLocked: state.status === "LOCKED",
    isUnlocked: state.status === "UNLOCKED",
    isSubmitting: lockedDetail.isSubmitting,
    errorMessage: lockedDetail.errorMessage,
    submit,
    lock,
  };
};
