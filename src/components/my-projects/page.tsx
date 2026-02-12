'use client';

import React, { useMemo, useState } from "react";
import Image from "next/image";

import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../ui/table";

import { Button } from "@/components/ui/button";
import Badge from "../ui/badge/Badge";
import ComponentCard from "../common/ComponentCard";
import { Tabs, TabsList, TabsTrigger } from "../ui/tabs";
import { Avatar, AvatarBadge, AvatarFallback, AvatarImage } from "../ui/avatar";

// ================= Types =================
interface Project {
  id: number;
  user: {
    image: string;
    name: string;
    role: string;
  };
  projectName: string;
  team: {
    images: string[];
  };
  status: "Active" | "Draft" | "Pending" | "Completed";
  budget: string;
}

// ================= Dummy Data =================
const projects: Project[] = [
  {
    id: 1,
    user: {
      image: "/images/user/user-17.jpg",
      name: "Lindsey Curtis",
      role: "Web Designer",
    },
    projectName: "Agency Website",
    team: {
      images: [
        "/images/user/user-22.jpg",
        "/images/user/user-23.jpg",
      ],
    },
    budget: "3.9K",
    status: "Active",
  },
  {
    id: 2,
    user: {
      image: "/images/user/user-18.jpg",
      name: "Kaiya George",
      role: "Project Manager",
    },
    projectName: "Internal Dashboard",
    team: {
      images: ["/images/user/user-25.jpg"],
    },
    budget: "—",
    status: "Draft",
  },
  {
    id: 3,
    user: {
      image: "/images/user/user-19.jpg",
      name: "Zain Geidt",
      role: "Content Writer",
    },
    projectName: "Marketing Blog",
    team: {
      images: ["/images/user/user-27.jpg"],
    },
    budget: "12.7K",
    status: "Pending",
  },
  {
    id: 4,
    user: {
      image: "/images/user/user-20.jpg",
      name: "Abram Schleifer",
      role: "Digital Marketer",
    },
    projectName: "Social Media Campaign",
    team: {
      images: [
        "/images/user/user-28.jpg",
        "/images/user/user-29.jpg",
        "/images/user/user-30.jpg",
      ],
    },
    budget: "8.2K",
    status: "Completed",
  },
];

const FILTERS = ["All", "Active", "Draft", "Pending", "Completed"] as const;
type FilterType = (typeof FILTERS)[number];

// ================= Component =================
export default function MyProjectsTable() {
  const [filter, setFilter] = useState<FilterType>("All");

  const filteredProjects = useMemo(() => {
    if (filter === "All") return projects;
    return projects.filter((p) => p.status === filter);
  }, [filter]);

  return (
    <ComponentCard title="My Projects" desc="Manage active, draft, pending, and completed projects" button={
      <Button className="w-full sm:w-fit  mt-3 sm:mt-0" variant="default" size="sm">New Project</Button>
    }>

      {/* Filters */}
      <Tabs
        value={filter}
        onValueChange={(value) => setFilter(value as FilterType)}
        className="w-full bg  -transparent md:w-auto"
      >
        <TabsList className="flex flex-wrap gap-2 dark:bg-gray-900">
          {FILTERS.map((item) => (
            <TabsTrigger asChild key={item} value={item} className="dark:bg-gray-800! border-0 px-4 rounded-sm">
              <Button
                variant={filter === item ? "default" : "outline"}
                size="sm"
              >
                {item}
              </Button>
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      {/* Table */}
      <div className="overflow-hidden rounded-md border border-gray-200 bg-white dark:border-white/5 dark:bg-white/3">
        <div className="max-w-full overflow-x-auto">
          <div className="min-w-250">
            <Table>
              <TableHeader className="border-b border-gray-100 dark:border-white/5">
                <TableRow>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    User
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Project
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Status
                  </TableCell>
                  <TableCell isHeader className="px-5 py-3 text-start text-theme-xs font-medium text-gray-500 dark:text-gray-400">
                    Budget
                  </TableCell>
                </TableRow>
              </TableHeader>

              <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                {filteredProjects.map((project) => (
                  <TableRow key={project.id}>
                    <TableCell className="px-5 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar>
                          <AvatarImage src={"images/logo/logo-icon.svg"} alt="Profile Images " />
                          <AvatarFallback>{project.user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                          <p className="font-medium text-gray-800 dark:text-white/90">
                            {project.user.name}
                          </p>
                          <p className="text-xs text-gray-500 dark:text-gray-400">
                            {project.user.role}
                          </p>
                        </div>
                      </div>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {project.projectName}
                    </TableCell>

                    <TableCell className="px-4 py-3">
                      <Badge
                        size="sm"
                        color={
                          project.status === "Active"
                            ? "success"
                            : project.status === "Pending"
                              ? "warning"
                              : project.status === "Draft"
                                ? "info"
                                : "primary"
                        }
                      >
                        {project.status}
                      </Badge>
                    </TableCell>

                    <TableCell className="px-4 py-3 text-gray-600 dark:text-gray-400">
                      {project.budget}
                    </TableCell>
                  </TableRow>
                ))}

                {filteredProjects.length === 0 && (
                  <TableRow>
                    <TableCell className="px-5 py-8 text-center text-gray-500">
                      No projects found for this filter
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>
    </ComponentCard>
  );
}
