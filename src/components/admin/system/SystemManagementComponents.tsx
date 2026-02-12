
"use client";
import React from 'react';
import { WidgetCard } from '@/components/common/WidgetCard';
import { ToggleLeft, Server, Globe } from 'lucide-react';

export const FeatureTogglesWidget = () => {
    return (
        <WidgetCard title="Feature Toggles" icon={ToggleLeft}>
            <div className="space-y-4">
                {[
                    { name: 'New Candidate Portal', enabled: true },
                    { name: 'AI Resume Scoring (Beta)', enabled: false },
                    { name: 'Video Interview Integration', enabled: true },
                    { name: 'Dark Mode Support', enabled: true },
                ].map((feature, i) => (
                    <div key={i} className="flex items-center justify-between py-3 border-b border-gray-100 dark:border-gray-700 last:border-0 last:pb-0">
                        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{feature.name}</span>
                        <div className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors ${feature.enabled ? 'bg-brand-500' : 'bg-gray-300 dark:bg-gray-600'}`}>
                            <div className={`bg-white w-4 h-4 rounded-full shadow-md transform duration-300 ease-in-out ${feature.enabled ? 'translate-x-5' : ''}`}></div>
                        </div>
                    </div>
                ))}
            </div>
        </WidgetCard>
    );
};

export const EnvironmentSettingsWidget = () => {
    return (
        <WidgetCard title="Environment Settings" icon={Server}>
            <div className="space-y-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center cursor-pointer hover:border-brand-500 transition-colors">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">PROD</h4>
                        <p className="text-xs text-green-500 mt-1">Active</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center cursor-pointer hover:border-brand-500 transition-colors opacity-50">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">STAGE</h4>
                        <p className="text-xs text-gray-500 mt-1">Standby</p>
                    </div>
                    <div className="p-4 rounded-lg bg-gray-50 dark:bg-gray-700/50 border border-gray-200 dark:border-gray-600 text-center cursor-pointer hover:border-brand-500 transition-colors opacity-50">
                        <h4 className="font-bold text-gray-900 dark:text-gray-100">DEV</h4>
                        <p className="text-xs text-gray-500 mt-1">Maintenance</p>
                    </div>
                </div>
                <div className="pt-4">
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">System Maintenance Mode</label>
                    <div className="flex items-center gap-3 p-3 rounded-lg border border-yellow-200 bg-yellow-50 dark:bg-yellow-900/20 dark:border-yellow-900/50 text-yellow-800 dark:text-yellow-200 text-sm">
                        <Globe className="w-5 h-5" />
                        Currently disabled. System is live.
                    </div>
                </div>
            </div>
        </WidgetCard>
    );
};
