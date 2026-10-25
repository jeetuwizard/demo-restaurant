import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="text-6xl" aria-hidden="true">🍽️</p>
      <h1 className="mt-4 font-display text-3xl font-bold">This page isn&apos;t on the menu</h1>
      <Link href="/" className="mt-6 inline-block rounded-full bg-maroon px-6 py-3 font-bold text-cream">
        Back to home
      </Link>
    </section>
  );
}
