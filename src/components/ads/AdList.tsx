
"use client";
import React from 'react';
import { Globe, MoreHorizontal } from 'lucide-react';
import { WidgetCard } from '@/components/common/WidgetCard';
import { StatusBadge } from '@/components/common/StatusBadge';

interface Ad {
    id: number;
    title: string;
    platform: string;
    status: string;
    views: number;
    applications: number;
}

const adsData: Ad[] = [
    { id: 1, title: 'Senior Frontend Engineer', platform: 'LinkedIn', status: 'Active', views: 1250, applications: 45 },
    { id: 2, title: 'Product Manager', platform: 'Indeed', status: 'Active', views: 890, applications: 28 },
    { id: 3, title: 'UX Designer', platform: 'Glassdoor', status: 'Ended', views: 2100, applications: 112 },
];

export const AdList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {adsData.map((ad) => (
                <div key={ad.id} className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-2 bg-blue-50 dark:bg-blue-900/20 rounded-lg">
                            <Globe className="w-6 h-6 text-blue-500" />
                        </div>
                        <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                            <MoreHorizontal className="w-5 h-5" />
                        </button>
                    </div>
                    <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">{ad.title}</h3>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">{ad.platform}</p>

                    <div className="grid grid-cols-2 gap-4 mb-4">
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Views</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{ad.views}</p>
                        </div>
                        <div className="bg-gray-50 dark:bg-gray-700/50 p-3 rounded-lg">
                            <p className="text-xs text-gray-500 dark:text-gray-400 mb-1">Applications</p>
                            <p className="font-semibold text-gray-900 dark:text-gray-100">{ad.applications}</p>
                        </div>
                    </div>

                    <div className="flex items-center justify-between border-t border-gray-100 dark:border-gray-700 pt-4">
                        <StatusBadge status={ad.status} />
                        <button className="text-sm font-medium text-brand-500 hover:text-brand-600">View Analytics</button>
                    </div>
                </div>
            ))}
        </div>
    );
};
