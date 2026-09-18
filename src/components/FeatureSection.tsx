import { ArrowRight } from "lucide-react";

type FeatureSectionProps = {
  eyebrow: string;
  eyebrowColor: string;
  title: React.ReactNode;
  watermark: string;
  copy: string;
  cta: string;
  divider?: boolean;
};

export default function FeatureSection({
  eyebrow,
  eyebrowColor,
  title,
  watermark,
  copy,
  cta,
  divider = true,
}: FeatureSectionProps) {
  return (
    <section
      className={`relative mt-14 overflow-hidden py-4 text-center ${
        divider ? "border-t border-border pt-14" : ""
      }`}
    >
      <span
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 select-none text-[5rem] font-black leading-none tracking-tight text-white/[0.03] sm:text-[7rem] md:text-[9rem]"
      >
        {watermark}
      </span>

      <div className="relative mx-auto max-w-2xl">
        <span className={`text-xs font-extrabold tracking-widest ${eyebrowColor}`}>
          {eyebrow}
        </span>
        <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
          {title}
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-sm leading-relaxed text-muted sm:text-base">
          {copy}
        </p>
        <button
          type="button"
          className="mx-auto mt-6 flex items-center gap-2 rounded-full border border-border bg-panel-2 px-5 py-3 text-sm font-bold hover:border-zinc-600"
        >
          {cta}
          <ArrowRight size={16} />
        </button>
      </div>
    </section>
  );
}
