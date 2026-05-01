"use client";

import { useState, type FormEvent } from "react";

type Props = {
  onSubmit: (password: string) => void;
  isSubmitting?: boolean;
  errorMessage?: string;
};

export const PasswordGate = ({
  onSubmit,
  isSubmitting = false,
  errorMessage,
}: Props) => {
  const [password, setPassword] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const trimmed = password.trim();
    if (!trimmed) return;
    onSubmit(trimmed);
  };

  const inputId = "dashboard-gate-password";
  const errorId = "dashboard-gate-error";

  return (
    <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-zinc-50 via-white to-indigo-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-zinc-100"
      >
        <div className="flex flex-col items-center">
          <div
            aria-hidden
            className="flex h-12 w-12 items-center justify-center rounded-full bg-indigo-50 text-2xl"
          >
            🔒
          </div>
          <h1 className="mt-4 text-xl font-black text-zinc-900">
            대시보드 접근
          </h1>
          <p className="mt-1 text-center text-sm text-zinc-500">
            관리자 비밀번호를 입력해 주세요.
          </p>
        </div>

        <div className="mt-8">
          <label htmlFor={inputId} className="sr-only">
            비밀번호
          </label>
          <input
            id={inputId}
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={isSubmitting}
            placeholder="••••••••"
            autoComplete="current-password"
            autoFocus
            aria-invalid={Boolean(errorMessage)}
            aria-describedby={errorMessage ? errorId : undefined}
            className={`w-full rounded-lg border px-4 py-3 text-base transition-colors focus:outline-none focus:ring-2 disabled:opacity-60 ${
              errorMessage
                ? "border-rose-400 focus:border-rose-500 focus:ring-rose-500/20"
                : "border-zinc-300 focus:border-indigo-500 focus:ring-indigo-500/20"
            }`}
          />
          {errorMessage && (
            <p
              id={errorId}
              role="alert"
              className="mt-2 text-sm font-medium text-rose-600"
            >
              {errorMessage}
            </p>
          )}
        </div>

        <button
          type="submit"
          disabled={isSubmitting || !password.trim()}
          className="mt-6 flex w-full items-center justify-center gap-2 rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white shadow-sm transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? (
            <>
              <span
                aria-hidden
                className="inline-block h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white"
              />
              <span>확인 중...</span>
            </>
          ) : (
            <span>들어가기</span>
          )}
        </button>
      </form>
    </div>
  );
};
