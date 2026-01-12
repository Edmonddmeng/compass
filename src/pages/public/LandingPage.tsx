import { Link } from 'react-router-dom';
import { ArrowRight, Building2, Users, Briefcase, DollarSign, CheckCircle } from 'lucide-react';
import heroAurora from '../../assets/images/aurora.jpg';
import { useState, useEffect } from 'react';

const TypingText = () => {
  const words = ['Simplified', 'Transparent', 'Streamlined', 'Modernized'];
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentWord = words[currentWordIndex];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        // Typing
        if (displayText.length < currentWord.length) {
          setDisplayText(currentWord.slice(0, displayText.length + 1));
        } else {
          // Wait before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        // Deleting
        if (displayText.length > 0) {
          setDisplayText(displayText.slice(0, -1));
        } else {
          setIsDeleting(false);
          setCurrentWordIndex((prev) => (prev + 1) % words.length);
        }
      }
    }, isDeleting ? 50 : 100);

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, currentWordIndex, words]);

  return (
    <>
      {displayText}
      <span className="animate-pulse">|</span>
    </>
  );
};

export const LandingPage = () => {
  return (
    <div className="min-h-screen bg-black">
      {/* Navigation - Sticky */}
      <nav className="sticky left-0 right-0 top-0 z-50 px-6 py-6">
        <div className="mx-auto max-w-7xl rounded-2xl border border-white/10 bg-white/10 px-6 py-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="text-2xl font-medium text-white">Compass</span>
            </div>
            <div className="flex items-center gap-4">
              <a href="#features" className="text-sm text-white/80 hover:text-white">Features</a>
              <a href="#portals" className="text-sm text-white/80 hover:text-white">Portals</a>
              <a href="#about" className="text-sm text-white/80 hover:text-white">About</a>
              <Link
                to="/private-firms"
                className="rounded-lg bg-white/20 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm hover:bg-white/30"
              >
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative -mt-[88px] overflow-hidden">
        {/* Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url(${heroAurora})`,
            filter: 'brightness(0.7)',
          }}
        />

        {/* Content */}
        <div className="relative mx-auto max-w-7xl px-6 py-40">
          <div className="text-center">
            <h1 className="text-6xl font-normal text-white">
              Private Lending,
              <br />
              <span className="text-compass-300">
                <TypingText />
              </span>
            </h1>
            <p className="mx-auto mt-6 max-w-2xl text-xl text-gray-200">
              The complete platform for managing private lending operations. From origination to distribution,
              Compass brings clarity to complex capital flows.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4">
              <Link
                to="/private-firms"
                className="flex items-center gap-2 rounded-lg bg-compass-600 px-6 py-3 text-base font-medium text-white hover:bg-compass-700"
              >
                Get Started
                <ArrowRight size={18} />
              </Link>
              <a
                href="#portals"
                className="rounded-lg border border-white/30 bg-white/10 px-6 py-3 text-base font-medium text-white backdrop-blur-sm hover:bg-white/20"
              >
                Learn More
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Portals Section */}
      <section id="portals" className="border-b border-gray-800 bg-black py-16">
        <div className="mx-auto max-w-6xl px-6">
          <div className="text-center">
            <h2 className="text-4xl font-normal text-white">Four Portals, One Platform</h2>
            <p className="mt-4 text-lg text-gray-400">
              Purpose-built experiences for every stakeholder in your lending ecosystem
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-2">
            {/* Private Firms Portal */}
            <Link
              to="/private-firms"
              className="group rounded-xl border border-white/20 bg-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white hover:shadow-2xl hover:shadow-compass-600/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Building2 size={28} className="text-white" />
                  <h3 className="mt-4 text-xl font-medium text-white">Private Firms</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Complete operational control with portfolio analytics, capital management, and distribution tracking.
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {['Portfolio Analytics', 'Capital Management', 'Loan Pipeline', 'Distribution Tracking'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle size={14} className="text-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowRight size={18} className="text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </Link>

            {/* Agents Portal */}
            <Link
              to="/agents"
              className="group rounded-xl border border-white/20 bg-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white hover:shadow-2xl hover:shadow-compass-600/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Users size={28} className="text-white" />
                  <h3 className="mt-4 text-xl font-medium text-white">Agents</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Streamlined origination with pipeline management, commission tracking, and borrower relationships.
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {['Pipeline Management', 'Commission Tracking', 'Borrower CRM', 'Performance Analytics'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle size={14} className="text-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowRight size={18} className="text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </Link>

            {/* Borrowers Portal */}
            <Link
              to="/borrowers"
              className="group rounded-xl border border-white/20 bg-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white hover:shadow-2xl hover:shadow-compass-600/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <Briefcase size={28} className="text-white" />
                  <h3 className="mt-4 text-xl font-medium text-white">Borrowers</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Simple, transparent access to financing with AI-powered product matching and real-time loan status.
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {['AI Product Search', 'Loan Status Tracking', 'Document Upload', 'Payment Management'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle size={14} className="text-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowRight size={18} className="text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </Link>

            {/* Lenders Portal */}
            <Link
              to="/lenders"
              className="group rounded-xl border border-white/20 bg-transparent p-6 transition-all duration-300 hover:-translate-y-2 hover:border-white hover:shadow-2xl hover:shadow-compass-600/20"
            >
              <div className="flex items-start justify-between">
                <div>
                  <DollarSign size={28} className="text-white" />
                  <h3 className="mt-4 text-xl font-medium text-white">Lenders</h3>
                  <p className="mt-2 text-sm text-gray-400">
                    Full visibility into capital deployment with performance metrics, risk analysis, and reporting.
                  </p>
                  <ul className="mt-4 space-y-1.5">
                    {['Capital Overview', 'Performance Metrics', 'Risk Analysis', 'Statement Generation'].map((item) => (
                      <li key={item} className="flex items-center gap-2 text-xs text-gray-400">
                        <CheckCircle size={14} className="text-white" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
                <ArrowRight size={18} className="text-gray-600 transition-all group-hover:translate-x-1 group-hover:text-white" />
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black py-12">
        <div className="mx-auto max-w-7xl px-6">
          <div className="grid grid-cols-1 gap-8 md:grid-cols-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="text-2xl font-medium text-compass-400">Compass</span>
              </div>
              <p className="mt-4 text-sm text-gray-400">
                Modern infrastructure for private lending operations.
              </p>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Product</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#features" className="text-sm text-gray-400 hover:text-white">Features</a></li>
                <li><a href="#portals" className="text-sm text-gray-400 hover:text-white">Portals</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Pricing</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Security</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Company</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#about" className="text-sm text-gray-400 hover:text-white">About</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Blog</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Careers</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Contact</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-sm font-medium text-white">Legal</h4>
              <ul className="mt-4 space-y-2">
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Privacy</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Terms</a></li>
                <li><a href="#" className="text-sm text-gray-400 hover:text-white">Compliance</a></li>
              </ul>
            </div>
          </div>
          <div className="mt-12 border-t border-gray-800 pt-8 text-center">
            <p className="text-sm text-gray-500">© 2025 Compass. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};
