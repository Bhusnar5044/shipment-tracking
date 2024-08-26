import { Button } from '@/components/common/Button';
import CommonFilter from '@/components/common/CommonFilter';
import Icon from '@/components/common/Icon';
import { FilterConfig } from '@/constants/types';
import { cn } from '@/utils';
import { FC } from 'react';
import { getActionSectionComponent } from '../utils';
import { ActionSectionProps } from './types';

export const ActionSection: FC<ActionSectionProps> = ({
  serviceApiKey,
  clearFilter,
  filtersApplied,
  showMoreFilters,
  setShowMoreFilters,
  applyFilter,
  handleFilterChange,
  filters,
  buttonComp,
}) => {
  const filterConfig = getActionSectionComponent(serviceApiKey);
  const handleShowMoreFilter = () => setShowMoreFilters((prev) => !prev);

  return (
    <div className="flex items-end gap-3">
      <div className="hidden items-end gap-3 lg:flex">
        {filterConfig
          ?.filter((filter) => filter?.isPrimary)
          ?.map((config: FilterConfig, index: number) => (
            <CommonFilter
              key={index}
              type={config.type}
              label={config.label}
              placeholder={config.placeholder}
              options={config.options}
              stateKey={config.stateKey}
              value={filters[config.stateKey]}
              onChange={(value) => handleFilterChange(config.stateKey, value)}
            />
          ))}
      </div>
      {filterConfig && filterConfig.length > 0 && (
        <Button variant="outline" onClick={handleShowMoreFilter} className={cn(filterConfig.length <= 2 && 'lg:hidden')}>
          <Icon className="mr-2" iconName="filter_list" />
          {showMoreFilters ? 'Hide Filters' : 'More Filters'}
        </Button>
      )}
      <div className="hidden gap-3 lg:flex">
        <Button disabled={!filtersApplied} className="py-2" variant="outline" onClick={clearFilter}>
          Clear
        </Button>
        <Button disabled={!filtersApplied} className="hidden py-2 md:flex " variant="outline" onClick={applyFilter}>
          Apply
        </Button>
      </div>
      {buttonComp && <div className="flex items-end gap-3">{buttonComp}</div>}
    </div>
  );
};
