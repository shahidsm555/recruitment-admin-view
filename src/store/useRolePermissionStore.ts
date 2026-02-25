import { create } from 'zustand';
import { apiRequest } from '@/lib/api';

export interface RolePermission {
    role_id: string;
    role_name: string;
    permission_id: string;
    module_name: string;
    permission_key: string;
    permission_display_name: string;
}

export interface AssignSinglePayload {
    role_id: string;
    permission_id: string;
}

export interface AssignBulkPayload {
    role_id: string;
    permission_ids: string[];
}

export interface RemovePermissionPayload {
    role_id: string;
    permission_id: string;
}

interface RolePermissionState {
    rolePermissions: RolePermission[];
    isLoading: boolean;
    error: string | null;
    fetchRolePermissions: () => Promise<void>;
    assignPermission: (data: AssignSinglePayload) => Promise<void>;
    assignBulkPermissions: (data: AssignBulkPayload) => Promise<void>;
    removePermission: (data: RemovePermissionPayload) => Promise<void>;
    removeAllPermissionsFromRole: (role_id: string) => Promise<void>;
}

export const useRolePermissionStore = create<RolePermissionState>((set, get) => ({
    rolePermissions: [],
    isLoading: false,
    error: null,

    fetchRolePermissions: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await apiRequest('admin/role-permissions');
            set({ rolePermissions: data });
        } catch (error: any) {
            console.error('Failed to fetch role permissions:', error);
            set({ error: error.message || 'Failed to fetch role permissions' });
        } finally {
            set({ isLoading: false });
        }
    },

    assignPermission: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest('admin/role-permissions', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            await get().fetchRolePermissions();
        } catch (error: any) {
            console.error('Failed to assign permission:', error);
            set({ error: error.message || 'Failed to assign permission' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    assignBulkPermissions: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest('admin/role-permissions/bulk', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            await get().fetchRolePermissions();
        } catch (error: any) {
            console.error('Failed to bulk assign permissions:', error);
            set({ error: error.message || 'Failed to bulk assign permissions' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    removePermission: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest('admin/role-permissions', {
                method: 'DELETE',
                body: JSON.stringify(data),
            });
            await get().fetchRolePermissions();
        } catch (error: any) {
            console.error('Failed to remove permission:', error);
            set({ error: error.message || 'Failed to remove permission' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    removeAllPermissionsFromRole: async (role_id) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest(`admin/role-permissions/role/${role_id}`, {
                method: 'DELETE',
            });
            await get().fetchRolePermissions();
        } catch (error: any) {
            console.error('Failed to remove all permissions from role:', error);
            set({ error: error.message || 'Failed to remove all permissions from role' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
}));
