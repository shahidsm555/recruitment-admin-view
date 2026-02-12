
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { CommunicationWidgets } from '@/components/communications/CommunicationWidgets';
import { Plus } from 'lucide-react';

export default function SuperUserCommunications() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Communications"
                description="Manage templates and bulk messaging."
            >
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    New Template
                </button>
            </PageHeader>

            <CommunicationWidgets />
        </div>
    );
}
