'use client';

import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface RatingProps {
  value: number;
  max?: number;
  size?: 'sm' | 'md' | 'lg';
  showValue?: boolean;
  onChange?: (value: number) => void;
}

export function Rating({ value, max = 5, size = 'md', showValue = false, onChange }: RatingProps) {
  const sizes = {
    sm: 'h-4 w-4',
    md: 'h-5 w-5',
    lg: 'h-6 w-6',
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: max }).map((_, i) => (
        <button
          key={i}
          type="button"
          onClick={() => onChange?.(i + 1)}
          disabled={!onChange}
          className={cn(!onChange && 'cursor-default')}
        >
          <Star
            className={cn(
              sizes[size],
              i < value ? 'text-yellow-400 fill-yellow-400' : 'text-gray-300'
            )}
          />
        </button>
      ))}
      {showValue && (
        <span className="ml-2 text-sm text-gray-600">
          {value.toFixed(1)}
        </span>
      )}
    </div>
  );
}
