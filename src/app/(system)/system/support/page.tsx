
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { RecentErrorLogs, SystemHealthMonitor, TroubleshootingTools } from '@/components/admin/support/SupportComponents';

export default function SystemSupport() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Support & Monitoring"
                description="Error logs, system health, and troubleshooting tools."
            />

            <RecentErrorLogs />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <SystemHealthMonitor />
                <TroubleshootingTools />
            </div>
        </div>
    );
}
