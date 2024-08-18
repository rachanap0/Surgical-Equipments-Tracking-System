"use client"

import { ColumnDef } from "@tanstack/react-table";
import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import clsx from 'clsx'; // Utility for constructing className strings conditionally

const columns = [
    {
        accessorKey: "id",
        header: "Order ID",
    },
    {
        accessorKey: "origin",
        header: "Origin",
    },
    {
        accessorKey: "destination",
        header: "Destination",
    },
    {
        accessorKey: "status",
        header: ({ column }) => (
            <Button
                variant="ghost"
                onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
            >
                Status
                <ArrowUpDown className="ml-2 h-4 w-4" />
            </Button>
        ),
        cell: ({ cell }) => (
            <span
                className={clsx(
                    'px-2 inline-flex text-xs leading-6 font-semibold rounded-full',
                    {
                        'bg-yellow-100 text-yellow-800': cell.getValue() === 'pending',
                        'bg-blue-100 text-blue-800': cell.getValue() === 'in transit',
                        'bg-red-100 text-red-800': cell.getValue() === 'under use',
                        'bg-green-100 text-green-800': cell.getValue() === 'completed',
                    }
                )}
            >
                {cell.getValue()}
            </span>
        ),
        enableSorting: true,
        enableFiltering: true,
    },
    {
        accessorKey: "timeRequired",
        header: "Time Required",
    },
    // rfid column
    {
        accessorKey: "rfidTag",
        header: "RFID Tag",
    },
];

module.exports = {
    columns,
};
