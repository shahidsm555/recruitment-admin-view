import { RolePermission } from "@/store/useRolePermissionStore";
import React from "react";
import Button from "@/components/ui/button/Button";
import { Trash2 } from "lucide-react";

export interface ColumnProps {
    onDelete: (rolePermission: RolePermission) => void;
}

export interface Column {
    key: keyof RolePermission | string;
    header: string;
    className?: string;
    sortable?: boolean;
    render?: (rolePermission: RolePermission) => React.ReactNode;
}

export const getRolePermissionColumns = ({ onDelete }: ColumnProps): Column[] => [
    {
        key: "role_name",
        header: "Role",
        sortable: true,
        className: "text-left font-medium",
    },
    {
        key: "permission_display_name",
        header: "Permission",
        sortable: true,
        className: "text-left",
    },
    {
        key: "module_name",
        header: "Module",
        sortable: true,
        className: "text-left text-gray-500",
    },
    {
        key: "permission_key",
        header: "Key",
        sortable: true,
        className: "text-left",
        render: (item) => (
            <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-white/10 dark:text-gray-300">
                {item.permission_key}
            </code>
        )
    },
    {
        key: "actions",
        header: "Actions",
        className: "text-right w-20",
        render: (item) => (
            <div className="flex justify-end">
                <Button size="sm" iconOnly startIcon={<Trash2 className="h-4 w-4 text-error-500" />} onClick={() => onDelete(item)} className="px-2 text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 dark:text-error-400" />
            </div>
        ),
    },
];
