/* eslint-disable react-hooks/exhaustive-deps */
import DateRangePicker from '@/components/common/DateRangePicker';
import SingleSelect from '@/components/common/SingleSelect';
import { SingleSelectOptionEvent } from '@/components/common/SingleSelect/types';
import TextField from '@/components/common/TextField';
import { TextFieldEventType } from '@/components/common/TextField/types';
import { FC, useCallback } from 'react';
import { CommonFilterProps, DateRange } from './types';

const CommonFilter: FC<CommonFilterProps> = ({ type, label, placeholder, options, value, onChange, isPrimary }) => {
  const initialDateFrom = typeof value === 'object' && value !== null && 'from' in value ? value.from : undefined;
  const initialDateTo = typeof value === 'object' && value !== null && 'to' in value ? value.to : undefined;

  const optionsArray = options || [];
  const name = label ? label.toLowerCase().replace(/\s+/g, '-') : 'select';

  const handleDateUpdate = useCallback(
    (dateRange: DateRange) => {
      onChange(dateRange);
    },
    [onChange]
  );

  const handleSingleSelectChange = useCallback(
    (value: SingleSelectOptionEvent) => {
      onChange(value.option?.value || '');
    },
    [onChange]
  );

  const handleTextFieldChange = useCallback(
    (event: TextFieldEventType) => {
      onChange(event.target.value);
    },
    [onChange]
  );

  const getField = useCallback(() => {
    switch (type) {
      case 'dateRange':
        return (
          <DateRangePicker
            onUpdate={handleDateUpdate}
            initialDateFrom={initialDateFrom}
            initialDateTo={initialDateTo}
            label={label}
            dateType="complaint"
            minWidth="15rem"
            size="S"
          />
        );
      case 'singleSelect':
        return (
          <SingleSelect
            name={name}
            label={label}
            placeholder={placeholder}
            options={optionsArray}
            value={value}
            onChange={handleSingleSelectChange}
            size="S"
            hideExpandableIcon
          />
        );
      case 'textField':
        return (
          <TextField
            onChange={handleTextFieldChange}
            variant="outlined"
            label={label}
            value={value ? value : ''}
            disableBottomMargin
            size="S"
            maxWidth="15rem"
            minWidth="15rem"
            placeholder={placeholder}
            name={name}
          />
        );

      default:
        return null;
    }
  }, [
    handleDateUpdate,
    handleSingleSelectChange,
    handleTextFieldChange,
    initialDateFrom,
    initialDateTo,
    label,
    name,
    optionsArray,
    placeholder,
    type,
    value,
  ]);

  return <div className={isPrimary ? 'block lg:hidden' : ''}>{getField()}</div>;
};

export default CommonFilter;
