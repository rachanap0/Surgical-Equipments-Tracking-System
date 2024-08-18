"use client";

import React from "react";
import Link from "next/link";
import Image from "next/image";
import img1 from "../../assets/6.png";
import {
  Bell,
  CircleUser,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  Search,
  ShoppingCart,
  Users,
  Archive,
  Info,
  NotebookPen,
  Settings,
  User,
} from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import useNavigation from "@/hook/use-navigation";
import { ModeToggle } from "./toggle-darkmode";

import { CommandMenu } from "./command-menu";

const SideNav = () => {
  const {
    isAboutUsActive,
    isDashboardActive,
    isOrdersActive,
    isInventoryActive,
    isProfileActive,
  } = useNavigation();

  return (
    <div className="grid min-h-screen md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
      <div className="hidden border-r bg-muted/40 md:block">
        <div className="flex h-full max-h-screen flex-col gap-2">
          <div className="flex justify-between h-14 items-center border-b px-4 lg:h-[60px] lg:px-6">
            <Link href="/" className="flex items-center gap-2 font-semibold">
              <Image
                src={img1}
                alt="sets logo"
                width={40} // Adjust this value to scale the width of your logo
                height={5.7} // Adjust this value to scale the height of your logo
                className="w-auto" // `w-auto` is not necessary when using Next/Image
              />
              <span></span>
              <span></span>
              <span></span>
              <span></span>
              <span className="">SETS</span>
            </Link>

            <ModeToggle />
          </div>
          <div className="flex-1">
            {/* <CommandMenu /> */}
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4">
              <Link
                href="/"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isAboutUsActive ? "font-bold" : ""
                }`}
              >
                <Info className="h-4 w-4" />
                About Us
              </Link>
              <Link
                href="/request-equipment"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isDashboardActive ? "font-bold" : ""
                }`}
              >
                <NotebookPen className="h-4 w-4" />
                Request Equipment
              </Link>
              <Link
                href="orders"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isOrdersActive ? "font-bold" : ""
                }`}
              >
                <ShoppingCart className="h-4 w-4" />
                Order History
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="/inventory"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isInventoryActive ? "font-bold" : ""
                }`}
              >
                <Archive className="h-4 w-4" />
                Inventory
              </Link>
            </nav>
          </div>
          <div className="mt-auto w-full">
            <div className="px-4 items-end">
              <Link
                href="/profile"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isProfileActive ? "font-bold" : ""
                }`}
              >
                <User className="h-4 w-4" />
                Profile
              </Link>
              <Link
                href="/settings"
                className={`flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary ${
                  isProfileActive ? "font-bold" : ""
                }`}
              >
                <Settings className="h-4 w-4" />
                Settings
              </Link>
            </div>
          </div>
          <div className="mt-auto p-4"></div>
        </div>
      </div>
      <div className="flex flex-col">
        <CommandMenu />
        <Sheet>
          <SheetTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="shrink-0 md:hidden"
            >
              <Menu className="h-5 w-5" />
              <span className="sr-only">Toggle navigation menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="flex flex-col">
            <nav className="grid gap-2 text-lg font-medium">
              <Link
                href="#"
                className="flex items-center gap-2 text-lg font-semibold"
              >
                <Package2 className="h-6 w-6" />
                <span className="sr-only">SETS</span>
              </Link>
              <Link
                href="#"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                  isAboutUsActive ? "font-bold" : ""
                }`}
              >
                <Home className="h-5 w-5" />
                About Us
              </Link>
              <Link
                href="#"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground ${
                  isOrdersActive ? "font-bold" : ""
                }`}
              >
                <ShoppingCart className="h-5 w-5" />
                Orders
                <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                  6
                </Badge>
              </Link>
              <Link
                href="#"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                  isInventoryActive ? "font-bold" : ""
                }`}
              >
                <Package className="h-5 w-5" />
                Products
              </Link>
              <Link
                href="#"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                  isInventoryActive ? "font-bold" : ""
                }`}
              >
                <Users className="h-5 w-5" />
                Customers
              </Link>
              <Link
                href="#"
                className={`mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground ${
                  isInventoryActive ? "font-bold" : ""
                }`}
              >
                <LineChart className="h-5 w-5" />
                Analytics
              </Link>
            </nav>
            <div className="mt-auto"></div>
          </SheetContent>
        </Sheet>
      </div>
    </div>
  );
};

export default SideNav;
