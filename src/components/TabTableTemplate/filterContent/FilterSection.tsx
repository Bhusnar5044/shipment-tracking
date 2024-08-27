import { Button } from '@/components/common/Button';
import CommonFilter from '@/components/common/CommonFilter';
import FilterContainer from '@/components/common/FilterContainer';
import { FilterConfig } from '@/constants/types';
import { cn } from '@/utils';
import { FC } from 'react';
import { getActionSectionComponent } from '../utils';
import { FilterSectionProps } from './types';

export const FilterSection: FC<FilterSectionProps> = ({
  serviceApiKey,
  showMoreFilters,
  filters,
  handleFilterChange,
  clearFilter,
  applyFilter,
  filtersApplied,
}) => {
  const filterConfig = getActionSectionComponent(serviceApiKey);
  return (
    <div
      style={{ display: showMoreFilters ? 'block' : 'none' }}
      className={cn(
        'absolute bottom-[-79vh] left-0 z-20 -mr-4 max-h-[calc(100vh-12rem)] bg-white lg:bg-transparent w-screen overflow-y-auto pt-3 shadow-lg lg:static lg:top-0 lg:m-0 lg:w-full  lg:overflow-y-visible lg:pt-0 lg:shadow-none'
      )}
    >
      {filterConfig?.length && (
        <FilterContainer
          className={cn('lg:max-h-auto flex max-h-96 flex-col gap-3 overflow-y-auto px-4 mb-3 md:flex lg:overflow-y-visible lg:px-0 lg:pb-0')}
        >
          <div className="grid w-full grid-cols-1 justify-between gap-4 md:grid-cols-2 lg:grid-cols-5">
            {filterConfig
              .sort((a, b) => a.priority - b.priority)
              .map((config: FilterConfig, index: number) => (
                <CommonFilter
                  key={index}
                  type={config.type}
                  label={config.label}
                  placeholder={config.placeholder}
                  options={config.options}
                  value={filters[config.stateKey]}
                  onChange={(value) => handleFilterChange(config.stateKey, value)}
                  stateKey={config.stateKey}
                  isPrimary={config?.isPrimary}
                />
              ))}
          </div>
        </FilterContainer>
      )}
      <div className="flex w-full justify-end gap-3 px-4 py-3 shadow-lg lg:hidden">
        <Button disabled={!filtersApplied} variant="outline" onClick={clearFilter}>
          Clear
        </Button>
        <Button disabled={!filtersApplied} onClick={applyFilter}>
          Apply
        </Button>
      </div>
    </div>
  );
};
