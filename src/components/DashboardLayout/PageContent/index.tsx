import type React from 'react';
import { memo } from 'react';

import { cn } from '@/utils';

import { Toaster } from 'react-hot-toast';
import type { Props } from './types';

const PageContent: React.FC<Props> = memo(({ children, isPaddingDisabled, className }) => (
  <main
    className={cn(
      'hideScrollbar grid-area/main relative bg-gray-50 transition-[width] duration-200',
      {
        'p-4': !isPaddingDisabled,
      },
      className
    )}
  >
    <div className="hideScrollbar h-[calc(100vh-3rem)] overflow-y-auto">{children}</div>
    <Toaster />
  </main>
));

PageContent.displayName = 'PageContent';

export default PageContent;
