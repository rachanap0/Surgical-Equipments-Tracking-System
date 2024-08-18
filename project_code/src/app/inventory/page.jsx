"use client";
import React, { useState, useMemo, useCallback } from "react";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Pagination,
  Input,
  Button,
} from "@nextui-org/react";
import { initialData } from "./equips";

const Inventory = () => {
  const [page, setPage] = useState(1);
  const [filterValue, setFilterValue] = useState("");
  const [selectedKeys, setSelectedKeys] = useState(new Set());
  const rowsPerPage = 9;

  const filteredItems = useMemo(() => {
    return initialData.filter((item) =>
      item.product.toLowerCase().includes(filterValue.toLowerCase())
    );
  }, [filterValue]);

  const pages = Math.ceil(filteredItems.length / rowsPerPage);

  const itemsToShow = useMemo(() => {
    const start = (page - 1) * rowsPerPage;
    const end = start + rowsPerPage;
    return filteredItems.slice(start, end);
  }, [page, filteredItems, rowsPerPage]);

  const onSearchChange = useCallback((e) => {
    setPage(1);
    setFilterValue(e.target.value.toLowerCase());
  }, []);

  const onClear = useCallback(() => {
    setPage(1);
    setFilterValue("");
  }, []);

  const onNextPage = useCallback(() => {
    setPage((current) => Math.min(current + 1, pages));
  }, [pages]);

  const onPreviousPage = useCallback(() => {
    setPage((current) => Math.max(current - 1, 1));
  }, []);

  const bottomContent = useMemo(() => {
    return (
      <div className="py-2 px-2 flex justify-between items-center">
        <span className="w-[30%] text-small text-default-400"></span>
        <Button disabled={page === 1} size="sm" onPress={onPreviousPage}>
          Previous
        </Button>
        <Pagination
          className="hide-arrows" // Add this class to apply the CSS rules
          isCompact
          showControls
          color="primary"
          page={page}
          total={pages}
          onChange={setPage}
        />
        <Button disabled={page === pages} size="sm" onPress={onNextPage}>
          Next
        </Button>
      </div>
    );
  }, [page, pages, onPreviousPage, onNextPage]);

  return (
    <div>
      <div className="flex justify-between items-center border-b bg-muted/40 px-4 py-2">
        <h1 className="text-lg font-bold">Inventory</h1>
        <Input
          clearable
          underlined
          placeholder="Search by product..."
          value={filterValue}
          onChange={onSearchChange}
          onClear={onClear}
          className="w-full max-w-xs"
        />
      </div>
      <div className="flex-grow p-4">
        <Table
          aria-label="Example table with client-side sorting and pagination"
          bottomContent={bottomContent}
        >
          <TableHeader>
            <TableColumn key="product">Equipment</TableColumn>
            <TableColumn key="quantity">Quantity</TableColumn>
            <TableColumn key="equipmentId">Equipment ID</TableColumn>
            <TableColumn key="rfidTagId">RFID Tag ID</TableColumn>
            <TableColumn key="dateAdded">Date Added</TableColumn>
            <TableColumn key="location">Location</TableColumn>
          </TableHeader>
          <TableBody>
            {itemsToShow.map((item) => (
              <TableRow key={item.equipmentId}>
                <TableCell>{item.product}</TableCell>
                <TableCell>{item.quantity}</TableCell>
                <TableCell>{item.equipmentId}</TableCell>
                <TableCell>{item.rfidTagId}</TableCell>
                <TableCell>{item.dateAdded}</TableCell>
                <TableCell>{item.location}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default Inventory;
