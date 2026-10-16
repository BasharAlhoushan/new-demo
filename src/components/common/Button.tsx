import React from 'react';
import { motion, HTMLMotionProps } from 'framer-motion';
import { cn } from '../../utils/formatters';

export interface ButtonProps extends Omit<HTMLMotionProps<'button'>, 'children'> {
  variant?: 'primary' | 'dark' | 'outline' | 'ghost' | 'white' | 'outline-light';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  icon?: React.ReactNode;
  iconPosition?: 'left' | 'right';
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  variant = 'primary',
  size = 'md',
  children,
  icon,
  iconPosition = 'right',
  isLoading = false,
  className,
  disabled,
  ...props
}) => {
  const baseStyles =
    'relative inline-flex items-center justify-center font-medium tracking-wide uppercase transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-[#B49A70]/50 disabled:opacity-50 disabled:cursor-not-allowed select-none';

  const sizeStyles = {
    sm: 'text-xs px-4 py-2 gap-1.5 rounded-sm tracking-wider',
    md: 'text-xs px-6 py-3.5 gap-2 rounded-sm tracking-widest',
    lg: 'text-sm px-8 py-4 gap-2.5 rounded-sm tracking-widest',
  };

  const variantStyles = {
    primary:
      'bg-[#B49A70] hover:bg-[#A3895F] text-[#111715] font-semibold shadow-sm hover:shadow-md hover:shadow-[#B49A70]/20 active:translate-y-px shine-effect',
    dark:
      'bg-[#111715] hover:bg-[#1A2320] text-[#F8F7F4] border border-[#2A3530] hover:border-[#B49A70]/50 active:translate-y-px',
    outline:
      'border border-[#B49A70] text-[#17201C] hover:bg-[#B49A70] hover:text-[#111715] active:translate-y-px',
    'outline-light':
      'border border-white/30 text-white hover:bg-white hover:text-[#111715] active:translate-y-px backdrop-blur-sm',
    white:
      'bg-white text-[#111715] hover:bg-[#F8F7F4] shadow-md hover:shadow-lg active:translate-y-px',
    ghost:
      'text-[#17201C] hover:text-[#B49A70] hover:bg-[#111715]/5 active:translate-y-px',
  };

  return (
    <motion.button
      whileHover={{ scale: disabled || isLoading ? 1 : 1.01 }}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.98 }}
      className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="inline-block w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-2" />
      ) : (
        icon && iconPosition === 'left' && <span className="inline-flex shrink-0 rtl:rotate-180">{icon}</span>
      )}
      <span>{children}</span>
      {!isLoading && icon && iconPosition === 'right' && (
        <span className="inline-flex shrink-0 rtl:rotate-180">{icon}</span>
      )}
    </motion.button>
  );
};
