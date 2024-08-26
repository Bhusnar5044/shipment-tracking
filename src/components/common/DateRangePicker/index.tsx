import { cn } from '@/utils';
import { format } from 'date-fns';
import { Calendar as CalendarIcon } from 'lucide-react';
import { FC, memo, useCallback, useEffect, useMemo, useState } from 'react';
import { DateRange } from 'react-day-picker';
import Button from '../Button';
import Calendar from '../Calendar';
import Popover from '../Popover';
import Typography from '../Typography';
import { Preset, Props } from './types';

const PRESETS: Preset[] = [
  { name: 'today', label: 'Today', checked: false },
  { name: 'yesterday', label: 'Yesterday', checked: false },
  { name: 'last7', label: 'This week', checked: false },
  { name: 'last30', label: 'This month', checked: false },
];

export const DateRangePicker: FC<Props> = memo(
  ({
    className,
    Prefix,
    isErrorPresent,
    variant,
    initialDateFrom,
    initialDateTo,
    onUpdate,
    size,
    minWidth,
    maxWidth,
    fullWidth,
    dateType,
    label,
    // before,
    // after,
    errorText,
  }) => {
    const [date, setDate] = useState<DateRange | undefined>({
      from: initialDateFrom ? new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)) : undefined,
      to: initialDateTo ? new Date(new Date(initialDateTo).setHours(23, 59, 59, 59)) : undefined,
    });
    const [presets, setPresets] = useState(PRESETS);
    const [isCalenderOpen, setIsCalenderOpen] = useState(false);
    const [selectedPreset, setSelectedPreset] = useState<string | undefined>(undefined);

    const commonClasses = useMemo(() => {
      let borderClass = '',
        focusClass = '';
      if (isErrorPresent) {
        borderClass = 'border-red-500';
        focusClass = 'focus:border-red-500';
      } else {
        borderClass = 'border-gray-300';
        focusClass = 'focus:border-blue-500';
      }
      return cn(
        'form-input max-h-[2.35rem] text-black',
        Prefix ? 'pl-10' : 'pl-3',
        'rounded',
        borderClass,
        focusClass,
        size === 'S' ? 'text-sm' : 'text-base',
        variant === 'outlined' ? 'border' : variant === 'filled' ? 'bg-gray-100' : '',
        className
      );
    }, [Prefix, className, isErrorPresent, size, variant]);

    const handleDateChange = useCallback(
      (range: DateRange | undefined) => {
        if (range?.from === date?.from && !!date?.from && !!date?.to) {
          onUpdate(
            {
              from: new Date(new Date(range?.to as Date).setHours(0, 0, 0, 0)),
              to: undefined,
            },
            dateType
          );
          return setDate({
            from: new Date(new Date(range?.to as Date).setHours(0, 0, 0, 0)),
            to: undefined,
          });
        } else if (range?.to === date?.to && !!date?.from && !!date?.to) {
          onUpdate(
            {
              from: new Date(new Date(range?.from as Date).setHours(23, 59, 59, 999)),
              to: undefined,
            },
            dateType
          );
          return setDate({
            from: new Date(new Date(range?.from as Date).setHours(23, 59, 59, 999)),
            to: undefined,
          });
        }
        range && onUpdate(range, dateType);
        range?.to?.setHours(23, 59, 59, 999);
        setDate(range);
        setSelectedPreset('');
      },
      [onUpdate, date, dateType]
    );

    useEffect(() => {
      setDate({
        from: initialDateFrom ? new Date(new Date(initialDateFrom).setHours(0, 0, 0, 0)) : undefined,
        to: initialDateTo ? new Date(new Date(initialDateTo).setHours(23, 59, 59, 59)) : undefined,
      });
    }, [initialDateFrom, initialDateTo]);

    const getPresetRange = (presetName: string): DateRange => {
      const preset = PRESETS.find(({ name }) => name === presetName);
      if (!preset) throw new Error(`Unknown date range preset: ${presetName}`);
      const from = new Date();
      const to = new Date();
      const first = from.getDate() - from.getDay();

      switch (preset.name) {
        case 'today':
          to.setHours(23, 59, 59, 999);
          break;
        case 'yesterday':
          from.setDate(from.getDate() - 1);
          to.setDate(to.getDate() - 1);
          break;
        case 'last7':
        case 'last14':
        case 'last30':
          from.setDate(from.getDate() - (preset.name === 'last7' ? 6 : preset.name === 'last14' ? 13 : 29));
          break;
        case 'thisWeek':
          from.setDate(first);
          break;
        case 'lastWeek':
          from.setDate(from.getDate() - 7 - from.getDay());
          to.setDate(to.getDate() - to.getDay() - 1);
          break;
        case 'thisMonth':
          from.setDate(1);
          to.setHours(23, 59, 59, 999);
          break;
      }

      from.setHours(0, 0, 0, 0);
      to.setHours(23, 59, 59, 59);

      return { from, to };
    };

    const setPreset = useCallback(
      (preset: string): void => {
        const range = getPresetRange(preset);
        onUpdate(range, dateType);
        setDate(range);
      },
      [dateType, onUpdate]
    );

    const handlePreset = useCallback(
      (value: string) => {
        setSelectedPreset(value);
        setPreset(value);
        setPresets((prev) => prev.map((item) => ({ ...item, checked: item.name === value })));
      },
      [setPreset]
    );

    const handlePopverChange = useCallback((isVisible: boolean) => setIsCalenderOpen(isVisible), []);

    useEffect(() => {
      if (date?.to) {
        setIsCalenderOpen(false);
      }
    }, [date?.to]);

    return (
      <div className={cn('left-0 grid gap-2', className)}>
        <Popover interactionType="click" isOpen={isCalenderOpen} handleChange={handlePopverChange}>
          {label && <label className="form-label">{label}</label>}
          <Button
            id="date"
            size={size}
            variant={'outline'}
            className={cn(
              `flex w-56 justify-start p-2 text-left font-normal focus:ring-0 md:min-w-[${minWidth}] lg:max-w-[${maxWidth}]`,
              commonClasses,
              {
                'w-full': fullWidth,
              }
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-admin-outline" />
            {date?.from ? (
              date.to ? (
                <>
                  {format(date.from, 'LLL dd, y')} - {format(date.to, 'LLL dd, y')}
                </>
              ) : (
                format(date.from, 'LLL dd, y')
              )
            ) : (
              <span className="text-admin-outline">Pick a date</span>
            )}
          </Button>
          <Popover.Popup placement="bottom-start" className="z-10 mt-2 w-auto rounded border p-2">
            <div className="left-10 flex w-auto gap-3">
              <div className="flex w-auto flex-col gap-1">
                {presets.map((item) => (
                  <Button
                    key={item.name}
                    className={cn('px-4 py-2 text-base font-medium no-underline', { 'text-red-800': item.name === selectedPreset })}
                    variant="flat"
                    onClick={() => handlePreset(item.name)}
                  >
                    {item.label}
                  </Button>
                ))}
              </div>
              <div className="flex flex-col items-center gap-2">
                <Calendar
                  // initialFocus
                  mode="range"
                  defaultMonth={date?.from}
                  selected={date}
                  onSelect={handleDateChange}
                  numberOfMonths={1}
                  // disabled={{
                  //   before: before ? new Date(before) : undefined,
                  //   after: after ? new Date(after) : undefined,
                  // }}
                />
              </div>
            </div>
          </Popover.Popup>
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

DateRangePicker.displayName = 'DateRangePicker';
DateRangePicker.defaultProps = {
  size: 'M',
  minWidth: '20rem',
  fullWidth: false,
  disabled: false,
  required: false,
  label: '',
  helperText: '',
  errorText: '',
};

export default DateRangePicker;
