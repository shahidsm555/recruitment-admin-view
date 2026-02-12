
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { ReportWidgets, MetricsTable } from '@/components/reports/ReportComponents';
import { Download } from 'lucide-react';

export default function SuperUserReports() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Reports & Analytics"
                description="Recruitment KPIs and performance metrics."
            >
                <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                    <Download className="w-4 h-4" />
                    Export Data
                </button>
            </PageHeader>

            <ReportWidgets />
            <MetricsTable />
        </div>
    );
}
