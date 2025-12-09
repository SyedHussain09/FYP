'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { GoogleLogin } from '@react-oauth/google';
import { Loader2, UserPlus } from 'lucide-react';

export default function RegisterPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { register, googleLogin } = useAuth();
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    setLoading(true);

    try {
      await register(username, email, password);
      router.push('/dashboard');
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSuccess = async (credentialResponse: any) => {
    try {
      setLoading(true);
      setError('');
      await googleLogin(credentialResponse.credential);
      router.push('/dashboard');
    } catch (err: any) {
      setError('Google signup failed');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 px-3 sm:px-4 py-8 sm:py-12 pt-20 sm:pt-24">
      <div className="glass max-w-md w-full p-6 sm:p-8 rounded-xl sm:rounded-2xl shadow-2xl animate-in fade-in slide-in-from-bottom-5 duration-500">
        <div className="text-center mb-6 sm:mb-8">
          <div className="inline-flex items-center justify-center w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-gradient-to-r from-emerald-500 to-sky-600 mb-4 shadow-lg shadow-emerald-500/50">
            <UserPlus className="w-7 h-7 sm:w-8 sm:h-8 text-white" />
          </div>
          <h1 className="text-2xl sm:text-3xl font-bold gradient-text">
            Create Account
          </h1>
          <p className="text-sm text-gray-400 mt-2">Join Career Compass today</p>
        </div>
        
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 p-3 rounded-lg mb-4 sm:mb-6 text-sm animate-in fade-in slide-in-from-top-2 duration-300">
            {error}
          </div>
        )}

        {process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID && process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID !== 'your-google-client-id-here' && (
          <>
            <div className="mb-4 sm:mb-6 flex justify-center">
              <div className="scale-90 sm:scale-100 origin-center">
                <GoogleLogin
                  onSuccess={handleGoogleSuccess}
                  onError={() => setError('Google signup failed')}
                  theme="filled_black"
                  size="large"
                  text="signup_with"
                />
              </div>
            </div>

            <div className="relative mb-4 sm:mb-6">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-white/10"></div>
              </div>
              <div className="relative flex justify-center text-xs sm:text-sm">
                <span className="px-3 bg-slate-900 text-gray-400">Or sign up with</span>
              </div>
            </div>
          </>
        )}

        <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-5">
          <div>
            <label htmlFor="username" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
              Username
            </label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white text-sm sm:text-base transition-all duration-200"
              required
              disabled={loading}
              minLength={3}
            />
          </div>

          <div>
            <label htmlFor="email" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
              Email
            </label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white text-sm sm:text-base transition-all duration-200"
              required
              disabled={loading}
            />
          </div>

          <div>
            <label htmlFor="password" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
              Password
            </label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white text-sm sm:text-base transition-all duration-200"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <div>
            <label htmlFor="confirmPassword" className="block text-xs sm:text-sm font-medium text-gray-300 mb-1.5 sm:mb-2">
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-3 sm:px-4 py-2.5 sm:py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-sky-500 focus:border-transparent text-white text-sm sm:text-base transition-all duration-200"
              required
              disabled={loading}
              minLength={6}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-emerald-500 to-sky-600 text-white py-2.5 sm:py-3 rounded-lg font-semibold hover:scale-[1.02] active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed shadow-lg shadow-emerald-500/50 flex items-center justify-center gap-2 text-sm sm:text-base"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 sm:w-5 sm:h-5 animate-spin" />
                <span>Creating account...</span>
              </>
            ) : (
              'Register'
            )}
          </button>
        </form>

        <p className="text-center text-gray-400 mt-5 sm:mt-6 text-xs sm:text-sm">
          Already have an account?{' '}
          <Link href="/login" className="text-sky-400 hover:text-sky-300 font-semibold transition-colors">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
