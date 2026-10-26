"use client";

import Link from "next/link";
import { useState } from "react";
import { mapsUrl, restaurant } from "@/config/restaurant";
import { studio, studioWhatsappLink } from "@/config/studio";
import { useCart } from "./Cart";
import { Icon } from "./Icon";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu/", label: "Menu" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#visit", label: "Visit us" },
];

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, openOrder } = useCart();
  const orderLabel = `Your order${count > 0 ? ` (${count})` : ""}`;
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-3 px-4">
        <Link href="/" className="min-w-0 truncate font-display text-xl font-bold text-maroon">
          {restaurant.name}
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-medium text-muted transition hover:text-maroon">
              {l.label}
            </Link>
          ))}
          <button type="button" onClick={openOrder} className="rounded-full bg-maroon px-4 py-2 font-semibold text-cream transition hover:bg-maroon-dark">
            {orderLabel}
          </button>
        </nav>
        <button
          type="button"
          className="grid size-11 shrink-0 place-items-center rounded-lg text-maroon md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? "Close navigation" : "Open navigation"}
          onClick={() => setOpen(!open)}
        >
          <Icon name={open ? "close" : "menu"} />
        </button>
      </div>
      {open && (
        <nav id="mobile-nav" className="border-t border-line px-4 pb-4 md:hidden" aria-label="Mobile">
          {links.map((l) => (
            <Link key={l.href} href={l.href} onClick={() => setOpen(false)} className="block py-3 font-medium">
              {l.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setOpen(false);
              openOrder();
            }}
            className="mt-2 w-full rounded-full bg-maroon px-4 py-3 font-semibold text-cream"
          >
            {orderLabel}
          </button>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:grid-cols-2 lg:grid-cols-3">
        <div>
          <p className="font-display text-2xl font-bold">{restaurant.name}</p>
          <p className="mt-2 text-cream/75">{restaurant.cuisine}</p>
          <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="mt-3 flex items-center gap-2 text-cream/75 hover:text-cream">
            <Icon name="pin" className="size-4 shrink-0" />
            {restaurant.area}
          </a>
        </div>
        <div>
          <p className="font-display text-lg font-bold">Opening hours</p>
          <ul className="mt-3 space-y-1 text-cream/75">
            {restaurant.hours.map((h) => (
              <li key={h.days}>
                {h.days}: <span className="text-cream">{h.time}</span>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <p className="font-display text-lg font-bold">Explore</p>
          <ul className="mt-3 space-y-1 text-cream/75">
            {links.slice(1).map((l) => (
              <li key={l.href}>
                <Link href={l.href} className="hover:text-cream">{l.label}</Link>
              </li>
            ))}
            <li>
              <Link href="/credits/" className="hover:text-cream">Photo credits</Link>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-cream/70">
        <p>
          Concept website designed and built by{" "}
          <a href={studio.portfolioUrl} className="font-semibold text-cream underline underline-offset-2">
            {studio.name}
          </a>
          . {restaurant.name} is a concept restaurant.
        </p>
        <p className="mt-1">
          <a href={studioWhatsappLink()} target="_blank" rel="noopener noreferrer" className="underline underline-offset-2 hover:text-cream">
            Want a website like this for your restaurant?
          </a>
        </p>
      </div>
    </footer>
  );
}
