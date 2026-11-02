import { NextResponse } from 'next/server';
import { checkInByQR, checkOutByQR, store } from '@/lib/store';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { qrToken, action } = body;

    if (!qrToken) {
      return NextResponse.json({ success: false, error: 'QR token is required' }, { status: 400 });
    }

    if (action === 'CHECK_OUT') {
      const res = checkOutByQR(qrToken);
      if (!res.success) {
        return NextResponse.json({ success: false, error: res.error }, { status: 400 });
      }
      return NextResponse.json({ success: true, action: 'CHECK_OUT', booking: res.booking });
    }

    // Default action: Check in
    const res = checkInByQR(qrToken);
    if (!res.success) {
      return NextResponse.json({ success: false, error: res.error }, { status: 400 });
    }

    return NextResponse.json({ success: true, action: 'CHECK_IN', booking: res.booking });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
