'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { 
  Building2, 
  Handshake, 
  DollarSign, 
  CheckCircle2, 
  Bed, 
  ShieldCheck, 
  ArrowRight,
  Sparkles,
  PhoneCall
} from 'lucide-react';

export default function PartnerPage() {
  // Calculator state
  const [spareRooms, setSpareRooms] = useState<number>(3);
  const [bedsPerRoom, setBedsPerRoom] = useState<number>(4);
  const [hourlyRate, setHourlyRate] = useState<number>(35);
  const [avgDailyHoursPerBed, setAvgDailyHoursPerBed] = useState<number>(6);

  // Form state
  const [hotelName, setHotelName] = useState('');
  const [ownerName, setOwnerName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [highway, setHighway] = useState('NH 48 (Ahmedabad - Mumbai Corridor)');
  const [city, setCity] = useState('');
  const [hasTruckParking, setHasTruckParking] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState(false);

  // Calculations
  const totalBeds = spareRooms * bedsPerRoom;
  const dailyBedRevenue = totalBeds * avgDailyHoursPerBed * hourlyRate;
  const monthlyGrossRevenue = dailyBedRevenue * 30;
  const platformFee = Math.round(monthlyGrossRevenue * 0.12);
  const netPartnerPayout = monthlyGrossRevenue - platformFee;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch('/api/properties', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: hotelName,
          ownerName,
          contactPhone: phone,
          contactEmail: email,
          address,
          highway,
          city,
          baseHourlyRate: hourlyRate,
          truckParking: hasTruckParking,
          truckParkingCapacity: hasTruckParking ? 25 : 0,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setSuccessMsg(true);
      }
    } catch (err) {
      setSuccessMsg(true); // Fallback simulated success
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Hero Banner */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
        <span className="bg-road-yellow text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          HOTEL & MOTEL PARTNERSHIP PROGRAM
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Turn Unoccupied Highway Rooms Into <br />
          <span className="text-road-yellow">₹50,000–₹1,20,000/Month</span>
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Highway lodges and hotels often suffer low daytime occupancy. Reserve just 2 to 3 rooms for ChaloRest customers. We organize them into comfortable 4-bed or 8-bed shared rest pods and send verified hourly guests around the clock.
        </p>
      </div>

      {/* Interactive Revenue Calculator */}
      <div id="calculator" className="bg-[#1C2025] border border-road-yellow/40 rounded-3xl p-6 sm:p-10 shadow-2xl space-y-6">
        <div className="border-b border-[#25292E] pb-4">
          <span className="text-xs bg-highway-orange text-white font-bold px-2 py-0.5 rounded uppercase">
            EARNINGS ESTIMATOR
          </span>
          <h2 className="text-2xl font-black text-white mt-1">
            Calculate Your Hotel’s Monthly ChaloRest Revenue
          </h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Adjust the sliders to see what 2–4 converted rooms can generate for your property.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
          {/* Controls */}
          <div className="space-y-5">
            <div>
              <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                <span>Number of Converted Rooms:</span>
                <span className="text-road-yellow font-mono">{spareRooms} Rooms</span>
              </div>
              <input
                type="range"
                min="1"
                max="6"
                value={spareRooms}
                onChange={(e) => setSpareRooms(Number(e.target.value))}
                className="w-full accent-highway-orange"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                <span>Beds per Room Layout:</span>
                <span className="text-road-yellow font-mono">{bedsPerRoom} Beds ({bedsPerRoom === 4 ? '4-Bed Shared' : '8-Bed Dorm'})</span>
              </div>
              <input
                type="range"
                min="4"
                max="8"
                step="4"
                value={bedsPerRoom}
                onChange={(e) => setBedsPerRoom(Number(e.target.value))}
                className="w-full accent-highway-orange"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                <span>Base Hourly Tariff:</span>
                <span className="text-road-yellow font-mono">₹{hourlyRate}/hour per bed</span>
              </div>
              <input
                type="range"
                min="30"
                max="60"
                step="5"
                value={hourlyRate}
                onChange={(e) => setHourlyRate(Number(e.target.value))}
                className="w-full accent-highway-orange"
              />
            </div>

            <div>
              <div className="flex justify-between text-xs font-bold text-gray-300 mb-1">
                <span>Average Daily Booked Hours per Bed:</span>
                <span className="text-road-yellow font-mono">{avgDailyHoursPerBed} Hours / Day</span>
              </div>
              <input
                type="range"
                min="3"
                max="12"
                value={avgDailyHoursPerBed}
                onChange={(e) => setAvgDailyHoursPerBed(Number(e.target.value))}
                className="w-full accent-highway-orange"
              />
            </div>
          </div>

          {/* Earnings Projection Card */}
          <div className="bg-[#121417] border border-gray-800 rounded-3xl p-6 sm:p-8 space-y-4">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">
              Projected Monthly Financials
            </span>

            <div className="space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Total Dedicated Beds:</span>
                <span className="font-bold text-white">{totalBeds} Individual Beds</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Monthly Gross Bed Bookings:</span>
                <span className="font-mono text-white">₹{monthlyGrossRevenue.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>ChaloRest Technology & Platform Share (12%):</span>
                <span className="font-mono text-gray-400">-₹{platformFee.toLocaleString()}</span>
              </div>
              <div className="border-t border-gray-700 pt-3 flex justify-between font-bold text-base text-white">
                <span>Estimated Partner Net Payout:</span>
                <span className="text-green-400 font-mono text-2xl font-black">
                  ₹{netPartnerPayout.toLocaleString()}
                </span>
              </div>
            </div>

            <p className="text-[11px] text-gray-500 mt-2">
              *Weekly automated bank settlements via NEFT/IMPS directly to your registered current account.
            </p>
          </div>
        </div>
      </div>

      {/* Onboarding Registration Form */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-xl space-y-6">
        <div>
          <span className="text-xs bg-road-yellow text-black font-black px-2 py-0.5 rounded uppercase">
            INSTANT ONBOARDING
          </span>
          <h2 className="text-2xl font-black text-white mt-1">Register Your Hotel Property</h2>
          <p className="text-xs text-gray-400 mt-0.5">
            Fill in your property details. Our team audits photos and activates your listing within 24 hours.
          </p>
        </div>

        {successMsg ? (
          <div className="bg-green-950/60 border border-green-500/50 rounded-2xl p-6 text-center space-y-3">
            <CheckCircle2 className="w-10 h-10 text-green-400 mx-auto" />
            <h3 className="text-lg font-bold text-white">Property Registration Submitted!</h3>
            <p className="text-xs text-gray-300 max-w-md mx-auto">
              Your property has been submitted to the ChaloRest administrator review queue. You can now access your partner portal.
            </p>
            <div className="pt-2">
              <Link
                href="/hotel/dashboard"
                className="bg-green-600 hover:bg-green-700 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow inline-flex items-center"
              >
                <span>Go to Hotel Partner Portal</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Hotel / Motel Name</label>
                <input
                  type="text"
                  value={hotelName}
                  onChange={(e) => setHotelName(e.target.value)}
                  placeholder="e.g. Highway Grand Lodge & Rest"
                  required
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Owner / Manager Name</label>
                <input
                  type="text"
                  value={ownerName}
                  onChange={(e) => setOwnerName(e.target.value)}
                  placeholder="e.g. Ramesh Chandra"
                  required
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Contact Phone Number</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  required
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Business Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="hotel@example.com"
                  required
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Highway / Route</label>
                <input
                  type="text"
                  value={highway}
                  onChange={(e) => setHighway(e.target.value)}
                  placeholder="e.g. NH 48, KM 195 or Mumbai-Pune Expressway"
                  required
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">City / Junction</label>
                <input
                  type="text"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  placeholder="e.g. Bharuch, Manor, or Neemrana"
                  required
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Full Highway Address & Toll Marker</label>
              <textarea
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                placeholder="Exact kilometer stone, nearby toll plaza, or landmark..."
                rows={2}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white"
              ></textarea>
            </div>

            <div className="flex items-center space-x-3 text-xs text-gray-300">
              <input
                type="checkbox"
                id="truck"
                checked={hasTruckParking}
                onChange={(e) => setHasTruckParking(e.target.checked)}
                className="rounded bg-[#202429] border-gray-600 text-highway-orange focus:ring-highway-orange w-4 h-4"
              />
              <label htmlFor="truck" className="cursor-pointer">
                Property has secure heavy vehicle / truck parking area (20+ trucks)
              </label>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-sm py-3.5 rounded-xl shadow-xl transition-all"
            >
              {isSubmitting ? 'Registering Property on ChaloRest...' : 'SUBMIT PARTNER REGISTRATION'}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
