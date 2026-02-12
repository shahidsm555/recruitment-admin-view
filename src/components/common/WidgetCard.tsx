
import React from 'react';
import { LucideIcon } from 'lucide-react';

export interface WidgetCardProps {
    title: string;
    icon?: LucideIcon;
    children: React.ReactNode;
    className?: string;
    headerAction?: React.ReactNode;
    iconColor?: string;
}

export const WidgetCard: React.FC<WidgetCardProps> = ({ title, icon: Icon, children, className, headerAction, iconColor }) => {
    return (
        <div className={`bg-white dark:bg-gray-800 rounded-md shadow-sm border border-gray-100 dark:border-gray-700 p-6 ${className || ''}`}>
            <div className="flex items-center gap-3 mb-4">
                {Icon && (
                    <div className="p-2 bg-gray-50 dark:bg-gray-700/50 rounded-lg">
                        <Icon className={`w-5 h-5 ${iconColor || 'text-blue-500'}`} />
                    </div>
                )}
                <h3 className="font-semibold text-lg text-gray-900 dark:text-gray-100">{title}</h3>
                {headerAction && <div className="ml-auto">{headerAction}</div>}
            </div>
            {children}
        </div>
    );
};
