"use client";

import {
  Home,
  PackageOpen,
  Copy,
  BookOpen,
  ArrowLeftRight,
  LayoutGrid,
  Aperture,
  Trophy,
  Gift,
  Gem,
  ShieldCheck,
  Truck,
  Search,
  HelpCircle,
  type LucideIcon,
} from "lucide-react";

type NavItem = {
  label: string;
  icon: LucideIcon;
  href: string;
  active?: boolean;
};

const navItems: NavItem[] = [
  { label: "Home", icon: Home, href: "/", active: true },
  { label: "Rip packs", icon: PackageOpen, href: "/rip-packs" },
  { label: "Your packs", icon: Copy, href: "/your-packs" },
  { label: "Binder", icon: BookOpen, href: "/binder" },
  { label: "Swap", icon: ArrowLeftRight, href: "/swap" },
  { label: "Collection", icon: LayoutGrid, href: "/collection" },
  { label: "Vault", icon: Aperture, href: "/vault" },
  { label: "Pack Rush", icon: Trophy, href: "/pack-rush" },
  { label: "Rewards", icon: Gift, href: "/rewards" },
  { label: "Coins", icon: Gem, href: "/coins" },
  { label: "Verification", icon: ShieldCheck, href: "/verification" },
  { label: "Shipping", icon: Truck, href: "/shipping" },
  { label: "Verify a pull", icon: Search, href: "/verify-a-pull" },
  { label: "FAQ", icon: HelpCircle, href: "/faq" },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-16 hidden h-[calc(100vh-4rem)] w-60 shrink-0 overflow-y-auto border-r border-border px-3 py-4 lg:block">
      <nav className="flex flex-col gap-0.5">
        {navItems.map(({ label, icon: Icon, href, active }) => (
          <a
            key={label}
            href={href}
            className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm transition-colors ${
              active
                ? "bg-panel-2 font-semibold text-white"
                : "text-zinc-400 hover:bg-panel-2 hover:text-zinc-100"
            }`}
          >
            <Icon size={18} strokeWidth={2} />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}
