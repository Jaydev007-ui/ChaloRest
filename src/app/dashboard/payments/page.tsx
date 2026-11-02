'use client';

import React from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { ArrowLeft, CreditCard, Download, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function PaymentsPage() {
  const bookings = store.bookings;

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        href="/dashboard"
        className="text-xs text-highway-orange hover:underline flex items-center font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Dashboard
      </Link>

      <div className="border-b border-[#25292E] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Payment History & Downloadable Receipts
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Verified transactional records for your hourly rests with GST breakdown.
        </p>
      </div>

      <div className="space-y-4">
        {bookings.map((b) => (
          <div
            key={b.id}
            className="bg-[#181B1F] border border-[#2B3037] rounded-2xl p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 shadow-xl"
          >
            <div className="space-y-1">
              <div className="flex items-center space-x-2">
                <span className="font-mono text-xs font-bold text-white">#{b.bookingCode}</span>
                <span className="bg-green-500/20 text-green-400 text-[10px] font-bold px-2 py-0.5 rounded">
                  PAID VIA {b.paymentMethod || 'UPI'}
                </span>
                <span className="text-xs text-gray-400 font-mono">
                  {new Date(b.createdAt).toLocaleDateString()}
                </span>
              </div>
              <p className="text-sm font-bold text-white">{b.propertyName}</p>
              <p className="text-xs text-gray-400 font-mono">
                Base: ₹{b.baseAmount} + GST (12%): ₹{b.taxAmount} + Platform: ₹10 = Total: ₹{b.totalAmount}
              </p>
            </div>

            <div className="flex items-center space-x-4 self-end sm:self-auto">
              <span className="text-xl font-black text-road-yellow font-mono">
                ₹{b.totalAmount}
              </span>
              <button
                onClick={() => alert(`Official Receipt for ${b.bookingCode} downloaded!`)}
                className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-300 font-bold text-xs px-3.5 py-2 rounded-xl flex items-center"
              >
                <Download className="w-3.5 h-3.5 mr-1 text-highway-orange" />
                <span>GST Receipt</span>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
