/* eslint-disable @typescript-eslint/no-explicit-any */
import { cn } from '@/utils';
import { ElementType, FC, forwardRef, memo, useMemo } from 'react';
import { Props, Variant, Weight } from './types';

const tags: Record<Variant, ElementType> = {
  h1: 'h1',
  h2: 'h2',
  h3: 'h3',
  h4: 'h4',
  h5: 'h5',
  body1: 'p',
  body2: 'p',
  body3: 'span',
  body4: 'span',
  overline: 'span',
  caption: 'p',
  subtitle1: 'span',
  subtitle2: 'span',
  subtitle3: 'span',
  button1: 'span',
  button2: 'span',
  button3: 'span',
};

const sizes: Record<Variant, string> = {
  h1: 'text-4xl lg:text-6xl',
  h2: 'text-3xl lg:text-5xl',
  h3: 'text-2xl lg:text-4xl font-medium',
  h4: 'text-base lg:text-2xl font-medium',
  h5: 'text-lg lg:text-xl font-medium',
  // h6: " lg:text-lg"
  body1: 'text-base lg:text-lg',
  body2: 'text-sm lg:text-base font-medium',
  body3: 'text-xs lg:text-sm',
  body4: 'text-xs',
  overline: 'text-2xs leading-3',
  caption: 'text-xs font-light',
  subtitle1: 'text-base font-medium',
  subtitle2: 'text-sm font-medium',
  subtitle3: 'text-xs font-bold',
  button1: 'text-sm bold',
  button2: 'text-xs bold',
  button3: 'text-lg bold',
};

const weights: Record<Weight, string> = {
  thin: 'font-thin',
  light: 'font-light',
  normal: 'font-normal',
  medium: 'font-medium',
  semibold: 'font-semibold',
  bold: 'font-bold',
};

const Typography: FC<Props> = memo(
  forwardRef(({ variant = 'body2', weight, children, className, as: asVariant, typoColor, ...rest }, ref) => {
    const sizeClasses = sizes[variant];
    const weightClasses = weight ? weights[weight] : '';
    const component: keyof JSX.IntrinsicElements | React.ComponentType<any> = asVariant ?? ((tags[variant] as keyof JSX.IntrinsicElements) || 'span');
    const Tag = tags[variant] ?? 'span';
    const textColor = useMemo(() => {
      if (typoColor) return `text-${typoColor}`;
      return `text-black`;
    }, [typoColor]);

    return (
      <Tag as={component} ref={ref} className={cn(sizeClasses, weightClasses, textColor, className)} {...rest}>
        {children}
      </Tag>
    );
  })
);

Typography.displayName = 'Typography';

export default Typography;
