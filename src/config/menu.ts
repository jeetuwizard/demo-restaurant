export type MenuItem = {
  id: string;
  name: string;
  description: string;
  price: number;
  veg: boolean;
  popular?: boolean;
};

export type MenuCategory = { id: string; title: string; items: MenuItem[] };

export const menu: MenuCategory[] = [
  {
    id: "starters",
    title: "Starters",
    items: [
      { id: "paneer-tikka", name: "Paneer Tikka", description: "Cottage cheese marinated in hung curd and spices, charred in the tandoor.", price: 280, veg: true, popular: true },
      { id: "hara-bhara-kebab", name: "Hara Bhara Kebab", description: "Spinach, peas and potato patties with mint chutney.", price: 220, veg: true },
      { id: "chicken-tikka", name: "Chicken Tikka", description: "Boneless chicken in a smoky red marinade, served with onion rings.", price: 320, veg: false, popular: true },
      { id: "amritsari-fish", name: "Amritsari Fish", description: "Crisp, gram-flour battered fish with ajwain and lemon.", price: 360, veg: false },
    ],
  },
  {
    id: "mains",
    title: "Main Course",
    items: [
      { id: "dal-makhani", name: "Dal Makhani", description: "Black lentils simmered overnight with butter and cream.", price: 260, veg: true, popular: true },
      { id: "paneer-butter-masala", name: "Paneer Butter Masala", description: "Soft paneer in a rich tomato and cashew gravy.", price: 300, veg: true },
      { id: "butter-chicken", name: "Butter Chicken", description: "Tandoori chicken in our signature makhani sauce.", price: 380, veg: false, popular: true },
      { id: "rogan-josh", name: "Mutton Rogan Josh", description: "Slow-cooked mutton in a Kashmiri chilli gravy.", price: 420, veg: false },
    ],
  },
  {
    id: "biryani",
    title: "Biryani & Rice",
    items: [
      { id: "veg-biryani", name: "Veg Dum Biryani", description: "Basmati rice and vegetables sealed and slow-cooked with saffron.", price: 280, veg: true },
      { id: "chicken-biryani", name: "Chicken Dum Biryani", description: "Layered biryani with tender chicken, served with raita.", price: 340, veg: false, popular: true },
      { id: "mutton-biryani", name: "Mutton Biryani", description: "Fragrant rice with slow-cooked mutton and fried onions.", price: 420, veg: false },
      { id: "jeera-rice", name: "Jeera Rice", description: "Basmati rice tempered with cumin and ghee.", price: 160, veg: true },
    ],
  },
  {
    id: "breads",
    title: "Breads",
    items: [
      { id: "tandoori-roti", name: "Tandoori Roti", description: "Whole wheat bread from the clay oven.", price: 30, veg: true },
      { id: "butter-naan", name: "Butter Naan", description: "Soft leavened bread brushed with butter.", price: 60, veg: true },
      { id: "garlic-naan", name: "Garlic Naan", description: "Naan topped with garlic and coriander.", price: 70, veg: true },
      { id: "laccha-paratha", name: "Laccha Paratha", description: "Flaky, layered whole wheat paratha.", price: 60, veg: true },
    ],
  },
  {
    id: "desserts",
    title: "Desserts & Drinks",
    items: [
      { id: "gulab-jamun", name: "Gulab Jamun (2 pcs)", description: "Warm milk dumplings in cardamom syrup.", price: 90, veg: true },
      { id: "kulfi", name: "Malai Kulfi", description: "Traditional slow-set ice cream with pistachio.", price: 110, veg: true },
      { id: "mango-lassi", name: "Mango Lassi", description: "Chilled yoghurt drink with Alphonso mango.", price: 120, veg: true, popular: true },
      { id: "masala-chai", name: "Masala Chai", description: "Kadak tea brewed with ginger and spices.", price: 50, veg: true },
    ],
  },
];

export const allItems = menu.flatMap((c) => c.items);
export const popularItems = allItems.filter((i) => i.popular);

export function findItem(id: string) {
  return allItems.find((i) => i.id === id);
}
