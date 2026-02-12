
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { UserTable } from '@/components/users/UserTable';
import { UserPlus } from 'lucide-react';

export default function SuperUserUsers() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Users & Permissions"
                description="Manage user access for recruitment projects."
            >
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
                    <UserPlus className="w-4 h-4" />
                    Invite User
                </button>
            </PageHeader>

            <UserTable />
        </div>
    );
}
