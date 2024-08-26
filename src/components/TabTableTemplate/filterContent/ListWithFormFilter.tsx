import Button from '@/components/common/Button';
import CommonFilter from '@/components/common/CommonFilter';
import { getRoleAndPermissions } from '@/utils/getRoleAndPermissions';
import { FC } from 'react';
import { ListWithFormFilterProps } from './types';

export const ListWithFormFilter: FC<ListWithFormFilterProps> = ({ clearFilter, applyFilter, filtersApplied = true, onChange, filters }) => {
  const { userRole } = getRoleAndPermissions();
  return (
    <div className="flex items-center gap-3">
      <div className="flex gap-3 lg:flex">
        <CommonFilter
          type="searchAndSelect"
          label="Station Code"
          placeholder="Search by station name"
          value={filters.stationCode}
          onChange={onChange}
          stateKey="stationCode"
          isPrimary={false}
        />
        <CommonFilter
          type={'searchAndSelect'}
          label="Vendor/Aggregator"
          onChange={onChange}
          stateKey={'vendorName'}
          value={filters.vendorName}
          placeholder="Select Vendor"
          isPrimary={userRole === 'VENDOR'}
        />
      </div>
      {filtersApplied && (
        <div className="flex gap-3 self-end">
          <Button variant="outline" onClick={clearFilter}>
            Clear
          </Button>
          <Button variant="outline" onClick={applyFilter}>
            Apply
          </Button>
        </div>
      )}
    </div>
  );
};
