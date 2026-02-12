
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { AdList } from '@/components/ads/AdList';
import { Plus } from 'lucide-react';

export default function SuperUserAds() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Advertisements"
                description="Manage job postings across different channels."
            >
                <button className="flex items-center gap-2 px-4 py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors">
                    <Plus className="w-4 h-4" />
                    Create Ad
                </button>
            </PageHeader>

            <AdList />
        </div>
    );
}
