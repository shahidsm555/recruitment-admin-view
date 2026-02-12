"use client";
import React from "react";
import UnifiedSidebar, { NavSection } from "./UnifiedSidebar";
import {
  BoxCubeIcon,
  CalenderIcon,
  GridIcon,
  ListIcon,
  PageIcon,
  PieChartIcon,
  PlugInIcon,
  TableIcon,
} from "../icons/index";
import { Users } from 'lucide-react';

const sections: NavSection[] = [
  {
    title: "Menu",
    items: [
      {
        icon: <GridIcon />,
        name: "Dashboard",
        path: "/",
      },
      {
        icon: <CalenderIcon />,
        name: "My Projects",
        path: "/my-projects",
      },
      {
        icon: <Users />,
        name: "Candidates",
        subItems: [
          { name: "New Applications", path: "/new-applications" },
          { name: "Under Review", path: "/under-review" },
          { name: "Interview Stage", path: "/interview-stage" },
          { name: "Final Candidates", path: "/final-candidates" },
        ],
      },
      {
        name: "Forms",
        icon: <ListIcon />,
        subItems: [{ name: "Form Elements", path: "/form-elements", pro: false }],
      },
      {
        name: "Tables",
        icon: <TableIcon />,
        subItems: [{ name: "Basic Tables", path: "/basic-tables", pro: false }],
      },
      {
        name: "Pages",
        icon: <PageIcon />,
        subItems: [
          { name: "Blank Page", path: "/blank", pro: false },
          { name: "404 Error", path: "/error-404", pro: false },
        ],
      },
    ],
  },
  {
    title: "Others",
    items: [
      {
        icon: <PieChartIcon />,
        name: "Charts",
        subItems: [
          { name: "Line Chart", path: "/line-chart", pro: false },
          { name: "Bar Chart", path: "/bar-chart", pro: false },
        ],
      },
      {
        icon: <BoxCubeIcon />,
        name: "UI Elements",
        subItems: [
          { name: "Alerts", path: "/alerts", pro: false },
          { name: "Avatar", path: "/avatars", pro: false },
          { name: "Badge", path: "/badge", pro: false },
          { name: "Buttons", path: "/buttons", pro: false },
          { name: "Images", path: "/images", pro: false },
          { name: "Videos", path: "/videos", pro: false },
        ],
      },
      {
        icon: <PlugInIcon />,
        name: "Authentication",
        subItems: [
          { name: "Sign In", path: "/signin", pro: false },
          { name: "Sign Up", path: "/signup", pro: false },
        ],
      },
    ],
  },
];

const AppSidebar: React.FC = () => {
  return <UnifiedSidebar sections={sections} />;
};

export default AppSidebar;
