
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { IntegrationList } from '@/components/admin/integrations/IntegrationList';

export default function SystemIntegrations() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Integrations"
                description="Manage external connections and APIs."
            />

            <IntegrationList />
        </div>
    );
}
