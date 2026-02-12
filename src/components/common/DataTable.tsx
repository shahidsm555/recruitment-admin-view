
import React from 'react';
import {
    Table,
    TableBody,
    TableCell,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

export interface Column<T> {
    header: string;
    accessorKey?: keyof T;
    cell?: (row: T) => React.ReactNode;
    className?: string;
}

interface DataTableProps<T> {
    data: T[];
    columns: Column<T>[];
    keyExtractor: (row: T) => string | number;
    emptyMessage?: string;
    onRowClick?: (row: T) => void;
}

export function DataTable<T>({
    data,
    columns,
    keyExtractor,
    emptyMessage = "No data available",
    onRowClick
}: DataTableProps<T>) {
    return (
        <div className="bg-white dark:bg-gray-800 overflow-hidden">
            <Table>
                <TableHeader className="bg-gray-50 dark:bg-gray-900/50 border-b border-gray-200 dark:border-gray-700">
                    <TableRow>
                        {columns.map((col, index) => (
                            <TableCell
                                key={index}
                                isHeader
                                className={`px-6 py-3 text-left text-xs font-semibold text-gray-200 uppercase tracking-wider ${col.className || ''}`}
                            >
                                {col.header}
                            </TableCell>
                        ))}
                    </TableRow>
                </TableHeader>
                <TableBody className="divide-y divide-gray-200 dark:divide-gray-700">
                    {data.length === 0 ? (
                        <TableRow>
                            <TableCell isHeader={false} className="px-6 py-8 text-center text-gray-500 text-sm" >
                                {emptyMessage || "No results."}
                            </TableCell>
                        </TableRow>
                    ) : (
                        data.map((row) => (
                            <TableRow
                                key={keyExtractor(row)}
                                className={`hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors ${onRowClick ? 'cursor-pointer' : ''}`}
                                // @ts-ignore
                                onClick={() => onRowClick && onRowClick(row)}
                            >
                                {columns.map((col, idx) => (
                                    <TableCell key={idx} isHeader={false} className={`px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-300 ${col.className || ''}`}>
                                        {col.cell
                                            ? col.cell(row)
                                            : (col.accessorKey ? String(row[col.accessorKey]) : null)
                                        }
                                    </TableCell>
                                ))}
                            </TableRow>
                        ))
                    )}
                </TableBody>
            </Table>
        </div>
    );
}
