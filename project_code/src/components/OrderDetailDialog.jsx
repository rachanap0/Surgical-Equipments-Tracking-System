import React from "react";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogClose } from "@/components/ui/dialog";

const OrderDetailDialog = ({ isOpen, onClose, orderData }) => {
  // Handle potential missing order data
  if (!orderData) return null;

  return (
    <Dialog open={isOpen} onClose={onClose}>
      <DialogTitle>Order Details: {orderData.orderId}</DialogTitle>
      <DialogContent>
        <DialogDescription>
          <p>Items: {orderData.items.join(", ")}</p>
          <p>Origin: {orderData.origin}</p>
          <p>Destination: {orderData.destination}</p>
          <p>Status: {orderData.status}</p>
        </DialogDescription>
      </DialogContent>
      <DialogFooter>
        <DialogClose>Close</DialogClose>
      </DialogFooter>
    </Dialog>
  );
};

export default OrderDetailDialog;
