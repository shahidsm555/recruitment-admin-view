"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/modal/Modal";
import Button from "@/components/ui/button/Button";
import Select from "@/components/form/Select";
import MultiSelect from "@/components/form/MultiSelect";
import { useRolePermissionStore } from "@/store/useRolePermissionStore";
import { useRoleStore } from "@/store/useRoleStore";
import { usePermissionStore } from "@/store/usePermissionStore";

interface AssignPermissionModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export default function AssignPermissionModal({ isOpen, onClose }: AssignPermissionModalProps) {
    const { assignPermission, assignBulkPermissions } = useRolePermissionStore();
    const { roles, fetchRoles } = useRoleStore();
    const { permissions, fetchPermissions } = usePermissionStore();

    const [mode, setMode] = useState<"single" | "bulk">("single");

    const [formData, setFormData] = useState({
        role_id: "",
        permission_id: "",
        permission_ids: [] as string[],
    });

    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen) {
            fetchRoles();
            fetchPermissions();
            setFormData({
                role_id: "",
                permission_id: "",
                permission_ids: [],
            });
            setErrorMsg(null);
        }
    }, [isOpen, fetchRoles, fetchPermissions]);

    const handleSelectChange = (name: string, value: string) => {
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleMultiSelectChange = (values: string[]) => {
        setFormData(prev => ({ ...prev, permission_ids: values }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg(null);
        try {
            if (mode === "single") {
                if (!formData.role_id || !formData.permission_id) {
                    throw new Error("Role and Permission are required.");
                }
                await assignPermission({
                    role_id: formData.role_id,
                    permission_id: formData.permission_id,
                });
            } else {
                if (!formData.role_id || formData.permission_ids.length === 0) {
                    throw new Error("Role and at least one Permission are required.");
                }
                await assignBulkPermissions({
                    role_id: formData.role_id,
                    permission_ids: formData.permission_ids,
                });
            }
            onClose();
        } catch (error: any) {
            setErrorMsg(error?.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    const roleOptions = roles.filter(r => !r.is_deleted).map(r => ({ value: r.role_id, label: r.role_name }));
    const permissionOptions = permissions.filter(p => p.is_active).map(p => ({
        value: p.permission_id,
        label: p.display_name,
        text: p.display_name, // Map for MultiSelect
        selected: false
    }));

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={"Assign Permissions"}
        >
            <div className="mb-6 flex space-x-2 border-b border-gray-200 dark:border-gray-800">
                <button
                    className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${mode === "single"
                            ? "border-brand-500 text-brand-600 dark:text-brand-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setMode("single")}
                >
                    Single Assignment
                </button>
                <button
                    className={`pb-2 px-1 text-sm font-medium border-b-2 transition-colors duration-200 ${mode === "bulk"
                            ? "border-brand-500 text-brand-600 dark:text-brand-400"
                            : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                        }`}
                    onClick={() => setMode("bulk")}
                >
                    Bulk Assignment
                </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4 py-2">
                {errorMsg && (
                    <div className="rounded-lg bg-error-50 p-3 text-sm text-error-600 dark:bg-error-500/10 dark:text-error-400">
                        {errorMsg}
                    </div>
                )}

                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Target Role</label>
                    <Select
                        options={roleOptions}
                        placeholder="Select a role"
                        defaultValue={formData.role_id}
                        onChange={(val) => handleSelectChange("role_id", val)}
                    />
                </div>

                {mode === "single" ? (
                    <div>
                        <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Permission to Assign</label>
                        <Select
                            options={permissionOptions}
                            placeholder="Select a permission"
                            defaultValue={formData.permission_id}
                            onChange={(val) => handleSelectChange("permission_id", val)}
                        />
                    </div>
                ) : (
                    <div>
                        <MultiSelect
                            label="Permissions to Assign"
                            options={permissionOptions}
                            defaultSelected={formData.permission_ids}
                            onChange={handleMultiSelectChange}
                        />
                    </div>
                )}

                <div className="flex justify-end gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                    <Button variant="outline" onClick={onClose} disabled={submitting}>Cancel</Button>
                    <Button type="submit" disabled={submitting}>
                        {submitting ? "Assigning..." : "Assign"}
                    </Button>
                </div>
            </form>
        </Modal>
    );
}
