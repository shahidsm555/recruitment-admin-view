
import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface StatsCardProps {
    title: string;
    value: string | number;
    icon?: LucideIcon;
    color?: string; // Expecting tailwind class like 'bg-blue-500'
    trend?: string;
    trendColor?: string;
    iconColor?: string;
}

export const StatsCard: React.FC<StatsCardProps> = ({ title, value, icon: Icon, color, trend, trendColor, iconColor }) => {
    return (
        <div className="bg-white dark:bg-gray-800 px-4 py-4 rounded-md shadow-sm border border-gray-100 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-3">
                    {Icon && (
                        <div className={`p-2 rounded-lg ${color || 'bg-gray-100/30 dark:bg-gray-700/30'}`}>
                            <Icon className={`w-5 h-5 ${iconColor || 'text-gray-600 dark:text-gray-300'}`} />
                        </div>
                    )}
                    <h3 className="font-semibold text-gray-700 dark:text-gray-300">{title}</h3>
                </div>
            </div>
            <div>
                <h4 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{value}</h4>
                {trend && (
                    <p className={`text-xs mt-1 ${trendColor || 'text-gray-500'}`}>{trend}</p>
                )}
            </div>
        </div>
    );
};
