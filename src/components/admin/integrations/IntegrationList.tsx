
"use client";
import React from 'react';
import { Mail, MessageSquare, Linkedin, Webhook, CheckCircle, AlertCircle } from 'lucide-react';
import { StatusBadge } from '@/components/common/StatusBadge';

interface Integration {
    name: string;
    icon: any;
    type: string;
    status: string;
    lastSync: string;
}

const integrationsData: Integration[] = [
    { name: 'SMTP Server', icon: Mail, type: 'Email', status: 'Connected', lastSync: '10 mins ago' },
    { name: 'Twilio SMS', icon: MessageSquare, type: 'SMS', status: 'Connected', lastSync: '1 hour ago' },
    { name: 'LinkedIn Recruiter', icon: Linkedin, type: 'Job Board', status: 'Connected', lastSync: '1 day ago' },
    { name: 'Slack Notifications', icon: Webhook, type: 'Messaging', status: 'Error', lastSync: 'Failed 2 hours ago' },
];

export const IntegrationList = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {integrationsData.map((integration, idx) => (
                <div key={idx} className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 p-6 flex flex-col justify-between">
                    <div>
                        <div className="flex items-center justify-between mb-4">
                            <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                                <integration.icon className="w-6 h-6 text-gray-700 dark:text-gray-300" />
                            </div>
                            <StatusBadge status={integration.status} />
                        </div>
                        <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 mb-1">{integration.name}</h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">{integration.type}</p>
                    </div>
                    <div className="mt-6 pt-4 border-t border-gray-100 dark:border-gray-700 flex justify-between items-center text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Last Sync: {integration.lastSync}</span>
                        <button className="text-brand-500 hover:text-brand-600 font-medium">Configure</button>
                    </div>
                </div>
            ))}
        </div>
    );
};
