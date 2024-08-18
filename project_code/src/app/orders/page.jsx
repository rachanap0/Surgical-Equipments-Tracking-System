"use client"

import React from 'react';
import { Search, CircleUser } from "lucide-react";
import { Input } from "@/components/ui/input";
import io from 'socket.io-client';
import { useEffect, useState } from 'react';

import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
} from "@/components/ui/command"

import {
  CalendarIcon,
  EnvelopeClosedIcon,
  FaceIcon,
  GearIcon,
  PersonIcon,
  RocketIcon,
} from "@radix-ui/react-icons"


import { Button } from "@/components/ui/button";
import { DataTable } from "./data-table";
import { columns } from "./columns";

import { CommandMenu } from '@/components/command-menu';
import { OrderDetailDialog } from '@/components/OrderDetailDialog';

async function getData() {
  const response = await fetch("/api/orders");
  const data = await response.json();
  return data;

  // return [
  //   {
  //     orderId: "1001",
  //     items: ["Surgical Gloves", "Medical Masks"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "pending",
  //   },
  //   {
  //     orderId: "1002",
  //     items: ["IV Fluids", "Surgical Gown"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "processing",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },
  //   {
  //     orderId: "1003",
  //     items: ["Scalpel", "Stethoscope"],
  //     origin: "Sanitization Unit",
  //     destination: "OR",
  //     status: "success",
  //   },

  // ];
}

const Orders = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
      const fetchData = async () => {
          const response = await fetch('/api/orders');
          if (response.ok) {
              const jsonData = await response.json();
              setData(jsonData);
          } else {
              throw new Error('Failed to fetch orders');
          }
      };

      fetchData();

      // Connect to socket
      
      
  }, []);

  const updateOrdersData = (newData) => {
    setData((prevData) => [...prevData, ...newData]);
  };
  

  useEffect(() => {
    const socket = io('http://localhost:3000');
    socket.on('dataUpdated', (newData) => {
      updateData(newData);
    });

    return () => socket.close();
  }, []);

  return (
    <div className="flex flex-col">
      <header className="flex h-14 items-center gap-4 border-b bg-muted/40 px-4 lg:h-[60px] lg:px-6">
        Orders
        <div className="relative ml-auto flex-1 md:grow-0">

          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Press ⌘K  "
              className="pl-8 sm:w-[300px] md:w-[200px] lg:w-[300px]"
            />

          </div>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" size="icon" className="rounded-full">
              <CircleUser className="h-5 w-5" />
              <span className="sr-only">Toggle user menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Settings</DropdownMenuItem>
            <DropdownMenuItem>Support</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Logout</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </header>
      <div className="container mx-auto py-10">
        <DataTable columns={columns} data={data} updatedData={updateOrdersData} />
      </div>
    </div>
  );
}

export default Orders;
