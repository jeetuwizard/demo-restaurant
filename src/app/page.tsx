import Link from "next/link";
import { Icon } from "@/components/Icon";
import { MenuCard } from "@/components/MenuCard";
import { OrderButton } from "@/components/OrderButton";
import { Photo } from "@/components/Photo";
import { popularItems } from "@/config/menu";
import { gallery, highlights, howToOrder, mapsUrl, restaurant, story } from "@/config/restaurant";

export default function Home() {
  return (
    <>
      <section className="relative isolate flex min-h-[34rem] items-end overflow-hidden bg-charcoal text-cream sm:min-h-[40rem]">
        <Photo slot="hero" width={1800} sizes="100vw" preload className="-z-10 object-[50%_80%]" />
        <div aria-hidden="true" className="absolute inset-0 -z-10 bg-linear-to-t from-charcoal via-charcoal/70 to-charcoal/20" />
        <div className="mx-auto w-full max-w-6xl px-4 pt-32 pb-14 sm:pb-20">
          <p className="inline-flex items-center gap-2 rounded-full bg-white/15 px-3 py-1 text-sm font-semibold backdrop-blur">
            <Icon name="pin" className="size-4" />
            {restaurant.area}
          </p>
          <h1 className="mt-4 max-w-3xl font-display text-4xl leading-tight font-bold text-balance sm:text-6xl">{restaurant.tagline}</h1>
          <p className="mt-5 max-w-xl text-lg text-cream/85">{restaurant.intro}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <OrderButton />
            <Link href="/menu/" className="rounded-full border-2 border-cream/50 px-6 py-3 font-bold backdrop-blur transition hover:bg-white/10">
              View menu
            </Link>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-14" aria-labelledby="highlights-title">
        <h2 id="highlights-title" className="sr-only">Highlights</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {highlights.map((h) => (
            <div key={h.title} className="flex gap-4 rounded-2xl border border-line bg-white p-5">
              <span className="grid size-12 shrink-0 place-items-center rounded-full bg-sand text-saffron-dark">
                <Icon name={h.icon} />
              </span>
              <div>
                <h3 className="font-display text-lg font-bold">{h.title}</h3>
                <p className="mt-1 text-sm text-muted">{h.text}</p>
              </div>
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

      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2" aria-labelledby="story-title">
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl shadow-xl">
          <Photo slot="kitchen" width={1000} height={750} sizes="(min-width: 768px) 50vw, 100vw" />
        </div>
        <div>
          <p className="font-semibold text-saffron-dark">{story.eyebrow}</p>
          <h2 id="story-title" className="font-display text-3xl font-bold text-balance sm:text-4xl">{story.title}</h2>
          {story.paragraphs.map((p) => (
            <p key={p} className="mt-4 text-muted">{p}</p>
          ))}
          <ul className="mt-6 space-y-3">
            {story.points.map((pt) => (
              <li key={pt.text} className="flex items-center gap-3 font-semibold">
                <span className="grid size-9 shrink-0 place-items-center rounded-full bg-maroon text-cream">
                  <Icon name={pt.icon} className="size-5" />
                </span>
                {pt.text}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section id="gallery" className="bg-white py-16" aria-labelledby="gallery-title">
        <div className="mx-auto max-w-6xl px-4">
          <h2 id="gallery-title" className="font-display text-3xl font-bold sm:text-4xl">From our kitchen</h2>
          <div className="mt-8 grid auto-rows-[10rem] grid-cols-2 gap-3 sm:auto-rows-[14rem] sm:gap-4 md:grid-cols-3">
            {gallery.map((g, i) => (
              <figure key={g.slot} className={`relative overflow-hidden rounded-2xl sm:rounded-3xl ${i === 0 ? "row-span-2" : ""}`}>
                <Photo slot={g.slot} width={800} height={i === 0 ? 1000 : 600} sizes="(min-width: 768px) 33vw, 50vw" className="transition duration-500 hover:scale-105" />
                <figcaption className="absolute bottom-2 left-2 max-w-[calc(100%-1rem)] rounded-full bg-white/90 px-3 py-1 text-xs font-semibold sm:bottom-3 sm:left-3 sm:text-sm">
                  {g.label}
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 py-16" aria-labelledby="how-title">
        <h2 id="how-title" className="font-display text-3xl font-bold sm:text-4xl">Order in three taps</h2>
        <ol className="mt-8 grid gap-4 md:grid-cols-3">
          {howToOrder.map((s, i) => (
            <li key={s.title} className="rounded-2xl border border-line bg-white p-6">
              <span className="grid size-10 place-items-center rounded-full bg-saffron font-display text-lg font-bold text-white">{i + 1}</span>
              <h3 className="mt-4 font-display text-xl font-bold">{s.title}</h3>
              <p className="mt-1 text-muted">{s.text}</p>
            </li>
          ))}
        </ol>
        <div className="mt-8">
          <Link href="/menu/" className="inline-block rounded-full bg-maroon px-6 py-3 font-bold text-cream transition hover:bg-maroon-dark">
            Start your order
          </Link>
        </div>
      </section>

      <section id="visit" className="mx-auto max-w-6xl px-4 pb-16" aria-labelledby="visit-title">
        <div className="relative isolate overflow-hidden rounded-3xl bg-charcoal text-cream">
          <Photo slot="visit" width={1400} sizes="(min-width: 1152px) 1152px, 100vw" className="-z-10 opacity-30" />
          <div className="grid gap-8 p-6 sm:p-12 md:grid-cols-2">
            <div>
              <h2 id="visit-title" className="font-display text-3xl font-bold sm:text-4xl">Visit us</h2>
              <p className="mt-3 flex items-center gap-2 text-lg text-cream/90">
                <Icon name="pin" className="size-5 shrink-0 text-saffron-light" />
                {restaurant.area}
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <a href={mapsUrl} target="_blank" rel="noopener noreferrer" className="rounded-full bg-saffron px-6 py-3 font-bold text-charcoal transition hover:bg-saffron-light">
                  Get directions
                </a>
                <OrderButton className="shadow-none" />
              </div>
            </div>
            <div>
              <h3 className="font-display text-xl font-bold">Opening hours</h3>
              <dl className="mt-4 divide-y divide-white/15">
                {restaurant.hours.map((h) => (
                  <div key={h.days} className="flex flex-wrap justify-between gap-x-4 gap-y-1 py-3">
                    <dt className="text-cream/80">{h.days}</dt>
                    <dd className="font-semibold">{h.time}</dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
