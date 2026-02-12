
"use client";
import React from 'react';
import { WidgetCard } from '@/components/common/WidgetCard';
import { AlertOctagon, Activity, LifeBuoy } from 'lucide-react';

export const RecentErrorLogs = () => {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 overflow-hidden">
            <div className="px-6 py-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100 flex items-center gap-2">
                    <AlertOctagon className="w-5 h-5 text-orange-500" />
                    Recent Error Logs
                </h3>
                <div className="flex gap-2">
                    <span className="px-2 py-1 bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400 text-xs font-medium rounded-full">1 Critical</span>
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400 text-xs font-medium rounded-full">3 Warning</span>
                </div>
            </div>
            <div className="divide-y divide-gray-200 dark:divide-gray-700">
                {[
                    { time: '10:42 AM', level: 'Critical', message: 'Database Connection Timeout - Primary Replica', code: 'DB_ERR_5004' },
                    { time: '10:15 AM', level: 'Warning', message: 'High Memory Usage - Worker Node 3', code: 'SYS_WARN_MEM' },
                    { time: '09:30 AM', level: 'Warning', message: 'API Rate Limit Approaching - OpenAI Integration', code: 'API_WARN_LIMIT' },
                    { time: '08:55 AM', level: 'Error', message: 'Email Delivery Failed - SMTP Auth Error', code: 'MAIL_ERR_AUTH' },
                    { time: '08:12 AM', level: 'Warning', message: 'Slow Query Detected - Candidate Search', code: 'DB_WARN_perf' },
                ].map((log, i) => (
                    <div key={i} className="px-6 py-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors flex items-start gap-4">
                        <div className={`mt-1 w-2 h-2 rounded-full ${log.level === 'Critical' ? 'bg-red-500' :
                            log.level === 'Error' ? 'bg-orange-500' : 'bg-amber-500'
                            }`} />
                        <div className="flex-1">
                            <div className="flex justify-between mb-1">
                                <span className="font-medium text-gray-900 dark:text-gray-100 font-mono text-sm">{log.message}</span>
                                <span className="text-xs text-gray-500 whitespace-nowrap">{log.time}</span>
                            </div>
                            <div className="flex items-center gap-3 text-xs text-gray-500">
                                <span className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded text-gray-600 dark:text-gray-300 font-mono">{log.code}</span>
                                <span>Level: {log.level}</span>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const SystemHealthMonitor = () => {
    return (
        <WidgetCard title="System Health Monitor" icon={Activity} iconColor="text-blue-500">
            <div className="space-y-4">
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">API Latency (p95)</span>
                    <span className="text-sm font-medium text-green-500">45ms</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Uptime (30d)</span>
                    <span className="text-sm font-medium text-green-500">99.98%</span>
                </div>
                <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-700 dark:text-gray-300">Active Sessions</span>
                    <span className="text-sm font-medium text-blue-500">234</span>
                </div>
            </div>
        </WidgetCard>
    );
};

export const TroubleshootingTools = () => {
    return (
        <WidgetCard title="Troubleshooting Tools" icon={LifeBuoy} iconColor="text-purple-500">
            <div className="grid grid-cols-2 gap-3">
                <button className="p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                    Clear Cache
                </button>
                <button className="p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                    Restart Worker
                </button>
                <button className="p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                    Test Email Sending
                </button>
                <button className="p-3 bg-gray-50 dark:bg-gray-700/50 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg text-sm font-medium text-gray-700 dark:text-gray-300 transition-colors">
                    View Raw Logs
                </button>
            </div>
        </WidgetCard>
    );
};
