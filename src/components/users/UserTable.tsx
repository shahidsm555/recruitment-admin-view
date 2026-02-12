
"use client";
import React from 'react';
import { DataTable, Column } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { Shield, MoreHorizontal } from 'lucide-react';

interface User {
    id: number;
    name: string;
    email: string;
    role: string;
    projects: string[];
    status: string;
}

const usersData: User[] = [
    { id: 1, name: 'John Doe', email: 'john@example.com', role: 'Hiring Manager', projects: ['Alpha', 'Beta'], status: 'Active' },
    { id: 2, name: 'Jane Smith', email: 'jane@example.com', role: 'Interviewer', projects: ['Gamma'], status: 'Active' },
    { id: 3, name: 'Mike Johnson', email: 'mike@example.com', role: 'Recruiter', projects: ['All'], status: 'Inactive' },
];

export const UserTable = () => {
    const columns: Column<User>[] = [
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
                    <Shield className="w-4 h-4 text-gray-400" />
                    {row.role}
                </div>
            )
        },
        {
            header: "Assigned Projects",
            cell: (row) => (
                <div className="flex flex-wrap gap-1">
                    {row.projects.map((proj, idx) => (
                        <span key={idx} className="px-2 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-xs">
                            {proj}
                        </span>
                    ))}
                </div>
            )
        },
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
            data={usersData}
            columns={columns}
            keyExtractor={(item) => item.id}
        />
    );
};
