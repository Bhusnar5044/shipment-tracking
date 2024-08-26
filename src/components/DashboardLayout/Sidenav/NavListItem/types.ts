import { Item } from "@/constants/globalNavItems";

export interface INavListItem {
  navItem: Item;
  isExpanded: boolean;
  setIsExpanded?: React.Dispatch<React.SetStateAction<boolean>>;
  userRole: string;
}
