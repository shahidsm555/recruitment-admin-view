"use client";
import React, { useEffect } from "react";
import PageBreadCrumb from "@/components/common/PageBreadCrumb";
import { usePermissionKeyStore } from "@/store/usePermissionKeyStore";
import PermissionKeysTable from "./PermissionKeysTable";

export default function PermissionKeysPage() {
    const { permissionKeys, isLoading, fetchPermissionKeys, error } = usePermissionKeyStore();

    useEffect(() => {
        fetchPermissionKeys();
    }, [fetchPermissionKeys]);

    return (
        <div className="space-y-6">
            <PageBreadCrumb pageTitle="Permission Keys" />

            {error && (
                <div className="rounded-xl border border-error-200 bg-error-50 p-4 text-sm text-error-700 dark:bg-error-500/10 dark:border-error-500/20 dark:text-error-400">
                    {error}
                </div>
            )}

            {isLoading && permissionKeys.length === 0 ? (
                <div className="min-h-[400px] flex items-center justify-center rounded-2xl bg-white dark:bg-white/5">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-solid border-brand-500 border-t-transparent"></div>
                </div>
            ) : (
                <PermissionKeysTable permissionKeys={permissionKeys} />
            )}
        </div>
    );
}
