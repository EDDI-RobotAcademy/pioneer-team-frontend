export type ContentSelection =
  | { type: "all" }
  | { type: "single"; contentId: string };

export const DEFAULT_CONTENT_SELECTION: ContentSelection = { type: "all" };

export const contentSelectionEquals = (
  a: ContentSelection,
  b: ContentSelection,
): boolean => {
  if (a.type === "all" && b.type === "all") return true;
  if (a.type === "single" && b.type === "single") {
    return a.contentId === b.contentId;
  }
  return false;
};
