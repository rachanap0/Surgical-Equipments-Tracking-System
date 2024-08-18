"use client";

import React from "react";
import { useEffect, useState } from "react";
import io from 'socket.io-client';

import {
    ColumnDef,
    flexRender,
    getCoreRowModel,
    useReactTable,
    getPaginationRowModel,
    getSortedRowModel,
    SortingState,
    ColumnFiltersState,
    getFilteredRowModel,

} from "@tanstack/react-table";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
    TableCaption,
} from "@/components/ui/table";

import {
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
    DialogClose,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"

import { Label } from "@/components/ui/label"



function DataTable({ columns, data }) {
    const [sorting, setSorting] = React.useState([]);
    const [filters, setFilters] = React.useState([]);
    const [columnVisibility, setColumnVisibility] = React.useState([]);
    const [selectedRowData, setSelectedRowData] = React.useState(null);
    const [rfidTag, setRfidTag] = React.useState('');
    const [dialogOpen, setDialogOpen] = React.useState(false);
    const [checkedItems, setCheckedItems] = React.useState({});
    const [isConnected, setIsConnected] = useState(false);
    const [socket, setSocket] = useState(null);
    


    const fetchOrders = async () => {
        const response = await fetch('/api/orders');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        return response.json();
    };
    // use effect for rfid tag
    // useEffect(() => {
    //     if (dialogOpen) {
    //         setRfidTag(selectedRowData?.rfidTag || '');
    //     }
    // }, [dialogOpen]);

    // useEffect(() => {
    //     const intervalId = setInterval(async () => {
    //         const response = await fetch('/api/orders');
    //         if (!response.ok) {
    //             throw new Error('Network response was not ok');
    //         }


    //     })
    // })


    const closeDialog = () => {
        setDialogOpen(false);
        setSelectedRowData(null);
    };

    const openDialog = (row) => {
        setSelectedRowData(row.original);
        setRfidTag(row.original.rfidTag || ''); 
        setDialogOpen(true);
    };

    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        onSortingChange: setSorting,
        getSortedRowModel: getSortedRowModel(),
        onFiltersChange: setFilters,
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            filters,
            columnVisibility,
        },

    });

    const DetailField = ({ label, value }) => (
        <div className="grid grid-cols-4 items-center gap-4">
            <Label className="text-right">{label}</Label>
            <span className="col-span-3">{value}</span>
        </div>
    );

    const ItemsList = ({ items }) => (
        <div className="space-y-1">
            {items.map((item, index) => (
                <div key={index} className="flex items-center justify-between p-2 rounded-lg">
                    <Label className="flex-1">{item}</Label>
                    <input
                        type="checkbox"
                        checked={checkedItems[index] || false}
                        onChange={() => handleCheckboxChange(index)}
                        className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                </div>
            ))}
        </div>
    );

    async function handleSubmit() {
        if (!selectedRowData || !rfidTag) {
            alert("No order selected or RFID tag is missing.");
            return;
        }

        console.log("Submit changes for order ID:", selectedRowData.id);
        console.log("RFID tag from submit:", rfidTag);

        try {
            // Update the RFID tag on the selected order
            const response = await fetch(`/api/orders/${selectedRowData.id}`, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ rfidTag: rfidTag.trim() }),
            });

            if (response.ok) {
                closeDialog();
                window.location.reload();

            } else {
                const errorData = await response.json();
                throw new Error(errorData.message || "Failed to update order.");
            }
        } catch (error) {
            alert(`Error: ${error.message}`);
            console.error("Failed to update RFID tag:", error);
        }
    }


    // const handleScanRfid = async () => {
    //     // ... existing code for checking connection and selected orde

    //     try {
    //         console.log("Ready to scan RFID for order ID:", selectedRowData.id);
    //         const response = await new Promise((resolve) => {
    //           socket.once('rfidScan', (data) => {
    //             // Adjust according to the actual data structure sent by your server
    //             if (data.orderId === selectedRowData.id) { 
    //               resolve(data.tagId);
    //             }
    //           });
    //         });
    //         console.log("RFID scan received:", response);
    //         setRfidTag("dkfjdk");
    //     } catch (error) {
    //         console.error("Failed to scan RFID:", error);
    //         // Optionally update UI or show a message to the user indicating the failure
    //     }
    // };


    const handleCheckboxChange = (index) => {
        setCheckedItems((prev) => ({
            ...prev,
            [index]: !prev[index]
        }));
    };


    useEffect(() => {
        const newSocket = io('http://localhost:3000');
        setSocket(newSocket);

        newSocket.on('rfidScan', (data) => {
            console.log("RFID scan receivedfdd:", data.tagId);
            const cleanedTagId = data.tagId.replace(/\s/g, '').slice(2);
            setRfidTag(cleanedTagId);
        });

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        if (dialogOpen && selectedRowData) {
            console.log("Dialog is open for:", selectedRowData.id);
            setRfidTag('');
        }
    }, [dialogOpen, selectedRowData]);

    return (
        <div>
            <div className="flex items-center py-4">
                <Input
                    placeholder="Filter orders..."
                    value={table.getColumn("id")?.getFilterValue() ?? ""}
                    onChange={(event) =>
                        table.getColumn("id")?.setFilterValue(event.target.value)
                    }
                    className="max-w-sm"
                />

                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="ml-auto">
                            Columns
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        {table
                            .getAllColumns()
                            .filter(
                                (column) => column.getCanHide()
                            )
                            .map((column) => {
                                return (
                                    <DropdownMenuCheckboxItem
                                        key={column.id}
                                        className="capitalize"
                                        checked={column.getIsVisible()}
                                        onCheckedChange={(value) =>
                                            column.toggleVisibility(!!value)
                                        }
                                    >
                                        {column.id}
                                    </DropdownMenuCheckboxItem>
                                )
                            })}
                    </DropdownMenuContent>
                </DropdownMenu>


            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                                <TableHead>Actions</TableHead>
                            </TableRow>
                        ))}
                    </TableHeader>
                    <TableBody>
                        {table.getRowModel().rows?.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                    <TableCell>
                                        <Dialog open={dialogOpen} onOpenChange={setDialogOpen}>
                                            <DialogTrigger asChild>
                                                <Button variant="outline" onClick={() => openDialog(row)}>View Details</Button>
                                            </DialogTrigger>
                                            <DialogContent>
                                                <DialogHeader>
                                                    <DialogTitle>Order Details</DialogTitle>
                                                </DialogHeader>
                                                <div className="space-y-4 py-4">
                                                    <DetailField label="Order ID" value={selectedRowData?.id} />
                                                    <DetailField label="Origin" value={selectedRowData?.origin} />
                                                    <DetailField label="Destination" value={selectedRowData?.destination} />
                                                    <DetailField label="Surgery Type" value={selectedRowData?.surgeryType} />
                                                    <DetailField label="Requestor Name" value={selectedRowData?.requestorName} />
                                                    <DetailField label="Additional Comments" value={selectedRowData?.additionalComments} />
                                                    <DetailField label="Items" value={<ItemsList items={selectedRowData?.items?.list || []} />} />



                                                    <DetailField label="Status" value={selectedRowData?.status} />
                                                    <div className="grid grid-cols-4 items-center gap-4">
                                                        <Label className="text-right">RFID Tag</Label>
                                                        <Input className="col-span-2" value={rfidTag} readOnly />
                                                        {/* <Button className="col-span-1" >Scan RFID</Button> */}
                                                    </div>
                                                    <DetailField label="Time Required" value={selectedRowData?.timeRequired} />

                                                </div>
                                                <DialogFooter>
                                                    <Button onClick={handleSubmit}>Save Changes</Button>
                                                    <Button onClick={closeDialog}>Close</Button>
                                                </DialogFooter>
                                            </DialogContent>
                                        </Dialog>



                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={columns.length + 1} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.previousPage()}
                    disabled={!table.getCanPreviousPage()}
                >
                    Previous
                </Button>
                <Button
                    variant="outline"
                    size="sm"
                    onClick={() => table.nextPage()}
                    disabled={!table.getCanNextPage()}
                >
                    Next
                </Button>
            </div>
        </div>
    );
}

export { DataTable };