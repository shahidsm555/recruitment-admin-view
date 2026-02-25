import { PermissionKey } from "@/store/usePermissionKeyStore";
import React from "react";
import Button from "@/components/ui/button/Button";
import { Edit2, Trash2 } from "lucide-react";

export interface Column {
    key: keyof PermissionKey | "actions";
    header: string;
    className?: string;
    sortable?: boolean;
    render?: (permissionKey: PermissionKey) => React.ReactNode;
}

interface ColumnProps {
    onEdit: (permissionKey: PermissionKey) => void;
    onDelete: (permissionKey: PermissionKey) => void;
}

export const getPermissionKeyColumns = ({ onEdit, onDelete }: ColumnProps): Column[] => [
    {
        key: "key_name",
        header: "Key Name",
        sortable: true,
        className: "text-left",
        render: (permissionKey) => (
            <code className="rounded bg-gray-100 px-2 py-1 text-xs text-gray-600 dark:bg-white/10 dark:text-gray-300">
                {permissionKey.key_name}
            </code>
        ),
    },
    {
        key: "description",
        header: "Description",
        sortable: true,
        className: "text-left",
    },
    {
        key: "created_at",
        header: "Created At",
        sortable: true,
        className: "text-left",
        render: (permissionKey) => (
            <div>
                {new Date(permissionKey.created_at).toLocaleDateString()}
            </div>
        ),
    },
    {
        key: "actions",
        header: "Actions",
        className: "text-right w-24",
        render: (permissionKey) => (
            <div className="flex justify-end gap-2">
                <Button size="sm" iconOnly startIcon={<Edit2 className="h-4 w-4 text-purple-700" />} onClick={() => onEdit(permissionKey)} className="px-2"/>
                <Button size="sm" iconOnly startIcon={<Trash2 className="h-4 w-4 text-error-500" />} onClick={() => onDelete(permissionKey)} className="px-2 text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 dark:text-error-400"/>
            </div>
        ),
    },
];
