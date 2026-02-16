
"use client";
import React from 'react';
import { useStore } from '@/store/useStore';
import { PageHeader } from '@/components/common/PageHeader';
import { StatsCard } from '@/components/common/StatsCard';
import { WidgetCard } from '@/components/common/WidgetCard';
import {
    Activity,
    Users,
    ShieldAlert,
    AlertOctagon,
    Server,
    Database
} from 'lucide-react';

export default function SystemAdminDashboard() {
    const { systemAdminStats } = useStore();

    return (
        <div className="space-y-6">
            <PageHeader
                title="System Administrator Dashboard"
                description="Technical and operational system control center."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatsCard
                    title="System Health"
                    value={systemAdminStats.systemHealth}
                    icon={Activity}
                    color="bg-emerald-500/30 dark:bg-emerald-700/30"
                    iconColor="text-emerald-700 dark:text-emerald-850"
                />
                <StatsCard
                    title="Active Users"
                    value={systemAdminStats.activeUsers}
                    icon={Users}
                    color="bg-blue-500/30 dark:bg-blue-700/30"
                    iconColor="text-blue-700 dark:text-blue-850"
                />
                <StatsCard
                    title="Security Alerts"
                    value={systemAdminStats.securityAlerts}
                    icon={ShieldAlert}
                    color="bg-red-500/30 dark:bg-red-700/30"
                    iconColor="text-red-700 dark:text-red-850"
                />
                <StatsCard
                    title="Error Reports"
                    value={systemAdminStats.errorReports}
                    icon={AlertOctagon}
                    color="bg-orange-500/30 dark:bg-orange-700/30"
                    iconColor="text-orange-700 dark:text-orange-850"
                />
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2">
                    <WidgetCard title="Server Performance" icon={Server} className="h-96">
                        <div className="flex items-center justify-center h-64 bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-400 border border-dashed border-gray-200 dark:border-gray-700">
                            Real-time Performance Graph Placeholder
                        </div>
                    </WidgetCard>
                </div>

                <WidgetCard title="Database Status" icon={Database} className="h-96">
                    <div className="space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-300">Primary DB Load</span>
                                <span className="text-gray-900 dark:text-gray-100 font-medium">42%</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-emerald-500 h-2 rounded-full" style={{ width: '42%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-300">Storage Usage</span>
                                <span className="text-gray-900 dark:text-gray-100 font-medium">68%</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-blue-500 h-2 rounded-full" style={{ width: '68%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-1">
                                <span className="text-gray-600 dark:text-gray-300">Cache Hits</span>
                                <span className="text-gray-900 dark:text-gray-100 font-medium">94%</span>
                            </div>
                            <div className="w-full bg-gray-100 dark:bg-gray-700 rounded-full h-2">
                                <div className="bg-purple-500 h-2 rounded-full" style={{ width: '94%' }}></div>
                            </div>
                        </div>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
}
