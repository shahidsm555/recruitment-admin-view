
"use client";
import React from 'react';
import { StatsCard } from '@/components/common/StatsCard';
import { DataTable, Column } from '@/components/common/DataTable';
import { AlertTriangle, Lock, FileText } from 'lucide-react';

export const SecurityStats = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <StatsCard
                title="Critical Alerts"
                value="0"
                icon={AlertTriangle}
                color="bg-red-300/30 dark:bg-red-700/30"
                iconColor="text-red-700 dark:text-red-850"
                trend="No pending critical issues"
                trendColor="text-green-500"
            />
            <StatsCard
                title="Failed Logins (24h)"
                value="3"
                icon={Lock}
                color="bg-yellow-300/30 dark:bg-yellow-700/30"
                iconColor="text-yellow-700 dark:text-yellow-850"
                trend="Investigated and resolved"
                trendColor="text-yellow-500"
            />
            <StatsCard
                title="GDPR Request"
                value="1"
                icon={FileText}
                color="bg-blue-300/30 dark:bg-blue-700/30"
                iconColor="text-blue-700 dark:text-blue-850"
                trend="New request received"
                trendColor="text-blue-500"
            />
        </div>
    );
};

interface AuditLog {
    id: number;
    timestamp: string;
    user: string;
    action: string;
    resource: string;
    ipAddress: string;
}

const auditLogsData: AuditLog[] = [1, 2, 3, 4, 5].map((i) => ({
    id: i,
    timestamp: `2024-02-28 10:45:${10 + i}`,
    user: 'admin@system.com',
    action: 'Update',
    resource: 'Feature Toggle: Candidate Portal',
    ipAddress: `192.168.1.10${i}`
}));

export const AuditLogTable = () => {
    const columns: Column<AuditLog>[] = [
        { header: "Timestamp", accessorKey: "timestamp" },
        {
            header: "User",
            accessorKey: "user",
            cell: (row) => <span className="font-medium text-gray-900 dark:text-gray-100">{row.user}</span>
        },
        { header: "Action", accessorKey: "action" },
        { header: "Resource", accessorKey: "resource" },
        {
            header: "IP Address",
            accessorKey: "ipAddress",
            cell: (row) => <span className="font-mono text-gray-500">{row.ipAddress}</span>
        }
    ];

    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">Recent Audit Logs</h3>
            </div>
            <DataTable
                data={auditLogsData}
                columns={columns}
                keyExtractor={(item) => item.id}
            />
        </div>
    );
};
