'use client';

import Link from 'next/link';
import { useAuth } from '@/context/auth-context';
import { Avatar } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { LanguageSwitcher } from '@/components/layout/language-switcher';
import { MessageSquare, Plus, Menu, X } from 'lucide-react';
import { useState } from 'react';
import { useTranslations } from 'next-intl';

export function Header() {
  const t = useTranslations('nav');
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
              {t('home')}
            </Link>
            <Link href="/home?view=opportunities" className="text-gray-600 hover:text-gray-900">
              {t('opportunities')}
            </Link>
          </nav>

          {/* Actions */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageSwitcher />
            {isAuthenticated ? (
              <>
                <Link href="/opportunities/create">
                  <Button size="sm">
                    <Plus className="h-4 w-4 mr-1" /> {t('post')}
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
                      {t('profile')}
                    </Link>
                    <Link
                      href="/settings"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      {t('settings')}
                    </Link>
                    <button
                      onClick={logout}
                      className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                    >
                      {t('signOut')}
                    </button>
                  </div>
                </div>
              </>
            ) : (
              <>
                <Link href="/login">
                  <Button variant="ghost">{t('signIn')}</Button>
                </Link>
                <Link href="/register">
                  <Button>{t('getStarted')}</Button>
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
            <div className="pb-2 border-b border-gray-100">
              <LanguageSwitcher />
            </div>
            <Link href="/home" className="block text-gray-600">{t('home')}</Link>
            <Link href="/home?view=opportunities" className="block text-gray-600">{t('opportunities')}</Link>
            {isAuthenticated ? (
              <>
                <Link href="/opportunities/create" className="block text-gray-600">{t('postOpportunity')}</Link>
                <Link href="/messages" className="block text-gray-600">{t('messages')}</Link>
                <Link href="/profile" className="block text-gray-600">{t('profile')}</Link>
                <button onClick={logout} className="block text-red-600">{t('signOut')}</button>
              </>
            ) : (
              <>
                <Link href="/login" className="block text-gray-600">{t('signIn')}</Link>
                <Link href="/register" className="block text-primary-600 font-medium">{t('getStarted')}</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
