'use client';

import { useEffect } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthCallback() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { setToken, setUser } = useAuth();

  useEffect(() => {
    const token = searchParams.get('token');
    const user_id = searchParams.get('user_id');
    const username = searchParams.get('username');
    const email = searchParams.get('email');

    if (token && user_id && username && email) {
      // Store token and user info
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify({ user_id: parseInt(user_id), username, email }));
      
      // Update auth context (you'll need to add setters to AuthContext)
      window.location.href = '/dashboard';
    } else {
      router.push('/login?error=authentication_failed');
    }
  }, [searchParams, router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
      <div className="glass p-8 rounded-2xl">
        <div className="flex items-center gap-3">
          <div className="w-6 h-6 border-2 border-sky-500 border-t-transparent rounded-full animate-spin"></div>
          <p className="text-white">Completing authentication...</p>
        </div>
      </div>
    </div>
  );
}
