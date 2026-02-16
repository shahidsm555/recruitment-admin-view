"use client";
import React, { useState, useEffect } from "react";
import Input from "@/components/form/input/InputField";
import Label from "@/components/form/Label";
import Button from "@/components/ui/button/Button";
import Switch from "@/components/form/switch/Switch";
import IconPicker from "@/components/form/icon-picker/IconPicker";

interface Module {
    module_id?: string;
    module_key: string;
    display_name: string;
    icon_name: string;
    sort_order: number;
    is_active: boolean;
}

interface ModuleFormProps {
    initialData?: Module;
    onSubmit: (data: any) => Promise<void>;
    isLoading: boolean;
}

const ModuleForm: React.FC<ModuleFormProps> = ({
    initialData,
    onSubmit,
    isLoading,
}) => {
    const [formData, setFormData] = useState<Module>(
        initialData || {
            module_key: "",
            display_name: "",
            icon_name: "",
            sort_order: 0,
            is_active: true,
        }
    );
    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        }
    }, [initialData]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value, type } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: type === "number" ? parseInt(value) : value,
        }));
    };

    const handleToggleActive = (checked: boolean) => {
        setFormData((prev) => ({ ...prev, is_active: checked }));
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        await onSubmit(formData);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <Label>Module Key</Label>
                <Input
                    name="module_key"
                    value={formData.module_key}
                    onChange={handleChange}
                    placeholder="e.g. user_management"
                    required
                />
            </div>
            <div>
                <Label>Display Name</Label>
                <Input
                    name="display_name"
                    value={formData.display_name}
                    onChange={handleChange}
                    placeholder="e.g. User Management"
                    required
                />
            </div>
            <div>
                <IconPicker
                    label="Icon Name"
                    value={formData.icon_name}
                    onChange={(value) => setFormData((prev) => ({ ...prev, icon_name: value }))}
                    placeholder="Search for an icon..."
                />
            </div>
            <div>
                <Label>Sort Order</Label>
                <Input
                    type="number"
                    name="sort_order"
                    value={formData.sort_order}
                    onChange={handleChange}
                    placeholder="0"
                    required
                />
            </div>
            <div className="flex items-center justify-between py-2">
                <Label className="mb-0">Is Active</Label>
                <Switch
                    label=""
                    checked={formData.is_active}
                    onChange={handleToggleActive}
                />
            </div>
            <div className="flex justify-end gap-3 pt-4">
                <Button type="submit" disabled={isLoading} className="w-full">
                    {isLoading ? "Saving..." : initialData?.module_id ? "Update Module" : "Create Module"}
                </Button>
            </div>
        </form>
    );
};

export default ModuleForm;
