
"use client";
import React from 'react';
import { WidgetCard } from '@/components/common/WidgetCard';

export const SettingsForm = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div className="col-span-1 space-y-2">
                {['General', 'Notifications', 'Workflows', 'Branding'].map((item) => (
                    <button key={item} className="w-full text-left px-4 py-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 font-medium transition-colors">
                        {item}
                    </button>
                ))}
            </div>

            <div className="col-span-1 lg:col-span-2 space-y-6">
                <WidgetCard title="General Settings">
                    <div className="space-y-4">
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Organization Name</label>
                            <input type="text" defaultValue="Acme Corp" className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500" />
                        </div>
                        <div>
                            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Default Timezone</label>
                            <select className="w-full px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-brand-500">
                                <option>UTC-5 (EST)</option>
                                <option>UTC+0 (GMT)</option>
                                <option>UTC+1 (CET)</option>
                            </select>
                        </div>
                        <div className="flex items-center gap-3">
                            <input type="checkbox" className="w-4 h-4 text-brand-500 rounded border-gray-300 focus:ring-brand-500" />
                            <span className="text-sm text-gray-700 dark:text-gray-300">Enable automatic approval for junior roles</span>
                        </div>
                    </div>
                    <div className="mt-6 flex justify-end">
                        <button className="px-4 py-2 bg-brand-500 text-white rounded-lg hover:bg-brand-600 transition-colors">Save Changes</button>
                    </div>
                </WidgetCard>
            </div>
        </div>
    );
};
