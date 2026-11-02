'use client';

import React from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { store } from '@/lib/store';
import { CheckCircle2, Bed, MapPin, Download, QrCode, ArrowLeft } from 'lucide-react';

export default function BookingByIdPage() {
  const params = useParams();
  const bookingId = params.id as string;
  const booking = store.bookings.find(b => b.id === bookingId || b.bookingCode === bookingId) || store.bookings[0];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-6 text-center">
      <Link
        href="/dashboard/bookings"
        className="text-xs text-highway-orange hover:underline inline-flex items-center font-semibold mb-2"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Bookings
      </Link>

      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="w-16 h-16 rounded-full bg-green-500/20 text-green-400 border border-green-500/40 flex items-center justify-center mx-auto">
          <CheckCircle2 className="w-8 h-8" />
        </div>

        <div>
          <span className="text-xs bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-full uppercase">
            BOOKING CONFIRMATION
          </span>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-2">
            FastPass Pass #{booking.bookingCode}
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            Status: <span className="font-bold text-white uppercase">{booking.status}</span> • Payment:{' '}
            <span className="text-green-400 font-bold">{booking.paymentStatus}</span>
          </p>
        </div>

        {/* QR Pass */}
        <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-inner">
          <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
            <rect width="100" height="100" fill="white" />
            <rect x="5" y="5" width="25" height="25" fill="#17191C" />
            <rect x="9" y="9" width="17" height="17" fill="white" />
            <rect x="13" y="13" width="9" height="9" fill="#17191C" />
            <rect x="70" y="5" width="25" height="25" fill="#17191C" />
            <rect x="74" y="9" width="17" height="17" fill="white" />
            <rect x="78" y="13" width="9" height="9" fill="#17191C" />
            <rect x="5" y="70" width="25" height="25" fill="#17191C" />
            <rect x="9" y="74" width="17" height="17" fill="white" />
            <rect x="13" y="78" width="9" height="9" fill="#17191C" />
            <rect x="35" y="15" width="15" height="10" fill="#FF8A24" />
            <rect x="55" y="25" width="10" height="20" fill="#17191C" />
            <rect x="35" y="50" width="30" height="10" fill="#17191C" />
            <rect x="70" y="75" width="20" height="15" fill="#17191C" />
          </svg>
        </div>

        <div className="bg-[#202429] border border-gray-800 rounded-2xl p-4 text-xs font-mono space-y-2 text-left max-w-sm mx-auto">
          <div className="flex justify-between">
            <span className="text-gray-400">Hotel:</span>
            <span className="text-white font-bold">{booking.propertyName}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Assigned Bed:</span>
            <span className="text-road-yellow font-bold">{booking.bedNumber}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Duration:</span>
            <span className="text-white">{booking.durationHours} Hours</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-400">Total Paid:</span>
            <span className="text-green-400 font-bold">₹{booking.totalAmount}</span>
          </div>
          <div className="flex justify-between border-t border-gray-700 pt-1 text-[11px]">
            <span className="text-gray-400">Check-out By:</span>
            <span className="text-white">{new Date(booking.scheduledCheckOut).toLocaleTimeString()}</span>
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <Link
            href="/dashboard/active-stay"
            className="bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow"
          >
            Active Stay Timer
          </Link>
          <button
            onClick={() => window.print()}
            className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-300 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Download Invoice</span>
          </button>
        </div>
      </div>
    </div>
  );
}
