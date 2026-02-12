"use client";
import React from "react";
import UnifiedSidebar, { NavSection } from "./UnifiedSidebar";
import {
    GridIcon,
} from "../icons/index";
import { Settings, Users, Shield, Combine, Database, LifeBuoy } from 'lucide-react';

const sections: NavSection[] = [
    {
        title: "Menu",
        items: [
            {
                icon: <GridIcon />,
                name: "Dashboard",
                path: "/admin/dashboard",
            },
            {
                icon: <Settings />,
                name: "System Management",
                path: "/admin/system",
                subItems: [
                    { name: "Configuration", path: "/admin/system?view=config" },
                    { name: "Feature Toggles", path: "/admin/system?view=toggles" },
                    { name: "Environment Settings", path: "/admin/system?view=env" },
                ]
            },
            {
                icon: <Users />,
                name: "User & Role Management",
                path: "/admin/users",
                subItems: [
                    { name: "Manage Users", path: "/admin/users?view=manage" },
                    { name: "Assign Roles", path: "/admin/users?view=roles" },
                    { name: "Access Policies", path: "/admin/users?view=policies" },
                    { name: "SSO / Auth", path: "/admin/users?view=sso" },
                ]
            },
            {
                icon: <Shield />,
                name: "Security & Compliance",
                path: "/admin/security",
                subItems: [
                    { name: "Audit Logs", path: "/admin/security?view=audit" },
                    { name: "Access History", path: "/admin/security?view=access" },
                    { name: "Data Retention", path: "/admin/security?view=retention" },
                    { name: "GDPR Controls", path: "/admin/security?view=gdpr" },
                ]
            },
            {
                icon: <Combine />,
                name: "Integrations",
                path: "/admin/integrations",
                subItems: [
                    { name: "Email", path: "/admin/integrations?type=email" },
                    { name: "SMS", path: "/admin/integrations?type=sms" },
                    { name: "Job Boards", path: "/admin/integrations?type=boards" },
                    { name: "Identity Prov.", path: "/admin/integrations?type=idp" },
                ]
            },
            {
                icon: <Database />,
                name: "Data Management",
                path: "/admin/data",
                subItems: [
                    { name: "Backup & Restore", path: "/admin/data?view=backup" },
                    { name: "Data Export", path: "/admin/data?view=export" },
                    { name: "Archiving", path: "/admin/data?view=archive" },
                    { name: "Purge Policies", path: "/admin/data?view=purge" },
                ]
            },
            {
                icon: <LifeBuoy />,
                name: "Support & Monitoring",
                path: "/admin/support",
                subItems: [
                    { name: "Error Logs", path: "/admin/support?view=logs" },
                    { name: "Usage Monitoring", path: "/admin/support?view=usage" },
                    { name: "Performance", path: "/admin/support?view=performance" },
                ]
            },
        ],
    },
];

const SystemAdminSidebar: React.FC = () => {
    return (
            <UnifiedSidebar sections={sections} />
    );
};

export default SystemAdminSidebar;
