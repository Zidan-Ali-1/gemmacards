const links = [
  { label: "how verification works", href: "/verification" },
  { label: "FAQ", href: "/faq" },
  { label: "Terms & Conditions", href: "/terms" },
  { label: "Refund Policy", href: "/refund-policy" },
  { label: "Privacy", href: "/privacy" },
];

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-border pt-8">
      <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
        <div className="flex items-center gap-2">
          <span className="h-6 w-6 rounded-full bg-gradient-to-br from-accent to-accent-2" />
          <span className="text-base font-bold">Gemma</span>
        </div>
        <p className="text-xs text-muted">
          Every pack is verifiable:{" "}
          {links.map((l, i) => (
            <span key={l.href}>
              <a href={l.href} className="text-zinc-300 underline hover:text-white">
                {l.label}
              </a>
              {i < links.length - 1 && " · "}
            </span>
          ))}
        </p>
      </div>

      <p className="mt-6 max-w-4xl text-xs leading-relaxed text-muted">
        Gemma is not affiliated with Bandai, The Pokémon Company, or LimitlessTCG.
        Packs are digital products whose card contents are random and independently
        verifiable: pack and card images shown at the moment of opening are digital
        samples (images) only. The corresponding physical cards are purchased on the
        open market and shipped directly to the customer by gemma.cards. 18+ only.
        Support:{" "}
        <a href="mailto:support@gemmacards.com" className="underline hover:text-white">
          support@gemmacards.com
        </a>
        .
      </p>

      <p className="mb-8 mt-4 text-xs text-muted">
        <span className="font-semibold text-zinc-300">Gemma Media SRL</span> · Via
        Guizzelmi 4, 59100 Prato (PO), Italy · P.IVA 02663020978 ·{" "}
        <a href="mailto:support@gemmacards.com" className="underline hover:text-white">
          support@gemmacards.com
        </a>
      </p>
    </footer>
  );
}
