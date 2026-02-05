'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { useAuth } from '@/context/auth-context';
import { opportunitiesApi } from '@/lib/api/opportunities';
import { categoriesApi } from '@/lib/api/categories';
import { Category } from '@/types';
import { getStoredToken } from '@/lib/api/client';
import { useTranslations } from 'next-intl';

export default function CreateOpportunityPage() {
  const t = useTranslations('createOpportunity');
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    categoryId: '',
    priceMin: '',
    priceMax: '',
    city: '',
    state: '',
    country: '',
  });

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
    }
  }, [authLoading, isAuthenticated, router]);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!formData.title || !formData.description || !formData.categoryId || !formData.country) {
      setError(t('error.requiredFields'));
      return;
    }

    setIsLoading(true);

    try {
      const token = getStoredToken();
      if (!token) throw new Error('Not authenticated');

      await opportunitiesApi.create(token, {
        title: formData.title,
        description: formData.description,
        categoryId: formData.categoryId,
        country: formData.country,
        city: formData.city || undefined,
        state: formData.state || undefined,
        priceMin: formData.priceMin ? Number(formData.priceMin) : undefined,
        priceMax: formData.priceMax ? Number(formData.priceMax) : undefined,
      });

      router.push('/home');
    } catch (err) {
      setError(err instanceof Error ? err.message : t('error.failed'));
    } finally {
      setIsLoading(false);
    }
  };

  if (authLoading) return null;

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Card>
        <CardHeader>
          <h1 className="text-2xl font-bold text-gray-900">{t('title')}</h1>
          <p className="text-gray-600">{t('subtitle')}</p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <div className="p-3 text-sm text-red-600 bg-red-50 rounded-lg">
                {error}
              </div>
            )}

            <Input
              label={`${t('form.title')} ${t('required')}`}
              placeholder={t('form.titlePlaceholder')}
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.description')} {t('required')}
              </label>
              <textarea
                rows={5}
                className="input"
                placeholder={t('form.descriptionPlaceholder')}
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                {t('form.category')} {t('required')}
              </label>
              <select
                className="input"
                value={formData.categoryId}
                onChange={(e) => setFormData({ ...formData, categoryId: e.target.value })}
                required
              >
                <option value="">{t('form.selectCategory')}</option>
                {categories.map((cat) => (
                  <option key={cat.id} value={cat.id}>
                    {cat.name}
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Input
                label={t('form.minBudget')}
                type="number"
                placeholder="100"
                value={formData.priceMin}
                onChange={(e) => setFormData({ ...formData, priceMin: e.target.value })}
              />
              <Input
                label={t('form.maxBudget')}
                type="number"
                placeholder="500"
                value={formData.priceMax}
                onChange={(e) => setFormData({ ...formData, priceMax: e.target.value })}
              />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <Input
                label={t('form.city')}
                placeholder={t('form.cityPlaceholder')}
                value={formData.city}
                onChange={(e) => setFormData({ ...formData, city: e.target.value })}
              />
              <Input
                label={t('form.state')}
                placeholder={t('form.statePlaceholder')}
                value={formData.state}
                onChange={(e) => setFormData({ ...formData, state: e.target.value })}
              />
              <Input
                label={`${t('form.country')} ${t('required')}`}
                placeholder={t('form.countryPlaceholder')}
                value={formData.country}
                onChange={(e) => setFormData({ ...formData, country: e.target.value })}
                required
              />
            </div>

            <div className="flex gap-4">
              <Button
                type="button"
                variant="secondary"
                onClick={() => router.back()}
                className="flex-1"
              >
                {t('cancel')}
              </Button>
              <Button type="submit" isLoading={isLoading} className="flex-1">
                {t('submit')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
}
