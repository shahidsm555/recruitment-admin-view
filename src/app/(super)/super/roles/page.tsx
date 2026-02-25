"use client";
import React, { useEffect } from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import { useRoleStore } from "@/store/useRoleStore";
import RolesTable from "./RolesTable";

export default function RolesPage() {
    const { roles, isLoading, fetchRoles } = useRoleStore();

    useEffect(() => {
        fetchRoles();
    }, [fetchRoles]);

    return (
        <div className="space-y-6">
            <PageBreadCrumb pageTitle="Roles" />

            {isLoading ? (
                <div className="min-h-[400px] flex items-center justify-center rounded-2xl bg-white dark:bg-white/5">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent"></div>
                </div>
            ) : (
                <RolesTable roles={roles} />
            )}
        </div>
    );
}
