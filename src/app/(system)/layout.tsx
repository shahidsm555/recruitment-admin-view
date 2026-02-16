"use client";
import React from "react";
import AppHeader from "../../layout/AppHeader";
import Backdrop from "../../layout/Backdrop";
import SystemAdminSidebar from "@/layout/SystemAdminSidebar";
import { useSidebar } from "@/context/SidebarContext";
import AuthGuard from "@/components/auth/AuthGuard";
export default function SystemAdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isExpanded, isHovered, isMobileOpen } = useSidebar();

  // Dynamic class for main content margin based on sidebar state
  const mainContentMargin = isMobileOpen
    ? "ml-0"
    : isExpanded || isHovered
      ? "lg:ml-[290px]"
      : "lg:ml-[90px]";

  return (
    <AuthGuard>
      <div className="min-h-screen xl:flex">
        {/* Sidebar and Backdrop */}
        <SystemAdminSidebar />
        <Backdrop />
        {/* Main Content Area */}
        <div
          className={`flex-1 transition-all  duration-300 ease-in-out ${mainContentMargin}`}
        >
          {/* Header */}
          <AppHeader />
          {/* Page Content */}
          <div className="p-4 mx-auto max-w-(--breakpoint-2xl) md:p-6">{children}</div>
        </div>
      </div>
    </AuthGuard>
  );
}
