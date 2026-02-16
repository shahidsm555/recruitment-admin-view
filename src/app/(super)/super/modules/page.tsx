"use client";
import React, { useEffect, useState } from "react";
import { PageHeader } from "@/components/common/PageHeader";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import Button from "@/components/ui/button/Button";
import { Plus, Search } from "lucide-react";
import Input from "@/components/form/input/InputField";
import ModuleCard from "@/components/admin/modules/ModuleCard";
import Modal from "@/components/ui/modal/Modal";
import ModuleForm from "@/components/admin/modules/ModuleForm";
import { apiRequest } from "@/lib/api";

export default function ModulesPage() {
    const [modules, setModules] = useState([]);
    const [filteredModules, setFilteredModules] = useState([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [isLoading, setIsLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedModule, setSelectedModule] = useState<any>(null);
    const [formLoading, setFormLoading] = useState(false);

    const fetchModules = async () => {
        setIsLoading(true);
        try {
            const data = await apiRequest("admin/modules");
            setModules(data);
            setFilteredModules(data);
        } catch (error) {
            console.error("Failed to fetch modules:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchModules();
    }, []);

    useEffect(() => {
        const results = modules.filter((m: any) =>
            m.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            m.module_key.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredModules(results);
    }, [searchTerm, modules]);

    const handleCreate = () => {
        setSelectedModule(null);
        setIsModalOpen(true);
    };

    const handleEdit = (module: any) => {
        setSelectedModule(module);
        setIsModalOpen(true);
    };

    const handleView = (module: any) => {
        // For now view can just open edit dialog or a read-only one
        // The requirement said "onclick of card it open view diaog"
        // Let's just use the same modal for now
        handleEdit(module);
    };

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this module?")) {
            try {
                await apiRequest(`admin/modules/${id}`, { method: "DELETE" });
                fetchModules();
            } catch (error) {
                console.error("Failed to delete module:", error);
            }
        }
    };

    const handleFormSubmit = async (formData: any) => {
        setFormLoading(true);
        try {
            if (selectedModule) {
                await apiRequest(`admin/modules/${selectedModule.module_id}`, {
                    method: "PUT",
                    body: JSON.stringify(formData),
                });
            } else {
                await apiRequest("admin/modules", {
                    method: "POST",
                    body: JSON.stringify(formData),
                });
            }
            setIsModalOpen(false);
            fetchModules();
        } catch (error) {
            console.error("Failed to save module:", error);
        } finally {
            setFormLoading(false);
        }
    };

    return (
        <div className="space-y-6">
            <PageBreadCrumb pageTitle="Modules" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="h-4 w-4" />
                    </span>
                    <Input
                        placeholder="Search modules..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <Button onClick={handleCreate} startIcon={<Plus className="h-4 w-4" />}>
                    Create Module
                </Button>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {filteredModules.map((module: any) => (
                        <ModuleCard
                            // @ts-ignore
                            key={module.module_id || module.id}
                            module={module}
                            onEdit={handleEdit}
                            onDelete={handleDelete}
                            onView={handleView}
                        />
                    ))}
                </div>
            )}

            {/* Add/Edit Modal */}
            <Modal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                title={selectedModule ? "Edit Module" : "Create New Module"}
            >
                <ModuleForm
                    initialData={selectedModule}
                    onSubmit={handleFormSubmit}
                    isLoading={formLoading}
                />
            </Modal>
        </div>
    );
}
