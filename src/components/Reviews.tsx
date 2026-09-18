import { Star } from "lucide-react";

type Review = {
  name: string;
  stars: number;
  title?: string;
  body: string;
  gradient: string;
};

const reviews: Review[] = [
  { name: "Julian H.", stars: 4, title: "Great!.", body: "Took a bit long but card looks good.", gradient: "from-slate-500 to-slate-800" },
  { name: "T M.", stars: 5, title: "Review.", body: "I like pulling card and sending them to my house, this site is great", gradient: "" },
  { name: "Mauro", stars: 5, body: "Vera Nice, Lets open", gradient: "" },
  { name: "Tomy D.", stars: 5, body: "The pulla very hard but It's very well page", gradient: "" },
  { name: "Jay G.", stars: 5, title: "Very good received in good condition.", body: "I pulled a Flareon ex from prismatic evolutions and it came very fast and in great quality", gradient: "" },
  { name: "Eyman A.", stars: 5, body: "https://gemma.cards/card/OP15/OP15-086?by=Eyman%20Ajiz&t=1789567644659", gradient: "" },
];

export default function Reviews() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="h-5 w-1 rounded-full bg-gold" />
          Rippers say
        </h2>
        <span className="flex items-center gap-1.5 text-sm font-semibold text-zinc-300">
          <Star size={14} className="fill-gold text-gold" />
          4.9 · real reviews
        </span>
      </div>

      <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
        {reviews.map((r) => (
          <div
            key={r.name}
            className="flex gap-3 rounded-xl border border-border bg-panel p-4"
          >
            {r.gradient && (
              <div
                className={`h-12 w-12 shrink-0 rounded-lg bg-gradient-to-br ${r.gradient}`}
              />
            )}
            <div className="min-w-0">
              <div className="flex items-center justify-between gap-2">
                <p className="truncate text-sm font-bold">{r.name}</p>
                <span className="flex shrink-0 gap-0.5">
                  {Array.from({ length: r.stars }).map((_, i) => (
                    <Star key={i} size={11} className="fill-gold text-gold" />
                  ))}
                </span>
              </div>
              <p className="mt-1 text-xs leading-relaxed text-muted">
                {r.title && <span className="font-semibold text-zinc-300">{r.title} </span>}
                {r.body}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
