
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { SettingsForm } from '@/components/settings/SettingsForm';

export default function SuperUserSettings() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Settings"
                description="Configure parameters for organization-wide recruitment."
            />

            <SettingsForm />
        </div>
    );
}
