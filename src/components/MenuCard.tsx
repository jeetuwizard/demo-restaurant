import type { MenuItem } from "@/config/menu";
import { formatPrice } from "@/config/restaurant";
import { QtyControl } from "./Cart";

export function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={`inline-grid size-4 shrink-0 place-items-center border-2 ${veg ? "border-veg" : "border-nonveg"}`}
      role="img"
      aria-label={veg ? "Vegetarian" : "Non-vegetarian"}
      title={veg ? "Vegetarian" : "Non-vegetarian"}
    >
      <span className={`size-1.5 rounded-full ${veg ? "bg-veg" : "bg-nonveg"}`} />
    </span>
  );
}

export function MenuCard({ item }: { item: MenuItem }) {
  return (
    <article className="flex gap-4 rounded-2xl border border-line bg-white p-4 shadow-sm">
      <div className="grid size-20 shrink-0 place-items-center rounded-xl bg-linear-to-br from-sand to-gold-glow text-4xl" aria-hidden="true">
        {item.emoji}
      </div>
      <div className="flex min-w-0 flex-1 flex-col">
        <div className="flex items-start gap-2">
          <VegMark veg={item.veg} />
          <h3 className="-mt-0.5 font-semibold leading-snug">{item.name}</h3>
        </div>
        <p className="mt-1 flex-1 text-sm text-muted">{item.description}</p>
        <div className="mt-3 flex items-center justify-between gap-2">
          <span className="font-bold text-maroon">{formatPrice(item.price)}</span>
          <QtyControl item={item} />
        </div>
      </div>
    </article>
  );
}
