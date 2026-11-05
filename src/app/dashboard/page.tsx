'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store, extendBooking } from '@/lib/store';
import { ActiveStayTimer } from '@/components/ActiveStayTimer';
import { 
  Clock, 
  MapPin, 
  Bed, 
  Star, 
  Truck, 
  Car, 
  ShieldCheck, 
  Download, 
  PlusCircle, 
  Award,
  ChevronRight,
  ArrowRight,
  User,
  PhoneCall
} from 'lucide-react';

export default function UserDashboard() {
  const user = store.currentUser;
  const bookings = store.bookings;
  const [activeBooking, setActiveBooking] = useState(() => 
    bookings.find(b => b.status === 'CHECKED_IN' || b.status === 'CONFIRMED' || b.status === 'EXTENDED')
  );

  const totalHoursRested = bookings
    .filter(b => b.status === 'COMPLETED' || b.status === 'CHECKED_IN')
    .reduce((acc, b) => acc + b.durationHours, 0);

  const totalSpent = bookings
    .filter(b => b.status === 'COMPLETED' || b.status === 'CHECKED_IN')
    .reduce((acc, b) => acc + b.totalAmount, 0);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* User Welcome Banner */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div className="flex items-center space-x-4">
          <div className="w-16 h-16 rounded-2xl bg-highway-orange text-white flex items-center justify-center font-black text-2xl shadow-lg shadow-highway-orange/20">
            {user.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <h1 className="text-2xl font-black text-white">{user.name}</h1>
              <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded border border-green-500/30">
                Verified Road Hero
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-0.5 flex items-center space-x-3">
              <span>{user.phone}</span>
              <span>•</span>
              <span>Vehicle: Commercial Cab / Taxi</span>
            </p>
          </div>
        </div>

        {/* Rewards Mileage Pill */}
        <div className="flex items-center space-x-3 bg-[#202429] p-3 rounded-2xl border border-gray-800">
          <div className="w-10 h-10 rounded-xl bg-road-yellow/15 flex items-center justify-center text-road-yellow font-black">
            ★
          </div>
          <div>
            <p className="text-[11px] text-gray-400">ChaloRewards Balance</p>
            <p className="text-base font-black text-white font-mono">{user.loyaltyPoints} Sleep Points</p>
          </div>
          <Link
            href="/rewards"
            className="text-xs text-highway-yellow hover:underline ml-2 font-bold"
          >
            Redeem
          </Link>
        </div>
      </div>

      {/* Highlights Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Total Stays</span>
          <p className="text-2xl font-black text-white font-mono mt-1">{bookings.length}</p>
          <span className="text-[10px] text-green-400">Safe Highway Breaks</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Hours Rested</span>
          <p className="text-2xl font-black text-road-yellow font-mono mt-1">{totalHoursRested}h</p>
          <span className="text-[10px] text-gray-500">Anti-Fatigue Recharge</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Saved vs Full Hotel</span>
          <p className="text-2xl font-black text-green-400 font-mono mt-1">₹4,200+</p>
          <span className="text-[10px] text-gray-500">Pay-per-hour efficiency</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Emergency SOS</span>
          <p className="text-xs font-black text-highway-orange font-mono mt-2">1800-CHALO-REST</p>
          <span className="text-[10px] text-gray-500">24/7 Roadside Assistance</span>
        </div>
      </div>

      {/* Active Stay Timer Banner (If Active Booking Exists) */}
      {activeBooking && (
        <div>
          <ActiveStayTimer
            booking={activeBooking}
            onExtend={async (hours, paymentMethod) => {
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
                // fallback below
              }
              const fallback = extendBooking(activeBooking.id, hours, paymentMethod);
              if (fallback.success && fallback.booking) {
                setActiveBooking({ ...fallback.booking });
                return true;
              }
              return false;
            }}
          />
        </div>
      )}

      {/* Recent Bookings & Highway History */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#25292E] pb-4">
          <div>
            <h3 className="text-lg font-black text-white">Recent Hourly Stays</h3>
            <p className="text-xs text-gray-400 mt-0.5">Your past rest stops, bed numbers, and invoices</p>
          </div>
          <Link
            href="/dashboard/bookings"
            className="text-xs font-bold text-highway-orange hover:underline flex items-center"
          >
            <span>View All</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="space-y-3">
          {bookings.map((b) => (
            <div
              key={b.id}
              className="bg-[#202429] border border-gray-800 rounded-2xl p-4 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
            >
              <div className="space-y-1">
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
                </div>
                <h4 className="text-sm font-bold text-white">{b.propertyName}</h4>
                <p className="text-xs text-gray-400 flex items-center">
                  <Bed className="w-3.5 h-3.5 mr-1 text-road-yellow" />
                  <span>{b.bedNumber} ({b.roomName}) • {b.durationHours} Hours</span>
                </p>
              </div>

              <div className="flex items-center space-x-4 self-end sm:self-auto">
                <div className="text-right">
                  <p className="text-sm font-black text-road-yellow font-mono">₹{b.totalAmount}</p>
                  <p className="text-[10px] text-gray-400 font-mono">
                    {new Date(b.createdAt).toLocaleDateString()}
                  </p>
                </div>
                <button
                  onClick={() => alert(`Invoice #${b.bookingCode} downloaded!`)}
                  className="p-2 bg-[#25292E] hover:bg-[#32373E] border border-gray-700 text-gray-300 rounded-xl"
                  title="Download Invoice"
                >
                  <Download className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
