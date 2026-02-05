'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { Edit, MapPin, Briefcase, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Rating } from '@/components/ui/rating';
import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/context/auth-context';
import { usersApi } from '@/lib/api/users';
import { opportunitiesApi } from '@/lib/api/opportunities';
import { UserStats, PortfolioItem, Opportunity, FeedbackWithReviewer } from '@/types';
import { getStoredToken } from '@/lib/api/client';

export default function ProfilePage() {
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [stats, setStats] = useState<UserStats | null>(null);
  const [portfolio, setPortfolio] = useState<PortfolioItem[]>([]);
  const [opportunities, setOpportunities] = useState<Opportunity[]>([]);
  const [feedbacks, setFeedbacks] = useState<FeedbackWithReviewer[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    if (user) {
      const fetchData = async () => {
        try {
          const token = getStoredToken();
          const [statsData, portfolioData, opportunitiesData, feedbacksData] = await Promise.all([
            usersApi.getStats(user.id),
            usersApi.getPortfolio(user.id),
            token ? opportunitiesApi.getMyOpportunities(token) : [],
            usersApi.getFeedbacks(user.id),
          ]);
          setStats(statsData);
          setPortfolio(portfolioData);
          setOpportunities(opportunitiesData);
          setFeedbacks(feedbacksData);
        } catch (error) {
          console.error('Failed to fetch profile data:', error);
        } finally {
          setIsLoading(false);
        }
      };
      fetchData();
    }
  }, [user, authLoading, isAuthenticated, router]);

  if (authLoading || isLoading) {
    return (
      <div className="py-20">
        <Loading size="lg" />
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Profile Header */}
      <Card className="mb-8">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-6">
            <Avatar src={user.userPhoto} size="xl" />
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h1 className="text-2xl font-bold text-gray-900">{user.name}</h1>
                  {user.occupation && (
                    <p className="text-gray-600">{user.occupation}</p>
                  )}
                  {(user.city || user.country) && (
                    <div className="flex items-center gap-1 text-gray-500 mt-1">
                      <MapPin className="h-4 w-4" />
                      {[user.city, user.state, user.country].filter(Boolean).join(', ')}
                    </div>
                  )}
                </div>
                <Link href="/profile/edit">
                  <Button variant="secondary" size="sm">
                    <Edit className="h-4 w-4 mr-1" /> Edit
                  </Button>
                </Link>
              </div>

              {user.bio && (
                <p className="mt-4 text-gray-600">{user.bio}</p>
              )}

              {stats && (
                <div className="flex gap-6 mt-4">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-gray-900">{stats.completedJobs}</div>
                    <div className="text-sm text-gray-500">Jobs Done</div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1">
                      <span className="text-2xl font-bold text-gray-900">
                        {stats.averageRating.toFixed(1)}
                      </span>
                      <Star className="h-5 w-5 text-yellow-400 fill-yellow-400" />
                    </div>
                    <div className="text-sm text-gray-500">{stats.feedbackCount} reviews</div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid lg:grid-cols-2 gap-8">
        {/* My Opportunities */}
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold">My Opportunities</h2>
              <Link href="/opportunities/create">
                <Button size="sm">Post New</Button>
              </Link>
            </div>
            {opportunities.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No opportunities posted yet</p>
            ) : (
              <div className="space-y-4">
                {opportunities.slice(0, 5).map((opp) => (
                  <Link
                    key={opp.id}
                    href={`/opportunities/${opp.id}`}
                    className="block p-3 rounded-lg border border-gray-200 hover:bg-gray-50"
                  >
                    <h3 className="font-medium text-gray-900">{opp.title}</h3>
                    <span
                      className={`text-xs px-2 py-0.5 rounded-full ${
                        opp.status === 'open'
                          ? 'bg-green-100 text-green-800'
                          : 'bg-gray-100 text-gray-800'
                      }`}
                    >
                      {opp.status}
                    </span>
                  </Link>
                ))}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Reviews */}
        <Card>
          <CardContent className="p-6">
            <h2 className="text-lg font-semibold mb-4">Reviews</h2>
            {feedbacks.length === 0 ? (
              <p className="text-gray-500 text-center py-8">No reviews yet</p>
            ) : (
              <div className="space-y-4">
                {feedbacks.slice(0, 5).map((fb) => (
                  <div key={fb.feedback.id} className="border-b border-gray-100 pb-4 last:border-0">
                    <div className="flex items-center gap-3 mb-2">
                      <Avatar src={fb.reviewer?.userPhoto} size="sm" />
                      <div>
                        <p className="font-medium text-gray-900">{fb.reviewer?.name}</p>
                        <Rating value={fb.feedback.rating} size="sm" />
                      </div>
                    </div>
                    {fb.feedback.comment && (
                      <p className="text-gray-600 text-sm">{fb.feedback.comment}</p>
                    )}
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>

      {/* Portfolio */}
      <Card className="mt-8">
        <CardContent className="p-6">
          <h2 className="text-lg font-semibold mb-4">Portfolio</h2>
          {portfolio.length === 0 ? (
            <p className="text-gray-500 text-center py-8">No portfolio items yet</p>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              {portfolio.map((item) => (
                <div key={item.id} className="aspect-square rounded-lg overflow-hidden bg-gray-100">
                  <img
                    src={item.imageUrl}
                    alt={item.title || 'Portfolio item'}
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}
