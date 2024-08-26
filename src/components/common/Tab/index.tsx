import { Children, forwardRef, memo } from 'react';

import { cn } from '@/utils';

import {Button} from '../Button';
import type { TabsProps } from './types';

const Tabs = memo(
  forwardRef<HTMLDivElement | null, TabsProps>(
    (
      {
        className = 'tabs-component',
        tabs = [],
        children,
        selectedTab,
        onClick,
        orientation = 'horizontal',
        isSingleContent,
        actionSection,
        filterSection,
      },
      ref,
    ) => {
      const activeTab =
        typeof selectedTab === 'string' && tabs.includes(selectedTab)
          ? selectedTab
          : tabs[0];
      const arrayChildren = Children.toArray(children);
      return (
        <div ref={ref} className={cn('flex flex-col', className)}>
          <div className="z-10 -mx-4 bg-admin-surfaceBright px-4 py-2 lg:m-0 lg:px-8">
            <div
              className={cn(
                ' z-10 flex w-full flex-col justify-between gap-3 bg-admin-surfaceBright pb-2 lg:flex-row lg:items-center',
                {
                  'justify-end': !tabs.length,
                },
              )}
            >
              {!!tabs.length && (
                <div
                  role="tablist"
                  aria-orientation={orientation}
                  className={cn('relative flex', {
                    'flex-col': orientation === 'vertical',
                  })}
                >
                  {tabs.map((tab) => (
                    <Button
                      variant="flat"
                      className={`gap-2 capitalize text-admin-onSurfaceVariant hover:bg-admin-surfaceContainerLow focus:ring-0 ${
                        activeTab === tab
                          ? 'border-b-4 border-admin-primary font-bold text-admin-primary'
                          : ''
                      } py-2 lg:px-4`}
                      onClick={() => onClick(tab)}
                      key={tab}
                      type="button"
                      role="tab"
                      aria-selected={activeTab === tab}
                      aria-controls={`tabpanel-${tab}`}
                      tabIndex={activeTab === tab ? 0 : -1}
                      id={`btn-${tab}`}
                      hideUnderline
                    >
                      {tab}
                    </Button>
                  ))}
                </div>
              )}
              {!!actionSection && (
                <div className="self-end">{actionSection}</div>
              )}
            </div>
            <div className="relative ">{filterSection}</div>
          </div>
          <div className="tab-content">
            {isSingleContent ? (
              <div className="tab-pane active">{children}</div>
            ) : (
              arrayChildren?.map?.((child, index) => (
                <div
                  key={tabs[index]}
                  className={`tab-pane ${tabs[index] === activeTab ? 'active' : ''}`}
                >
                  {child}
                </div>
              ))
            )}
          </div>
        </div>
      );
    },
  ),
);

Tabs.displayName = 'Tabs';
 export default Tabs;