import type { Metadata } from "next";
import { MenuCard, VegMark } from "@/components/MenuCard";
import { menu } from "@/config/menu";

export const metadata: Metadata = { title: "Menu" };

export default function MenuPage() {
  return (
    <>
      <section className="bg-maroon text-cream">
        <div className="mx-auto max-w-6xl px-4 py-14">
          <h1 className="font-display text-4xl font-bold sm:text-5xl">Our menu</h1>
          <p className="mt-3 max-w-xl text-cream/85">Add dishes to your order, then send it to us on WhatsApp in one tap.</p>
          <p className="mt-4 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
            <span className="flex items-center gap-2 rounded bg-white px-2 py-1 text-charcoal"><VegMark veg /> Veg</span>
            <span className="flex items-center gap-2 rounded bg-white px-2 py-1 text-charcoal"><VegMark veg={false} /> Non-veg</span>
          </p>
        </div>
      </section>

      <nav className="sticky top-16 z-20 border-b border-line bg-cream/95 backdrop-blur" aria-label="Menu categories">
        <ul className="mx-auto flex max-w-6xl gap-2 overflow-x-auto px-4 py-3">
          {menu.map((c) => (
            <li key={c.id} className="shrink-0">
              <a href={`#${c.id}`} className="block rounded-full border border-line bg-white px-4 py-2 text-sm font-semibold whitespace-nowrap transition hover:border-saffron hover:text-saffron-dark">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-6xl space-y-14 px-4 py-12">
        {menu.map((c) => (
          <section key={c.id} id={c.id} aria-labelledby={`${c.id}-title`}>
            <h2 id={`${c.id}-title`} className="font-display text-3xl font-bold">{c.title}</h2>
            <div className="mt-6 grid gap-4 md:grid-cols-2">
              {c.items.map((item) => (
                <MenuCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>
    </>
  );
}
