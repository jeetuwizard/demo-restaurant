"use client";

import { useCart } from "./Cart";

export function OrderButton({ className = "" }: { className?: string }) {
  const { openOrder } = useCart();
  return (
    <button
      type="button"
      onClick={openOrder}
      className={`rounded-full bg-whatsapp px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-whatsapp-dark ${className}`}
    >
      Order on WhatsApp
    </button>
  );
}
