'use client';

import React from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { ArrowLeft, DollarSign, TrendingUp, Calendar, Download, CheckCircle2, Building2 } from 'lucide-react';

export default function HotelRevenuePage() {
  const property = store.properties[0];
  const bookings = store.bookings.filter(b => b.propertyId === property.id);

  const totalGross = bookings.reduce((acc, b) => acc + b.totalAmount, 0) + 48250;
  const platformFee = Math.round(totalGross * 0.12);
  const netEarnings = totalGross - platformFee;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/hotel/dashboard"
          className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Partner Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Revenue, Occupancy & Bank Settlements
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Transparent accounting of your hotel’s hourly bed bookings and automated NEFT settlements.
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#181B1F] border border-gray-800 p-6 rounded-3xl">
          <span className="text-xs text-gray-400 font-bold uppercase">This Month Gross</span>
          <p className="text-3xl font-black text-white font-mono mt-1">₹{totalGross.toLocaleString()}</p>
          <span className="text-xs text-green-400">From 142 hourly bed stays</span>
        </div>

        <div className="bg-[#181B1F] border border-gray-800 p-6 rounded-3xl">
          <span className="text-xs text-gray-400 font-bold uppercase">ChaloRest Take (12%)</span>
          <p className="text-3xl font-black text-gray-400 font-mono mt-1">₹{platformFee.toLocaleString()}</p>
          <span className="text-xs text-gray-500">Includes payment gateway fee & marketing</span>
        </div>

        <div className="bg-[#181B1F] border border-green-500/40 p-6 rounded-3xl shadow-xl">
          <span className="text-xs text-green-400 font-bold uppercase">Your Net Settlement</span>
          <p className="text-3xl font-black text-green-400 font-mono mt-1">₹{netEarnings.toLocaleString()}</p>
          <span className="text-xs text-gray-300">Bank Transfer on Friday</span>
        </div>
      </div>

      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#25292E] pb-3">
          <h3 className="text-base font-black text-white">Recent Payout Settlements</h3>
          <button
            onClick={() => alert('Payout tax statement downloaded!')}
            className="text-xs text-highway-yellow hover:underline flex items-center font-bold"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Download Annual GST Report</span>
          </button>
        </div>

        <div className="space-y-3">
          {[
            { date: '27 Feb 2026', ref: 'NEFT-CR-88912', amount: '₹14,200', status: 'SETTLED TO HDFC BANK' },
            { date: '20 Feb 2026', ref: 'NEFT-CR-77821', amount: '₹12,450', status: 'SETTLED TO HDFC BANK' },
            { date: '13 Feb 2026', ref: 'NEFT-CR-66519', amount: '₹15,810', status: 'SETTLED TO HDFC BANK' },
          ].map((item, idx) => (
            <div
              key={idx}
              className="bg-[#202429] p-4 rounded-2xl border border-gray-800 flex items-center justify-between text-xs font-mono"
            >
              <div>
                <p className="text-white font-bold">{item.date} • {item.ref}</p>
                <p className="text-[11px] text-green-400 flex items-center mt-0.5">
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1 inline" />
                  {item.status}
                </p>
              </div>
              <span className="text-base font-black text-road-yellow">{item.amount}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
