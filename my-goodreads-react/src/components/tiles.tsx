const ASPECTS = [
  "aspect-[3/4]",
  "aspect-square",
  "aspect-[2/3]",
  "aspect-[4/5]",
  "aspect-[3/5]",
  "aspect-[5/4]",
  "aspect-[9/16]",
];

const TILES = Array.from({ length: 40 }, (_, i) => ({
  id: i,
  aspect: ASPECTS[(i * 3 + (i % 4)) % ASPECTS.length],
}));

export function Tiles() {
    return (
        <div className="mx-auto max-w-[1800px] columns-2 gap-4 sm:columns-3 lg:columns-4 xl:columns-5 2xl:columns-6">
            {TILES.map((tile) => (
                <div
                    key={tile.id}
                    className={`${tile.aspect} mb-4 w-full break-inside-avoid rounded-2xl bg-primary transition-all hover:scale-102`}
                />
            ))}
        </div>
    );
}