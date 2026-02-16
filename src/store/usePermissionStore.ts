import { create } from 'zustand';
import { apiRequest } from '@/lib/api';

export interface Permission {
    permission_id: string;
    module_key: string;
    module_name: string;
    permission_key: string;
    display_name: string;
    is_active: boolean;
    created_at: string;
}

interface PermissionState {
    permissions: Permission[];
    isLoading: boolean;
    error: string | null;
    fetchPermissions: () => Promise<void>;
}

export const usePermissionStore = create<PermissionState>((set) => ({
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
}));
