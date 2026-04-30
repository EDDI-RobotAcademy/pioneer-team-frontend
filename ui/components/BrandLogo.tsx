import Link from "next/link";

type Tile = {
  ch: string;
  bg: string;
  text: string;
  rot: string;
};

const TILES: ReadonlyArray<Tile> = [
  { ch: "5", bg: "bg-rose-300", text: "text-rose-900", rot: "-rotate-6" },
  { ch: "늘", bg: "bg-amber-300", text: "text-amber-900", rot: "rotate-3" },
  { ch: "놀", bg: "bg-sky-300", text: "text-sky-900", rot: "-rotate-3" },
  { ch: "2", bg: "bg-lime-300", text: "text-lime-900", rot: "rotate-6" },
];

export const BrandLogo = () => {
  return (
    <Link
      href="/"
      aria-label="5늘 놀2 홈"
      className="inline-flex select-none items-center"
    >
      {TILES.map((tile, i) => (
        <span
          key={i}
          className={`inline-flex h-9 w-9 items-center justify-center rounded-xl text-lg font-black shadow-sm ${tile.bg} ${tile.text} ${tile.rot} ${i === 2 ? "ml-2" : "ml-0.5"}`}
        >
          {tile.ch}
        </span>
      ))}
    </Link>
  );
};
