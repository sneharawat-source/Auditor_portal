'use client';

import { Control, ComplianceMetrics } from '@/lib/types';

interface ComplianceReportProps {
  metrics: ComplianceMetrics;
  controls: Control[];
  framework: string;
  organization: string;
  auditPeriod: string;
}

export function ComplianceReport({ metrics, controls, framework, organization, auditPeriod }: ComplianceReportProps) {
  const generatePDF = () => {
    // In production, integrate with a PDF library like jsPDF or react-pdf
    alert('PDF export functionality would be implemented here');
  };

  const generateExcel = () => {
    // In production, integrate with xlsx library
    alert('Excel export functionality would be implemented here');
  };

  const criticalFindings = controls.filter(c => c.status === 'failing' && c.riskLevel === 'critical');
  const highRiskFindings = controls.filter(c => c.status === 'failing' && c.riskLevel === 'high');

  return (
    <div className="space-y-6">
      {/* Export Options */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h2 className="text-xl font-bold text-foreground mb-4">Export Compliance Report</h2>
        <p className="text-sm text-muted-foreground mb-6">
          Generate comprehensive audit reports in your preferred format
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <button
            onClick={generatePDF}
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-red-100 flex items-center justify-center group-hover:bg-red-200 transition-colors">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground text-sm">PDF Report</p>
              <p className="text-xs text-muted-foreground">Full audit documentation</p>
            </div>
          </button>

          <button
            onClick={generateExcel}
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-green-100 flex items-center justify-center group-hover:bg-green-200 transition-colors">
              <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground text-sm">Excel Export</p>
              <p className="text-xs text-muted-foreground">Data analysis ready</p>
            </div>
          </button>

          <button
            className="flex items-center gap-3 p-4 rounded-lg border-2 border-border hover:border-primary hover:bg-primary/5 transition-all group"
          >
            <div className="w-12 h-12 rounded-lg bg-blue-100 flex items-center justify-center group-hover:bg-blue-200 transition-colors">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7v8a2 2 0 002 2h6M8 7V5a2 2 0 012-2h4.586a1 1 0 01.707.293l4.414 4.414a1 1 0 01.293.707V15a2 2 0 01-2 2h-2M8 7H6a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2v-2" />
              </svg>
            </div>
            <div className="text-left">
              <p className="font-semibold text-foreground text-sm">JSON Export</p>
              <p className="text-xs text-muted-foreground">API integration</p>
            </div>
          </button>
        </div>
      </div>

      {/* Report Preview */}
      <div className="bg-card rounded-xl border border-border p-6 shadow-sm">
        <h3 className="text-lg font-bold text-foreground mb-4">Report Preview</h3>
        
        {/* Executive Summary */}
        <div className="mb-6 p-4 bg-secondary rounded-lg">
          <h4 className="font-semibold text-foreground mb-3">Executive Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground text-xs">Organization</p>
              <p className="font-semibold text-foreground">{organization}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Framework</p>
              <p className="font-semibold text-foreground">{framework}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Audit Period</p>
              <p className="font-semibold text-foreground">{auditPeriod}</p>
            </div>
            <div>
              <p className="text-muted-foreground text-xs">Completion Rate</p>
              <p className="font-semibold text-primary">{metrics.completionRate}%</p>
            </div>
          </div>
        </div>

        {/* Key Findings */}
        {(criticalFindings.length > 0 || highRiskFindings.length > 0) && (
          <div className="mb-6">
            <h4 className="font-semibold text-foreground mb-3">Critical Findings</h4>
            <div className="space-y-2">
              {criticalFindings.map(control => (
                <div key={control.id} className="p-3 bg-red-50 border border-red-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-red-600 font-bold text-xs">CRITICAL</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">{control.id}: {control.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{control.description}</p>
                    </div>
                  </div>
                </div>
              ))}
              {highRiskFindings.map(control => (
                <div key={control.id} className="p-3 bg-orange-50 border border-orange-200 rounded-lg">
                  <div className="flex items-start gap-3">
                    <span className="text-orange-600 font-bold text-xs">HIGH</span>
                    <div className="flex-1">
                      <p className="font-semibold text-sm text-foreground">{control.id}: {control.name}</p>
                      <p className="text-xs text-muted-foreground mt-1">{control.description}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Compliance Status Summary */}
        <div>
          <h4 className="font-semibold text-foreground mb-3">Compliance Status Summary</h4>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="p-3 bg-green-50 border border-green-200 rounded-lg">
              <p className="text-xs text-green-700 font-semibold">Passing</p>
              <p className="text-2xl font-bold text-green-600">{metrics.passing}</p>
            </div>
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-xs text-red-700 font-semibold">Failing</p>
              <p className="text-2xl font-bold text-red-600">{metrics.failing}</p>
            </div>
            <div className="p-3 bg-blue-50 border border-blue-200 rounded-lg">
              <p className="text-xs text-blue-700 font-semibold">In Review</p>
              <p className="text-2xl font-bold text-blue-600">{metrics.inReview}</p>
            </div>
            <div className="p-3 bg-amber-50 border border-amber-200 rounded-lg">
              <p className="text-xs text-amber-700 font-semibold">Pending</p>
              <p className="text-2xl font-bold text-amber-600">{metrics.pending}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
