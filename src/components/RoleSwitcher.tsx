
"use client";
import React from 'react';
import { useStore, UserRole } from '../store/useStore';
import { useRouter } from 'next/navigation';

export default function RoleSwitcher() {
    const { userRole, setUserRole } = useStore();
    const router = useRouter();

    const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newRole = e.target.value as UserRole;
        setUserRole(newRole);

        // Redirect based on role
        if (newRole === 'SUPER_USER') {
            router.push('/super/dashboard');
        } else if (newRole === 'SYSTEM_ADMIN') {
            router.push('/admin/dashboard');
        } else {
            router.push('/');
        }
    };

    return (
        <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 p-1.5 rounded-lg border border-gray-200 dark:border-gray-700">
            <span className="text-xs font-semibold text-gray-500 uppercase px-1">Role:</span>
            <select
                value={userRole}
                onChange={handleRoleChange}
                className="bg-transparent text-sm font-medium text-gray-900 dark:text-gray-100 focus:outline-none cursor-pointer"
            >
                <option value="GUEST">Guest</option>
                <option value="SUPER_USER">Super User</option>
                <option value="SYSTEM_ADMIN">System Admin</option>
            </select>
        </div>
    );
}
