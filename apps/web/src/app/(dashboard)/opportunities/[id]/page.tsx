'use client';

import { useState, useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { MapPin, DollarSign, Calendar, MessageSquare, ArrowLeft, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Rating } from '@/components/ui/rating';
import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/context/auth-context';
import { opportunitiesApi } from '@/lib/api/opportunities';
import { usersApi } from '@/lib/api/users';
import { chatApi } from '@/lib/api/chat';
import { OpportunityWithRelations, UserStats } from '@/types';
import { formatDistanceToNow } from 'date-fns';
import { getStoredToken } from '@/lib/api/client';

export default function OpportunityDetailPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated } = useAuth();
  const [opportunity, setOpportunity] = useState<OpportunityWithRelations | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  const opportunityId = params.id as string;

  useEffect(() => {
    const fetchOpportunity = async () => {
      try {
        const data = await opportunitiesApi.getById(opportunityId);
        setOpportunity(data);

        if (data.user) {
          const stats = await usersApi.getStats(data.user.id);
          setUserStats(stats);
        }
      } catch (error) {
        console.error('Failed to fetch opportunity:', error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchOpportunity();
  }, [opportunityId]);

  const handleContactSeller = async () => {
    if (!isAuthenticated || !opportunity?.user) {
      router.push('/login');
      return;
    }

    try {
      const token = getStoredToken();
      if (!token) return;

      const room = await chatApi.createRoom(token, {
        receiverId: opportunity.user.id,
        opportunityId: opportunity.opportunity.id,
      });
      router.push(`/messages/${room.id}`);
    } catch (error) {
      console.error('Failed to create chat room:', error);
    }
  };

  if (isLoading) {
    return (
      <div className="py-20">
        <Loading size="lg" />
      </div>
    );
  }

  if (!opportunity) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Opportunity not found</h1>
        <Link href="/home" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to opportunities
        </Link>
      </div>
    );
  }

  const { opportunity: opp, category, user: poster } = opportunity;

  const formatPrice = () => {
    if (!opp.priceMin && !opp.priceMax) return 'Negotiable';
    if (opp.priceMin && opp.priceMax) {
      return `$${parseFloat(opp.priceMin).toLocaleString()} - $${parseFloat(opp.priceMax).toLocaleString()}`;
    }
    if (opp.priceMin) return `From $${parseFloat(opp.priceMin).toLocaleString()}`;
    return `Up to $${parseFloat(opp.priceMax!).toLocaleString()}`;
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <Link
        href="/home"
        className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6"
      >
        <ArrowLeft className="h-4 w-4 mr-2" />
        Back to opportunities
      </Link>

      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2">
          <Card>
            <CardContent className="p-6">
              <div className="flex items-center gap-2 mb-4">
                {category && (
                  <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-primary-100 text-primary-800">
                    {category.name}
                  </span>
                )}
                <span
                  className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                    opp.status === 'open'
                      ? 'bg-green-100 text-green-800'
                      : opp.status === 'in_progress'
                      ? 'bg-yellow-100 text-yellow-800'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {opp.status.replace('_', ' ')}
                </span>
              </div>

              <h1 className="text-2xl font-bold text-gray-900 mb-4">{opp.title}</h1>

              <div className="flex flex-wrap gap-4 text-gray-600 mb-6">
                <div className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5" />
                  <span className="font-medium">{formatPrice()}</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5" />
                  {[opp.city, opp.state, opp.country].filter(Boolean).join(', ')}
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5" />
                  Posted {formatDistanceToNow(new Date(opp.createdAt), { addSuffix: true })}
                </div>
              </div>

              <div className="prose prose-gray max-w-none">
                <h3 className="text-lg font-semibold mb-2">Description</h3>
                <p className="whitespace-pre-wrap text-gray-600">{opp.description}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          {/* Poster Card */}
          {poster && (
            <Card>
              <CardContent className="p-6">
                <h3 className="text-lg font-semibold mb-4">Posted By</h3>
                <Link href={`/profile/${poster.id}`} className="flex items-center gap-3 mb-4">
                  <Avatar src={poster.userPhoto} size="lg" />
                  <div>
                    <p className="font-medium text-gray-900">{poster.name}</p>
                    {poster.city && (
                      <p className="text-sm text-gray-500">
                        {poster.city}, {poster.country}
                      </p>
                    )}
                  </div>
                </Link>

                {userStats && (
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Rating</span>
                      <div className="flex items-center gap-1">
                        <Rating value={userStats.averageRating} size="sm" />
                        <span className="text-gray-600">({userStats.feedbackCount})</span>
                      </div>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Jobs Completed</span>
                      <span className="font-medium">{userStats.completedJobs}</span>
                    </div>
                  </div>
                )}

                {user?.id !== poster.id && (
                  <Button onClick={handleContactSeller} className="w-full">
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Contact
                  </Button>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}
