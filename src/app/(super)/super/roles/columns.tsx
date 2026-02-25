import { Role } from "@/store/useRoleStore";
import React from "react";
import Button from "@/components/ui/button/Button";
import { Edit2, Trash2 } from "lucide-react";

export interface ColumnProps {
    onEdit: (role: Role) => void;
    onDelete: (role: Role) => void;
}

export interface Column {
    key: keyof Role | string;
    header: string;
    className?: string;
    sortable?: boolean;
    render?: (role: Role) => React.ReactNode;
}

export const getRoleColumns = ({ onEdit, onDelete }: ColumnProps): Column[] => [
    {
        key: "role_name",
        header: "Role Name",
        sortable: true,
        className: "text-left",
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
        className: "text-right",
        render: (role) => (
            <div className="text-right">
                {new Date(role.created_at).toLocaleDateString()}
            </div>
        ),
    },
    {
        key: "actions",
        header: "Actions",
        className: "text-right w-24",
        render: (role) => (
            <div className="flex justify-end gap-2">
                <Button size="sm" iconOnly startIcon={<Edit2 className="h-4 w-4 text-purple-700" />} onClick={() => onEdit(role)} className="px-2" />
                <Button size="sm" iconOnly startIcon={<Trash2 className="h-4 w-4 text-error-500" />} onClick={() => onDelete(role)} className="px-2 text-error-500 hover:bg-error-50 dark:hover:bg-error-500/10 dark:text-error-400" />
            </div>
        ),
    },
];
