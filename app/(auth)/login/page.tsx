'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Simulate login - redirect to dashboard
    if (email && password) {
      router.push('/dashboard');
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 flex items-center justify-center">
      <div className="w-full max-w-md">
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8">
          {/* Logo */}
          <div className="mb-8 text-center">
            <div className="flex items-center justify-center gap-2 mb-4">
              <div className="w-10 h-10 rounded bg-indigo-600 flex items-center justify-center">
                <span className="text-white font-bold">OR</span>
              </div>
            </div>
            <h1 className="text-white font-bold text-2xl mb-2">OpenRelio</h1>
            <p className="text-zinc-400 text-sm">Cut your AI costs by 60%</p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Email
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <div>
              <label className="block text-white text-sm font-medium mb-2">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full bg-zinc-800 border border-zinc-700 rounded px-4 py-2 text-white placeholder-zinc-500 focus:outline-none focus:border-indigo-600"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white font-medium py-2 rounded transition-colors"
            >
              Sign in
            </button>
          </form>

          {/* Links */}
          <div className="mt-6 text-center">
            <a href="#" className="text-zinc-400 hover:text-zinc-300 text-sm">
              Forgot password?
            </a>
          </div>

          <div className="mt-6 pt-6 border-t border-zinc-800 text-center text-sm text-zinc-400">
            Don't have an account?{' '}
            <a href="#" className="text-indigo-400 hover:text-indigo-300">
              Start free →
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
