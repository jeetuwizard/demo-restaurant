// Everything about the fictional restaurant lives here (menu items are in ./menu.ts).
// No real phone number on purpose: this is a demo.

export const restaurant = {
  name: "Masala Lane Kitchen",
  tagline: "Slow-cooked North Indian classics, straight from the tandoor.",
  intro: "Smoky tandoori starters, overnight dal makhani and fragrant biryanis. Dine in, take away or order on WhatsApp.",
  area: "Connaught Place, New Delhi",
  maskedPhone: "+91 98XXX XXXXX",
  mapsQuery: "Connaught Place, New Delhi",
  hours: [
    { days: "Monday – Thursday", time: "12:00 pm – 11:00 pm" },
    { days: "Friday – Sunday", time: "12:00 pm – 11:30 pm" },
  ],
  heroBadges: ["🔥 Fresh from the tandoor", "⭐ Loved by locals"],
};

export const mapsUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(restaurant.mapsQuery)}`;

export const highlights = [
  { emoji: "🍽️", title: "Dine-in", text: "Warm, family-friendly seating for 60 guests." },
  { emoji: "🥡", title: "Takeaway", text: "Order ahead and pick up hot, packed to travel." },
  { emoji: "🛵", title: "Delivery", text: "Home delivery nearby, ordered straight on WhatsApp." },
  { emoji: "🕛", title: "Open daily", text: "From 12 noon till late, seven days a week." },
];

// `tile` = gradient token classes from globals.css
export const gallery = [
  { emoji: "🍗", label: "Butter chicken", tile: "from-peach to-rose" },
  { emoji: "🔥", label: "Clay-oven tandoor", tile: "from-ember to-maroon" },
  { emoji: "🍛", label: "Dum biryani", tile: "from-honey to-saffron" },
  { emoji: "🫓", label: "Fresh naan", tile: "from-sand to-wheat" },
  { emoji: "🥭", label: "Mango lassi", tile: "from-butter to-apricot" },
  { emoji: "🍮", label: "Gulab jamun", tile: "from-clay to-plum" },
];

export const reviews = [
  { name: "Ananya", text: "The dal makhani tastes like it cooked all night. Ordering on WhatsApp was so easy.", stars: 5 },
  { name: "Rohit", text: "Best butter chicken near CP. Quick delivery and still hot when it arrived.", stars: 5 },
  { name: "Meera", text: "Lovely place for family dinners. The garlic naan and kulfi are a must.", stars: 4 },
];

export function formatPrice(rupees: number) {
  return `₹${rupees.toLocaleString("en-IN")}`;
}
