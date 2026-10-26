// PrimeCraft Labs details, all read from the generated brand.json (master: jk/brand/brand.json).
import brand from "./brand.json";

export const studio = {
  name: brand.name,
  portfolioUrl: brand.urls.portfolio,
  whatsappUrl: brand.whatsappUrl,
};

/** "Get a website like this" enquiry to the studio. */
export function studioWhatsappLink() {
  const text = `Hi ${brand.name}, I saw your restaurant website concept and want a website like this for my restaurant.`;
  return `${brand.whatsappUrl}?text=${encodeURIComponent(text)}`;
}
