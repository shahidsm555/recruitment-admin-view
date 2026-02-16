"use client";

import { Shield } from "lucide-react";
import { Permission } from "@/store/usePermissionStore";

interface PermissionCardProps {
    permission: Permission;
}

const PermissionCard: React.FC<PermissionCardProps> = ({ permission }) => {
    return (
        <div className="group relative rounded-2xl border border-gray-200 bg-white p-5 transition-all hover:shadow-theme-md dark:border-gray-800 dark:bg-white/3">
            {/* <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-500 dark:bg-brand-500/10 dark:text-brand-400">
                <Shield className="h-6 w-6" />
            </div> */}

            <h3 className="mb-1 text-base font-semibold text-gray-800 dark:text-white/90">
                {permission.display_name}
            </h3>

            <div className="flex flex-col gap-1 mb-3">
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Key: <span className="font-mono text-xs bg-gray-100 dark:bg-gray-800 px-1 py-0.5 rounded">{permission.permission_key}</span>
                </p>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                    Module: <span className="font-medium">{permission.module_name}</span>
                </p>
            </div>

            <div className="mt-4 flex items-center justify-between">
                <span className={`inline-flex items-center rounded-full px-2 py-1 text-xs font-medium ${permission.is_active
                    ? "bg-success-50 text-success-500 dark:bg-success-500/10 dark:text-success-400"
                    : "bg-gray-50 text-gray-500 dark:bg-white/5 dark:text-gray-400"
                    }`}>
                    {permission.is_active ? "Active" : "Inactive"}
                </span>
                <span className="text-xs text-gray-400">
                    {new Date(permission.created_at).toLocaleDateString()}
                </span>
            </div>
        </div>
    );
};

export default PermissionCard;
