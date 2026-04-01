import { ReactNode } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { ProtectedLayout } from './ProtectedLayout';

export function AppLayout({ children }: { children: ReactNode }) {
  return (
    <ProtectedLayout>
      <div className="flex h-screen bg-background">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <TopNav />
          <main className="flex-1 overflow-auto">
            {children}
          </main>
        </div>
      </div>
    </ProtectedLayout>
  );
}
