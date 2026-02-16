
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { FeatureTogglesWidget, EnvironmentSettingsWidget } from '@/components/admin/system/SystemManagementComponents';

export default function SystemManagement() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="System Management"
                description="Configure global system settings and feature toggles."
            />

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <FeatureTogglesWidget />
                <EnvironmentSettingsWidget />
            </div>
        </div>
    );
}
