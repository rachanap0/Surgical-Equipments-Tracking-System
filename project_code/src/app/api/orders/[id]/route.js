import prisma from '@/lib/prisma'; // Ensure the path is correct
import { NextResponse } from 'next/server';

export async function GET(request, { params }) {
    const { id } = params;
    const order = await prisma.orders.findUnique({
        where: {
            id: parseInt(id),
        },
    });

    if (!order) {
        return new NextResponse('Order not found', { status: 404 });
    }

    return NextResponse.json(order);
}

export async function PATCH(request, { params }) {
    const { id } = params;
    const data = await request.json();
    const { rfidTag } = data;

    const order = await prisma.orders.update({
        where: {
            id: parseInt(id),
        },
        data: {
            rfidTag,
            status: 'in transit',
        },
    });

    return NextResponse.json(order);
}
