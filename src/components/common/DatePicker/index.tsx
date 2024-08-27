import { cn } from '@/utils';
import { format } from 'date-fns';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import Button from '../Button';
import Calendar from '../Calendar';
import Icon from '../Icon';
import Popover from '../Popover';
import Typography from '../Typography';
import { Props } from './types';

const DatePicker: FC<Props> = memo(
  ({ date, onChange, minWidth, maxWidth, fullWidth, label, name, disabled, className, isErrorPresent, errorText, variant, size }) => {
    const [localDate, setLocalDate] = useState<Date | undefined>(date);
    const [calendarVisible, setCalendarVisible] = useState<boolean>(false);

    useEffect(() => {
      setLocalDate(date);
    }, [date]);

    const handleDateSelect = useCallback(
      (selectedDate?: Date) => {
        selectedDate && setLocalDate(selectedDate);
        selectedDate && onChange(selectedDate, name ?? '');
        setCalendarVisible(false);
      },
      [name, onChange]
    );

    const handleButtonClick = useCallback(() => {
      setCalendarVisible(true);
    }, []);

    const commonClasses = useMemo(() => {
      let borderClass = '',
        focusClass = '';
      if (isErrorPresent) {
        borderClass = 'border-red-500';
        focusClass = 'focus:border-red-500';
      } else {
        borderClass = 'border-gray-500';
        focusClass = 'focus:border-blue-500';
      }
      return cn(
        'form-input rounded text-black max-h-[2.35rem] py-[0.55rem]',
        borderClass,
        focusClass,
        size === 'S' ? 'text-sm' : 'text-base',
        variant === 'outlined' ? 'border' : variant === 'filled' ? 'bg-gray-100' : '',
        className
      );
    }, [isErrorPresent, size, variant, className]);

    return (
      <div className={`relative ${fullWidth ? 'w-full' : ''}`}>
        {label && <label className="form-label">{label}</label>}
        <Popover interactionType="click" className={cn({ 'mt-1': label })}>
          <Button
            variant={'outline'}
            className={cn(
              `w-full justify-start text-left font-normal md:min-w-[${minWidth}] lg:max-w-[${maxWidth}]`,
              { 'w-full': fullWidth },
              commonClasses
            )}
            onClick={handleButtonClick}
          >
            <div className="flex items-center">
              <Icon className="mr-2 h-6 w-6 items-center text-center" iconName="calendar_month" />
              <div> {localDate ? <span className="font-semibold text-black">{format(localDate, 'PPP')}</span> : <span>Pick a date</span>}</div>
            </div>
          </Button>
          {calendarVisible && (
            <Popover.Popup placement="bottom-start" className="w-auto p-0">
              <Calendar mode="single" selected={localDate} onSelect={handleDateSelect} disabled={disabled} />
            </Popover.Popup>
          )}
        </Popover>
        {isErrorPresent && !!errorText && (
          <Typography variant="body4" className={cn('mt-1 text-xs italic text-red-500')}>
            {errorText}
          </Typography>
        )}
      </div>
    );
  }
);

DatePicker.displayName = 'DatePicker';
DatePicker.defaultProps = {
  minWidth: '20rem',
};

export default DatePicker;
