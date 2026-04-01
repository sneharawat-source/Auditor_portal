'use client';

import { useParams } from 'next/navigation';
import Link from 'next/link';
import { AppLayout } from '@/components/layout/AppLayout';
import { ControlDetailView } from '@/components/control/ControlDetailView';
import { useAppState } from '@/lib/store';
import { ControlDetail } from '@/lib/types';

export default function ControlDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const { controls } = useAppState();
  
  const control = controls.find(c => c.id === id);

  if (!control) {
    return (
      <AppLayout>
        <div className="w-full bg-gradient-to-br from-primary/5 via-background to-accent/5 min-h-screen">
          <div className="max-w-6xl mx-auto p-8">
            <p className="text-muted-foreground">Control not found</p>
            <Link href="/framework" className="text-primary hover:underline mt-4 inline-block">
              ← Back to Framework
            </Link>
          </div>
        </div>
      </AppLayout>
    );
  }

  // Convert Control to ControlDetail with empty arrays for missing fields
  const controlDetail: ControlDetail = {
    ...control,
    policies: [],
    evidence: [],
    checklist: {
      requirementSummary: control.description,
      comment: undefined
    }
  };

  return (
    <AppLayout>
      <div className="w-full bg-gradient-to-br from-primary/5 via-background to-accent/5 min-h-screen">
        <div className="max-w-6xl mx-auto p-6 lg:p-8">
          {/* Breadcrumb */}
          <div className="mb-6 flex items-center gap-2 text-sm">
            <Link href="/dashboard" className="text-primary hover:underline">Dashboard</Link>
            <span className="text-muted-foreground">/</span>
            <Link href="/framework" className="text-primary hover:underline">Framework</Link>
            <span className="text-muted-foreground">/</span>
            <span className="text-muted-foreground font-semibold">{control.id}</span>
          </div>

          <ControlDetailView control={controlDetail} />
        </div>
      </div>
    </AppLayout>
  );
}
