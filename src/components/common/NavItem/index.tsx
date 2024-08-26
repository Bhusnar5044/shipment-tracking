import { cn } from "@/utils";
import { FC, memo } from "react";
import Icon from "../Icon";
import Typography from "../Typography";
import { Props } from "./types";
import { Link, useLocation } from "react-router-dom";

const NavItem: FC<Props> = memo(({ item, close, isExpanded, disableNesting, className, withIcon }) => {
  const {pathname} = useLocation();
  const isActive = item.slug === pathname;
  return (
    <Link
      onClick={close}
      to={item.slug}
      className={cn(
        "align-center flex cursor-pointer flex-col items-center justify-center  gap-[0.5rem] rounded-md p-2 text-center text-lg font-medium capitalize hover:bg-gray-20 hover:bg-opacity-30",
        {
          "text-gray-100 hover:bg-gray-200": !isActive,
          "bg-gray-700 bg-opacity-30": isActive,
          "text-gray-900 tracking-wider": disableNesting,
          "flex-col items-center": !isExpanded,
        },
        className
      )}
    >
      {withIcon &&
        (item.icon ? <Icon iconName={item.icon} className="w-8 text-2xl" /> : <Icon iconName="edit" className="w-8 text-2xl" />)}
      <Typography onSurfaceVariant variant="body3" weight="medium">
        {item.name}
      </Typography>
    </Link>
  );
});

NavItem.displayName = "NavItem";

export default NavItem;
