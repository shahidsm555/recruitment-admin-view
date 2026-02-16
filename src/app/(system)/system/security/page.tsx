
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SecurityStats, AuditLogTable } from '@/components/admin/security/SecurityComponents';

export default function SystemSecurity() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Security & Compliance"
                description="Audit logs, access history, and data retention policies."
            />

            <SecurityStats />
            <AuditLogTable />
        </div>
    );
}
