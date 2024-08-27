/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import type { FC } from 'react';
import { memo, useCallback, useEffect, useMemo, useState } from 'react';

import { useOutsideClickNotifier } from '@/hooks/useOutsideClickNotifier';
import { cn } from '@/utils';
import Icon from '../Icon';
import OptionContainer from '../OptionContainer';
import type { SelectOption } from '../OptionContainer/types';
import TextField from '../TextField';
import type { TextFieldEventType } from '../TextField/types';

import type { SingleSelectProps } from './types';

const SingleSelect: FC<SingleSelectProps> = memo(
  ({
    // searchInputCannotBeEmpty = false,
    name,
    placeholder = 'Search...',
    options,
    defaultValue,
    size = 'M',
    value,
    onChange,
    label,
    searchable,
    error,
    enableRegister,
    register,
    hideExpandableIcon,
    minWidth = '20rem',
    maxWidth,
    fullWidth,
    variant,
    className,
    id,
    // labelClass,
  }) => {
    const [search, setSearch] = useState<string>('');
    const [isOpen, setIsOpen] = useState(false);
    const [focus, setFocus] = useState(false);
    // const savedOption = useRef<{ value: number | string; label: string }>({
    //   value: '',
    //   label: '',
    // });

    const selectedOption = useMemo(() => options?.find((option) => option.value === (value || defaultValue)), [defaultValue, options, value]);

    // useEffect(() => {
    //   if (selectedOption) {
    //     savedOption.current = selectedOption;
    //   }
    // }, [selectedOption]);

    const handleFocus = useCallback(() => {
      setIsOpen(true);
      setFocus(true);
    }, []);

    const handleSearch = useCallback(
      (event: TextFieldEventType) => {
        const { value } = event.target;
        console.log('called', value);
        setSearch(value);
        onChange?.({ name, search: value });
      },
      [name, onChange]
    );

    const handleOptionClick = (option: SelectOption) => {
      onChange?.({ name, option, search: option.label });
      // savedOption.current = option;
      setSearch('');
      setIsOpen(false);
      setFocus(false);
    };

    const handleNotFoundOptionClick = useCallback(() => {
      onChange?.({ name });
      setIsOpen(false);
      setFocus(false);
    }, [name, onChange]);

    const handleOutsideClick = useCallback(() => {
      setIsOpen(false);
      setFocus(false);
      // if (searchInputCannotBeEmpty) {
      //   onChange?.({
      //     name,
      //     option: savedOption.current,
      //     search: savedOption.current.label,
      //   });
      //   setSearch(savedOption.current.label ?? selectedOption?.label ?? value ?? '');
      // }
    }, []);

    const handleOnClear = useCallback(() => {
      onChange?.({
        name,
        search: '',
      });
      setSearch('');
    }, [name, onChange]);

    const ref = useOutsideClickNotifier(handleOutsideClick, isOpen);

    const filteredOptions = useMemo(
      () =>
        searchable && search
          ? options?.filter((option) => {
              const searchTerm = search?.toString()?.toLowerCase() ?? '';
              const labelMatches = option.label.toLowerCase().includes(searchTerm);
              const valueMatches =
                typeof option.value === 'number'
                  ? option.value.toString().toLowerCase().includes(searchTerm)
                  : typeof option.value === 'string'
                    ? option.value.toLowerCase().includes(searchTerm)
                    : false;
              return labelMatches || valueMatches;
            })
          : options,
      [options, search, searchable]
    );

    useEffect(() => {
      console.log(searchable, search, selectedOption);
    }, [search, searchable, selectedOption]);

    return (
      <div className={cn(`w-full md:min-w-[${minWidth}] lg:max-w-[${maxWidth}]`, { 'w-full': fullWidth }, className)}>
        <div id={`Select-${id}`} ref={ref} className="relative">
          <TextField
            id={`Select-${id}`}
            className={cn('w-full rounded p-2 outline-none', size === 'S' ? 'text-sm' : 'text-base')}
            type="text"
            variant={variant}
            onFocus={handleFocus}
            name={name}
            label={label}
            {...(searchable
              ? {
                  onChange: handleSearch,
                  placeholder: focus ? 'Search...' : placeholder,
                  enableOnSearch: true,
                  hideSearchIcon: true,
                  onClear: handleOnClear,
                }
              : { placeholder })}
            {...(enableRegister ? register?.(name ?? '') : {})}
            value={(selectedOption?.label || search) ?? ''}
            {...(!hideExpandableIcon
              ? {
                  suffix: (
                    <Icon
                      onClick={() => setIsOpen((p) => !p)}
                      id={`Toggle-${id}`}
                      className={cn('relative cursor-pointer', isOpen ? 'rotate-180' : 'rotate-0')}
                      iconName="arrow_drop_down"
                    />
                  ),
                }
              : {})}
            fullWidth
          />
          <OptionContainer
            options={filteredOptions}
            handleOptionClick={handleOptionClick}
            value={selectedOption?.label ?? ''}
            handleNotFoundOptionClick={handleNotFoundOptionClick}
            isOpen={isOpen}
            isLabelExist={!!label}
          />
        </div>

        {error && (
          <small className={cn('mt-2 text-xs italic text-red-500')}>
            <p>{error}</p>
          </small>
        )}
      </div>
    );
  }
);

SingleSelect.displayName = 'SingleSelect';
export default SingleSelect;
