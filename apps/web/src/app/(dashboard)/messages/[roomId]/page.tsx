'use client';

import { useState, useEffect, useRef } from 'react';
import { useParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Send } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Avatar } from '@/components/ui/avatar';
import { Loading } from '@/components/ui/loading';
import { useAuth } from '@/context/auth-context';
import { chatApi } from '@/lib/api/chat';
import { ChatRoom, MessageWithSender } from '@/types';
import { getStoredToken } from '@/lib/api/client';
import { formatDistanceToNow } from 'date-fns';
import { io, Socket } from 'socket.io-client';

export default function ChatRoomPage() {
  const params = useParams();
  const router = useRouter();
  const { user, isAuthenticated, isLoading: authLoading } = useAuth();
  const [room, setRoom] = useState<ChatRoom | null>(null);
  const [messages, setMessages] = useState<MessageWithSender[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isLoading, setIsLoading] = useState(true);
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const socketRef = useRef<Socket | null>(null);

  const roomId = params.roomId as string;

  useEffect(() => {
    if (!authLoading && !isAuthenticated) {
      router.push('/login');
      return;
    }

    const fetchData = async () => {
      try {
        const token = getStoredToken();
        if (!token) return;

        const [roomData, messagesData] = await Promise.all([
          chatApi.getRoomById(token, roomId),
          chatApi.getMessages(token, roomId),
        ]);
        setRoom(roomData);
        setMessages(messagesData.reverse());
      } catch (error) {
        console.error('Failed to fetch chat data:', error);
      } finally {
        setIsLoading(false);
      }
    };

    if (isAuthenticated) {
      fetchData();
    }
  }, [isAuthenticated, authLoading, router, roomId]);

  useEffect(() => {
    const token = getStoredToken();
    if (!token || !isAuthenticated) return;

    const WS_URL = process.env.NEXT_PUBLIC_WS_URL || 'http://localhost:3001';
    socketRef.current = io(`${WS_URL}/chat`, {
      auth: { token },
    });

    socketRef.current.on('connect', () => {
      socketRef.current?.emit('joinRoom', roomId);
    });

    socketRef.current.on('newMessage', (message) => {
      setMessages((prev) => [...prev, { message, sender: message.sender }]);
    });

    return () => {
      socketRef.current?.emit('leaveRoom', roomId);
      socketRef.current?.disconnect();
    };
  }, [roomId, isAuthenticated]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || isSending) return;

    setIsSending(true);
    try {
      const token = getStoredToken();
      if (!token) return;

      if (socketRef.current?.connected) {
        socketRef.current.emit('sendMessage', { roomId, content: newMessage });
      } else {
        await chatApi.sendMessage(token, roomId, newMessage);
      }
      setNewMessage('');
    } catch (error) {
      console.error('Failed to send message:', error);
    } finally {
      setIsSending(false);
    }
  };

  if (authLoading || isLoading) {
    return (
      <div className="py-20">
        <Loading size="lg" />
      </div>
    );
  }

  if (!room) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-20 text-center">
        <h1 className="text-2xl font-bold text-gray-900">Chat not found</h1>
        <Link href="/messages" className="text-primary-600 hover:underline mt-4 inline-block">
          Back to messages
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto h-[calc(100vh-4rem)] flex flex-col">
      {/* Header */}
      <div className="bg-white border-b border-gray-200 px-4 py-3 flex items-center gap-4">
        <Link href="/messages" className="text-gray-600 hover:text-gray-900">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <Avatar src={room.otherUser?.userPhoto} size="sm" />
        <div>
          <h2 className="font-medium text-gray-900">{room.otherUser?.name}</h2>
          {room.opportunity && (
            <p className="text-xs text-gray-500">Re: {room.opportunity.title}</p>
          )}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-gray-50">
        {messages.map((msg) => {
          const isOwn = msg.message.senderId === user?.id;
          return (
            <div
              key={msg.message.id}
              className={`flex ${isOwn ? 'justify-end' : 'justify-start'}`}
            >
              <div
                className={`max-w-[70%] rounded-2xl px-4 py-2 ${
                  isOwn
                    ? 'bg-primary-600 text-white'
                    : 'bg-white border border-gray-200 text-gray-900'
                }`}
              >
                <p>{msg.message.content}</p>
                <p
                  className={`text-xs mt-1 ${
                    isOwn ? 'text-primary-200' : 'text-gray-400'
                  }`}
                >
                  {formatDistanceToNow(new Date(msg.message.createdAt), { addSuffix: true })}
                </p>
              </div>
            </div>
          );
        })}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <form
        onSubmit={handleSendMessage}
        className="bg-white border-t border-gray-200 p-4 flex gap-2"
      >
        <Input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          placeholder="Type a message..."
          className="flex-1"
        />
        <Button type="submit" disabled={!newMessage.trim() || isSending}>
          <Send className="h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}
