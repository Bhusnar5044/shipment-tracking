/* eslint-disable @typescript-eslint/no-explicit-any */
export type IconOptions = {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
  iconName: string;
};

export type Ref = HTMLSpanElement;
export type IconProps = React.DetailedHTMLProps<React.HTMLAttributes<HTMLSpanElement>, HTMLSpanElement> & IconOptions;
