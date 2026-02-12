
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { BackupRestoreWidget, ArchivingRetentionWidget } from '@/components/admin/data/DataManagementComponents';

export default function SystemDataManagement() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Data Management"
                description="Backup, restore, archiving, and purge policies."
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <BackupRestoreWidget />
                <ArchivingRetentionWidget />
            </div>
        </div>
    );
}
