'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store, extendBooking } from '@/lib/store';
import { Booking } from '@/types';
import { ActiveStayTimer } from '@/components/ActiveStayTimer';
import { ArrowLeft, Bed, MapPin, Compass, Sparkles } from 'lucide-react';

export default function ActiveStayPage() {
  const [activeBooking, setActiveBooking] = useState<Booking | null>(() => {
    return (
      store.bookings.find(
        (b) => b.status === 'CHECKED_IN' || b.status === 'CONFIRMED' || b.status === 'EXTENDED'
      ) || null
    );
  });

  const handleExtend = async (hours: number, paymentMethod?: string): Promise<boolean> => {
    if (!activeBooking) return false;

    try {
      const res = await fetch(`/api/bookings/${activeBooking.id}/extend`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ additionalHours: hours, paymentMethod }),
      });
      const data = await res.json();
      if (data.success && data.booking) {
        setActiveBooking({ ...data.booking });
        return true;
      }
    } catch (e) {
      // Fallback direct store call
    }

    const fallback = extendBooking(activeBooking.id, hours, paymentMethod);
    if (fallback.success && fallback.booking) {
      setActiveBooking({ ...fallback.booking });
      return true;
    }

    return false;
  };

  const handleSimulateDemoStay = () => {
    const demo: Booking = {
      id: `booking-${Date.now()}`,
      bookingCode: `CR-${new Date().getFullYear()}-${Math.floor(1000 + Math.random() * 9000)}`,
      userId: store.currentUser.id,
      userName: store.currentUser.name,
      userPhone: store.currentUser.phone,
      propertyId: store.properties[0].id,
      propertyName: store.properties[0].name,
      propertyAddress: store.properties[0].address,
      propertyCity: store.properties[0].city,
      roomId: store.properties[0].rooms[0].id,
      roomName: store.properties[0].rooms[0].name,
      bedId: store.properties[0].rooms[0].beds[0].id,
      bedNumber: store.properties[0].rooms[0].beds[0].bedNumber,
      checkInTime: new Date().toISOString(),
      durationHours: 3,
      scheduledCheckOut: new Date(Date.now() + 3 * 3600 * 1000).toISOString(),
      hourlyRate: store.properties[0].baseHourlyRate,
      baseAmount: store.properties[0].baseHourlyRate * 3,
      taxAmount: Math.round(store.properties[0].baseHourlyRate * 3 * 0.12),
      platformFee: 10,
      discountAmount: 0,
      totalAmount: Math.round(store.properties[0].baseHourlyRate * 3 * 1.12 + 10),
      status: 'CHECKED_IN',
      paymentStatus: 'PAID',
      paymentMethod: 'UPI (NPCI Instant 2.0)',
      qrToken: `CR-DEMO-TOKEN-${Date.now()}`,
      vehicleType: 'CAB_TAXI',
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    store.bookings.unshift(demo);
    setActiveBooking(demo);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex items-center justify-between">
        <Link
          href="/dashboard"
          className="text-xs text-highway-orange hover:underline flex items-center font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Dashboard
        </Link>
        <span className="text-[11px] font-mono text-gray-500">
          ChaloRest Anti-Fatigue Monitor v2.0
        </span>
      </div>

      {activeBooking ? (
        <ActiveStayTimer
          booking={activeBooking}
          onExtend={handleExtend}
        />
      ) : (
        <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-12 text-center space-y-5 shadow-xl">
          <Bed className="w-12 h-12 text-gray-600 mx-auto" />
          <div>
            <h2 className="text-xl font-bold text-white">No Active Stay In Progress</h2>
            <p className="text-xs text-gray-400 max-w-sm mx-auto mt-1">
              You do not currently have any active bed reservation. Book an hourly stay along your highway route starting at ₹30/hour.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
            <Link
              href="/search"
              className="bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg inline-flex items-center"
            >
              <Compass className="w-4 h-4 mr-2" />
              <span>Find Nearby Rest Stop</span>
            </Link>
            <button
              onClick={handleSimulateDemoStay}
              className="bg-[#202429] hover:bg-[#282E35] border border-gray-700 text-road-yellow font-bold text-xs px-5 py-3 rounded-xl inline-flex items-center"
            >
              <Sparkles className="w-4 h-4 mr-1.5" />
              <span>Simulate Active Bed Stay (Test)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
