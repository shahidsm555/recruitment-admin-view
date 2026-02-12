
"use client";
import React from 'react';
import { DataTable, Column } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Key, MoreHorizontal, Shield, Lock } from 'lucide-react';
import { WidgetCard } from '@/components/common/WidgetCard';

interface SystemUser {
    id: number;
    name: string;
    email: string;
    role: string;
    lastLogin: string;
    status: string;
}

const systemUsersData: SystemUser[] = [
    { id: 1, name: 'Admin User', email: 'admin@system.com', role: 'System Admin', lastLogin: 'Just now', status: 'Active' },
    { id: 2, name: 'Support Lead', email: 'support@system.com', role: 'Support Admin', lastLogin: '2 hours ago', status: 'Active' },
    { id: 3, name: 'Audit Bot', email: 'bot@system.com', role: 'Service Account', lastLogin: '1 day ago', status: 'Active' },
];

export const SystemUserTable = () => {
    const columns: Column<SystemUser>[] = [
        {
            header: "User",
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600 dark:text-indigo-400 font-medium">
                        {row.name.charAt(0)}
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{row.name}</p>
                        <p className="text-xs text-gray-500">{row.email}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Role",
            cell: (row) => (
                <div className="flex items-center gap-2">
                    <Key className="w-4 h-4 text-gray-400" />
                    {row.role}
                </div>
            )
        },
        { header: "Last Login", accessorKey: "lastLogin" },
        {
            header: "Status",
            cell: (row) => <StatusBadge status={row.status} />
        },
        {
            header: "Actions",
            cell: () => (
                <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                    <MoreHorizontal className="w-5 h-5" />
                </button>
            )
        }
    ];

    return (
        <DataTable
            data={systemUsersData}
            columns={columns}
            keyExtractor={(item) => item.id}
        />
    );
};

export const AccessControlPolicies = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 p-6">
            <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-4">Access Control Policies</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-start gap-3">
                    <Shield className="w-6 h-6 text-green-500 mt-1" />
                    <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">MFA Enforcement</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Multi-factor authentication is enforced for all system administrators.</p>
                    </div>
                </div>
                <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-lg flex items-start gap-3">
                    <Lock className="w-6 h-6 text-blue-500 mt-1" />
                    <div>
                        <h4 className="font-medium text-gray-900 dark:text-gray-100">Session Timeout</h4>
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">Admin sessions expire after 30 minutes of inactivity.</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
