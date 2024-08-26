import * as React from "react";

export interface INavList extends React.PropsWithChildren {}

export interface ISideNavHeader extends React.PropsWithChildren {
  title: string;
  isHovered: boolean;
}
