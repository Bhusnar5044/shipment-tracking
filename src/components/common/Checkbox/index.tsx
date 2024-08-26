import type { ChangeEvent, FC } from 'react';
import { memo, useCallback } from 'react';

import type { CheckboxProps } from './types';

const Checkbox: FC<CheckboxProps> = memo(
  ({
    size = 'medium',
    label,
    name,
    disabled = false,
    error = false,
    required = false,
    fullWidth = false,
    labelPosition = 'right',
    errorText = '',
    onChange,
    enableRegister,
    checked,
    register,
  }) => {
    const checkboxClasses = `inline-flex items-center ${fullWidth ? 'w-full' : ''}`;
    const labelClasses = `ml-2 ${labelPosition === 'left' ? 'order-1' : ''} ${labelPosition === 'top' ? 'block mt-2' : ''}`;
    const errorClasses = `text-red-500 ${error ? 'block' : 'hidden'}`;
    const handleCheckboxChange = useCallback(
      (event: ChangeEvent<HTMLInputElement>) => {
        const { checked } = event.target;
        onChange?.(checked);
      },
      [onChange]
    );
    return (
      <div className={checkboxClasses}>
        {labelPosition === 'left' && (
          <label htmlFor={label} className={labelClasses}>
            {label}
          </label>
        )}
        <input
          type="checkbox"
          id={label}
          name={label}
          disabled={disabled}
          checked={checked}
          required={required}
          onChange={handleCheckboxChange}
          className={`form-checkbox text-${size} ${error ? 'border-red-500' : 'border-gray-300'} ${
            disabled ? 'cursor-not-allowed' : 'cursor-pointer'
          } ${fullWidth ? 'w-full' : ''}`}
          {...(enableRegister ? register?.(name ?? '') : {})}
        />
        {(labelPosition === 'right' || labelPosition === 'bottom') && (
          <label htmlFor={label} className={labelClasses}>
            {label}
          </label>
        )}
        <div className={errorClasses}>{errorText}</div>
      </div>
    );
  }
);

// "w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"

Checkbox.displayName = 'Checkbox';
export default Checkbox;
