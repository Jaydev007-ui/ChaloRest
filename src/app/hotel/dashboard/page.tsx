'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { 
  Building2, 
  Bed, 
  Users, 
  DollarSign, 
  QrCode, 
  CheckCircle2, 
  Clock, 
  Sliders, 
  Plus, 
  TrendingUp,
  ShieldCheck,
  AlertCircle
} from 'lucide-react';

export default function HotelDashboardPage() {
  const property = store.properties[0]; // Active partner property
  const allBookings = store.bookings.filter(b => b.propertyId === property.id);
  const activeStays = allBookings.filter(b => b.status === 'CHECKED_IN');
  const todayBookings = allBookings;

  const totalBeds = property.rooms.reduce((acc, r) => acc + r.beds.length, 0);
  const availableBeds = property.rooms.reduce(
    (acc, r) => acc + r.beds.filter(b => b.isAvailable && !b.isBlocked).length,
    0
  );
  const occupiedBeds = totalBeds - availableBeds;
  const occupancyRate = Math.round((occupiedBeds / totalBeds) * 100);

  const [hourlyRate, setHourlyRate] = useState(property.baseHourlyRate);
  const [rateUpdatedMsg, setRateUpdatedMsg] = useState(false);

  const handleUpdateRate = () => {
    property.baseHourlyRate = hourlyRate;
    setRateUpdatedMsg(true);
    setTimeout(() => setRateUpdatedMsg(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Partner Property Header */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-road-yellow text-black text-xs font-black px-2.5 py-0.5 rounded uppercase">
              HOTEL PARTNER PORTAL
            </span>
            <span className="text-xs text-green-400 font-bold font-mono">LIVE ON CHALOREST</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {property.name}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Owner: {property.ownerName} • {property.address}
          </p>
        </div>

        {/* Quick Scanner Action */}
        <div className="flex items-center space-x-3">
          <Link
            href="/hotel/scanner"
            className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs sm:text-sm px-5 py-3 rounded-xl shadow-lg shadow-highway-orange/20 flex items-center"
          >
            <QrCode className="w-4 h-4 mr-2" />
            <span>OPEN QR CHECK-IN SCANNER</span>
          </Link>
          <Link
            href="/hotel/beds"
            className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-200 font-bold text-xs sm:text-sm px-4 py-3 rounded-xl"
          >
            Manage Beds
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Occupancy Rate</span>
          <p className="text-2xl font-black text-road-yellow font-mono mt-1">{occupancyRate}%</p>
          <span className="text-[10px] text-gray-500">{occupiedBeds} of {totalBeds} beds occupied</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Active Guests Resting</span>
          <p className="text-2xl font-black text-green-400 font-mono mt-1">{activeStays.length}</p>
          <span className="text-[10px] text-gray-500">Currently in dorms</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Monthly Gross Revenue</span>
          <p className="text-2xl font-black text-white font-mono mt-1">₹48,250</p>
          <span className="text-[10px] text-green-400">↑ 18% vs last month</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Next Payout (Net)</span>
          <p className="text-2xl font-black text-highway-orange font-mono mt-1">₹42,460</p>
          <span className="text-[10px] text-gray-500">Scheduled on Friday</span>
        </div>
      </div>

      {/* Dynamic Hourly Pricing Control Card */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 shadow-xl">
        <h3 className="text-base font-black text-white mb-2">Configure Base Hourly Tariff</h3>
        <p className="text-xs text-gray-400 mb-4">
          Adjust price per bed based on daytime demand, weekend highway traffic, or monsoon peak rest hours.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4">
          <div className="flex items-center space-x-3 w-full sm:w-auto">
            <span className="text-xs font-bold text-gray-300">Rate:</span>
            <div className="relative">
              <span className="absolute left-3 top-2.5 text-xs text-road-yellow font-bold">₹</span>
              <input
                type="number"
                min="25"
                max="100"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="bg-[#202429] border border-gray-700 rounded-xl pl-7 pr-3 py-2 text-sm text-white font-mono font-bold w-32"
              />
            </div>
            <span className="text-xs text-gray-400">/ hour per bed</span>
          </div>

          <button
            type="button"
            onClick={handleUpdateRate}
            className="w-full sm:w-auto bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-xs px-6 py-2.5 rounded-xl transition-all"
          >
            UPDATE TARIFF ACROSS BED INVENTORY
          </button>

          {rateUpdatedMsg && (
            <span className="text-xs text-green-400 font-bold flex items-center">
              <CheckCircle2 className="w-4 h-4 mr-1" />
              Tariff updated to ₹{hourlyRate}/hr!
            </span>
          )}
        </div>
      </div>

      {/* Active Check-ins Table */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#25292E] pb-3">
          <div>
            <h3 className="text-lg font-black text-white">Live Rest Stop Roster</h3>
            <p className="text-xs text-gray-400">Guests currently checked in and scheduled check-outs</p>
          </div>
          <Link
            href="/hotel/scanner"
            className="text-xs font-bold text-highway-orange hover:underline flex items-center"
          >
            <span>Scan New Arrival QR</span>
            <QrCode className="w-3.5 h-3.5 ml-1" />
          </Link>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#202429] text-gray-400 uppercase text-[10px] font-mono">
              <tr>
                <th className="p-3 rounded-l-xl">Booking</th>
                <th className="p-3">Guest Name</th>
                <th className="p-3">Assigned Bed</th>
                <th className="p-3">Check-in Time</th>
                <th className="p-3">Scheduled Checkout</th>
                <th className="p-3">Status</th>
                <th className="p-3 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25292E]">
              {allBookings.map((b) => (
                <tr key={b.id} className="hover:bg-[#202429]/50 transition-colors">
                  <td className="p-3 font-mono font-bold text-white">#{b.bookingCode}</td>
                  <td className="p-3">
                    <p className="font-bold text-white">{b.userName}</p>
                    <p className="text-[10px] text-gray-400">{b.userPhone}</p>
                  </td>
                  <td className="p-3">
                    <span className="font-bold text-road-yellow">{b.bedNumber}</span>
                    <span className="text-[10px] text-gray-400 block">{b.roomName}</span>
                  </td>
                  <td className="p-3 text-gray-300 font-mono">
                    {new Date(b.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                  </td>
                  <td className="p-3 text-gray-300 font-mono">
                    {new Date(b.scheduledCheckOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
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
                  <td className="p-3">
                    <Link
                      href="/hotel/scanner"
                      className="text-xs text-highway-orange hover:underline font-bold"
                    >
                      Process QR
                    </Link>
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
