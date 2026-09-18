import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "1",
    color: "text-accent",
    title: "Every pull lands here",
    body: "Rip a pack and the cards go straight to your binder.",
  },
  {
    n: "2",
    color: "text-emerald-400",
    title: "Live value, your call",
    body: "Market prices update live. Keep, ship home, or trade back at 75%.",
  },
  {
    n: "3",
    color: "text-gold",
    title: "Show off your hits",
    body: "Every card has a shareable 3D page. Flex your best pull with one link.",
  },
];

export default function BinderFeatures() {
  return (
    <section className="mt-10">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="flex items-center gap-2 text-xl font-bold">
          <span className="h-5 w-1 rounded-full bg-violet-400" />
          Your binder
        </h2>
        <a
          href="/binder"
          className="flex items-center gap-1 text-sm font-semibold text-accent hover:text-accent-2"
        >
          Open it
          <ArrowRight size={14} />
        </a>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {steps.map((s) => (
          <div
            key={s.n}
            className="rounded-xl border border-border bg-panel p-5"
          >
            <span className={`text-sm font-extrabold ${s.color}`}>{s.n}</span>
            <p className="mt-2 text-base font-bold">{s.title}</p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted">{s.body}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
