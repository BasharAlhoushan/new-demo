import React from 'react';
import { cn } from '../../utils/formatters';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'charcoal' | 'light' | 'glass' | 'white';
  size?: 'sm' | 'md';
  className?: string;
  icon?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  className,
  icon,
}) => {
  const baseStyles =
    'inline-flex items-center tracking-wider uppercase font-medium rounded-full select-none';

  const sizeStyles = {
    sm: 'text-[10px] px-2.5 py-0.5 gap-1',
    md: 'text-xs px-3.5 py-1 gap-1.5',
  };

  const variantStyles = {
    gold: 'bg-[#B49A70]/15 text-[#8F764F] border border-[#B49A70]/30',
    charcoal: 'bg-[#111715] text-[#F8F7F4] border border-[#2A3530]',
    light: 'bg-[#F8F7F4] text-[#17201C] border border-[#E8E6E0]',
    glass: 'bg-black/40 text-white backdrop-blur-md border border-white/20',
    white: 'bg-white text-[#17201C] shadow-sm border border-[#E8E6E0]',
  };

  return (
    <span className={cn(baseStyles, sizeStyles[size], variantStyles[variant], className)}>
      {icon && <span className="inline-flex shrink-0">{icon}</span>}
      <span>{children}</span>
    </span>
  );
};
