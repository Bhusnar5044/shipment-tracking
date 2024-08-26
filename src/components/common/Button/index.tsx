import { forwardRef, memo } from 'react';

import { cn } from '@/utils';

import type { ButtonEdges, ButtonProps, ButtonSizes, ButtonVariant, Ref } from './types';

// TODO: ADD customer theme and Dark Theme
export const getVariant = (variant: ButtonVariant) => {
  switch (variant) {
    case 'solid':
      return `text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800`;
    case 'outline':
      return `bg-transparent text-sm font-medium text-gray-900 focus:outline-none rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700`;
    case 'flat':
      return `bg-transparent text-sm font-medium text-gray-900 focus:outline-none hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white`;
    default:
      return undefined;
  }
};
// used for Chip as well
export const getSizes = (size: ButtonSizes, removePadding?: boolean, variant?: ButtonVariant) => {
  const removePd = removePadding && variant && variant === 'flat';
  switch (size) {
    case 'XS':
      return `${removePd ? '' : 'px-2 py-0.5'} text-xs`;
    case 'M':
      return `${removePd ? '' : 'px-3 py-2'} text-xs lg:text-sm`;
    case 'L':
      return `${removePd ? '' : 'px-5 py-2.5'} text-sm lg:text-base`;
    default:
      return `${removePd ? '' : 'px-2 py-1'} text-xs lg:text-sm`;
  }
};

// used for Chip as well
export const getEdges = (edge: ButtonEdges) => {
  switch (edge) {
    case 'square':
      return 'rounded';
    case 'circle':
      return 'rounded-full';
    default:
      return 'rounded-lg';
  }
};

export const Button = memo(
  forwardRef<Ref, ButtonProps>((props, ref) => {
    const {
      variant = 'solid',
      type = 'button',
      edges = 'square',
      className,
      children,
      size = 'M',
      isLoading,
      fullWidth,
      disabled,
      hideUnderline,
      removePadding = false,
      ...rest
    } = props;

    const merged = cn(
      'flex items-center whitespace-nowrap text-center font-medium font-medium capitalize focus:outline-none focus:ring-1',
      { 'w-full justify-center': fullWidth },
      { 'cursor-not-allowed': disabled },
      { 'underline underline-offset-4': !hideUnderline && variant === 'flat' },
      getEdges(edges),
      getSizes(size, removePadding, variant),
      getVariant(variant),
      className ?? ''
    );

    return (
      <button ref={ref} className={merged} type={type} disabled={disabled} {...rest}>
        {isLoading ? (
          <>
            <svg
              aria-hidden="true"
              role="status"
              className="mr-2 inline h-4 w-4 animate-spin text-white"
              viewBox="0 0 100 101"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                fill={variant === 'solid' ? `#E5E7EB` : 'currentColor'}
              />
              <path
                d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                fill={variant === 'solid' ? 'currentColor' : '#1C64F2'}
              />
            </svg>
            Loading...
          </>
        ) : (
          children
        )}
      </button>
    );
  })
);

Button.displayName = 'Button';
export default Button;
