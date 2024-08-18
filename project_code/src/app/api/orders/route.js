import prisma from '../../../lib/prisma';
import { NextResponse } from 'next/server';

export async function GET(request) {
    try {
        const orders = await prisma.orders.findMany();
        return NextResponse.json(orders);
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}

export async function POST(request) {
    try {
        const data = await request.json();
        const { origin, destination, rfidTag, timeRequired, items, surgeryType, requestorName, additionalComments } = data;

        // Add data validation here

        const order = await prisma.orders.create({
            data: {
                origin,
                destination,
                rfidTag,
                timeRequired,
                items,
                surgeryType,         
                requestorName,       
                additionalComments,  
                status: 'pending'
            },
        });

        return NextResponse.json(order);
    } catch (error) {
        return new NextResponse(error.message, { status: 500 });
    }
}
