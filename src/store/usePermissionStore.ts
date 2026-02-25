import { create } from 'zustand';
import { apiRequest } from '@/lib/api';

export interface Permission {
    permission_id: string;
    module_id: string;
    module_key: string;
    module_name: string;
    permission_key_id: string;
    permission_key: string;
    display_name: string;
    is_active: boolean;
    created_at: string;
}

export interface CreatePermissionData {
    module_id: string;
    permission_key_id: string;
    display_name: string;
    is_active: boolean;
}

export interface UpdatePermissionData {
    module_id: string;
    permission_key_id: string;
    display_name: string;
    is_active: boolean;
}

interface PermissionState {
    permissions: Permission[];
    isLoading: boolean;
    error: string | null;
    fetchPermissions: () => Promise<void>;
    createPermission: (data: CreatePermissionData) => Promise<void>;
    updatePermission: (id: string, data: UpdatePermissionData) => Promise<void>;
    deletePermission: (id: string) => Promise<void>;
}

export const usePermissionStore = create<PermissionState>((set, get) => ({
    permissions: [],
    isLoading: false,
    error: null,

    fetchPermissions: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await apiRequest('admin/permissions');
            set({ permissions: data });
        } catch (error: any) {
            console.error('Failed to fetch permissions:', error);
            set({ error: error.message || 'Failed to fetch permissions' });
        } finally {
            set({ isLoading: false });
        }
    },

    createPermission: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest('admin/permissions', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            await get().fetchPermissions(); // Refresh list
        } catch (error: any) {
            console.error('Failed to create permission:', error);
            set({ error: error.message || 'Failed to create permission' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updatePermission: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest(`admin/permissions/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            await get().fetchPermissions(); // Refresh list
        } catch (error: any) {
            console.error('Failed to update permission:', error);
            set({ error: error.message || 'Failed to update permission' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deletePermission: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest(`admin/permissions/${id}`, {
                method: 'DELETE',
            });
            await get().fetchPermissions(); // Refresh list
        } catch (error: any) {
            console.error('Failed to delete permission:', error);
            set({ error: error.message || 'Failed to delete permission' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
}));
