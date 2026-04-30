"use client";

import { useState } from "react";

type Props = {
  shareUrl: string;
  shareTitle: string;
  accentColor: string;
};

export const SeriousShareMenu = ({
  shareUrl,
  shareTitle,
  accentColor,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const flashToast = (message: string): void => {
    setToast(message);
    window.setTimeout(() => setToast(null), 2000);
  };

  const onCopyLink = async (): Promise<void> => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      flashToast("링크가 복사되었어요");
    } catch {
      flashToast("링크 복사에 실패했어요");
    }
  };

  const onShareKakao = async (): Promise<void> => {
    if (typeof navigator !== "undefined" && "share" in navigator) {
      try {
        await navigator.share({ title: shareTitle, url: shareUrl });
        return;
      } catch {
        /* cancelled or unsupported */
      }
    }
    flashToast("공유가 지원되지 않아요");
  };

  return (
    <div className="relative flex flex-col items-center gap-3">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className="rounded-md px-6 py-3 text-sm font-bold text-zinc-900 shadow-md"
        style={{ backgroundColor: accentColor }}
      >
        결과 공유하기
      </button>

      {open && (
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCopyLink}
            className="rounded-md bg-[#334155] px-4 py-2 text-xs font-bold text-zinc-100 ring-1 ring-[#475569] hover:bg-[#475569]"
          >
            링크 복사
          </button>
          <button
            type="button"
            onClick={onShareKakao}
            className="rounded-md bg-[#60A5FA] px-4 py-2 text-xs font-bold text-zinc-900 hover:bg-[#3B82F6]"
          >
            공유하기
          </button>
        </div>
      )}

      {toast && (
        <div className="fixed bottom-8 left-1/2 z-50 -translate-x-1/2 rounded-md bg-zinc-100 px-5 py-3 text-sm font-bold text-zinc-900 shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
};
