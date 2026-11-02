'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { ArrowLeft, Search, Clock, Bed, Download, ShieldCheck } from 'lucide-react';

export default function AdminBookingsPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const bookings = store.bookings;

  const filtered = bookings.filter(b => 
    b.bookingCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
    b.propertyName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25292E] pb-6">
        <div>
          <Link
            href="/admin"
            className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Platform Admin Console
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            All Platform Hourly Bookings
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Full transactional audit log of customer stays, room allocations, and payment reconciliation.
          </p>
        </div>

        <button
          onClick={() => alert('Bookings CSV exported!')}
          className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-200 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center self-start sm:self-auto"
        >
          <Download className="w-4 h-4 mr-1.5 text-road-yellow" />
          <span>Export Bookings CSV</span>
        </button>
      </div>

      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 shadow-xl space-y-4">
        <div className="relative">
          <Search className="w-4 h-4 text-gray-400 absolute left-3.5 top-3.5" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by Booking Code (CR-...), Guest Name, or Hotel Property..."
            className="w-full bg-[#202429] border border-gray-700 rounded-xl pl-10 pr-4 py-2.5 text-xs text-white"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#202429] text-gray-400 uppercase text-[10px] font-mono">
              <tr>
                <th className="p-3 rounded-l-xl">Booking Code</th>
                <th className="p-3">Guest</th>
                <th className="p-3">Hotel & Bed</th>
                <th className="p-3">Duration</th>
                <th className="p-3">Amount Paid</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-xl">QR FastPass Token</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25292E]">
              {filtered.map((b) => (
                <tr key={b.id} className="hover:bg-[#202429]/50 transition-colors">
                  <td className="p-3 font-mono font-bold text-white">#{b.bookingCode}</td>
                  <td className="p-3">
                    <p className="font-bold text-white">{b.userName}</p>
                    <p className="text-[10px] text-gray-400">{b.userPhone}</p>
                  </td>
                  <td className="p-3">
                    <p className="text-white font-medium">{b.propertyName}</p>
                    <p className="text-[10px] text-road-yellow font-bold font-mono">{b.bedNumber}</p>
                  </td>
                  <td className="p-3 font-mono text-gray-300">
                    {b.durationHours} Hours
                  </td>
                  <td className="p-3 font-mono text-green-400 font-bold">
                    ₹{b.totalAmount}
                  </td>
                  <td className="p-3">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                        b.status === 'CHECKED_IN'
                          ? 'bg-green-500/20 text-green-400'
                          : b.status === 'COMPLETED'
                          ? 'bg-blue-500/20 text-blue-400'
                          : 'bg-yellow-500/20 text-yellow-400'
                      }`}
                    >
                      {b.status}
                    </span>
                  </td>
                  <td className="p-3 font-mono text-[10px] text-gray-400 truncate max-w-[150px]">
                    {b.qrToken}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
