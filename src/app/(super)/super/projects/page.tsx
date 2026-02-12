
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { StatusBadge } from '@/components/common/StatusBadge';
import { DataTable, Column } from '@/components/common/DataTable';
import {
    Folder,
    MoreHorizontal
} from 'lucide-react';

interface Project {
    id: number;
    name: string;
    department: string;
    status: string;
    candidates: number;
    dueDate: string;
}

export default function SuperUserProjects() {
    const projects: Project[] = [
        { id: 1, name: 'Senior Frontend Dev', department: 'Engineering', status: 'Active', candidates: 12, dueDate: '2024-03-30' },
        { id: 2, name: 'Marketing Specialist', department: 'Marketing', status: 'Draft', candidates: 0, dueDate: '2024-04-15' },
        { id: 3, name: 'Product Manager', department: 'Product', status: 'Pending Approval', candidates: 5, dueDate: '2024-03-20' },
        { id: 4, name: 'UX Designer', department: 'Design', status: 'Completed', candidates: 45, dueDate: '2024-02-10' },
    ];

    const columns: Column<Project>[] = [
        {
            header: "Project Name",
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                        <Folder className="w-5 h-5 text-blue-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-gray-100">{row.name}</p>
                        <p className="text-xs text-gray-500">Due: {row.dueDate}</p>
                    </div>
                </div>
            )
        },
        {
            header: "Department",
            accessorKey: "department"
        },
        {
            header: "Status",
            cell: (row) => <StatusBadge status={row.status} />
        },
        {
            header: "Candidates",
            cell: (row) => (
                <div className="flex -space-x-2">
                    {[1, 2, 3].map(i => (
                        <div key={i} className="w-8 h-8 rounded-full bg-gray-200 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs font-medium">
                            U{i}
                        </div>
                    ))}
                    {row.candidates > 3 && (
                        <div className="w-8 h-8 rounded-full bg-gray-100 border-2 border-white dark:border-gray-800 flex items-center justify-center text-xs text-gray-500">
                            +{row.candidates - 3}
                        </div>
                    )}
                </div>
            )
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
        <div className="space-y-6">
            <PageHeader
                title="Recruitment Projects"
                description="Manage all recruitment projects across the organization."
            >
                <button className="px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
                    + New Project
                </button>
            </PageHeader>

            <DataTable
                data={projects}
                columns={columns}
                keyExtractor={(item) => item.id}
            />
        </div>
    );
}
