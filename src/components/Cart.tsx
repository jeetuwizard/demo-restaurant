"use client";

import { createContext, useContext, useMemo, useRef, useState, type ReactNode } from "react";
import { findItem, type MenuItem } from "@/config/menu";
import { formatPrice, restaurant } from "@/config/restaurant";
import { studio, studioWhatsappLink } from "@/config/studio";

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
  if (lines.length === 0) return `Hi ${restaurant.name}! I'd like to place an order.`;
  const rows = lines.map(({ item, qty }) => `${qty} x ${item.name} - ${formatPrice(item.price * qty)}`);
  return [`Hi ${restaurant.name}! I'd like to order:`, ...rows, `Total: ${formatPrice(total)}`, "", "Name:", "Delivery address / pickup time:"].join("\n");
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
            Order on WhatsApp
          </button>
        </div>
      </div>
    </>
  );
}

function OrderDialog({ dialogRef }: { dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const { lines, total, clear } = useCart();
  const [copied, setCopied] = useState(false);
  const message = buildOrderMessage(lines, total);

  async function copy() {
    try {
      await navigator.clipboard.writeText(message);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  }

  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="order-title"
      className="m-auto w-[calc(100%-2rem)] max-w-lg rounded-3xl bg-white p-0 text-charcoal shadow-2xl"
    >
      <div className="p-6 sm:p-8">
        <p className="text-xs font-bold tracking-widest text-saffron-dark uppercase">Demo preview</p>
        <h2 id="order-title" className="mt-1 font-display text-2xl font-bold">Your WhatsApp order</h2>
        <p className="mt-2 text-sm text-muted">
          On your real website, this button opens WhatsApp to <strong>your restaurant</strong> with this order ready to send.
          This restaurant is fictional, so nothing is sent.
        </p>
        {lines.length === 0 && <p className="mt-4 rounded-xl bg-sand px-4 py-3 text-sm">Tip: add dishes from the menu to see them in the message.</p>}
        <pre className="mt-4 max-h-60 overflow-auto rounded-2xl border border-line bg-cream p-4 font-sans text-sm whitespace-pre-wrap">{message}</pre>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <a
            href={studioWhatsappLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full bg-whatsapp px-5 py-3 text-center font-bold text-white transition hover:bg-whatsapp-dark"
          >
            Get this for my restaurant
          </a>
          <button type="button" onClick={copy} className="rounded-full border border-line px-5 py-3 font-semibold transition hover:bg-sand">
            {copied ? "Copied!" : "Copy message"}
          </button>
          {lines.length > 0 && (
            <button type="button" onClick={clear} className="rounded-full px-5 py-3 font-semibold text-muted transition hover:text-charcoal">
              Clear order
            </button>
          )}
        </div>
        <p className="mt-5 text-xs text-muted">
          &quot;Get this for my restaurant&quot; messages {studio.name}, who built this demo.
        </p>
      </div>
      <form method="dialog" className="absolute top-4 right-4">
        <button className="grid size-10 place-items-center rounded-full text-2xl text-muted hover:bg-sand" aria-label="Close">
          ×
        </button>
      </form>
    </dialog>
  );
}
