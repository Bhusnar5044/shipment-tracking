import { cn } from '@/utils';
import { FC, memo } from 'react';
import { DayPicker } from 'react-day-picker';
import { getVariant } from '../Button';
// import Icon from "../Icon";
// import { IconChevronLeft } from "./IconChevronLeft";
// import { IconChevronRight } from "./IconChevronRight";

export type CalendarProps = React.ComponentProps<typeof DayPicker>;
export const Calendar: FC<CalendarProps> = memo(({ className, classNames, showOutsideDays = true, ...props }) => {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn('h-auto rounded p-3', className)}
      classNames={{
        months: 'flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0',
        month: 'space-y-4',
        caption: 'flex justify-center pt-1 relative items-center',
        caption_label: 'text-sm font-medium',
        nav: 'space-x-1 flex items-center',
        nav_button: cn(getVariant('outline'), 'h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100'),
        nav_button_previous: 'absolute left-3 border-none',
        nav_button_next: 'absolute right-1 border-none',
        table: 'w-full border-collapse space-y-1 ',
        head_row: 'flex',
        head_cell: 'text-muted-foreground rounded-md w-9 font-normal text-[0.8rem] rounded-full',
        row: 'flex w-full mt-2 rounded aria-selected:bg-[#DFE2EE]',
        cell: 'text-center text-sm p-0 relative [&:has([aria-selected])]:bg-accent first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md focus-within:relative focus-within:z-20 ',
        day: cn(
          'text-gray-900 rounded-full border-gray-300 hover:bg-gray-100 focus:ring-gray-200 text-sm dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700',
          'h-9 w-9 p-0 font-normal aria-selected:opacity-100'
        ),
        day_selected:
          'bg-primary bg-[#002656] text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground rounded-full',
        day_outside: 'text-muted-foreground opacity-50',
        day_disabled: 'text-muted-foreground opacity-50',
        day_range_middle: 'first:[aria-selected:rounded-full] aria-selected:bg-accent aria-selected:text-accent-foreground',
        day_hidden: 'invisible',
        ...classNames,
      }}
      // components={{
      //   IconLeft: () => <IconChevronLeft className="h-4 w-4" />,
      //   IconRight: () => <IconChevronRight className="h-4 w-4" />,
      // }}
      {...props}
    />
  );
});

Calendar.displayName = 'Calendar';
export default Calendar;
