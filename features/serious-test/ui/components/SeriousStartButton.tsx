type Props = {
  onStart: () => void;
  isStarting?: boolean;
};

export const SeriousStartButton = ({ onStart, isStarting = false }: Props) => {
  return (
    <button
      type="button"
      onClick={onStart}
      disabled={isStarting}
      className="inline-flex h-12 w-fit items-center justify-center rounded-md bg-[#60A5FA] px-9 text-base font-bold text-zinc-900 shadow-md transition-colors hover:bg-[#3B82F6] disabled:cursor-not-allowed disabled:opacity-60"
    >
      {isStarting ? "준비 중..." : "테스트 시작"}
    </button>
  );
};
