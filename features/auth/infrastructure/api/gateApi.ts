import { httpClient } from "@/infrastructure/http/httpClient";
import { HttpError } from "@/infrastructure/http/HttpError";

const AUTH_PATH = "/admin/auth";

export type GateAuthResult =
  | { success: true; token: string }
  | { success: false; reason: "WRONG_PASSWORD" | "NETWORK_ERROR" };

export const verifyDashboardPassword = async (
  password: string,
): Promise<GateAuthResult> => {
  try {
    const response = await httpClient.post<{ token: string }>(AUTH_PATH, {
      password,
    });
    if (!response || typeof response.token !== "string") {
      return { success: false, reason: "NETWORK_ERROR" };
    }
    return { success: true, token: response.token };
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
