import { cn } from '@/utils';
import { FC, memo } from 'react';
import { FixedSizeList as List } from 'react-window';
import { OptionContainerProps } from './types';

const OptionContainer: FC<OptionContainerProps> = memo(({ isOpen, options, isLabelExist, handleOptionClick, value, handleNotFoundOptionClick }) => {
  const height = options?.length ? (options.length * 40 > 280 ? 280 : options.length * 40) : 0;
  return (
    <div
      className={cn(
        'absolute z-20 w-full rounded shadow-xl -gray-25 bg-white',
        isOpen ? 'block border' : 'hidden border-0',
        isLabelExist ? 'top-16' : 'top-11'
      )}
    >
      {options?.length ? (
        <List className="list-none" height={height} itemCount={options.length} itemSize={40} width={'100%'}>
          {({ index, style }) => (
            <option
              className={cn('decoration text-neutral-800 w-full cursor-pointer px-3 py-1 text-left text-black hover:bg-gray-200', {
                'bg-info-infoBanner': options[index].value === value,
              })}
              onClick={() => handleOptionClick(options[index])}
              style={style}
            >
              {options[index].label}
            </option>
          )}
        </List>
      ) : (
        <option key={'not-found'} className={cn('cursor-pointer px-3 py-1 text-neutral-800')} onClick={handleNotFoundOptionClick}>
          No Matches Found
        </option>
      )}
    </div>
  );
});

OptionContainer.displayName = 'OptionContainer';

export default OptionContainer;
