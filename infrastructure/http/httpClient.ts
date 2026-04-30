import { env } from "@/infrastructure/config/env";
import { HttpError } from "@/infrastructure/http/HttpError";

type HttpMethod = "GET" | "POST" | "PATCH" | "DELETE";

type RequestOptions = {
  headers?: Record<string, string>;
};

const JSON_HEADERS: Record<string, string> = {
  "Content-Type": "application/json",
};

const buildUrl = (path: string): string => {
  if (!path.startsWith("/")) {
    throw new Error(`HTTP path는 '/'로 시작해야 합니다: ${path}`);
  }
  return `${env.apiBaseUrl}${path}`;
};

const isRedirectStatus = (status: number): boolean =>
  status >= 300 && status < 400;

const parseJsonBody = async <T>(
  response: Response,
): Promise<T | undefined> => {
  const text = await response.text();
  if (text.length === 0) {
    return undefined;
  }
  return JSON.parse(text) as T;
};

const request = async <T>(
  method: HttpMethod,
  path: string,
  body?: unknown,
  options?: RequestOptions,
): Promise<T | undefined> => {
  const response = await fetch(buildUrl(path), {
    method,
    credentials: "include",
    redirect: "manual",
    headers: {
      ...JSON_HEADERS,
      ...(options?.headers ?? {}),
    },
    body: body === undefined ? undefined : JSON.stringify(body),
  });

  if (
    response.type === "opaqueredirect" ||
    isRedirectStatus(response.status)
  ) {
    return undefined;
  }

  if (!response.ok) {
    throw new HttpError(response.status, response.statusText);
  }

  return parseJsonBody<T>(response);
};

export const httpClient = {
  get: <T>(path: string, options?: RequestOptions) =>
    request<T>("GET", path, undefined, options),
  post: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("POST", path, body, options),
  patch: <T>(path: string, body?: unknown, options?: RequestOptions) =>
    request<T>("PATCH", path, body, options),
  delete: <T>(path: string, options?: RequestOptions) =>
    request<T>("DELETE", path, undefined, options),
};
