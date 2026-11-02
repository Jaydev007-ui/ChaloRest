import { NextResponse } from 'next/server';
import { store, createBooking } from '@/lib/store';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');
  const propertyId = searchParams.get('propertyId');
  const status = searchParams.get('status');

  let list = [...store.bookings];

  if (userId) {
    list = list.filter(b => b.userId === userId);
  }
  if (propertyId) {
    list = list.filter(b => b.propertyId === propertyId);
  }
  if (status) {
    list = list.filter(b => b.status === status);
  }

  return NextResponse.json({
    success: true,
    count: list.length,
    bookings: list,
  });
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const result = createBooking(body);

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, booking: result.booking }, { status: 201 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
