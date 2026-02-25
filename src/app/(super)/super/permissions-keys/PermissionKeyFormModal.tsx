"use client";
import React, { useState, useEffect } from "react";
import Modal from "@/components/ui/modal/Modal";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { PermissionKey, usePermissionKeyStore } from "@/store/usePermissionKeyStore";

interface PermissionKeyFormModalProps {
    isOpen: boolean;
    onClose: () => void;
    editItem: PermissionKey | null;
}

export default function PermissionKeyFormModal({ isOpen, onClose, editItem }: PermissionKeyFormModalProps) {
    const { createPermissionKey, updatePermissionKey } = usePermissionKeyStore();
    const [formData, setFormData] = useState({ key_name: "", description: "" });
    const [submitting, setSubmitting] = useState(false);
    const [errorMsg, setErrorMsg] = useState<string | null>(null);

    useEffect(() => {
        if (editItem) {
            setFormData({ key_name: editItem.key_name, description: editItem.description });
        } else {
            setFormData({ key_name: "", description: "" });
        }
        setErrorMsg(null);
    }, [editItem, isOpen]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitting(true);
        setErrorMsg(null);
        try {
            if (editItem) {
                await updatePermissionKey(editItem.permission_key_id, formData);
            } else {
                await createPermissionKey(formData);
            }
            onClose();
        } catch (error: any) {
            setErrorMsg(error?.message || "Something went wrong.");
        } finally {
            setSubmitting(false);
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={editItem ? "Edit Permission Key" : "Create Permission Key"}
        >
            <form onSubmit={handleSubmit} className="space-y-4">
                {errorMsg && (
                    <div className="rounded-lg bg-error-50 p-3 text-sm text-error-600 dark:bg-error-500/10 dark:text-error-400">
                        {errorMsg}
                    </div>
                )}
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Key Name</label>
                    <Input
                        name="key_name"
                        value={formData.key_name}
                        onChange={handleChange}
                        placeholder="e.g. CAN_CREATE_JOB"
                        required
                    />
                </div>
                <div>
                    <label className="mb-1.5 block text-sm font-medium text-gray-700 dark:text-gray-300">Description</label>
                    <Input
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        placeholder="Description of what this key allows"
                        required
                    />
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
