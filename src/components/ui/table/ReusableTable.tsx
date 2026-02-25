"use client";
import React, { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import Input from "@/components/form/input/InputField";
import Button from "@/components/ui/button/Button";
import { Search, ChevronLeft, ChevronRight, ArrowUpDown, Plus } from "lucide-react";

export interface TableColumn<T> {
    key: keyof T | string;
    header: string;
    className?: string;
    sortable?: boolean;
    render?: (item: T) => React.ReactNode;
}

export interface ReusableTableProps<T> {
    data: T[];
    columns: TableColumn<T>[];
    rowKey: (item: T) => string | number;
    searchable?: boolean;
    searchPlaceholder?: string;
    searchFilterFn?: (item: T, searchTerm: string) => boolean;
    createBtnText?: string;
    onCreateClick?: () => void;
    itemsPerPage?: number;
    defaultSortKey?: keyof T | string;
    defaultSortDirection?: "asc" | "desc";
    emptyMessage?: string;
}

export default function ReusableTable<T>({
    data,
    columns,
    rowKey,
    searchable = true,
    searchPlaceholder = "Search...",
    searchFilterFn,
    createBtnText,
    onCreateClick,
    itemsPerPage = 10,
    defaultSortKey,
    defaultSortDirection = "desc",
    emptyMessage = "No items found.",
}: ReusableTableProps<T>) {
    const [searchTerm, setSearchTerm] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [sortConfig, setSortConfig] = useState<{
        key: keyof T | string | null;
        direction: "asc" | "desc";
    }>({
        key: defaultSortKey || null,
        direction: defaultSortDirection,
    });

    // Handle Search
    const filteredData = searchable && searchFilterFn && searchTerm.trim() !== ""
        ? data.filter((item) => searchFilterFn(item, searchTerm))
        : data;

    // Handle Sort
    const sortedData = [...filteredData].sort((a: any, b: any) => {
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
    const totalPages = Math.ceil(sortedData.length / itemsPerPage);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = sortedData.slice(indexOfFirstItem, indexOfLastItem);

    const requestSort = (key: keyof T | string) => {
        let direction: "asc" | "desc" = "asc";
        if (sortConfig.key === key && sortConfig.direction === "asc") {
            direction = "desc";
        }
        setSortConfig({ key, direction });
    };

    const goToNextPage = () => {
        if (currentPage < totalPages) setCurrentPage((prev) => prev + 1);
    };

    const goToPreviousPage = () => {
        if (currentPage > 1) setCurrentPage((prev) => prev - 1);
    };

    const hasHeaderTools = (searchable && searchFilterFn) || createBtnText;

    return (
        <div className="space-y-4">
            {/* Header: Search and Action Button */}
            {hasHeaderTools && (
                <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    {createBtnText && onCreateClick && (
                        <Button onClick={onCreateClick} startIcon={<Plus className="h-4 w-4" />} size="sm" className="order-2 sm:order-1">
                            {createBtnText}
                        </Button>
                    )}
                    {searchable && searchFilterFn && (
                        <div className="relative w-full max-w-sm order-1 sm:order-2">
                            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-700 dark:text-gray-200">
                                <Search className="h-4 w-4 text-gray-700 dark:text-gray-200" />
                            </span>
                            <Input
                                placeholder={searchPlaceholder}
                                value={searchTerm}
                                onChange={(e) => {
                                    setSearchTerm(e.target.value);
                                    setCurrentPage(1); // Reset to first page on search
                                }}
                                className="pl-10"
                            />
                        </div>
                    )}
                </div>
            )}

            {/* Table */}
            <div className="overflow-hidden rounded-xl border border-gray-200 bg-white dark:bg-gray-800 dark:border-white/5">
                <div className="max-w-full overflow-x-auto">
                    <div className="min-w-full">
                        <Table>
                            <TableHeader className="border-b border-gray-100 dark:border-white/5">
                                <TableRow>
                                    {columns.map((column) => (
                                        <TableCell
                                            key={String(column.key)}
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
                                    currentItems.map((item) => (
                                        <TableRow key={rowKey(item)} className="hover:bg-gray-50 dark:hover:bg-white/3">
                                            {columns.map((column) => (
                                                <TableCell
                                                    key={`${rowKey(item)}-${String(column.key)}`}
                                                    className={`px-5 py-4 text-sm text-gray-800 dark:text-white/90 ${column.className || ""}`}
                                                >
                                                    {column.render
                                                        ? column.render(item)
                                                        : (item as any)[column.key]}
                                                </TableCell>
                                            ))}
                                        </TableRow>
                                    ))
                                ) : (
                                    <TableRow>
                                        <TableCell className="px-5 py-8 text-center text-gray-500 dark:text-gray-400" colSpan={columns.length}>
                                            {emptyMessage}
                                        </TableCell>
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
                            {Math.min(indexOfLastItem, filteredData.length)}
                        </span>{" "}
                        of <span className="font-medium">{filteredData.length}</span> results
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
