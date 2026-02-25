"use client";
import React, { useState } from "react";
import { Role, useRoleStore } from "@/store/useRoleStore";
import { getRoleColumns } from "./columns";
import ReusableTable, { TableColumn } from "@/components/ui/table/ReusableTable";
import RoleFormModal from "./RoleFormModal";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";

interface RolesTableProps {
    roles: Role[];
}

export default function RolesTable({ roles }: RolesTableProps) {
    const { deleteRole } = useRoleStore();

    // Form Modal State
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<Role | null>(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<Role | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleCreateClick = () => {
        setEditItem(null);
        setIsFormModalOpen(true);
    };

    const handleEditClick = (item: Role) => {
        setEditItem(item);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (item: Role) => {
        setDeletingItem(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!deletingItem) return;
        setIsDeleting(true);
        try {
            await deleteRole(deletingItem.role_id);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
            setDeletingItem(null);
        }
    };

    const columns: TableColumn<Role>[] = getRoleColumns({
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
    });

    const handleSearchFilter = (item: Role, searchTerm: string) => {
        return (
            item.role_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    // Filter out deleted roles locally just in case the API returned them
    const activeRoles = roles.filter(role => !role.is_deleted);

    return (
        <div className="space-y-4">
            <ReusableTable<Role>
                data={activeRoles}
                columns={columns}
                rowKey={(item) => item.role_id}
                searchable={true}
                searchPlaceholder="Search roles..."
                searchFilterFn={handleSearchFilter}
                createBtnText="Create Role"
                onCreateClick={handleCreateClick}
                defaultSortKey="created_at"
                defaultSortDirection="desc"
                emptyMessage="No roles found."
            />

            <RoleFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                editItem={editItem}
            />

            <Modal
                isOpen={isDeleteModalOpen}
                onClose={() => setIsDeleteModalOpen(false)}
                title="Confirm Delete"
            >
                <div>
                    <p className="text-gray-600 dark:text-gray-300">
                        Are you sure you want to delete the role <strong>{deletingItem?.role_name}</strong>? This action cannot be undone.
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
                            {isDeleting ? "Deleting..." : "Delete"}
                        </Button>
                    </div>
                </div>
            </Modal>
        </div>
    );
}
