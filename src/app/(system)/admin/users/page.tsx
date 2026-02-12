
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SystemUserTable, AccessControlPolicies } from '@/components/admin/users/SystemUserComponents';
import { Users } from 'lucide-react';

export default function SystemUserManagement() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="User & Role Management"
                description="Manage internal system users and roles."
            >
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
                    <Users className="w-4 h-4" />
                    Create System User
                </button>
            </PageHeader>

            <SystemUserTable />
            <AccessControlPolicies />
        </div>
    );
}
