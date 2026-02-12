
"use client";
import React from 'react';
import { WidgetCard } from '@/components/common/WidgetCard';
import { Mail, MessageCircle } from 'lucide-react';

export const CommunicationWidgets = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <WidgetCard title="Email Templates" icon={Mail}>
                <ul className="space-y-3">
                    {['Interview Invitation', 'Offer Letter', 'Rejection Email', 'Onboarding Welcome'].map((item, i) => (
                        <li key={i} className="flex justify-between items-center p-3 hover:bg-gray-50 dark:hover:bg-gray-700/50 rounded-lg cursor-pointer transition-colors border border-transparent hover:border-gray-100 dark:hover:border-gray-700">
                            <span className="text-sm font-medium text-gray-700 dark:text-gray-300">{item}</span>
                            <span className="text-xs text-gray-400">Edited 2d ago</span>
                        </li>
                    ))}
                </ul>
            </WidgetCard>

            <WidgetCard title="Announcements" icon={MessageCircle}>
                <div className="space-y-4">
                    <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg">
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-gray-100">System Maintenance</h4>
                            <span className="text-xs text-gray-500">Scheduled</span>
                        </div>
                        <p className="text-sm text-gray-600 dark:text-gray-400">Scheduled maintenance for recruitment portal on Sunday 2:00 AM EST.</p>
                    </div>
                    <button className="w-full py-2 border border-dashed border-gray-300 dark:border-gray-600 rounded-lg text-sm text-gray-500 hover:text-gray-700 dark:hover:text-gray-300 hover:border-gray-400 dark:hover:border-gray-500 transition-colors">
                        + Create Announcement
                    </button>
                </div>
            </WidgetCard>
        </div>
    );
};
