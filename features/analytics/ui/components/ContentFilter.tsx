"use client";

import { useContentFilter } from "@/features/analytics/application/hooks/useContentFilter";
import { CONTENT_CATALOG } from "@/features/analytics/domain/data/contentCatalog";

export const ContentFilter = () => {
  const { selection, select } = useContentFilter();
  const isAll = selection.type === "all";

  return (
    <div className="flex flex-wrap items-center gap-2">
      <button
        type="button"
        onClick={() => select({ type: "all" })}
        aria-pressed={isAll}
        className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
          isAll
            ? "bg-emerald-600 text-white"
            : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
        }`}
      >
        전체
      </button>
      {CONTENT_CATALOG.map((entry) => {
        const isSelected =
          selection.type === "single" && selection.contentId === entry.key;
        return (
          <button
            key={entry.key}
            type="button"
            onClick={() => select({ type: "single", contentId: entry.key })}
            aria-pressed={isSelected}
            className={`rounded-md px-3 py-1.5 text-xs font-bold transition-colors sm:text-sm ${
              isSelected
                ? "bg-emerald-600 text-white"
                : "bg-zinc-100 text-zinc-700 hover:bg-zinc-200"
            }`}
          >
            {entry.label}
          </button>
        );
      })}
    </div>
  );
};
