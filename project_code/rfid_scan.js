const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const { SerialPort } = require('serialport');
const { ReadlineParser } = require('@serialport/parser-readline');
const io = require('socket.io-client');
const serverUrl = 'http://localhost:3000';
const socket = io(serverUrl);

const readers = [
  { path: '/dev/tty.usbserial-A10LIKPQ', id: 'Reader1' },
  { path: '/dev/tty.usbserial-A10LISFS', id: 'Reader2' },
  { path: '/dev/tty.usbserial-A10LJ4UJ', id: 'Reader3' }
];

function initializeReader(reader) {
  const port = new SerialPort({
    path: reader.path,
    baudRate: 9600
  });

  const parser = new ReadlineParser({ delimiter: '\r\n' });
  port.pipe(parser);

  parser.on('data', async (tagId) => {
    const cleanedTagId = tagId.replace(/\s/g, '');
    console.log(`Scanned RFID tag: ${cleanedTagId} from ${reader.id}`);

    if (reader.id === 'Reader1') {
      // Emit to server for processing by Reader1
      socket.emit('rfidScan', { tagId: cleanedTagId, scannerId: reader.id });
    } else {
      // Direct database update for Reader2 and Reader3
      await updateDatabase(cleanedTagId, reader.id);
    }
  });

  port.on('error', (err) => {
    console.error(`Error on ${reader.id}:`, err.message);
  });
}

async function updateDatabase(rfidTag, readerId) {
    try {
      // First, find the order
      const order = await prisma.orders.findFirst({
        where: { rfidTag: rfidTag }
      });
  
      if (order) {
        let newStatus = order.status;
        if (readerId === 'Reader2' && order.status === 'in transit') {
          newStatus = 'under use';
        } else if (readerId === 'Reader3' && order.status === 'under use') {
          newStatus = 'completed';
        }
  
        // Only proceed with update if the status has changed
        if (newStatus !== order.status) {
          const updatedOrder = await prisma.orders.update({
            where: { id: order.id },  // use the unique id for the update
            data: { status: newStatus }
          });
  
          console.log(`Order ${updatedOrder.id} updated to ${newStatus}`);
        } else {
          console.log(`Order ${order.id} status remains unchanged at ${order.status}`);
        }
      } else {
        console.log(`No order found with RFID Tag: ${rfidTag}`);
      }
    } catch (error) {
      console.error("Failed to update the database:", error);
    }
  }
  

readers.forEach(initializeReader);
