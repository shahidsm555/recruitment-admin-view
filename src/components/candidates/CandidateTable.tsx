
"use client";
import React from 'react';
import { DataTable, Column } from '@/components/common/DataTable';
import { StatusBadge } from '@/components/common/StatusBadge';
import { User, MoreHorizontal } from 'lucide-react';

interface Candidate {
    id: number;
    name: string;
    role: string;
    stage: string;
    status: string;
    rating: number;
}

const candidatesData: Candidate[] = [
    { id: 1, name: 'Alice Johnson', role: 'Senior Frontend Dev', stage: 'Interview', status: 'In Progress', rating: 4.5 },
    { id: 2, name: 'Bob Smith', role: 'Marketing Specialist', stage: 'Application', status: 'New', rating: 0 },
    { id: 3, name: 'Charlie Brown', role: 'Product Manager', stage: 'Offer', status: 'Pending', rating: 4.8 },
    { id: 4, name: 'Diana Prince', role: 'UX Designer', stage: 'Screening', status: 'Rejected', rating: 3.2 },
];

export const CandidateTable = () => {
    const columns: Column<Candidate>[] = [
        {
            header: "Candidate",
            cell: (row) => (
                <div className="flex items-center gap-3">
                    <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500">
                        <User className="w-4 h-4" />
                    </div>
                    <span className="font-medium text-gray-900 dark:text-gray-100">{row.name}</span>
                </div>
            )
        },
        { header: "Applied Role", accessorKey: "role" },
        { header: "Stage", accessorKey: "stage" },
        {
            header: "Status",
            cell: (row) => <StatusBadge status={row.status} />
        },
        {
            header: "Rating",
            cell: (row) => (
                row.rating > 0 ? (
                    <span className="flex items-center gap-1">
                        <span className="text-yellow-500">★</span> {row.rating}
                    </span>
                ) : (
                    <span className="text-gray-400">-</span>
                )
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
        <DataTable
            data={candidatesData}
            columns={columns}
            keyExtractor={(item) => item.id}
        />
    );
};
