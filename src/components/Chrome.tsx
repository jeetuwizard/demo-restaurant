"use client";

import Link from "next/link";
import { useState } from "react";
import { restaurant } from "@/config/restaurant";
import { studio, studioWhatsappLink } from "@/config/studio";
import { useCart } from "./Cart";

const links = [
  { href: "/", label: "Home" },
  { href: "/menu/", label: "Menu" },
  { href: "/#gallery", label: "Gallery" },
  { href: "/#visit", label: "Visit us" },
];

export function DemoBanner() {
  return (
    <div className="bg-charcoal px-4 py-2 text-center text-xs text-cream sm:text-sm">
      Demo website by{" "}
      <a href={studio.portfolioUrl} className="font-semibold underline underline-offset-2">
        {studio.name}
      </a>{" "}
      — this restaurant is fictional.
    </div>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const { count, openOrder } = useCart();
  return (
    <header className="sticky top-0 z-30 border-b border-line bg-cream/90 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="font-display text-xl font-bold text-maroon">
          {restaurant.name}
        </Link>
        <nav className="hidden items-center gap-7 md:flex" aria-label="Main">
          {links.map((l) => (
            <Link key={l.href} href={l.href} className="font-medium text-muted transition hover:text-maroon">
              {l.label}
            </Link>
          ))}
          <button type="button" onClick={openOrder} className="rounded-full bg-maroon px-4 py-2 font-semibold text-cream transition hover:bg-maroon-dark">
            Your order{count > 0 ? ` (${count})` : ""}
          </button>
        </nav>
        <button
          type="button"
          className="rounded-lg px-3 py-2 font-semibold text-maroon md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen(!open)}
        >
          {open ? "Close" : "Menu ☰"}
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
            Your order{count > 0 ? ` (${count})` : ""}
          </button>
        </nav>
      )}
    </header>
  );
}

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 md:grid-cols-2">
        <div>
          <p className="font-display text-2xl font-bold">{restaurant.name}</p>
          <p className="mt-2 text-cream/75">{restaurant.area}</p>
          <p className="mt-1 text-cream/75">Phone: {restaurant.maskedPhone} (hidden in demo)</p>
        </div>
        <div className="rounded-3xl bg-white/5 p-6 ring-1 ring-white/10">
          <p className="font-display text-xl font-bold">Want a website like this for your restaurant?</p>
          <p className="mt-2 text-sm text-cream/75">Menu, online ordering on WhatsApp, photos and directions, built by {studio.name}.</p>
          <a
            href={studioWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-5 inline-block rounded-full bg-whatsapp px-5 py-3 font-bold text-white transition hover:bg-whatsapp-dark"
          >
            Chat with {studio.name} on WhatsApp
          </a>
        </div>
      </div>
      <div className="border-t border-white/10 px-4 py-5 text-center text-sm text-cream/70">
        Demo website by{" "}
        <a href={studio.portfolioUrl} className="font-semibold text-cream underline underline-offset-2">
          {studio.name}
        </a>
        . {restaurant.name} is a fictional restaurant.
      </div>
    </footer>
  );
}
