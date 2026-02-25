"use client";
import React, { useState } from "react";
import { PermissionKey, usePermissionKeyStore } from "@/store/usePermissionKeyStore";
import Button from "@/components/ui/button/Button";
import { getPermissionKeyColumns } from "./columns";
import PermissionKeyFormModal from "./PermissionKeyFormModal";
import Modal from "@/components/ui/modal/Modal";
import ReusableTable, { TableColumn } from "@/components/ui/table/ReusableTable";

interface PermissionKeysTableProps {
    permissionKeys: PermissionKey[];
}

export default function PermissionKeysTable({ permissionKeys }: PermissionKeysTableProps) {
    const { deletePermissionKey } = usePermissionKeyStore();

    // Form Modal State
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [editItem, setEditItem] = useState<PermissionKey | null>(null);

    // Delete Modal State
    const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
    const [deletingItem, setDeletingItem] = useState<PermissionKey | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);

    const handleCreateClick = () => {
        setEditItem(null);
        setIsFormModalOpen(true);
    };

    const handleEditClick = (item: PermissionKey) => {
        setEditItem(item);
        setIsFormModalOpen(true);
    };

    const handleDeleteClick = (item: PermissionKey) => {
        setDeletingItem(item);
        setIsDeleteModalOpen(true);
    };

    const confirmDelete = async () => {
        if (!deletingItem) return;
        setIsDeleting(true);
        try {
            await deletePermissionKey(deletingItem.permission_key_id);
            setIsDeleteModalOpen(false);
        } catch (error) {
            console.error(error);
        } finally {
            setIsDeleting(false);
            setDeletingItem(null);
        }
    };

    const columns: TableColumn<PermissionKey>[] = getPermissionKeyColumns({
        onEdit: handleEditClick,
        onDelete: handleDeleteClick,
    });

    const handleSearchFilter = (item: PermissionKey, searchTerm: string) => {
        return (
            item.key_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            item.description.toLowerCase().includes(searchTerm.toLowerCase())
        );
    };

    return (
        <div className="space-y-4">
            <ReusableTable<PermissionKey>
                data={permissionKeys}
                columns={columns}
                rowKey={(item) => item.permission_key_id}
                searchable={true}
                searchPlaceholder="Search permission keys..."
                searchFilterFn={handleSearchFilter}
                createBtnText="Create Permission Key"
                onCreateClick={handleCreateClick}
                defaultSortKey="created_at"
                defaultSortDirection="desc"
                emptyMessage="No permission keys found."
            />

            <PermissionKeyFormModal
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
                        Are you sure you want to delete the permission key <strong>{deletingItem?.key_name}</strong>? This action cannot be undone.
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
