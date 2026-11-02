'use client';

import React from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { ActiveStayTimer } from '@/components/ActiveStayTimer';
import { ArrowLeft, Bed, MapPin, Compass } from 'lucide-react';

export default function ActiveStayPage() {
  const activeBooking = store.bookings.find(
    (b) => b.status === 'CHECKED_IN' || b.status === 'CONFIRMED'
  );

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        href="/dashboard"
        className="text-xs text-highway-orange hover:underline flex items-center font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Dashboard
      </Link>

      {activeBooking ? (
        <ActiveStayTimer
          booking={activeBooking}
          onExtend={async (hours) => {
            const res = await fetch(`/api/bookings/${activeBooking.id}/extend`, {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({ additionalHours: hours }),
            });
            const data = await res.json();
            return data.success;
          }}
        />
      ) : (
        <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-12 text-center space-y-4 shadow-xl">
          <Bed className="w-12 h-12 text-gray-600 mx-auto" />
          <h2 className="text-xl font-bold text-white">No Active Stay In Progress</h2>
          <p className="text-xs text-gray-400 max-w-sm mx-auto">
            You do not currently have any checked-in bed reservation. Discover nearby highway rest stops starting at ₹30/hour.
          </p>
          <div className="pt-2">
            <Link
              href="/search"
              className="bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs px-6 py-3 rounded-xl shadow-lg inline-flex items-center"
            >
              <Compass className="w-4 h-4 mr-2" />
              <span>Find Nearby Rest Stop</span>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
