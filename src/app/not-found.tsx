import Link from "next/link";
import { Icon } from "@/components/Icon";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <span className="mx-auto grid size-16 place-items-center rounded-full bg-sand text-saffron-dark">
        <Icon name="dine" className="size-8" />
      </span>
      <h1 className="mt-4 font-display text-3xl font-bold">This page isn&apos;t on the menu</h1>
      <Link href="/" className="mt-6 inline-block rounded-full bg-maroon px-6 py-3 font-bold text-cream">
        Back to home
      </Link>
    </section>
  );
}
