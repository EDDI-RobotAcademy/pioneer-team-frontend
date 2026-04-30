type Props = {
  onStart: () => void;
  isStarting?: boolean;
};

export const PlayfulStartButton = ({ onStart, isStarting = false }: Props) => {
  return (
    <button
      type="button"
      onClick={onStart}
      disabled={isStarting}
      className="group inline-flex h-12 w-fit items-center justify-center gap-2 rounded-full bg-[#6667AB] px-9 text-base font-black text-white shadow-[0_6px_0_#4D4E8C] transition-all hover:translate-y-0.5 hover:bg-[#5556A0] hover:shadow-[0_4px_0_#4D4E8C] active:translate-y-1 active:shadow-[0_0_0_#4D4E8C] disabled:cursor-not-allowed disabled:opacity-60"
    >
      <span>{isStarting ? "잠깐, 준비 중!" : "지금 놀러가기"}</span>
      <span
        aria-hidden
        className="text-lg transition-transform group-hover:translate-x-1"
      >
        →
      </span>
    </button>
  );
};
