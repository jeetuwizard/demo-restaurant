"use client";

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import Link from "next/link";
import { findItem, type MenuItem } from "@/config/menu";
import { formatPrice, ordering, restaurant } from "@/config/restaurant";
import { Icon } from "./Icon";

type Line = { item: MenuItem; qty: number };

type CartContextValue = {
  lines: Line[];
  count: number;
  total: number;
  qtyOf: (id: string) => number;
  add: (id: string) => void;
  remove: (id: string) => void;
  clear: () => void;
  openOrder: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}

export function buildOrderMessage(lines: Line[], total: number) {
  const rows = lines.map(({ item, qty }) => `${qty} x ${item.name} - ${formatPrice(item.price * qty)}`);
  return [
    ...(ordering.messagePrefix ? [ordering.messagePrefix] : []),
    `Hi ${restaurant.name}! I'd like to order:`,
    ...rows,
    `Total: ${formatPrice(total)}`,
    "",
    "Name:",
    "Delivery address / pickup time:",
  ].join("\n");
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [qty, setQty] = useState<Record<string, number>>({});
  const dialogRef = useRef<HTMLDialogElement>(null);

  const value = useMemo<CartContextValue>(() => {
    const lines = Object.entries(qty)
      .map(([id, n]) => ({ item: findItem(id), qty: n }))
      .filter((l): l is Line => Boolean(l.item) && l.qty > 0);
    return {
      lines,
      count: lines.reduce((sum, l) => sum + l.qty, 0),
      total: lines.reduce((sum, l) => sum + l.qty * l.item.price, 0),
      qtyOf: (id) => qty[id] ?? 0,
      add: (id) => setQty((q) => ({ ...q, [id]: (q[id] ?? 0) + 1 })),
      remove: (id) => setQty((q) => ({ ...q, [id]: Math.max(0, (q[id] ?? 0) - 1) })),
      clear: () => setQty({}),
      openOrder: () => dialogRef.current?.showModal(),
    };
  }, [qty]);

  return (
    <CartContext.Provider value={value}>
      {children}
      <CartBar />
      <OrderDialog dialogRef={dialogRef} />
    </CartContext.Provider>
  );
}

export function QtyControl({ item }: { item: MenuItem }) {
  const { qtyOf, add, remove } = useCart();
  const n = qtyOf(item.id);
  if (n === 0) {
    return (
      <button
        type="button"
        onClick={() => add(item.id)}
        className="rounded-full border-2 border-saffron px-4 py-1.5 text-sm font-bold text-saffron-dark transition hover:bg-saffron hover:text-white"
        aria-label={`Add ${item.name} to order`}
      >
        Add +
      </button>
    );
  }
  return (
    <div className="flex items-center rounded-full bg-saffron text-white" role="group" aria-label={`${item.name} quantity`}>
      <button type="button" onClick={() => remove(item.id)} className="grid size-9 place-items-center text-lg font-bold" aria-label={`Remove one ${item.name}`}>
        −
      </button>
      <span className="min-w-6 text-center font-bold" aria-live="polite">{n}</span>
      <button type="button" onClick={() => add(item.id)} className="grid size-9 place-items-center text-lg font-bold" aria-label={`Add one more ${item.name}`}>
        +
      </button>
    </div>
  );
}

function CartBar() {
  const { count, total, openOrder } = useCart();
  if (count === 0) return null;
  return (
    <>
      <div className="h-24" aria-hidden="true" />
      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-white/95 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between gap-3 px-4 py-3">
          <p className="text-sm">
            <span className="font-bold">{count} {count === 1 ? "item" : "items"}</span>
            <span className="text-muted"> · </span>
            <span className="font-bold">{formatPrice(total)}</span>
          </p>
          <button type="button" onClick={openOrder} className="rounded-full bg-whatsapp px-5 py-3 font-bold text-white transition hover:bg-whatsapp-dark">
            View order
          </button>
        </div>
      </div>
    </>
  );
}

function OrderDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const { lines, total, clear } = useCart();
  const sendUrl = `${ordering.whatsappUrl}?text=${encodeURIComponent(buildOrderMessage(lines, total))}`;

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="order-title"
      className="m-auto max-h-[calc(100dvh-2rem)] w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-white p-0 text-charcoal shadow-2xl"
    >
      <div className="p-5 sm:p-8">
        <h2 id="order-title" className="pr-10 font-display text-2xl font-bold">Your order</h2>
        {lines.length === 0 ? (
          <div className="mt-4 rounded-2xl bg-sand px-4 py-5 text-center">
            <p className="font-semibold">Your order is empty.</p>
            <p className="mt-1 text-sm text-muted">Add dishes from the menu and they will show up here.</p>
            <Link
              href="/menu/"
              onClick={() => dialogRef.current?.close()}
              className="mt-4 inline-block rounded-full bg-maroon px-5 py-2.5 font-bold text-cream"
            >
              Browse the menu
            </Link>
          </div>
        ) : (
          <>
            <ul className="mt-4 divide-y divide-line">
              {lines.map(({ item, qty }) => (
                <li key={item.id} className="flex flex-wrap items-center justify-between gap-x-3 gap-y-2 py-3">
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold leading-snug">{item.name}</p>
                    <p className="text-sm text-muted">{formatPrice(item.price)} each</p>
                  </div>
                  <QtyControl item={item} />
                  <p className="w-16 text-right font-bold">{formatPrice(item.price * qty)}</p>
                </li>
              ))}
            </ul>
            <div className="flex items-center justify-between border-t-2 border-charcoal pt-3 text-lg font-bold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="mt-3 text-sm text-muted">WhatsApp opens with this order typed in. Add your name and address, then press send.</p>
            <div className="mt-5 flex flex-col gap-3 sm:flex-row sm:flex-wrap sm:items-center">
              <a
                href={sendUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 rounded-full bg-whatsapp px-6 py-3 font-bold text-white transition hover:bg-whatsapp-dark"
              >
                <Icon name="whatsapp" className="size-5" />
                Send order on WhatsApp
              </a>
              <button type="button" onClick={clear} className="rounded-full px-5 py-3 font-semibold text-muted transition hover:text-charcoal">
                Clear order
              </button>
            </div>
          </>
        )}
        {ordering.note && <p className="mt-5 rounded-xl bg-cream px-4 py-3 text-xs text-muted">{ordering.note}</p>}
      </div>
      <form method="dialog" className="absolute top-4 right-4">
        <button className="grid size-10 place-items-center rounded-full text-muted hover:bg-sand" aria-label="Close">
          <Icon name="close" className="size-5" />
        </button>
      </form>
    </dialog>
  );
}
