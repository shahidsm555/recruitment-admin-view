import { Permission } from "@/store/usePermissionStore";
import React from "react";
import Badge from "@/components/ui/badge/Badge";

export interface Column {
    key: keyof Permission;
    header: string;
    className?: string;
    sortable?: boolean;
    render?: (permission: Permission) => React.ReactNode;
}

export const permissionColumns: Column[] = [
    {
        key: "display_name",
        header: "Display Name",
        sortable: true,
        className: "text-left",
    },
    {
        key: "permission_key",
        header: "Key",
        sortable: true,
        className: "text-left",
        render: (permission) => (
            <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-white/10 dark:text-gray-300">
                {permission.permission_key}
            </code>
        ),
    },
    {
        key: "module_name",
        header: "Module",
        sortable: true,
        className: "text-left",
    },
    {
        key: "is_active",
        header: "Status",
        sortable: false,
        className: "text-left",
        render: (permission) => (
            <Badge size="sm" color={permission.is_active ? "success" : "error"}>
                {permission.is_active ? "Active" : "Inactive"}
            </Badge>
        ),
    },
    {
        key: "created_at",
        header: "Created At",
        sortable: true,
        className: "text-right",
        render: (permission) => (
            <div className="text-right">
                {new Date(permission.created_at).toLocaleDateString()}
            </div>
        ),
    },
];
