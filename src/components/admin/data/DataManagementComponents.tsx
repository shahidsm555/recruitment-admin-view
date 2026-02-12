
"use client";
import React from 'react';
import { WidgetCard } from '@/components/common/WidgetCard';
import { Database, Download, Upload, RefreshCw, Archive, Trash2 } from 'lucide-react';

export const BackupRestoreWidget = () => {
    return (
        <WidgetCard title="Backup & Restore" icon={Database} iconColor="text-brand-500">
            <div className="space-y-4">
                <div className="p-4 bg-gray-50 dark:bg-gray-900/50 rounded-lg border border-gray-200 dark:border-gray-700">
                    <div className="flex justify-between items-center mb-2">
                        <span className="font-medium text-gray-900 dark:text-gray-100">Last Successful Backup</span>
                        <span className="text-sm text-green-500">Completed</span>
                    </div>
                    <p className="text-sm text-gray-500 dark:text-gray-400 mb-3">Today at 03:00 AM • 2.4 GB</p>
                    <div className="flex gap-3">
                        <button className="flex-1 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                            <Download className="w-4 h-4" /> Download
                        </button>
                        <button className="flex-1 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors flex items-center justify-center gap-2">
                            <RefreshCw className="w-4 h-4" /> Restore
                        </button>
                    </div>
                </div>
                <button className="w-full py-2 bg-brand-500 hover:bg-brand-600 text-white rounded-lg transition-colors flex items-center justify-center gap-2">
                    <Upload className="w-4 h-4" /> Trigger Manual Backup
                </button>
            </div>
        </WidgetCard>
    );
};

export const ArchivingRetentionWidget = () => {
    return (
        <WidgetCard title="Archiving & Retention" icon={Archive} iconColor="text-amber-500">
            <div className="space-y-4">
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Application Data Retention</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Delete rejected applications after</p>
                    </div>
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-sm">
                        <option>1 Year</option>
                        <option>2 Years</option>
                        <option>5 Years</option>
                    </select>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-gray-100 dark:border-gray-700">
                    <div>
                        <p className="font-medium text-gray-900 dark:text-gray-100">Audit Logs Retention</p>
                        <p className="text-sm text-gray-500 dark:text-gray-400">Keep audit logs for</p>
                    </div>
                    <select className="bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg px-2 py-1 text-sm">
                        <option>6 Months</option>
                        <option>1 Year</option>
                        <option>Forever</option>
                    </select>
                </div>
                <button className="w-full py-2 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 border border-dashed border-red-200 dark:border-red-900/50 rounded-lg text-sm font-medium transition-colors flex items-center justify-center gap-2 mt-4">
                    <Trash2 className="w-4 h-4" /> Purge Expired Data Now
                </button>
            </div>
        </WidgetCard>
    );
};
