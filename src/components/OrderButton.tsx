"use client";

import { useCart } from "./Cart";
import { Icon } from "./Icon";

export function OrderButton({ className = "" }: { className?: string }) {
  const { openOrder } = useCart();
  return (
    <button
      type="button"
      onClick={openOrder}
      className={`inline-flex items-center gap-2 rounded-full bg-whatsapp px-6 py-3.5 font-bold text-white shadow-lg transition hover:-translate-y-0.5 hover:bg-whatsapp-dark ${className}`}
    >
      <Icon name="whatsapp" className="size-5" />
      Order on WhatsApp
    </button>
  );
}
