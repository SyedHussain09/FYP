'use client';

import Link from 'next/link';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter, usePathname } from 'next/navigation';
import { LogOut, Sparkles, LayoutDashboard, Menu, X, ArrowLeft, Home } from 'lucide-react';
import { useState } from 'react';

export function Navigation() {
  const { isAuthenticated, logout, user } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const showBackButton = pathname !== '/' && pathname !== '/dashboard';

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass border-b border-white/10 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 sm:py-4">
        <div className="flex items-center justify-between">
          {/* Left section - Logo and Back Button */}
          <div className="flex items-center gap-2 sm:gap-4">
            {showBackButton && (
              <button
                onClick={() => router.back()}
                className="p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                aria-label="Go back"
              >
                <ArrowLeft className="w-5 h-5" />
              </button>
            )}
            <Link href="/" className="text-lg sm:text-xl font-bold gradient-text flex items-center gap-2">
              <Home className="w-5 h-5 sm:w-6 sm:h-6" />
              <span className="hidden sm:inline">Career Compass</span>
              <span className="sm:hidden">CC</span>
            </Link>
          </div>
          
          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-2 lg:gap-4">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  className="flex items-center gap-2 px-3 lg:px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <LayoutDashboard className="w-4 h-4" />
                  <span className="hidden lg:inline">Dashboard</span>
                </Link>
                <Link
                  href="/ai-guidance"
                  className="flex items-center gap-2 px-3 lg:px-4 py-2 bg-gradient-to-r from-sky-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
                >
                  <Sparkles className="w-4 h-4" />
                  <span className="hidden lg:inline">AI Guidance</span>
                </Link>
                <div className="flex items-center gap-3 pl-3 lg:pl-4 border-l border-white/10">
                  <span className="text-xs lg:text-sm text-gray-400 max-w-[100px] truncate">
                    {user?.username}
                  </span>
                  <button
                    onClick={logout}
                    className="flex items-center gap-2 px-3 lg:px-4 py-2 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                  >
                    <LogOut className="w-4 h-4" />
                    <span className="hidden lg:inline">Logout</span>
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="px-4 py-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  className="px-4 py-2 bg-gradient-to-r from-sky-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 hover:shadow-lg hover:shadow-purple-500/50 transition-all duration-200"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-2 animate-in fade-in slide-in-from-top-5 duration-200">
            {isAuthenticated ? (
              <>
                <Link
                  href="/dashboard"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  <LayoutDashboard className="w-5 h-5" />
                  Dashboard
                </Link>
                <Link
                  href="/ai-guidance"
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center gap-3 px-4 py-3 bg-gradient-to-r from-sky-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-200"
                >
                  <Sparkles className="w-5 h-5" />
                  AI Guidance
                </Link>
                <div className="px-4 py-2 text-sm text-gray-400 border-t border-white/10 mt-2 pt-4">
                  Signed in as <span className="text-white font-medium">{user?.username}</span>
                </div>
                <button
                  onClick={() => {
                    logout();
                    setMobileMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-all duration-200"
                >
                  <LogOut className="w-5 h-5" />
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 text-gray-300 hover:text-white hover:bg-white/10 rounded-lg transition-all duration-200"
                >
                  Login
                </Link>
                <Link
                  href="/register"
                  onClick={() => setMobileMenuOpen(false)}
                  className="block px-4 py-3 bg-gradient-to-r from-sky-500 to-purple-600 text-white rounded-lg font-semibold hover:scale-105 transition-all duration-200 text-center"
                >
                  Get Started
                </Link>
              </>
            )}
          </div>
        )}
      </div>
    </nav>
  );
}
