import Link from "next/link";
import { MenuCard } from "@/components/MenuCard";
import { OrderButton } from "@/components/OrderButton";
import { popularItems } from "@/config/menu";
import { gallery, highlights, mapsUrl, restaurant, reviews } from "@/config/restaurant";

export default function Home() {
  return (
    <>
      <section className="relative overflow-hidden bg-maroon text-cream">
        <div aria-hidden="true" className="absolute -top-24 -right-24 size-96 rounded-full bg-saffron/30 blur-3xl" />
        <div aria-hidden="true" className="absolute -bottom-32 left-10 size-80 rounded-full bg-gold-glow/20 blur-3xl" />
        <div className="relative mx-auto grid max-w-6xl items-center gap-12 px-4 py-20 sm:py-28 md:grid-cols-2">
          <div>
            <p className="mb-4 inline-block rounded-full bg-white/10 px-3 py-1 text-sm font-semibold">{restaurant.area}</p>
            <h1 className="font-display text-4xl leading-tight font-bold text-balance sm:text-6xl">{restaurant.tagline}</h1>
            <p className="mt-5 max-w-lg text-lg text-cream/85">{restaurant.intro}</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <OrderButton />
              <Link href="/menu/" className="rounded-full border-2 border-cream/40 px-6 py-3 font-bold transition hover:bg-white/10">
                View menu
              </Link>
            </div>
          </div>
          <div aria-hidden="true" className="relative mx-auto grid size-72 place-items-center sm:size-80">
            <div className="absolute inset-0 rounded-full bg-linear-to-br from-saffron to-gold-glow shadow-2xl" />
            <div className="absolute inset-5 rounded-full border-4 border-dashed border-white/40" />
            <span className="relative text-[8rem] drop-shadow-xl sm:text-[9rem]">🍛</span>
            <span className="absolute top-6 -left-2 rounded-2xl bg-white px-3 py-2 text-sm font-bold text-maroon shadow-lg">{restaurant.heroBadges[0]}</span>
            <span className="absolute -right-2 bottom-8 rounded-2xl bg-white px-3 py-2 text-sm font-bold text-maroon shadow-lg">{restaurant.heroBadges[1]}</span>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="highlights-title">
        <h2 id="highlights-title" className="sr-only">Highlights</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="rounded-2xl border border-line bg-white p-6">
              <span className="text-3xl" aria-hidden="true">{h.emoji}</span>
              <h3 className="mt-3 font-display text-xl font-bold">{h.title}</h3>
              <p className="mt-1 text-muted">{h.text}</p>
            </div>
          ))}
        </div>
      </section>

      <section className="bg-sand/60 py-16" aria-labelledby="popular-title">
        <div className="mx-auto max-w-6xl px-4">
          <div className="flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="font-semibold text-saffron-dark">Most ordered</p>
              <h2 id="popular-title" className="font-display text-3xl font-bold sm:text-4xl">Our guests&apos; favourites</h2>
            </div>
            <Link href="/menu/" className="font-bold text-maroon underline underline-offset-4">
              See full menu →
            </Link>
          </div>
          <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {popularItems.map((item) => (
              <MenuCard key={item.id} item={item} />
            ))}
          </div>
        </div>
      </section>

      <section id="gallery" className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="gallery-title">
        <h2 id="gallery-title" className="font-display text-3xl font-bold sm:text-4xl">From our kitchen</h2>
        <div className="mt-8 grid auto-rows-[10rem] grid-cols-2 gap-4 sm:auto-rows-[13rem] md:grid-cols-3">
          {gallery.map((g) => (
            <figure key={g.label} className={`relative grid place-items-center overflow-hidden rounded-3xl bg-linear-to-br ${g.tile}`}>
              <span className="text-6xl drop-shadow-lg sm:text-7xl" aria-hidden="true">{g.emoji}</span>
              <figcaption className="absolute bottom-3 left-3 rounded-full bg-white/90 px-3 py-1 text-sm font-semibold">{g.label}</figcaption>
            </figure>
          ))}
        </div>
      </section>

      <section className="bg-white py-16" aria-labelledby="reviews-title">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="reviews-title" className="font-display text-3xl font-bold sm:text-4xl">What guests say</h2>
          <p className="mt-2 text-sm text-muted">Sample reviews for this demo. A real website shows your Google reviews.</p>
          <div className="mt-8 grid gap-4 md:grid-cols-3">
            {reviews.map((r) => (
              <figure key={r.name} className="rounded-2xl border border-line bg-cream p-6">
                <p className="text-saffron" aria-label={`${r.stars} out of 5 stars`}>
                  {"★".repeat(r.stars)}
                  <span className="text-line">{"★".repeat(5 - r.stars)}</span>
                </p>
                <blockquote className="mt-3">&ldquo;{r.text}&rdquo;</blockquote>
                <figcaption className="mt-4 font-semibold">
                  {r.name} <span className="font-normal text-muted">· sample review</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section id="visit" className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="visit-title">
        <div className="grid gap-8 rounded-3xl bg-charcoal p-8 text-cream sm:p-12 md:grid-cols-2">
          <div>
            <h2 id="visit-title" className="font-display text-3xl font-bold sm:text-4xl">Visit us</h2>
            <p className="mt-3 text-lg text-cream/85">{restaurant.area}</p>
            <p className="mt-1 text-cream/70">Phone: {restaurant.maskedPhone} (hidden in demo)</p>
            <div className="mt-6 flex flex-wrap gap-3">
              <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-saffron px-6 py-3 font-bold text-charcoal transition hover:bg-saffron-light">
                Get directions
              </a>
              <OrderButton className="shadow-none" />
            </div>
          </div>
          <div>
            <h3 className="font-display text-xl font-bold">Opening hours</h3>
            <dl className="mt-4 divide-y divide-white/10">
              {restaurant.hours.map((h) => (
                <div key={h.days} className="flex justify-between gap-4 py-3">
                  <dt className="text-cream/80">{h.days}</dt>
                  <dd className="font-semibold">{h.time}</dd>
                </div>
              ))}
            </dl>
          </div>
        </div>
      </section>
    </>
  );
}
