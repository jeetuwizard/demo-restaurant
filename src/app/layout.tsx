import type { Metadata } from "next";
import { DM_Sans, Playfair_Display } from "next/font/google";
import { CartProvider } from "@/components/Cart";
import { Footer, Header } from "@/components/Chrome";
import { restaurant } from "@/config/restaurant";
import { studio } from "@/config/studio";
import "./globals.css";

const display = Playfair_Display({ variable: "--font-playfair", subsets: ["latin"], weight: ["600", "700", "800"] });
const body = DM_Sans({ variable: "--font-dm-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: { default: `${restaurant.name} | ${restaurant.cuisine}`, template: `%s | ${restaurant.name}` },
  description: `${restaurant.tagline} A concept restaurant website by ${studio.name}.`,
  robots: { index: false }, // concept site: keep it out of search results
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${display.variable} ${body.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col font-sans">
        <CartProvider>
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
        </CartProvider>
      </body>
    </html>
  );
}
