/* eslint-disable @typescript-eslint/no-explicit-any */
import Icon from "@/components/common/Icon";
import NavItem from "@/components/common/NavItem";
import Popover from "@/components/common/Popover";
import Typography from "@/components/common/Typography";
import { cn } from "@/utils";
import { FC, useCallback, useEffect, useMemo, useRef, useState } from "react";
import { INavListItem } from "./types";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { closeSidePanel } from "@/store/features/sidePanel";

export const NavListItem: FC<INavListItem> = ({ navItem, isExpanded, setIsExpanded, userRole }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [styles, setStyles] = useState({});
  const menuItemRef = useRef<HTMLLIElement>(null);
  const closeSidenav = useCallback(() => setIsExpanded?.(false), [setIsExpanded]);

  const handleMouseEnter = () => {
    if (menuItemRef?.current) {
      const top = menuItemRef.current?.getBoundingClientRect().top;
      const calcHeight = top % 1000 === 0 ? top : top % 1000;
      setStyles({
        top: `${calcHeight}px`,
      });
    }
    setIsHovered(true);
  };
  const handleMouseLeave = () => setIsHovered(false);
  const { isOpen } = useAppSelector(state => state.sidePanel);
  const dispatch = useAppDispatch();
  useEffect(() => {
    if (isOpen) {
      dispatch(closeSidePanel());
    }
  }, [dispatch, isOpen]);
  const navItemsLength = navItem?.items?.length;
  const navPermissionLength = navItem.routePermission?.length;

  const nestedNavItems =
    useMemo(() => {
      if (navItemsLength && !navPermissionLength) return navItem?.items?.filter((item) => item.routePermission?.includes(userRole));
      return navItem?.items ?? [];
    }, [navItem?.items, navItemsLength, navPermissionLength, userRole]) ?? [];

  const finalItem = nestedNavItems.length === 1 ? nestedNavItems[0] : navItem;

  if ((navPermissionLength && !navItem.routePermission?.includes(userRole)) || (navItemsLength && !nestedNavItems?.length)) return null;

  return (
    <li ref={menuItemRef} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave} className=" hover:bg-gray-200">
      {nestedNavItems.length > 0 ? (
        <Popover className="static">
          <Typography
            onSurfaceVariant
            className="flex w-full cursor-pointer flex-col items-center justify-center gap-2 p-2 text-center capitalize tracking-wider "
            variant="body3"
            weight="medium"
          >
              {navItem.icon && (
                <Icon iconName={navItem.icon} className="w-8 text-2xl" />
              )}
            <Typography variant="body3" weight="medium">
              {navItem.name}
            </Typography>
          </Typography>
          {isHovered && (
            <Popover.Popup style={styles} placement="left" className="left-10 w-[20rem] rounded p-3 text-start text-black shadow-lg lg:left-[100px]">
              {nestedNavItems?.map((item:any, index:number) => {
                const lastItem = nestedNavItems.length - 1 === index;
                return (
                  <div className="w-full text-start" key={item.slug}>
                    <NavItem
                      key={item.slug}
                      item={item}
                      close={closeSidenav}
                      isExpanded={isExpanded}
                      className={cn(
                        "h-14 w-full items-start justify-center rounded-none text-start text-sm font-medium text-black hover:bg-gray-15",
                        { "border-b-2": !lastItem }
                      )}
                    />
                  </div>
                );
              })}
            </Popover.Popup>
          )}
        </Popover>
      ) : (
        <NavItem key={finalItem.slug} withIcon item={finalItem} close={closeSidenav} isExpanded={isExpanded} disableNesting />
      )}
    </li>
  );
};
