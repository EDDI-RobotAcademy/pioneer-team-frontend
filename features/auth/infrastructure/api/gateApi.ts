import { httpClient } from "@/infrastructure/http/httpClient";
import { HttpError } from "@/infrastructure/http/HttpError";

const AUTH_PATH = "/dashboard/auth/verify";

export type GateAuthResult =
  | { success: true }
  | { success: false; reason: "WRONG_PASSWORD" | "NETWORK_ERROR" };

export const verifyDashboardPassword = async (
  password: string,
): Promise<GateAuthResult> => {
  try {
    const response = await httpClient.post<{ verified: boolean }>(AUTH_PATH, {
      password,
    });
    if (!response || response.verified !== true) {
      return { success: false, reason: "WRONG_PASSWORD" };
    }
    return { success: true };
  } catch (error) {
    if (
      error instanceof HttpError &&
      (error.status === 401 || error.status === 403)
    ) {
      return { success: false, reason: "WRONG_PASSWORD" };
    }
    return { success: false, reason: "NETWORK_ERROR" };
  }
};
