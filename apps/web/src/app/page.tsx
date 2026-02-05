import Link from 'next/link';
import { ArrowRight, Briefcase, Users, MessageSquare, Star } from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50">
      {/* Header */}
      <header className="px-6 py-4">
        <nav className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="text-2xl font-bold text-primary-600">FindIt</div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="text-gray-600 hover:text-gray-900">
              Sign In
            </Link>
            <Link href="/register" className="btn-primary">
              Get Started
            </Link>
          </div>
        </nav>
      </header>

      {/* Hero */}
      <main className="max-w-7xl mx-auto px-6 py-20">
        <div className="text-center max-w-3xl mx-auto">
          <h1 className="text-5xl font-bold text-gray-900 mb-6 leading-tight">
            Find the Perfect
            <span className="text-primary-600"> Opportunity</span>
            <br />
            or <span className="text-accent-600">Talent</span>
          </h1>
          <p className="text-xl text-gray-600 mb-10">
            Connect with skilled freelancers and discover exciting projects.
            Build your portfolio, grow your network, and achieve your goals.
          </p>
          <div className="flex items-center justify-center gap-4">
            <Link href="/register" className="btn-primary text-lg px-8 py-3">
              Start Finding <ArrowRight className="ml-2 h-5 w-5" />
            </Link>
            <Link href="/home" className="btn-secondary text-lg px-8 py-3">
              Browse Opportunities
            </Link>
          </div>
        </div>

        {/* Features */}
        <div className="mt-32 grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard
            icon={<Briefcase className="h-8 w-8" />}
            title="Find Opportunities"
            description="Browse thousands of freelance projects across various categories"
          />
          <FeatureCard
            icon={<Users className="h-8 w-8" />}
            title="Build Your Profile"
            description="Showcase your skills and portfolio to attract clients"
          />
          <FeatureCard
            icon={<MessageSquare className="h-8 w-8" />}
            title="Real-time Chat"
            description="Communicate directly with clients and freelancers"
          />
          <FeatureCard
            icon={<Star className="h-8 w-8" />}
            title="Get Reviews"
            description="Build your reputation with feedback from completed projects"
          />
        </div>

        {/* Stats */}
        <div className="mt-32 bg-white rounded-2xl shadow-xl p-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-primary-600">10k+</div>
              <div className="text-gray-600 mt-2">Active Users</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">50k+</div>
              <div className="text-gray-600 mt-2">Opportunities Posted</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-primary-600">95%</div>
              <div className="text-gray-600 mt-2">Satisfaction Rate</div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-20 border-t border-gray-200 py-12 px-6">
        <div className="max-w-7xl mx-auto text-center text-gray-600">
          <p>&copy; {new Date().getFullYear()} FindIt. All rights reserved.</p>
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
