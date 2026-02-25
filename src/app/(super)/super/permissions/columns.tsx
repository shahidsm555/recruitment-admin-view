import { Permission } from "@/store/usePermissionStore";
import React from "react";
import Badge from "@/components/ui/badge/Badge";
import Button from "@/components/ui/button/Button";
import { Edit2, Trash2 } from "lucide-react";

export interface ColumnProps {
    onEdit: (permission: Permission) => void;
    onDelete: (permission: Permission) => void;
}

export interface Column {
    key: keyof Permission | string;
    header: string;
    className?: string;
    sortable?: boolean;
    render?: (permission: Permission) => React.ReactNode;
}

export const getPermissionColumns = ({ onEdit, onDelete }: ColumnProps): Column[] => [
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
    {
        key: "actions",
        header: "Actions",
        className: "text-right w-24",
        render: (permission) => (
            <div className="flex justify-end gap-2">
                <Button size="sm" iconOnly startIcon={<Edit2 className="h-4 w-4 text-purple-700" />} onClick={() => onEdit(permission)} className="px-2" />
                <Button size="sm" iconOnly startIcon={<Trash2 className="h-4 w-4 text-error-500" />} onClick={() => onDelete(permission)} className="px-2 text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 dark:text-error-400" />
            </div>
        ),
    },
];
