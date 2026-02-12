
import { AlertCircle, AlertTriangle, Archive, BadgeAlert, CheckCheck, CheckCircle, CircleAlert, File, FileClock, FileXCorner } from 'lucide-react';
import React from 'react';
import { Badge } from '../ui/badge';

interface StatusBadgeProps {
    status: string;
    variant?: 'default' | 'outline';
}

export const StatusBadge: React.FC<StatusBadgeProps> = ({ status }) => {
    let metaData = {
        colorClass: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400',
        icon: <AlertCircle className="w-3 h-3" />
    };

    switch (status.toLowerCase()) {
        case 'active':
        case 'published':
        case 'good':
        case 'connected':
            metaData.colorClass = 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400';
            metaData.icon = <CheckCircle className="w-3 h-3" />;
            break;
        case 'draft':
        case 'inactive':
            metaData.colorClass = 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400';
            metaData.icon = <File className="w-3 h-3" />;
            break;
        case 'pending':
        case 'pending approval':
            metaData.colorClass = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            metaData.icon = <FileClock className="w-3 h-3" />;
            break;
        case 'warning':
            metaData.colorClass = 'bg-amber-100 text-amber-700 dark:bg-amber-900/30 dark:text-amber-400';
            metaData.icon = <AlertTriangle className="w-3 h-3" />;
            break;
        case 'completed':
            metaData.colorClass = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            metaData.icon = <CheckCheck className="w-3 h-3" />;
            break;
        case 'archived':
            metaData.colorClass = 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400';
            metaData.icon = <Archive className="w-3 h-3" />;
            break;
        case 'rejected':
            metaData.colorClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            metaData.icon = <FileXCorner className="w-3 h-3" />;
            break;
        case 'error':
            metaData.colorClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            metaData.icon = <CircleAlert className="w-3 h-3" />;
            break;
        case 'critical':
            metaData.colorClass = 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400';
            metaData.icon = <BadgeAlert className="w-3 h-3" />;
            break;
    }

    return (
        <Badge className={`px-2 py-1 text-xs font-medium flex items-center gap-1 ${metaData.colorClass}`}>
            {metaData.icon}
            {status}
        </Badge>
    );
};
