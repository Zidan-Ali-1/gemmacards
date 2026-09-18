export default function Contact() {
  return (
    <section className="mt-14">
      <div className="grid grid-cols-1 gap-8 rounded-2xl border border-border bg-panel p-6 sm:p-10 md:grid-cols-2 md:gap-10">
        <div>
          <span className="text-xs font-extrabold tracking-widest text-accent">
            CONTACT
          </span>
          <h2 className="mt-3 text-3xl font-extrabold leading-tight sm:text-4xl">
            Questions? Talk to a human.
          </h2>
          <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted">
            Shipping, payments, a rip that looks off — write to us and it lands
            straight on the support desk. We reply by email, usually within a few
            hours.
          </p>
        </div>

        <form className="flex flex-col gap-4">
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-300">
            Your email
            <input
              type="email"
              placeholder="you@example.com"
              className="rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-300">
            Subject
            <input
              type="text"
              placeholder="Shipping, payments, my account..."
              className="rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
            />
          </label>
          <label className="flex flex-col gap-1.5 text-sm font-semibold text-zinc-300">
            Message
            <textarea
              rows={4}
              placeholder="Tell us everything..."
              className="resize-none rounded-lg border border-border bg-bg px-3.5 py-2.5 text-sm text-zinc-100 placeholder:text-zinc-600 focus:border-accent focus:outline-none"
            />
          </label>
          <button
            type="submit"
            className="mt-1 rounded-lg bg-gradient-to-r from-accent to-accent-2 px-4 py-3 text-sm font-bold text-white hover:brightness-110"
          >
            Send message
          </button>
        </form>
      </div>
    </section>
  );
}
