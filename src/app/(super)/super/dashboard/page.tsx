
"use client";
import React from 'react';
import { useStore } from '@/store/useStore';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { WidgetCard } from '@/components/common/WidgetCard';
import {
    Briefcase,
    Users,
    FileCheck,
    AlertTriangle,
    TrendingUp,
    Clock
} from 'lucide-react';

export default function SuperUserDashboard() {
    const { superUserStats } = useStore();

    return (
        <div className="space-y-6">
            <PageHeader
                title="Super User Dashboard"
                description="Overview of organization-wide recruitment activities."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="Active Vacancies"
                    value={superUserStats.activeVacancies}
                    icon={Briefcase}
                    color="bg-blue-300/30 dark:bg-blue-700/30"
                    iconColor="text-blue-700 dark:text-blue-850"
                />
                <StatsCard
                    title="Candidate Pipeline"
                    value={superUserStats.candidatePipeline}
                    icon={Users}
                    color="bg-purple-500/30"
                    iconColor="text-purple-700"
                />
                <StatsCard
                    title="Approval Requests"
                    value={superUserStats.approvalRequests}
                    icon={FileCheck}
                    color="bg-amber-500/30"
                    iconColor="text-amber-700"
                />
                <StatsCard
                    title="Compliance Alerts"
                    value={superUserStats.complianceAlerts}
                    icon={AlertTriangle}
                    color="bg-red-500/30"
                    iconColor="text-red-700"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Placeholder for Recruitment Activity Chart */}
                <WidgetCard title="Recruitment Activity" icon={TrendingUp} className="h-80">
                    <div className="flex items-center justify-center h-full text-gray-400">
                        Chart/Graph Placeholder
                    </div>
                </WidgetCard>

                {/* Placeholder for Recent Activity Feed */}
                <WidgetCard title="Recent Audit Logs" icon={Clock} className="h-80">
                    <div className="space-y-4">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-start gap-3 pb-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                                <div className="w-2 h-2 mt-2 rounded-full bg-blue-500" />
                                <div>
                                    <p className="text-sm font-medium text-gray-900 dark:text-gray-100">Project "Alpha" approved by System Admin</p>
                                    <p className="text-xs text-gray-500">2 hours ago</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
}
