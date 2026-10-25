// PrimeCraft Labs details, all read from the generated brand.json (master: jk/brand/brand.json).
import brand from "./brand.json";

export const studio = {
  name: brand.name,
  ownerFirstName: brand.owner.firstName,
  portfolioUrl: brand.urls.portfolio,
};

export function studioWhatsappLink() {
  const text = `Hi ${brand.owner.firstName}, I saw the restaurant demo by ${brand.name} and want a website like this for my restaurant.`;
  return `${brand.whatsappUrl}?text=${encodeURIComponent(text)}`;
}
