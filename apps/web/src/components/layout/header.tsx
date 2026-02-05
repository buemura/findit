'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { MessageSquare, Plus, Search, Menu, X } from 'lucide-react';
import { useState } from 'react';

export function Header() {
  const { user, isAuthenticated, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/home" className="text-xl font-bold text-primary-600">
            FindIt
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/home" className="text-gray-600 hover:text-gray-900">
              Home
            </Link>
            <Link href="/home?view=opportunities" className="text-gray-600 hover:text-gray-900">
              Opportunities
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <Link href="/opportunities/create">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> Post
                  </Button>
                </Link>
                <Link href="/messages" className="text-gray-600 hover:text-gray-900">
                  <MessageSquare className="h-5 w-5" />
                </Link>
                <div className="relative group">
                  <button className="flex items-center gap-2">
                    <Avatar src={user?.userPhoto} size="sm" />
                    <span className="text-sm font-medium text-gray-700">{user?.name}</span>
                  </button>
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-1 hidden group-hover:block">
                    <Link
                      href="/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">Sign In</Button>
                </Link>
                <Link href="/register">
                  <Button>Get Started</Button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-t border-gray-200">
          <div className="px-4 py-4 space-y-3">
            <Link href="/home" className="block text-gray-600">Home</Link>
            <Link href="/home?view=opportunities" className="block text-gray-600">Opportunities</Link>
            {isAuthenticated ? (
              <>
                <Link href="/opportunities/create" className="block text-gray-600">Post Opportunity</Link>
                <Link href="/messages" className="block text-gray-600">Messages</Link>
                <Link href="/profile" className="block text-gray-600">Profile</Link>
                <button onClick={logout} className="block text-red-600">Sign Out</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-600">Sign In</Link>
                <Link href="/register" className="block text-primary-600 font-medium">Get Started</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
