"use client";

import { DynamicIcon } from "lucide-react/dynamic";

interface Module {
    module_id: string;
    module_key: string;
    display_name: string;
    icon_name: string;
    sort_order: number;
    is_active: boolean;
}

interface ModuleCardProps {
    module: Module
    onEdit: (module: Module) => void;
    onDelete: (id: string) => void;
    onView: (module: Module) => void;
}

const ModuleCard: React.FC<ModuleCardProps> = ({
    module,
    onEdit,
    onDelete,
    onView,
}) => {



    return (
        <div className="group relative rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-white/3">
            {/* Absolute Positioning for Edit/Delete icons */}
            <div className="absolute top-4 right-4 flex gap-2 opacity-0 transition-opacity group-hover:opacity-100">
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        onEdit(module);
                    }}
                    className="rounded-lg bg-white p-1.5 text-gray-500 shadow-theme-xs ring-1 ring-inset ring-gray-200 hover:text-brand-500 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:text-brand-400"
                >
                    <DynamicIcon name="edit" className="h-4 w-4" />
                </button>
                <button
                    onClick={(e) => {
                        e.stopPropagation();
                        // @ts-ignore
                        onDelete(module.module_id || module.id);
                    }}
                    className="rounded-lg bg-white p-1.5 text-gray-500 shadow-theme-xs ring-1 ring-inset ring-gray-200 hover:text-error-500 dark:bg-gray-800 dark:text-gray-400 dark:ring-gray-700 dark:hover:text-error-400"
                >
                    <DynamicIcon name="trash-2" className="h-4 w-4" />
                </button>
            </div>

            <div
                className="cursor-pointer"
                onClick={() => onView(module)}
            >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400">
                    {/* Simple fallback icon for now, could use Lucide dynamically if icon_name matches */}
                    <DynamicIcon
                        name={module.icon_name as any}
                        className="h-6 w-6" />
                </div>

                <h3 className="mb-1 text-base font-semibold text-gray-800 dark:text-white/90">
                    {module.display_name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Key: {module.module_key}
                </p>
                <div className="mt-4 flex items-center justify-between">
                    <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${module.is_active
                        ? "bg-success-50 text-success-500 dark:bg-success-500/10 dark:text-success-400"
                        : "bg-gray-50 text-gray-500 dark:bg-white/5 dark:text-gray-400"
                        }`}>
                        {module.is_active ? "Active" : "Inactive"}
                    </span>
                    <span className="text-xs text-gray-400">Order: {module.sort_order}</span>
                </div>
            </div>
        </div>
    );
};

export default ModuleCard;
