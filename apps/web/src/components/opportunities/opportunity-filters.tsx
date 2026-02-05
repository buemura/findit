'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Category } from '@/types';
import { Filter, X } from 'lucide-react';

interface FilterValues {
  category?: string;
  city?: string;
  country?: string;
  priceMin?: number;
  priceMax?: number;
  sort?: 'newest' | 'oldest' | 'price_asc' | 'price_desc';
}

interface OpportunityFiltersProps {
  categories: Category[];
  filters: FilterValues;
  onFilterChange: (filters: FilterValues) => void;
}

export function OpportunityFilters({
  categories,
  filters,
  onFilterChange,
}: OpportunityFiltersProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  const hasActiveFilters = Object.values(filters).some((v) => v !== undefined && v !== '');

  const clearFilters = () => {
    onFilterChange({});
  };

  return (
    <div className="bg-white rounded-xl border border-gray-200 p-4">
      <div className="flex items-center justify-between mb-4">
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center gap-2 text-sm font-medium text-gray-700"
        >
          <Filter className="h-4 w-4" />
          Filters
          {hasActiveFilters && (
            <span className="bg-primary-100 text-primary-800 px-2 py-0.5 rounded-full text-xs">
              Active
            </span>
          )}
        </button>
        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="text-sm text-gray-500 hover:text-gray-700 flex items-center gap-1"
          >
            <X className="h-4 w-4" /> Clear
          </button>
        )}
      </div>

      <div className={`space-y-4 ${isExpanded ? '' : 'hidden md:block'}`}>
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category
            </label>
            <select
              value={filters.category || ''}
              onChange={(e) => onFilterChange({ ...filters, category: e.target.value || undefined })}
              className="input"
            >
              <option value="">All Categories</option>
              {categories.map((cat) => (
                <option key={cat.id} value={cat.slug}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Location
            </label>
            <Input
              placeholder="City or Country"
              value={filters.city || ''}
              onChange={(e) => onFilterChange({ ...filters, city: e.target.value || undefined })}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Price Range
            </label>
            <div className="flex gap-2">
              <Input
                type="number"
                placeholder="Min"
                value={filters.priceMin || ''}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    priceMin: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              />
              <Input
                type="number"
                placeholder="Max"
                value={filters.priceMax || ''}
                onChange={(e) =>
                  onFilterChange({
                    ...filters,
                    priceMax: e.target.value ? Number(e.target.value) : undefined,
                  })
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Sort By
            </label>
            <select
              value={filters.sort || 'newest'}
              onChange={(e) =>
                onFilterChange({
                  ...filters,
                  sort: e.target.value as FilterValues['sort'],
                })
              }
              className="input"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="price_asc">Price: Low to High</option>
              <option value="price_desc">Price: High to Low</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
}
