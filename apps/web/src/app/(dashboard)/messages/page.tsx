'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { MessageSquare } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Avatar } from '@/components/ui/avatar';
import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/context/auth-context';
import { chatApi } from '@/lib/api/chat';
import { ChatRoom } from '@/types';
import { getStoredToken } from '@/lib/api/client';
import { formatDistanceToNow } from 'date-fns';

export default function MessagesPage() {
  const router = useRouter();
  const { isAuthenticated, isLoading: authLoading } = useAuth();
  const [rooms, setRooms] = useState<ChatRoom[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchRooms = async () => {
      try {
        const token = getStoredToken();
        if (!token) return;

        const data = await chatApi.getRooms(token);
        setRooms(data);
      } catch (error) {
        console.error('Failed to fetch chat rooms:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchRooms();
    }
  }, [isAuthenticated, authLoading, router]);

  if (authLoading || isLoading) {
    return (
      <div className="py-20">
        <Loading size="lg" />
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-6">Messages</h1>

      {rooms.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h2>
            <p className="text-gray-500">
              Start a conversation by contacting someone about an opportunity
            </p>
          </CardContent>
        </Card>
      ) : (
        <div className="space-y-2">
          {rooms.map((room) => (
            <Link key={room.id} href={`/messages/${room.id}`}>
              <Card className="hover:bg-gray-50 transition-colors cursor-pointer">
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <Avatar src={room.otherUser?.userPhoto} size="md" />
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center justify-between">
                        <h3 className="font-medium text-gray-900 truncate">
                          {room.otherUser?.name || 'Unknown User'}
                        </h3>
                        <span className="text-xs text-gray-500">
                          {formatDistanceToNow(new Date(room.updatedAt), { addSuffix: true })}
                        </span>
                      </div>
                      {room.opportunity && (
                        <p className="text-sm text-gray-500 truncate">
                          Re: {room.opportunity.title}
                        </p>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
