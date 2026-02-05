'use client';

import { useState, useEffect } from 'react';
import { OpportunityCard } from '@/components/opportunities/opportunity-card';
import { OpportunityFilters } from '@/components/opportunities/opportunity-filters';
import { Loading } from '@/components/ui/loading';
import { opportunitiesApi, OpportunityFilters as FilterType } from '@/lib/api/opportunities';
import { categoriesApi } from '@/lib/api/categories';
import { OpportunityWithRelations, Category } from '@/types';
import { useTranslations } from 'next-intl';

export default function HomePage() {
  const t = useTranslations('home');
  const [opportunities, setOpportunities] = useState<OpportunityWithRelations[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [filters, setFilters] = useState<FilterType>({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const data = await categoriesApi.getAll();
        setCategories(data);
      } catch (error) {
        console.error('Failed to fetch categories:', error);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchOpportunities = async () => {
      setIsLoading(true);
      try {
        const data = await opportunitiesApi.getAll(filters);
        setOpportunities(data);
      } catch (error) {
        console.error('Failed to fetch opportunities:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpportunities();
  }, [filters]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">{t('title')}</h1>
        <p className="mt-2 text-gray-600">
          {t('subtitle')}
        </p>
      </div>

      <div className="mb-6">
        <OpportunityFilters
          categories={categories}
          filters={filters}
          onFilterChange={setFilters}
        />
      </div>

      {isLoading ? (
        <div className="py-20">
          <Loading size="lg" />
        </div>
      ) : opportunities.length === 0 ? (
        <div className="text-center py-20">
          <p className="text-gray-500 text-lg">{t('noResults')}</p>
          <p className="text-gray-400 mt-2">{t('noResultsHint')}</p>
        </div>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {opportunities.map((opportunity) => (
            <OpportunityCard key={opportunity.opportunity.id} opportunity={opportunity} />
          ))}
        </div>
      )}
    </div>
  );
}
