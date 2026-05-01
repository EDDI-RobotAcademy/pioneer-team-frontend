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

  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 p-6">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-xl ring-1 ring-zinc-200"
      >
        <h1 className="text-center text-xl font-black text-zinc-900">
          대시보드 접근
        </h1>
        <p className="mt-2 text-center text-sm text-zinc-500">
          비밀번호를 입력해주세요.
        </p>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          disabled={isSubmitting}
          className="mt-6 w-full rounded-lg border border-zinc-300 px-4 py-3 text-base focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500/20 disabled:opacity-60"
          placeholder="비밀번호"
          aria-label="비밀번호"
          autoComplete="current-password"
          autoFocus
        />
        {errorMessage && (
          <p className="mt-2 text-sm font-medium text-rose-600">
            {errorMessage}
          </p>
        )}
        <button
          type="submit"
          disabled={isSubmitting || !password.trim()}
          className="mt-6 w-full rounded-lg bg-indigo-600 py-3 text-sm font-bold text-white transition-colors hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60"
        >
          {isSubmitting ? "확인 중..." : "들어가기"}
        </button>
      </form>
    </div>
  );
};
