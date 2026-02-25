import { create } from 'zustand';
import { apiRequest } from '@/lib/api';

export interface Role {
    role_id: string;
    role_name: string;
    description: string;
    is_deleted: boolean;
    created_at: string;
    updated_at: string;
}

export interface CreateRoleData {
    role_name: string;
    description: string;
}

export interface UpdateRoleData {
    role_name: string;
    description: string;
}

interface RoleState {
    roles: Role[];
    isLoading: boolean;
    error: string | null;
    fetchRoles: () => Promise<void>;
    createRole: (data: CreateRoleData) => Promise<void>;
    updateRole: (id: string, data: UpdateRoleData) => Promise<void>;
    deleteRole: (id: string) => Promise<void>;
}

export const useRoleStore = create<RoleState>((set, get) => ({
    roles: [],
    isLoading: false,
    error: null,

    fetchRoles: async () => {
        set({ isLoading: true, error: null });
        try {
            const data = await apiRequest('roles');
            set({ roles: data.roles || data }); // Handling based on the provided JSON schema "roles": []
        } catch (error: any) {
            console.error('Failed to fetch roles:', error);
            set({ error: error.message || 'Failed to fetch roles' });
        } finally {
            set({ isLoading: false });
        }
    },

    createRole: async (data) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest('roles', {
                method: 'POST',
                body: JSON.stringify(data),
            });
            await get().fetchRoles();
        } catch (error: any) {
            console.error('Failed to create role:', error);
            set({ error: error.message || 'Failed to create role' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateRole: async (id, data) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest(`roles/${id}`, {
                method: 'PUT',
                body: JSON.stringify(data),
            });
            await get().fetchRoles();
        } catch (error: any) {
            console.error('Failed to update role:', error);
            set({ error: error.message || 'Failed to update role' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    deleteRole: async (id) => {
        set({ isLoading: true, error: null });
        try {
            await apiRequest(`roles/${id}`, {
                method: 'DELETE',
            });
            await get().fetchRoles();
        } catch (error: any) {
            console.error('Failed to delete role:', error);
            set({ error: error.message || 'Failed to delete role' });
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
}));
