'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import {
  DashboardIcon,
  FrameworkIcon,
  ChecklistIcon,
  ControlIcon,
  TeamIcon,
  ActivityIcon
} from '@/components/icons';

interface NavLink {
  href: string;
  label: string;
  icon: React.ReactNode;
}

const navLinks: NavLink[] = [
  { href: '/dashboard', label: 'Dashboard', icon: <DashboardIcon size={20} /> },
  { href: '/framework', label: 'Framework', icon: <FrameworkIcon size={20} /> },
  { href: '/tasks', label: 'Tasks', icon: (
    <svg width="20" height="20" fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
    </svg>
  ) },
  { href: '/checklist', label: 'Checklist', icon: <ChecklistIcon size={20} /> },
  { href: '/team', label: 'Team', icon: <TeamIcon size={20} /> },
  { href: '/activity', label: 'Activity Log', icon: <ActivityIcon size={20} /> }
];

export function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="w-64 bg-gradient-to-b from-white to-gray-50/50 border-r border-gray-200/60 min-h-screen flex flex-col backdrop-blur-xl shadow-xl">
      {/* Logo Section */}
      <div className="p-6 border-b border-gray-200/60 bg-white/50">
        <div className="flex items-center justify-center">
          <Image 
            src="/suregrid-logo.png" 
            alt="Suregrid Logo" 
            width={180} 
            height={60}
            className="w-auto h-12"
          />
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
        <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 py-2">Main Menu</p>
        {navLinks.slice(0, 4).map((link) => {
          const isActive = pathname.startsWith(link.href);
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                isActive
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                  : 'text-gray-700 hover:bg-gray-100/80 hover:text-blue-600'
              }`}
            >
              {isActive && (
                <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
              )}
              <span className={`relative z-10 transition-transform duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'} ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                {link.icon}
              </span>
              <span className="relative z-10">{link.label}</span>
              {isActive && (
                <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </Link>
          );
        })}

        <div className="pt-4">
          <p className="text-[10px] font-bold text-gray-500 uppercase tracking-wider px-3 py-2">Management</p>
          {navLinks.slice(4).map((link) => {
            const isActive = pathname.startsWith(link.href);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`group flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all duration-200 relative ${
                  isActive
                    ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-lg shadow-blue-500/30'
                    : 'text-gray-700 hover:bg-gray-100/80 hover:text-blue-600'
                }`}
              >
                {isActive && (
                  <div className="absolute inset-0 bg-white/20 rounded-xl animate-pulse" />
                )}
                <span className={`relative z-10 transition-transform duration-200 ${isActive ? 'text-white' : 'text-gray-600 group-hover:text-blue-600'} ${isActive ? 'scale-110' : 'group-hover:scale-110'}`}>
                  {link.icon}
                </span>
                <span className="relative z-10">{link.label}</span>
                {isActive && (
                  <div className="ml-auto w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>

      {/* Bottom Section */}
      <div className="p-4 border-t border-gray-200/60 bg-white/50">
        <div className="bg-gradient-to-br from-blue-50 to-indigo-50 rounded-xl p-4 border border-blue-100">
          <div className="flex items-center gap-3 mb-3">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <div>
              <p className="text-xs font-bold text-gray-900">Need Help?</p>
              <p className="text-[10px] text-gray-600">Get support</p>
            </div>
          </div>
          <Link 
            href="/support"
            className="block w-full px-3 py-2 bg-white text-blue-600 rounded-lg text-xs font-semibold hover:bg-blue-50 transition-colors shadow-sm text-center"
          >
            Contact Support
          </Link>
        </div>
      </div>
    </aside>
  );
}
