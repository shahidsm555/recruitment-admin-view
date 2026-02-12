
import { create } from 'zustand';
import { persist } from 'zustand/middleware';

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

export type UserRole = 'SUPER_USER' | 'SYSTEM_ADMIN' | 'GUEST';

interface StoreState {
  superUserStats: SuperUserDashboardData;
  systemAdminStats: SystemAdminDashboardData;
  userRole: UserRole;
  setUserRole: (role: UserRole) => void;
}

export const useStore = create<StoreState>()(
  persist(
    (set) => ({
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
      userRole: 'GUEST', // Default role
      setUserRole: (role) => set({ userRole: role }),
    }),
    {
      name: 'recruitment-admin-storage', // unique name
      partialize: (state) => ({ userRole: state.userRole }), // Only persist role
    }
  )
);
