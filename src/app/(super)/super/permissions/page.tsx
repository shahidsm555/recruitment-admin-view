"use client";
import React, { useEffect, useState } from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import { Search } from "lucide-react";
import Input from "@/components/form/input/InputField";
import { usePermissionStore, Permission } from "@/store/usePermissionStore";
import PermissionCard from "@/components/admin/permissions/PermissionCard";

export default function PermissionsPage() {
    const { permissions, isLoading, fetchPermissions } = usePermissionStore();
    const [searchTerm, setSearchTerm] = useState("");
    const [filteredPermissions, setFilteredPermissions] = useState<Permission[]>(permissions);

    useEffect(() => {
        fetchPermissions();
    }, [fetchPermissions]);

    useEffect(() => {
        const results = permissions.filter((p) =>
            p.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.permission_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
            p.module_name.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setFilteredPermissions(results);
    }, [searchTerm, permissions]);

    // Group permissions by module_name
    const groupedPermissions = filteredPermissions.reduce((acc, permission) => {
        const moduleName = permission.module_name || "Other";
        if (!acc[moduleName]) {
            acc[moduleName] = [];
        }
        acc[moduleName].push(permission);
        return acc;
    }, {} as Record<string, Permission[]>);

    const sortedModuleNames = Object.keys(groupedPermissions).sort();

    return (
        <div className="space-y-6">
            <PageBreadCrumb pageTitle="Permissions" />

            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="h-4 w-4" />
                    </span>
                    <Input
                        placeholder="Search permissions..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            {isLoading ? (
                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                    {[...Array(8)].map((_, i) => (
                        <div key={i} className="h-40 animate-pulse rounded-2xl bg-gray-100 dark:bg-white/5"></div>
                    ))}
                </div>
            ) : (
                <div className="space-y-8">
                    {sortedModuleNames.map((moduleName) => (
                        <div key={moduleName}>
                            <h2 className="mb-4 text-xl font-semibold text-gray-800 dark:text-white/90">
                                {moduleName}
                            </h2>
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
                                {groupedPermissions[moduleName].map((permission) => (
                                    <PermissionCard
                                        key={permission.permission_id}
                                        permission={permission}
                                    />
                                ))}
                            </div>
                        </div>
                    ))}

                    {filteredPermissions.length === 0 && (
                        <div className="py-12 text-center text-gray-500 dark:text-gray-400">
                            No permissions found matching your search.
                        </div>
                    )}
                </div>
            )}
        </div>
    );
}
