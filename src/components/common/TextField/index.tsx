/* eslint-disable @typescript-eslint/no-explicit-any */
import type { ChangeEvent, FC, KeyboardEvent } from 'react';
import {
  forwardRef,
  memo,
  useCallback,
  useMemo,
  useRef,
  useState,
} from 'react';

import Icon from '../Icon';
import Typography from '../Typography';
import { useCombinedRefs } from '@/hooks/useCombinedRefs';
import { useOutsideClickNotifier } from '@/hooks/useOutsideClickNotifier';
import { cn } from '@/utils';

import getMaskedValue from './getMaskedValue';
import type { TextFieldProps } from './types';

const Component: FC<TextFieldProps> = memo(
  forwardRef((props, ref) => {
    const {
      id,
      value,
      size = 'M',
      variant = 'filled',
      minWidth = '20rem',
      label,
      maxWidth,
      fullWidth,
      errorText,
      helperText,
      prefix: Prefix,
      suffix: Suffix,
      required = false,
      disabled,
      showDecorators = true,
      mask,
      placeholder,
      multiline,
      minRows = 1,
      validator,
      className,
      withCharacterCount,
      onChange,
      onBlur,
      onClear,
      handleOnEnter,
      showTooltipForHelperAndErrorText,
      // edges,
      enableOnEnter,
      // disableBottomMargin,
      register,
      enableRegister,
      name,
      enableOnSearch,
      labelClass,
      regex,
      title,
      ...restProps
    } = props;

    const [errorMessage, setErrorMessage] = useState('');
    const inputRef = useCombinedRefs<any>(ref, useRef());
    const inputAreaRef = useCombinedRefs<any>(ref, useRef());
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [inputVal, setInputVal] = useState<string>('');
    const [characterCountValue, setCharacterCountValue] = useState(
      value
        ? value.toString().length
        : restProps.defaultValue?.toString().length ?? 0
    );
    const isErrorPresent = useMemo(
      () => !!errorText || !!errorMessage,
      [errorText, errorMessage]
    );

    const handleOnChange = useCallback(
      async (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const valueString = event.target.value
          ? event.target.value.toString()
          : '';
        setCharacterCountValue(valueString.length);

        if (regex) {
          const regexPattern = new RegExp(regex);
          const isValid = regexPattern.test(valueString);
          if (!isValid && valueString.length > 0) {
            setErrorMessage(title || 'Invalid input');
            event.target.setCustomValidity(title || 'Invalid input');
          } else {
            setErrorMessage('');
            event.target.setCustomValidity('');
          }
        }
        if (mask) {
          const maskedValue = getMaskedValue(event, mask);
          event.target.value = maskedValue;
        }
        if(enableOnEnter)
         setInputVal(valueString);
        else 
         onChange?.(event);
      },
      [enableOnEnter, mask, onChange, regex, title]
    );

    const onKeyDown = useCallback(
      (event: KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        if (event.key === 'Enter' && enableOnEnter) {
          handleOnEnter?.(inputVal);
        }
      },
      [enableOnEnter, handleOnEnter, inputVal]
    );
    const handleOnClear = useCallback(() => {
      onClear?.();
    }, [onClear]);

    const commonClasses = useMemo(() => {
      let borderClass = '';
      let focusClass = '';
      let variantBaseClass = '';
      if (isErrorPresent) {
        borderClass = 'border-red-500';
        focusClass = 'focus:border-red-500';
      } else {
        borderClass = 'border-gray-500';
        focusClass = 'focus:border-blue-500';
      }

      if (variant === 'outlined') variantBaseClass = 'border';
      else if (variant === 'filled') variantBaseClass = 'bg-gray-100';

      return cn(
        `form-input max-h-[2.35rem] text-black md:min-w-[${minWidth}] lg:max-w-[${maxWidth}] min-h-8`,
        Prefix ? 'pl-10' : 'pl-3',
        'rounded',
        borderClass,
        focusClass,
        size === 'S' ? 'text-sm' : 'text-base',
        variantBaseClass,
        { 'w-full': fullWidth },
        className
      );
    }, [Prefix, className, fullWidth, isErrorPresent, maxWidth, minWidth, size, variant]);

    const inputId = useMemo(() => id ?? 'textField', [id]);
    const displayCharacterCount = useMemo(
      () =>
        !!(
          withCharacterCount &&
          showDecorators &&
          props.maxLength &&
          props.maxLength >= 0
        ),
      [withCharacterCount, showDecorators, props.maxLength]
    );

    const validate = useCallback(
      (
        event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
        eventFunc?: (e: any) => void
      ) => {
        event.preventDefault();
        const element = event.target as HTMLInputElement;
        const validatorMessage = validator?.(element.value, event) || '';
        const message = validator
          ? validatorMessage
          : element.validationMessage;
        setErrorMessage(message);
        validator && inputRef.current?.setCustomValidity(validatorMessage);
        eventFunc?.(event);
      },
      [validator, inputRef]
    );
    const handleOnBlur = useCallback(
      (event: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
        validate(event, onBlur),
      [validate, onBlur]
    );

    // to be edited for dynamic data for now using the vendorName hook here only

    const handleClickOutside = useCallback(() => {
      setShowSuggestions(false);
    }, []);

    const refs = useOutsideClickNotifier(handleClickOutside, showSuggestions);

    return (
      <div ref={refs}>
        {label && (
          <label className={cn('form-label text-black', labelClass)}>
            {label}
          </label>
        )}
        <div
          className={cn(
            `relative`,
          )}
        >
          {Prefix && (
            <span
              className={cn(
                'pointer-events-none absolute inset-y-0 left-0 flex items-center pl-2'
              )}
            >
              {Prefix}
            </span>
          )}
          {multiline ? (
            <textarea
              ref={inputAreaRef}
              name={name}
              required={required}
              className={commonClasses}
              placeholder={placeholder}
              value={value}
              rows={minRows}
              id={inputId}
              {...(enableRegister
                ? register?.(name ?? '')
                : { onChange: handleOnChange, onBlur: handleOnBlur })}
              {...restProps}
            />
          ) : (
            <input
              ref={inputRef}
              name={name}
              required={required}
              className={commonClasses}
              placeholder={placeholder}
              value={value}
              onKeyDown={onKeyDown}
              disabled={disabled}
              id={inputId}
              {...(title && {
                onInvalid: (e) =>
                  (e.target as HTMLInputElement).setCustomValidity(title),
              })}
              {...(regex && { pattern: regex })}
              {...(enableRegister
                ? register?.(name ?? '')
                : { onChange: handleOnChange, onBlur: handleOnBlur })}
              {...restProps}
              // type={"number"}
            />
          )}
          {Suffix && (
            <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
              {Suffix}
            </span>
          )}
          {enableOnSearch && (
            <div
              className={cn(
                'absolute right-1 top-1/2 flex -translate-y-1/2 items-center justify-center text-center'
              )}
            >
              {value && (
                <Icon
                  iconName="close"
                  className={cn('text-gray-45 ml-2 h-8 w-8')}
                  onClick={handleOnClear}
                />
              )}
              <Icon
                iconName="search"
                className={cn('text-gray-45 ml-2 h-8 w-8')}
              />
            </div>
          )}
        </div>
        {displayCharacterCount && (
          <Typography
            variant="body4"
            className={cn('mt-1 text-xs text-gray-500')}
          >{`${characterCountValue}/${props.maxLength}`}</Typography>
        )}
        {isErrorPresent && (
          <Typography
            variant="body4"
            className={cn('mt-1 text-xs italic text-red-500', {
              tooltip: showTooltipForHelperAndErrorText,
            })}
          >
            {errorText || errorMessage || ''}
          </Typography>
        )}
        {helperText && (
          <Typography
            variant="body4"
            className={cn('mt-1 text-xs text-gray-500', {
              tooltip: showTooltipForHelperAndErrorText,
            })}
          >
            {helperText}
          </Typography>
        )}
      </div>
    );
  })
);

Component.displayName = 'TextField';
const TextField: FC<TextFieldProps> = Object.assign(Component);

export default TextField;
