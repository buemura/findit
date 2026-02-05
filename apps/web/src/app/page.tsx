import Link from 'next/link';
import { ArrowRight, Briefcase, Users, MessageSquare, Star } from 'lucide-react';
import { useTranslations } from 'next-intl';
import { LanguageSwitcher } from '@/components/layout/language-switcher';

export default function LandingPage() {
  const t = useTranslations('landing');
  const tNav = useTranslations('nav');

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600">FindIt</div>
          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              {tNav('signIn')}
            </Link>
            <Link href="/register" className="btn-primary">
              {tNav('getStarted')}
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            {t('hero.title')}
            <span className="text-primary-600"> {t('hero.opportunity')}</span>
            <br />
            {t('hero.or')} <span className="text-accent-600">{t('hero.talent')}</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            {t('hero.subtitle')}
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg px-8 py-3">
              {t('hero.startFinding')} <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/home" className="btn-secondary text-lg px-8 py-3">
              {t('hero.browseOpportunities')}
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Briefcase className="h-8 w-8" />}
            title={t('features.findOpportunities.title')}
            description={t('features.findOpportunities.description')}
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title={t('features.buildProfile.title')}
            description={t('features.buildProfile.description')}
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8" />}
            title={t('features.realTimeChat.title')}
            description={t('features.realTimeChat.description')}
          />
          <FeatureCard
            icon={<Star className="h-8 w-8" />}
            title={t('features.getReviews.title')}
            description={t('features.getReviews.description')}
          />
        </div>

        {/* Stats */}
        <div className="mt-32 bg-white rounded-2xl shadow-xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">10k+</div>
              <div className="text-gray-600 mt-2">{t('stats.activeUsers')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">50k+</div>
              <div className="text-gray-600 mt-2">{t('stats.opportunitiesPosted')}</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">95%</div>
              <div className="text-gray-600 mt-2">{t('stats.satisfactionRate')}</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} FindIt. {t('footer.copyright')}</p>
        </div>
      </footer>
    </div>
  );
}

function FeatureCard({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
      <div className="text-primary-600 mb-4">{icon}</div>
      <h3 className="text-lg font-semibold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
}
