'use client';

import Link from 'next/link';
import { useState } from 'react';
import { BellIcon, LogOutIcon } from '@/components/icons';
import { useAuth } from '@/lib/auth-context';
import { useRouter } from 'next/navigation';
import { mockNotifications } from '@/lib/mockData';

export function TopNav() {
  const [showNotifications, setShowNotifications] = useState(false);
  const { user, logout } = useAuth();
  const router = useRouter();
  const unreadNotifications = mockNotifications.filter(n => !n.read);

  const handleLogout = () => {
    logout();
    router.push('/login');
  };

  return (
    <header className="bg-card border-b border-border sticky top-0 z-50">
      <div className="px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          {/* Empty space for alignment */}
        </div>

        <div className="flex items-center gap-4">
          {/* Quick Stats */}
          <div className="hidden md:flex items-center gap-6 pr-6 border-r border-border">
            <div className="text-right text-sm">
              <p className="text-muted-foreground text-xs">Critical Issues</p>
              <p className="font-bold text-foreground">1</p>
            </div>
            <div className="text-right text-sm">
              <p className="text-muted-foreground text-xs">Pending Tasks</p>
              <p className="font-bold text-foreground">3</p>
            </div>
          </div>

          {/* Notifications Bell */}
          <div className="relative">
            <button
              onClick={() => setShowNotifications(!showNotifications)}
              className="relative p-2 hover:bg-secondary rounded-lg transition-colors"
              aria-label="Notifications"
            >
              <BellIcon size={24} className="text-foreground" />
              {unreadNotifications.length > 0 && (
                <span className="absolute top-0 right-0 w-2 h-2 bg-red-500 rounded-full"></span>
              )}
            </button>

            {/* Notifications Dropdown */}
            {showNotifications && (
              <div className="absolute right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50">
                <div className="p-4 border-b border-border">
                  <h3 className="font-semibold text-foreground text-sm">Notifications</h3>
                </div>
                <div className="max-h-96 overflow-y-auto">
                  {unreadNotifications.length > 0 ? (
                    unreadNotifications.slice(0, 5).map(notif => (
                      <div key={notif.id} className="p-4 border-b border-border hover:bg-secondary transition-colors cursor-pointer last:border-b-0">
                        <p className="font-medium text-sm text-foreground">{notif.title}</p>
                        <p className="text-xs text-muted-foreground mt-1">{notif.message}</p>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-muted-foreground text-sm">No unread notifications</div>
                  )}
                </div>
                <div className="p-3 border-t border-border text-center">
                  <Link href="/notifications" className="text-xs text-accent font-medium hover:underline">
                    View All Notifications
                  </Link>
                </div>
              </div>
            )}
          </div>

          {/* User Profile */}
          <div className="flex items-center gap-3">
            <div className="text-right">
              <p className="text-sm font-semibold text-foreground">{user?.name || 'User'}</p>
              <p className="text-xs text-muted-foreground capitalize">{user?.role?.replace('_', ' ') || 'Auditor'}</p>
            </div>
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-primary/80 rounded-full flex items-center justify-center text-primary-foreground font-bold text-sm">
              {user?.avatar || 'U'}
            </div>
          </div>

          {/* Logout Button */}
          <button
            onClick={handleLogout}
            className="ml-2 p-2 hover:bg-secondary rounded-lg transition-colors text-foreground"
            aria-label="Logout"
          >
            <LogOutIcon size={20} />
          </button>
        </div>
      </div>
    </header>
  );
}
