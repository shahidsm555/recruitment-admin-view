
"use client";
import React from 'react';
import { PageHeader } from '@/components/common/PageHeader';
import { CandidateTable } from '@/components/candidates/CandidateTable';
import { CandidateFilters } from '@/components/candidates/CandidateFilters';

export default function SuperUserCandidates() {
    return (
        <div className="space-y-6">
            <PageHeader
                title="Candidates"
                description="View and manage candidates across all projects."
            >
                <CandidateFilters />
            </PageHeader>

            <CandidateTable />
        </div>
    );
}
