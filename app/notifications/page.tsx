'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { mockNotifications } from '@/lib/mockData';

export default function NotificationsPage() {
  const [mounted, setMounted] = useState(false);
  const [notifications, setNotifications] = useState(mockNotifications);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const unreadCount = notifications.filter(n => !n.read).length;

  const notificationTypeColors = {
    error: 'bg-red-50 border-red-200 text-red-800',
    warning: 'bg-yellow-50 border-yellow-200 text-yellow-800',
    success: 'bg-green-50 border-green-200 text-green-800',
    info: 'bg-blue-50 border-blue-200 text-blue-800'
  };

  return (
    <AppLayout>
      <div className="w-full bg-gradient-to-br from-primary/5 via-background to-accent/5 min-h-screen">
        <div className="max-w-5xl mx-auto p-6 lg:p-8">
          <div className="mb-8">
            <h1 className="text-4xl font-bold text-foreground mb-2">Notifications</h1>
            <p className="text-muted-foreground">Stay updated with important audit activities and alerts</p>
            {unreadCount > 0 && (
              <div className="mt-4 inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-200 rounded-lg">
                <div className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
                <span className="text-sm font-semibold text-blue-900">{unreadCount} unread notification{unreadCount > 1 ? 's' : ''}</span>
              </div>
            )}
          </div>

          {/* Notifications List */}
          <div className="space-y-4">
            {notifications.length > 0 ? (
              notifications.map(notif => (
                <div
                  key={notif.id}
                  className={`p-4 rounded-lg border ${notificationTypeColors[notif.type]} cursor-pointer transition-all hover:shadow-lg`}
                >
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="font-bold text-lg">{notif.title}</h3>
                    {!notif.read && (
                      <div className="w-3 h-3 rounded-full bg-current mt-1" />
                    )}
                  </div>
                  <p className="text-sm mb-3 opacity-90">{notif.message}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs opacity-75">
                      {new Date(notif.timestamp).toLocaleDateString()} {new Date(notif.timestamp).toLocaleTimeString()}
                    </span>
                    {notif.link && (
                      <Link
                        href={notif.link}
                        className="text-sm font-medium hover:underline opacity-90"
                      >
                        View Details →
                      </Link>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-lg border border-border">
                <svg className="w-16 h-16 text-muted-foreground mx-auto mb-4 opacity-50" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                <p className="text-muted-foreground text-lg font-medium">No notifications</p>
                <p className="text-muted-foreground text-sm mt-1">You're all caught up!</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </AppLayout>
  );
}
