import { Item } from "@/constants/globalNavItems";

export type Props = {
  item: Item;
  close?: () => false | void;
  disableNesting?: boolean;
  isExpanded?: boolean;
  className?: string;
  withIcon?: boolean;
};
