import { FC, memo } from 'react';

export const Bar: FC<{ className: string }> = memo(({ className }) => {
  return <span aria-hidden="true" className={`absolute block h-0.5 w-5 transform bg-gray-500 transition duration-500 ease-in-out ${className}`} />;
});

Bar.displayName = 'Bar';
