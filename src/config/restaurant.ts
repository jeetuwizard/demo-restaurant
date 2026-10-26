// Everything about the restaurant lives here (menu items are in ./menu.ts, photos in ./photos.json).
// Masala Lane Kitchen is a concept restaurant: orders go to the studio's WhatsApp, clearly labelled.
import type { IconName } from "@/components/Icon";
import { studio } from "./studio";

export const restaurant = {
  name: "Masala Lane Kitchen",
  cuisine: "North Indian kitchen & tandoor",
  tagline: "Slow-cooked North Indian classics, straight from the tandoor.",
  intro: "Smoky tandoori starters, overnight dal makhani and fragrant dum biryanis. Dine in, take away or order on WhatsApp.",
  area: "Connaught Place, New Delhi",
  mapsQuery: "Connaught Place, New Delhi",
  hours: [
    { days: "Monday – Thursday", time: "12:00 pm – 11:00 pm" },
    { days: "Friday – Sunday", time: "12:00 pm – 11:30 pm" },
  ],
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapsQuery)}`;

/** Where orders go. On a client site: the restaurant's own WhatsApp number and no prefix/note. */
export const ordering = {
  whatsappUrl: studio.whatsappUrl,
  messagePrefix: "Concept site order:",
  note: `${restaurant.name} is a concept website by ${studio.name}. Orders go to the studio, not to a real restaurant.`,
};

export const highlights: { icon: IconName; title: string; text: string }[] = [
  { icon: "dine", title: "Dine-in", text: "Warm, family-friendly seating for 60 guests." },
  { icon: "bag", title: "Takeaway", text: "Order ahead and pick up hot, packed to travel." },
  { icon: "scooter", title: "Delivery", text: "Home delivery nearby, ordered straight on WhatsApp." },
  { icon: "clock", title: "Open daily", text: "From 12 noon till late, seven days a week." },
];

export const story = {
  eyebrow: "Our kitchen",
  title: "Cooked slowly, the way it's done at home",
  paragraphs: [
    "Our dal makhani simmers overnight on a low flame. Breads go into the clay tandoor only when you order, so they reach your table puffed and hot.",
    "Spices are roasted and ground in small batches every morning, and our biryanis are sealed with dough and cooked dum-style for that deep, layered aroma.",
  ],
  points: [
    { icon: "flame" as IconName, text: "Charcoal tandoor, fired from noon" },
    { icon: "leaf" as IconName, text: "Separate veg and non-veg prep" },
  ],
};

export const howToOrder = [
  { title: "Pick your dishes", text: "Browse the menu and tap Add on anything you like." },
  { title: "Check your order", text: "Review dishes, quantities and the total in one place." },
  { title: "Send on WhatsApp", text: "Your order opens in WhatsApp, ready to send. Add your name and address." },
];

/**
 * Gallery tiles: photo slots from photos.json with a caption. Use gallery-only photos (never a dish shown
 * elsewhere on the page). Keep 5 (big first tile + 4) so the grid has no gaps.
 */
export const gallery = [
  { slot: "gallery-grill", label: "Straight off the grill" },
  { slot: "interior", label: "Our dining room" },
  { slot: "gallery-thali", label: "Home-style spread" },
  { slot: "gallery-spices", label: "Spices ground every morning" },
  { slot: "gallery-chef", label: "In the kitchen" },
];

/** Names for photo slots that are not a dish or a gallery tile (used on the credits page). */
export const photoLabels: Record<string, string> = {
  hero: "Home page banner",
  kitchen: "Fresh from the tandoor",
  "menu-banner": "Menu page banner",
  visit: "Visit us section",
};

export function formatPrice(rupees: number) {
  return `₹${rupees.toLocaleString("en-IN")}`;
}
