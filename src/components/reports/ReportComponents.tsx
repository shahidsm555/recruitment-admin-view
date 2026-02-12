
"use client";
import React from 'react';
import { WidgetCard } from '@/components/common/WidgetCard';
import { Clock, Users, TrendingUp } from 'lucide-react';

export const ReportWidgets = () => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <WidgetCard title="Time to Hire" icon={Clock}>
                <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-400 text-sm">
                    Chart Placeholder
                </div>
            </WidgetCard>

            <WidgetCard title="Source of Hire" icon={Users}>
                <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-400 text-sm">
                    Pie Chart Placeholder
                </div>
            </WidgetCard>

            <WidgetCard title="Funnel Conversion" icon={TrendingUp}>
                <div className="h-40 flex items-center justify-center bg-gray-50 dark:bg-gray-900/50 rounded-lg text-gray-400 text-sm">
                    Funnel Chart Placeholder
                </div>
            </WidgetCard>
        </div>
    );
};

export const MetricsTable = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
            <h3 className="font-semibold text-gray-900 dark:text-gray-100 mb-4">Detailed Metrics</h3>
            <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                    <thead className="bg-gray-50 dark:bg-gray-900/50 text-gray-500 uppercase">
                        <tr>
                            <th className="px-4 py-3">Metric</th>
                            <th className="px-4 py-3">Current Period</th>
                            <th className="px-4 py-3">Previous Period</th>
                            <th className="px-4 py-3">Change</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                        <tr>
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Average Time to Hire</td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">24 days</td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">28 days</td>
                            <td className="px-4 py-3 text-green-500">-14%</td>
                        </tr>
                        <tr>
                            <td className="px-4 py-3 font-medium text-gray-900 dark:text-gray-100">Offer Acceptance Rate</td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">85%</td>
                            <td className="px-4 py-3 text-gray-600 dark:text-gray-300">80%</td>
                            <td className="px-4 py-3 text-green-500">+5%</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
