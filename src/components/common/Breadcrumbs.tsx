import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

export interface BreadcrumbItem {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = '' }) => {
  return (
    <nav aria-label="Breadcrumb" className={`flex items-center text-xs tracking-wider uppercase font-medium text-[#777C76] ${className}`}>
      <ol className="flex items-center flex-wrap gap-1.5">
        {items.map((item, idx) => {
          const isLast = idx === items.length - 1;
          return (
            <li key={idx} className="flex items-center gap-1.5">
              {idx > 0 && <ChevronRight className="w-3.5 h-3.5 text-[#B49A70] rtl:rotate-180" />}
              {isLast || !item.path ? (
                <span className="text-[#17201C] font-semibold truncate max-w-[200px] sm:max-w-xs">{item.label}</span>
              ) : (
                <Link
                  to={item.path}
                  className="hover:text-[#B49A70] transition-colors truncate"
                >
                  {item.label}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};
