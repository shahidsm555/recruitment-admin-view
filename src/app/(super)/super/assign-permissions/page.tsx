"use client";
import React, { useEffect } from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import { useRolePermissionStore } from "@/store/useRolePermissionStore";
import AssignPermissionsTable from "./AssignPermissionsTable";

export default function AssignPermissionsPage() {
    const { rolePermissions, isLoading, fetchRolePermissions } = useRolePermissionStore();

    useEffect(() => {
        fetchRolePermissions();
    }, [fetchRolePermissions]);

    return (
        <div className="space-y-6">
            <PageBreadCrumb pageTitle="Assign Permissions" />

            {isLoading ? (
                <div className="min-h-[400px] flex items-center justify-center rounded-2xl bg-white dark:bg-white/5">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent"></div>
                </div>
            ) : (
                <AssignPermissionsTable rolePermissions={rolePermissions} />
            )}
        </div>
    );
}
