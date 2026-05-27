'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  LayoutDashboard,
  BarChart3,
  Settings,
  ExternalLink,
  CircleDot,
} from 'lucide-react';

export function Sidebar() {
  const pathname = usePathname();

  const navItems = [
    { href: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { href: '/analytics', label: 'Analytics', icon: BarChart3 },
    { href: '/settings', label: 'Settings', icon: Settings },
  ];

  const isActive = (href: string) => pathname?.startsWith(href);

  return (
    <div className="fixed left-0 top-0 h-screen w-60 border-r border-zinc-800 bg-gradient-to-b from-zinc-950 via-zinc-900 to-zinc-950 p-6 flex flex-col shadow-[0_0_60px_rgba(0,0,0,0.25)]">
      {/* Logo */}
      <div className="mb-8">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded bg-indigo-600 flex items-center justify-center">
            <span className="text-white font-bold text-sm">OR</span>
          </div>
          <div>
            <h1 className="text-white font-bold text-lg">OpenRelio</h1>
            <p className="text-xs text-zinc-400">AI Gateway</p>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href);
          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded transition-colors ${
                active
                  ? 'bg-indigo-600 text-white'
                  : 'text-zinc-400 hover:text-zinc-100'
              }`}
            >
              <Icon size={18} />
              <span className="text-sm font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>

      {/* Docs Link */}
      <a
        href="https://docs.openrelio.com"
        target="_blank"
        rel="noopener noreferrer"
        className="flex items-center gap-3 px-3 py-2 rounded text-zinc-400 hover:text-zinc-100 transition-colors mb-6"
      >
        <ExternalLink size={18} />
        <span className="text-sm font-medium">Docs</span>
      </a>

      {/* Status */}
      <div className="border-t border-zinc-800 pt-4 space-y-3">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-green-500" />
          <span className="text-xs text-zinc-400">Gateway Online</span>
        </div>
        <div className="text-xs text-zinc-500">v1.0.0</div>
      </div>
    </div>
  );
}
