'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { 
  Clock, 
  MapPin, 
  Bed, 
  Download, 
  ArrowLeft, 
  Search, 
  CheckCircle2, 
  QrCode 
} from 'lucide-react';

export default function BookingsHistoryPage() {
  const [filter, setFilter] = useState<'ALL' | 'ACTIVE' | 'COMPLETED'>('ALL');
  const allBookings = store.bookings;

  const filtered = allBookings.filter((b) => {
    if (filter === 'ACTIVE') return b.status === 'CHECKED_IN' || b.status === 'CONFIRMED' || b.status === 'EXTENDED';
    if (filter === 'COMPLETED') return b.status === 'COMPLETED';
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25292E] pb-6">
        <div>
          <Link
            href="/dashboard"
            className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            My Hourly Rest Stop History
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            View active stays, past completed rest breaks, and download official GST tax invoices.
          </p>
        </div>

        {/* Filter pills */}
        <div className="inline-flex p-1 bg-[#181B1F] border border-gray-800 rounded-xl">
          <button
            onClick={() => setFilter('ALL')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              filter === 'ALL' ? 'bg-highway-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            All Bookings ({allBookings.length})
          </button>
          <button
            onClick={() => setFilter('ACTIVE')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              filter === 'ACTIVE' ? 'bg-highway-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Active
          </button>
          <button
            onClick={() => setFilter('COMPLETED')}
            className={`px-3 py-1.5 rounded-lg text-xs font-bold ${
              filter === 'COMPLETED' ? 'bg-highway-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            Past Completed
          </button>
        </div>
      </div>

      <div className="space-y-4">
        {filtered.map((b) => (
          <div
            key={b.id}
            className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6"
          >
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <span className="text-xs font-mono font-bold text-white">#{b.bookingCode}</span>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    b.status === 'CHECKED_IN'
                      ? 'bg-green-500/20 text-green-400'
                      : b.status === 'COMPLETED'
                      ? 'bg-blue-500/20 text-blue-400'
                      : 'bg-yellow-500/20 text-yellow-400'
                  }`}
                >
                  {b.status}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {new Date(b.createdAt).toLocaleDateString()}
                </span>
              </div>

              <h3 className="text-lg font-black text-white">{b.propertyName}</h3>
              <p className="text-xs text-gray-400 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange" />
                {b.propertyAddress}
              </p>

              <div className="flex flex-wrap gap-3 text-xs text-gray-300 pt-1">
                <span className="bg-[#202429] px-2.5 py-1 rounded-lg border border-gray-800">
                  🛏️ {b.bedNumber} ({b.roomName})
                </span>
                <span className="bg-[#202429] px-2.5 py-1 rounded-lg border border-gray-800">
                  ⏱️ {b.durationHours} Hours Rest
                </span>
                <span className="bg-[#202429] px-2.5 py-1 rounded-lg border border-gray-800">
                  💳 {b.paymentMethod || 'UPI Paid'}
                </span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 self-end md:self-center">
              <div className="text-right">
                <p className="text-xl font-black text-road-yellow font-mono">₹{b.totalAmount}</p>
                <p className="text-[10px] text-gray-400">Total tariff (incl. 12% GST)</p>
              </div>

              <div className="flex items-center space-x-2">
                <button
                  onClick={() => alert(`Official GST Receipt #${b.bookingCode} downloaded!`)}
                  className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-200 font-bold text-xs px-3.5 py-2.5 rounded-xl flex items-center"
                >
                  <Download className="w-3.5 h-3.5 mr-1 text-highway-orange" />
                  <span>Invoice</span>
                </button>

                {(b.status === 'CHECKED_IN' || b.status === 'EXTENDED' || b.status === 'CONFIRMED') && (
                  <Link
                    href="/dashboard/active-stay"
                    className="bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow"
                  >
                    Active Stay / Extend
                  </Link>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
