"use client";
import React, { useState } from "react";
import { RolePermission, useRolePermissionStore } from "@/store/useRolePermissionStore";
import { getRolePermissionColumns } from "./columns";
import ReusableTable, { TableColumn } from "@/components/ui/table/ReusableTable";
import AssignPermissionFormModal from "./AssignPermissionFormModal";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";
import { Trash2 } from "lucide-react";

interface AssignPermissionsTableProps {
    rolePermissions: RolePermission[];
}

export default function AssignPermissionsTable({ rolePermissions }: AssignPermissionsTableProps) {
    const { removePermission, removeAllPermissionsFromRole } = useRolePermissionStore();

    // Form Modal State
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<RolePermission | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    // Bulk Delete Modal for an entire Role
    const [isClearModalOpen, setIsClearModalOpen] = useState(false);
    const [clearingRoleId, setClearingRoleId] = useState<string | null>(null);
    const [clearingRoleName, setClearingRoleName] = useState<string | null>(null);
    const [isClearing, setIsClearing] = useState(false);

    const handleCreateClick = () => {
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (item: RolePermission) => {
        setDeletingItem(item);
        setIsDeleteModalOpen(true);
    };

    const handleClearRoleClick = (roleId: string, roleName: string) => {
        setClearingRoleId(roleId);
        setClearingRoleName(roleName);
        setIsClearModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!deletingItem) return;
        setIsDeleting(true);
        try {
            await removePermission({
                role_id: deletingItem.role_id,
                permission_id: deletingItem.permission_id
            });
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
            setDeletingItem(null);
        }
    };

    const confirmClearRole = async () => {
        if (!clearingRoleId) return;
        setIsClearing(true);
        try {
            await removeAllPermissionsFromRole(clearingRoleId);
            setIsClearModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsClearing(false);
            setClearingRoleId(null);
            setClearingRoleName(null);
        }
    };

    const columns: TableColumn<RolePermission>[] = getRolePermissionColumns({
        onDelete: handleDeleteClick,
    });

    const handleSearchFilter = (item: RolePermission, searchTerm: string) => {
        return (
            item.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.permission_display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.module_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.permission_key.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="space-y-4">
            <ReusableTable<RolePermission>
                data={rolePermissions}
                columns={columns}
                rowKey={(item) => `${item.role_id}-${item.permission_id}`}
                searchable={true}
                searchPlaceholder="Search role assignments..."
                searchFilterFn={handleSearchFilter}
                createBtnText="Assign Permission"
                onCreateClick={handleCreateClick}
                defaultSortKey="role_name"
                defaultSortDirection="asc"
                emptyMessage="No permissions assigned to roles."
            />

            <AssignPermissionFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
            />

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Revoke Permission"
            >
                <div>
                    <p className="text-gray-600 dark:text-gray-300">
                        Are you sure you want to revoke <strong>{deletingItem?.permission_display_name}</strong> from <strong>{deletingItem?.role_name}</strong>?
                    </p>
                    <div className="mt-6 flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setIsDeleteModalOpen(false)} disabled={isDeleting}>
                            Cancel
                        </Button>
                        <Button
                            className="bg-error-500 text-white hover:bg-error-600"
                            onClick={confirmDelete}
                            disabled={isDeleting}
                        >
                            {isDeleting ? "Revoking..." : "Revoke"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
