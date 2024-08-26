/* eslint-disable @typescript-eslint/no-explicit-any */
import { FC, PropsWithChildren } from 'react';

export interface StyleProps {
  className?: string;
}

export interface Props extends StyleProps, PropsWithChildren {
  as?: keyof JSX.IntrinsicElements | React.ComponentType<any>;
}

export type StaticProps = {
  Header: FC<Props>;
  HeaderTitle: FC<Props>;
  Body: FC<Props>;
  Footer: FC<Props>;
};
