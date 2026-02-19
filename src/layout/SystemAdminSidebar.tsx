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
                path: "/system/dashboard",
            },
            {
                icon: <Settings />,
                name: "System Management",
                path: "/system/system",
                subItems: [
                    { name: "Configuration", path: "/system/system?view=config" },
                    { name: "Feature Toggles", path: "/system/system?view=toggles" },
                    { name: "Environment Settings", path: "/system/system?view=env" },
                ]
            },
            {
                icon: <Users />,
                name: "User & Role Management",
                path: "/system/users",
                subItems: [
                    { name: "Manage Users", path: "/system/users?view=manage" },
                    { name: "Assign Roles", path: "/system/users?view=roles" },
                    { name: "Access Policies", path: "/system/users?view=policies" },
                    { name: "SSO / Auth", path: "/system/users?view=sso" },
                ]
            },
            {
                icon: <Shield />,
                name: "Security & Compliance",
                path: "/system/security",
                subItems: [
                    { name: "Audit Logs", path: "/system/security?view=audit" },
                    { name: "Access History", path: "/system/security?view=access" },
                    { name: "Data Retention", path: "/system/security?view=retention" },
                    { name: "GDPR Controls", path: "/system/security?view=gdpr" },
                ]
            },
            {
                icon: <Combine />,
                name: "Integrations",
                path: "/system/integrations",
                subItems: [
                    { name: "Email", path: "/system/integrations?type=email" },
                    { name: "SMS", path: "/system/integrations?type=sms" },
                    { name: "Job Boards", path: "/system/integrations?type=boards" },
                    { name: "Identity Prov.", path: "/system/integrations?type=idp" },
                ]
            },
            {
                icon: <Database />,
                name: "Data Management",
                path: "/system/data",
                subItems: [
                    { name: "Backup & Restore", path: "/system/data?view=backup" },
                    { name: "Data Export", path: "/system/data?view=export" },
                    { name: "Archiving", path: "/system/data?view=archive" },
                    { name: "Purge Policies", path: "/system/data?view=purge" },
                ]
            },
            {
                icon: <LifeBuoy />,
                name: "Support & Monitoring",
                path: "/system/support",
                subItems: [
                    { name: "Error Logs", path: "/system/support?view=logs" },
                    { name: "Usage Monitoring", path: "/system/support?view=usage" },
                    { name: "Performance", path: "/system/support?view=performance" },
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
