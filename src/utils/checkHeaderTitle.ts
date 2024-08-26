import type { Item } from '@/constants/globalNavItems';

type NavLink = { items: Item[] };

export const findNavLinkBySlug = (
  navLinks: (NavLink | Item)[],
  slug: string | null
): Item | undefined => {
  for (const link of navLinks) {
    if (link.items) {
      const found = findNavLinkBySlug(link.items, slug);
      if (found) {
        return found;
      }
    } else if ((link as Item).slug === slug) {
      return link as Item;
    }
  }
  return undefined;
};
