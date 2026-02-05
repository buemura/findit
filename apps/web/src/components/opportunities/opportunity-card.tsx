'use client';

import Link from 'next/link';
import { MapPin, DollarSign, Calendar } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { OpportunityWithRelations } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { useTranslations } from 'next-intl';

interface OpportunityCardProps {
  opportunity: OpportunityWithRelations;
}

export function OpportunityCard({ opportunity }: OpportunityCardProps) {
  const t = useTranslations('opportunity');
  const { opportunity: opp, category, user } = opportunity;

  const formatPrice = () => {
    if (!opp.priceMin && !opp.priceMax) return t('negotiable');
    if (opp.priceMin && opp.priceMax) {
      return `$${parseFloat(opp.priceMin).toLocaleString()} - $${parseFloat(opp.priceMax).toLocaleString()}`;
    }
    if (opp.priceMin) return `${t('from')} $${parseFloat(opp.priceMin).toLocaleString()}`;
    return `${t('upTo')} $${parseFloat(opp.priceMax!).toLocaleString()}`;
  };

  const formatLocation = () => {
    const parts = [opp.city, opp.state, opp.country].filter(Boolean);
    return parts.join(', ');
  };

  return (
    <Link href={`/opportunities/${opp.id}`}>
      <Card className="hover:shadow-md transition-shadow cursor-pointer h-full">
        <CardContent className="p-6">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                {category && (
                  <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-primary-100 text-primary-800">
                    {category.name}
                  </span>
                )}
                <span
                  className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    opp.status === 'open'
                      ? 'bg-green-100 text-green-800'
                      : opp.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {t(`status.${opp.status}`)}
                </span>
              </div>

              <h3 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                {opp.title}
              </h3>

              <p className="text-gray-600 text-sm mb-4 line-clamp-2">
                {opp.description}
              </p>

              <div className="flex flex-wrap gap-4 text-sm text-gray-500">
                <div className="flex items-center gap-1">
                  <DollarSign className="h-4 w-4" />
                  {formatPrice()}
                </div>
                <div className="flex items-center gap-1">
                  <MapPin className="h-4 w-4" />
                  {formatLocation()}
                </div>
                <div className="flex items-center gap-1">
                  <Calendar className="h-4 w-4" />
                  {formatDistanceToNow(new Date(opp.createdAt), { addSuffix: true })}
                </div>
              </div>
            </div>
          </div>

          {user && (
            <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3">
              <Avatar src={user.userPhoto} size="sm" />
              <div>
                <p className="text-sm font-medium text-gray-900">{user.name}</p>
                {user.city && (
                  <p className="text-xs text-gray-500">{user.city}, {user.country}</p>
                )}
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  );
}
