"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/modal/Modal";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import { Permission, usePermissionStore } from "@/store/usePermissionStore";
import { usePermissionKeyStore } from "@/store/usePermissionKeyStore";
import { apiRequest } from "@/lib/api";

interface PermissionFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editItem: Permission | null;
}

interface ModuleItem {
    module_id: string;
    display_name: string;
}

export default function PermissionFormModal({ isOpen, onClose, editItem }: PermissionFormModalProps) {
    const { createPermission, updatePermission } = usePermissionStore();
    const { permissionKeys, fetchPermissionKeys } = usePermissionKeyStore();
    const [modules, setModules] = useState<ModuleItem[]>([]);

    const [formData, setFormData] = useState({
        module_id: "",
        permission_key_id: "",
        display_name: "",
        is_active: true,
    });

    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    // Fetch modules manually for the select
    useEffect(() => {
        if (isOpen) {
            fetchPermissionKeys();

            // fetch modules
            apiRequest("admin/modules")
                .then(data => setModules(data))
                .catch(err => console.error("Failed to load modules:", err));
        }
    }, [isOpen, fetchPermissionKeys]);

    useEffect(() => {
        if (editItem) {
            setFormData({
                module_id: editItem.module_id,
                permission_key_id: editItem.permission_key_id,
                display_name: editItem.display_name,
                is_active: editItem.is_active,
            });
        } else {
            setFormData({
                module_id: "",
                permission_key_id: "",
                display_name: "",
                is_active: true,
            });
        }
        setErrorMsg(null);
    }, [editItem, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg(null);
        try {
            if (editItem) {
                await updatePermission(editItem.permission_id, formData);
            } else {
                await createPermission(formData);
            }
            onClose();
        } catch (error: any) {
            setErrorMsg(error?.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    // Prepare select options
    const moduleOptions = modules.map(m => ({ value: m.module_id, label: m.display_name }));
    const keyOptions = permissionKeys.map(k => ({ value: k.permission_key_id, label: k.key_name }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editItem ? "Edit Permission" : "Create Permission"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                    <div className="rounded-lg bg-error-50 p-3 text-sm text-error-600 dark:bg-error-500/10 dark:text-error-400">
                        {errorMsg}
                    </div>
                )}

                {/* Display Name */}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Display Name</label>
                    <Input
                        name="display_name"
                        value={formData.display_name}
                        onChange={handleChange}
                        placeholder="e.g. Create Job"
                        required
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Module</label>
                    <Select
                        options={moduleOptions}
                        placeholder="Select a module"
                        defaultValue={formData.module_id}
                        onChange={(val) => handleSelectChange("module_id", val)}
                    />
                </div>

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Permission Key</label>
                    <Select
                        options={keyOptions}
                        placeholder="Select a permission key"
                        defaultValue={formData.permission_key_id}
                        onChange={(val) => handleSelectChange("permission_key_id", val)}
                    />
                </div>

                <div className="flex items-center gap-2">
                    <input
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        checked={formData.is_active}
                        onChange={handleChange}
                        className="h-4 w-4 rounded border-gray-300 text-brand-500 focus:ring-brand-500"
                    />
                    <label htmlFor="is_active" className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        Active
                    </label>
                </div>

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                    <Button variant="outline" onClick={onClose} disabled={submitting}>Cancel</Button>
                    <Button type="submit" disabled={submitting}>
                        {submitting ? "Saving..." : "Save"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
