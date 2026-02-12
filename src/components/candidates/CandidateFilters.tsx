
import React from 'react';
import { Search, Filter } from 'lucide-react';

export const CandidateFilters = () => {
    return (
        <div className="flex gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700">
                <Filter className="w-4 h-4" />
                Filter
            </button>
            <div className="relative">
                <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                <input
                    type="text"
                    placeholder="Search candidates..."
                    className="pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-brand-500"
                />
            </div>
        </div>
    );
};
