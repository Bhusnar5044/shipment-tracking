import clsx from 'clsx';
import { forwardRef, memo } from 'react';

import type { IconProps, Ref } from './types';

const Icon = memo(
  forwardRef<Ref, IconProps>(({ iconName, as, className, ...props }, ref) => {
    const Tag = as ?? 'span';
    const mergedClasses = clsx(
      'material-symbols-outlined inline-flex items-center',
      className
    );
    return (
      <Tag ref={ref} className={mergedClasses} {...props}>
        {iconName}
      </Tag>
    );
  })
);

Icon.displayName = 'Icon';

export default Icon;
