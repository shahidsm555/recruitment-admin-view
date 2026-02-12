"use client";
import React from "react";
import UnifiedSidebar, { NavSection } from "./UnifiedSidebar";
import {
    GridIcon,
    CalenderIcon,
    UserIcon,
} from "../icons/index";
import { Users, FileText, BarChart, MessageSquare, Settings } from 'lucide-react';

const sections: NavSection[] = [
    {
        title: "Menu",
        items: [
            {
                icon: <GridIcon />,
                name: "Dashboard",
                path: "/super/dashboard",
            },
            {
                icon: <CalenderIcon />,
                name: "Recruitment Projects",
                path: "/super/projects",
                subItems: [
                    { name: "All Projects", path: "/super/projects" },
                    { name: "Draft / Active / Completed", path: "/super/projects?filter=status" },
                    { name: "Approval Queue", path: "/super/projects?filter=approval" },
                    { name: "Project Audits", path: "/super/projects?filter=audits" },
                ]
            },
            {
                icon: <Users />,
                name: "Candidates",
                path: "/super/candidates",
                subItems: [
                    { name: "All Candidates", path: "/super/candidates" },
                    { name: "Cross-project Search", path: "/super/candidates?view=search" },
                    { name: "Evaluation Summaries", path: "/super/candidates?view=evaluations" },
                    { name: "Hiring Decisions", path: "/super/candidates?view=hiring" },
                ]
            },
            {
                icon: <FileText />,
                name: "Advertisements",
                path: "/super/ads",
                subItems: [
                    { name: "Create Advertisement", path: "/super/ads/create" },
                    { name: "Publish / Unpublish", path: "/super/ads?action=manage" },
                    { name: "Ad History", path: "/super/ads?view=history" },
                    { name: "Channel Management", path: "/super/ads?view=channels" },
                ]
            },
            {
                icon: <UserIcon />,
                name: "Users & Permissions",
                path: "/super/users",
                subItems: [
                    { name: "Assign Access", path: "/super/users?action=assign" },
                    { name: "Role Assignment", path: "/super/users?action=roles" },
                    { name: "Org Access Control", path: "/super/users?action=org-access" },
                ]
            },
            {
                icon: <BarChart />,
                name: "Reports & Analytics",
                path: "/super/reports",
                subItems: [
                    { name: "Recruitment KPIs", path: "/super/reports?type=kpi" },
                    { name: "Time-to-hire", path: "/super/reports?type=time" },
                    { name: "Diversity & Compliance", path: "/super/reports?type=diversity" },
                    { name: "Export Data", path: "/super/reports?action=export" },
                ]
            },
            {
                icon: <MessageSquare />,
                name: "Communications",
                path: "/super/communications",
                subItems: [
                    { name: "Templates (Org-wide)", path: "/super/communications?view=templates" },
                    { name: "Announcements", path: "/super/communications?view=announcements" },
                    { name: "Bulk Messaging", path: "/super/communications?view=bulk" },
                ]
            },
            {
                icon: <Settings />,
                name: "Settings",
                path: "/super/settings",
                subItems: [
                    { name: "Organizational Settings", path: "/super/settings?tab=general" },
                    { name: "Approval Workflows", path: "/super/settings?tab=workflows" },
                    { name: "Notification Rules", path: "/super/settings?tab=notifications" },
                    { name: "Branding", path: "/super/settings?tab=branding" },
                ]
            },
        ],
    },
];

const SuperUserSidebar: React.FC = () => {
    return <UnifiedSidebar sections={sections} />;
};

export default SuperUserSidebar;
