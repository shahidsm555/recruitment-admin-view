"use client";
import React, { useState } from "react";
import { Permission } from "@/store/usePermissionStore";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown } from "lucide-react";
import { permissionColumns } from "./columns";

interface PermissionsTableProps {
    permissions: Permission[];
}

type SortConfig = {
    key: keyof Permission | null;
    direction: "asc" | "desc";
};

export default function PermissionsTable({ permissions }: PermissionsTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [sortConfig, setSortConfig] = useState<SortConfig>({
        key: "created_at",
        direction: "desc",
    });

    // Handle Search
    const filteredPermissions = permissions.filter((permission) =>
        permission.display_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.permission_key.toLowerCase().includes(searchTerm.toLowerCase()) ||
        permission.module_name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    // Handle Sort
    const sortedPermissions = [...filteredPermissions].sort((a, b) => {
        if (!sortConfig.key) return 0;

        const aValue = a[sortConfig.key];
        const bValue = b[sortConfig.key];

        if (aValue < bValue) {
            return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (aValue > bValue) {
            return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
    });

    // Handle Pagination
    const totalPages = Math.ceil(sortedPermissions.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedPermissions.slice(indexOfFirstItem, indexOfLastItem);

    const requestSort = (key: keyof Permission) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) {
            setCurrentPage((prev) => prev - 1);
        }
    };

    return (
        <div className="space-y-4">
            {/* Header: Search and Action Button */}
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="relative w-full max-w-sm">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400">
                        <Search className="h-4 w-4" />
                    </span>
                    <Input
                        placeholder="Search permissions..."
                        value={searchTerm}
                        onChange={(e) => {
                            setSearchTerm(e.target.value);
                            setCurrentPage(1); // Reset to first page on search
                        }}
                        className="pl-10"
                    />
                </div>
                <Button onClick={() => console.log("Create Permission clicked")}>
                    Create Permission
                </Button>
            </div>

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:border-white/5">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-full">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/5">
                                <TableRow>
                                    {permissionColumns.map((column) => (
                                        <TableCell
                                            key={column.key}
                                            isHeader
                                            className={`px-5 py-3 font-medium text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 ${column.sortable ? "cursor-pointer" : ""
                                                } ${column.className || ""}`}

                                        >
                                            {column.sortable ? (
                                                <div
                                                    className={`flex items-center gap-1 ${column.className?.includes("text-right")
                                                            ? "justify-end"
                                                            : ""
                                                        }`}
                                                    onClick={() => requestSort(column.key)}
                                                >
                                                    {column.header}
                                                    <ArrowUpDown className="h-3 w-3" />
                                                </div>
                                            ) : (
                                                column.header
                                            )}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            </TableHeader>
                            <TableBody className="divide-y divide-gray-100 dark:divide-white/5">
                                {currentItems.length > 0 ? (
                                    currentItems.map((permission) => (
                                        <TableRow key={permission.permission_id} className="hover:bg-gray-50 dark:hover:bg-white/3">
                                            {permissionColumns.map((column) => (
                                                <TableCell
                                                    key={`${permission.permission_id}-${column.key}`}
                                                    className={`px-5 py-4 text-sm text-gray-800 dark:text-white/90 ${column.className || ""
                                                        }`}
                                                >
                                                    {column.render
                                                        ? column.render(permission)
                                                        : permission[column.key]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400">
                                            No permissions found.
                                        </TableCell>
                                        {/* Add empty cells to maintain table structure if needed, or stick to one cell spanning all */}
                                    </TableRow>
                                )}
                            </TableBody>
                        </Table>
                    </div>
                </div>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="flex items-center justify-between border-t border-gray-100 pt-4 dark:border-white/5">
                    <div className="text-sm text-gray-500 dark:text-gray-400">
                        Showing <span className="font-medium">{indexOfFirstItem + 1}</span> to{" "}
                        <span className="font-medium">
                            {Math.min(indexOfLastItem, filteredPermissions.length)}
                        </span>{" "}
                        of <span className="font-medium">{filteredPermissions.length}</span> results
                    </div>
                    <div className="flex items-center gap-2">
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={goToPreviousPage}
                            disabled={currentPage === 1}
                            className="px-3"
                        >
                            <ChevronLeft className="h-4 w-4" />
                        </Button>
                        <span className="px-2 text-sm text-gray-600 dark:text-gray-300">
                            Page {currentPage} of {totalPages}
                        </span>
                        <Button
                            size="sm"
                            variant="outline"
                            onClick={goToNextPage}
                            disabled={currentPage === totalPages}
                            className="px-3"
                        >
                            <ChevronRight className="h-4 w-4" />
                        </Button>
                    </div>
                </div>
            )}
        </div>
    );
}
