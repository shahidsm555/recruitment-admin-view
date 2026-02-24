
import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { apiRequest } from '@/lib/api';

interface UserRole {
  role_id: string;
  name: string;
}

interface User {
  user_id: string;
  email: string;
  full_name: string;
  role: UserRole;
  org_unit_id: string | null;
  mfa_enabled: boolean;
}

interface AccessControl {
  modules: any[];
  permissions: any[];
}

interface SuperUserDashboardData {
  activeVacancies: number;
  candidatePipeline: number;
  approvalRequests: number;
  complianceAlerts: number;
}

interface SystemAdminDashboardData {
  systemHealth: string;
  activeUsers: number;
  securityAlerts: number;
  errorReports: number;
}

interface AuthState {
  user: User | null;
  accessControl: AccessControl | null;
  isAuthenticated: boolean;
  userRole: string; // 'system_administrator', etc.
  accessToken: string | null;
  superUserStats: SuperUserDashboardData;
  systemAdminStats: SystemAdminDashboardData;
  authLoading: boolean;
  authError: string | null;
}

interface StoreState extends AuthState {
  setAuth: (data: { user: User; access_control: AccessControl; access_token: string }) => void;
  clearAuth: () => void;
  setUser: (user: User) => void;
  setAuthLoading: (loading: boolean) => void;
  setAuthError: (error: string | null) => void;
  login: (credentials: any) => Promise<void>;
  fetchCurrentUser: () => Promise<void>;
}

export const useStore = create<StoreState>()(
  persist(
    (set, get) => ({
      user: null,
      accessControl: null,
      isAuthenticated: false,
      userRole: 'GUEST',
      accessToken: null,
      superUserStats: {
        activeVacancies: 12,
        candidatePipeline: 45,
        approvalRequests: 5,
        complianceAlerts: 2,
      },
      systemAdminStats: {
        systemHealth: 'Good',
        activeUsers: 120,
        securityAlerts: 0,
        errorReports: 1,
      },
      authLoading: false,
      authError: null,

      setAuth: (data) => {
        if (!data || !data.user) {
          console.error('Invalid auth data structure:', data);
          return;
        }
        localStorage.setItem('access_token', data.access_token);
        set({
          user: data.user,
          accessControl: data.access_control || null,
          isAuthenticated: true,
          userRole: data.user.role?.name || 'USER',
          accessToken: data.access_token || null,
        });
      },

      clearAuth: () => {
        localStorage.removeItem('access_token');
        set({
          user: null,
          accessControl: null,
          isAuthenticated: false,
          userRole: 'GUEST',
          accessToken: null,
        });
      },

      setUser: (user) => set({ user, userRole: user.role.name, isAuthenticated: true }),

      setAuthLoading: (loading) => set({ authLoading: loading }),
      setAuthError: (error) => set({ authError: error }),

      login: async (credentials) => {
        set({ authLoading: true, authError: null });
        try {
          const data = await apiRequest('auth/login', {
            method: 'POST',
            body: JSON.stringify(credentials),
          });
          console.log('Login response received:', data);

          // If login response is empty, fetch current user data immediately
          if (!data || !data.user) {
            console.log('Login response empty, fetching user info...');
            await get().fetchCurrentUser();
          } else {
            get().setAuth(data);
          }
        } catch (error: any) {
          console.error('Login failed with error:', error);
          set({ authError: error.message || 'Invalid email or password' });
          throw error;
        } finally {
          set({ authLoading: false });
        }
      },

      fetchCurrentUser: async () => {
        set({ authLoading: true, authError: null });
        try {
          const res = await apiRequest('auth/me');
          const data = res?.user
          // Try to get role name from data.role object if it exists
          let roleName = data.role?.name;

          // Fallback to legacy check if name is not present
          if (!roleName) {
            roleName = data.role_id === 'e75c3738-c90a-4606-8782-278aff1ce091' ? 'system_administrator' : 'USER';
          }

          set((state) => ({
            user: {
              ...state.user,
              ...data,
              role: data.role || { ...state.user?.role, name: roleName }
            } as User,
            isAuthenticated: true,
            userRole: roleName,
          }));
        } catch (error: any) {
          console.error('Fetch current user failed:', error);
          set({ authError: error.message || 'Failed to fetch user data' });
          get().clearAuth();
        } finally {
          set({ authLoading: false });
        }
      },
    }),
    {
      name: 'recruitment-admin-storage',
      partialize: (state) => ({
        user: state.user,
        accessControl: state.accessControl,
        isAuthenticated: state.isAuthenticated,
        userRole: state.userRole,
        accessToken: state.accessToken,
      }),
    }
  )
);
