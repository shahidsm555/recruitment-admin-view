import { create } from 'zustand';
import { apiRequest } from '@/lib/api';

export interface PermissionKey {
    permission_key_id: string;
    key_name: string;
    description: string;
    created_at: string;
}

export interface CreatePermissionKeyData {
    key_name: string;
    description: string;
}

export interface UpdatePermissionKeyData {
    key_name: string;
    description: string;
}

interface PermissionKeyState {
    permissionKeys: PermissionKey[];
    isLoading: boolean;
    error: string | null;
    fetchPermissionKeys: () => Promise<void>;
    createPermissionKey: (data: CreatePermissionKeyData) => Promise<void>;
    updatePermissionKey: (id: string, data: UpdatePermissionKeyData) => Promise<void>;
    deletePermissionKey: (id: string) => Promise<void>;
}

export const usePermissionKeyStore = create<PermissionKeyState>((set, get) => ({
    permissionKeys: [],
    isLoading: false,
    error: null,

    fetchPermissionKeys: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await apiRequest('admin/permission-keys');
            set({ permissionKeys: data });
        } catch (error: any) {
            console.error('Failed to fetch permission keys:', error);
            set({ error: error.message || 'Failed to fetch permission keys' });
        } finally {
            set({ isLoading: false });
        }
    },

    createPermissionKey: async (data: CreatePermissionKeyData) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest('admin/permission-keys', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            await get().fetchPermissionKeys();
        } catch (error: any) {
            console.error('Failed to create permission key:', error);
            set({ error: error.message || 'Failed to create permission key' });
            throw error; // Re-throw to handle in UI if needed
        } finally {
            set({ isLoading: false });
        }
    },

    updatePermissionKey: async (id: string, data: UpdatePermissionKeyData) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest(`admin/permission-keys/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            await get().fetchPermissionKeys();
        } catch (error: any) {
            console.error('Failed to update permission key:', error);
            set({ error: error.message || 'Failed to update permission key' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deletePermissionKey: async (id: string) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest(`admin/permission-keys/${id}`, {
                method: 'DELETE',
            });
            await get().fetchPermissionKeys();
        } catch (error: any) {
            console.error('Failed to delete permission key:', error);
            set({ error: error.message || 'Failed to delete permission key' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }
}));
