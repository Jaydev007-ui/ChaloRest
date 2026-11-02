'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_PROPERTIES } from '@/data/seedData';
import { store } from '@/lib/store';
import { 
  Gauge, 
  MapPin, 
  Navigation, 
  Bed, 
  PhoneCall, 
  Clock, 
  QrCode, 
  ShieldCheck, 
  ChevronRight,
  ArrowRight,
  Zap,
  CheckCircle2,
  AlertTriangle
} from 'lucide-react';

export default function DriverModePage() {
  const properties = DEMO_PROPERTIES;
  const activeBooking = store.bookings.find(b => b.status === 'CHECKED_IN' || b.status === 'CONFIRMED');
  const [selectedQuickStop, setSelectedQuickStop] = useState(properties[0]);
  const [showQRPopup, setShowQRPopup] = useState(false);

  return (
    <div className="min-h-screen bg-[#0D0E10] text-white p-4 sm:p-6 pb-20 space-y-6 select-none">
      {/* High-Contrast Driver Top Header */}
      <div className="bg-[#17191C] border-2 border-road-yellow rounded-3xl p-5 flex items-center justify-between shadow-2xl">
        <div className="flex items-center space-x-3">
          <div className="w-12 h-12 rounded-2xl bg-road-yellow text-black flex items-center justify-center font-black">
            <Gauge className="w-7 h-7" />
          </div>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black bg-road-yellow text-black px-2 py-0.5 rounded">
                DRIVER COCKPIT MODE
              </span>
              <span className="text-xs text-green-400 font-bold font-mono">GPS ACTIVE</span>
            </div>
            <h1 className="text-xl sm:text-2xl font-black text-white mt-0.5">
              One-Touch Rest Stop Finder
            </h1>
          </div>
        </div>

        {/* Exit Driver Mode */}
        <Link
          href="/"
          className="bg-[#25292E] hover:bg-[#32373E] text-gray-300 text-xs font-bold px-3 py-2 rounded-xl border border-gray-700"
        >
          Exit Mode
        </Link>
      </div>

      {/* Emergency Roadside SOS Button - Extra Large */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <a
          href="tel:1800242567"
          className="bg-red-600 hover:bg-red-700 text-white font-black text-lg py-5 px-6 rounded-3xl shadow-2xl flex items-center justify-center space-x-3 border-2 border-red-400 active:scale-95 transition-all"
        >
          <PhoneCall className="w-7 h-7" />
          <span>ROAD EMERGENCY / DISPATCH (TOLL-FREE)</span>
        </a>

        {/* Active QR Fast Access if has active stay */}
        {activeBooking ? (
          <button
            type="button"
            onClick={() => setShowQRPopup(true)}
            className="bg-green-600 hover:bg-green-700 text-white font-black text-lg py-5 px-6 rounded-3xl shadow-2xl flex items-center justify-center space-x-3 border-2 border-green-400 active:scale-95 transition-all"
          >
            <QrCode className="w-7 h-7" />
            <span>MY CHECK-IN QR PASS (#{activeBooking.bookingCode})</span>
          </button>
        ) : (
          <div className="bg-[#17191C] border border-gray-800 rounded-3xl p-5 flex items-center justify-between">
            <div className="space-y-0.5">
              <span className="text-[11px] font-bold text-gray-400 uppercase">Current Highway Corridor</span>
              <p className="text-base font-bold text-white">NH 48 (Vadodara - Bharuch - Surat)</p>
            </div>
            <span className="text-xs bg-green-500/20 text-green-400 px-3 py-1 rounded-xl font-bold border border-green-500/30">
              4 Stops Near
            </span>
          </div>
        )}
      </div>

      {/* Touch-Friendly Nearby Rest Stops List */}
      <div className="space-y-4">
        <h2 className="text-base font-black text-road-yellow uppercase tracking-wider flex items-center">
          <MapPin className="w-5 h-5 mr-1.5 text-highway-orange" />
          Nearby Verified Highway Rest Hubs (Parked Mode)
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {properties.map((prop, index) => {
            const availableBeds = prop.rooms.reduce(
              (acc, r) => acc + r.beds.filter(b => b.isAvailable && !b.isBlocked).length,
              0
            );

            return (
              <div
                key={prop.id}
                className="bg-[#17191C] border-2 border-gray-800 hover:border-road-yellow rounded-3xl p-5 space-y-4 shadow-xl transition-all"
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="bg-road-yellow text-black font-black text-xs px-2 py-0.5 rounded">
                        #{index + 1}
                      </span>
                      <h3 className="text-lg font-black text-white">{prop.name}</h3>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 flex items-center">
                      <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange flex-shrink-0" />
                      {prop.address}
                    </p>
                  </div>

                  <div className="text-right">
                    <p className="text-2xl font-black text-road-yellow font-mono">₹{prop.baseHourlyRate}</p>
                    <p className="text-[10px] text-gray-400 font-bold uppercase">per hour</p>
                  </div>
                </div>

                {/* Big Info Badges */}
                <div className="grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="bg-[#202429] p-2.5 rounded-xl border border-gray-700">
                    <p className="text-[10px] text-gray-400">Detour</p>
                    <p className="text-sm font-black text-white font-mono">
                      {prop.detourDistanceKm === 0 ? '0 km' : `${prop.detourDistanceKm} km`}
                    </p>
                  </div>
                  <div className="bg-[#202429] p-2.5 rounded-xl border border-gray-700">
                    <p className="text-[10px] text-gray-400">Available Beds</p>
                    <p className="text-sm font-black text-green-400 font-mono">{availableBeds} Ready</p>
                  </div>
                  <div className="bg-[#202429] p-2.5 rounded-xl border border-gray-700">
                    <p className="text-[10px] text-gray-400">Rating</p>
                    <p className="text-sm font-black text-road-yellow font-mono">★ {prop.rating}</p>
                  </div>
                </div>

                {/* Touch CTAs: One-tap Directions + One-tap Bed Booking */}
                <div className="grid grid-cols-2 gap-3 pt-1">
                  <a
                    href={`https://maps.google.com/?q=${prop.gpsLat},${prop.gpsLng}`}
                    target="_blank"
                    rel="noreferrer"
                    className="bg-[#25292E] hover:bg-[#32373E] text-white font-bold text-xs sm:text-sm py-3.5 px-3 rounded-2xl border border-gray-600 flex items-center justify-center space-x-1.5 transition-all text-center"
                  >
                    <Navigation className="w-4 h-4 text-road-yellow" />
                    <span>TAP DIRECTIONS</span>
                  </a>

                  <Link
                    href={`/hotels/${prop.slug}`}
                    className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs sm:text-sm py-3.5 px-3 rounded-2xl shadow-lg shadow-highway-orange/20 flex items-center justify-center space-x-1.5 transition-all text-center"
                  >
                    <Bed className="w-4 h-4" />
                    <span>QUICK BOOK BED</span>
                  </Link>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* QR Popup modal */}
      {showQRPopup && activeBooking && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/90 backdrop-blur-md">
          <div className="bg-[#17191C] border-2 border-road-yellow rounded-3xl max-w-sm w-full p-6 text-center space-y-4">
            <h3 className="text-xl font-black text-white">ChaloRest FastPass</h3>
            <p className="text-xs text-gray-300">Show to hotel front desk for check-in</p>

            <div className="bg-white p-4 rounded-2xl inline-block mx-auto">
              <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
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
                <rect x="35" y="10" width="15" height="10" fill="#FF8A24" />
                <rect x="55" y="25" width="10" height="15" fill="#17191C" />
                <rect x="35" y="50" width="30" height="10" fill="#17191C" />
                <rect x="70" y="75" width="20" height="15" fill="#17191C" />
              </svg>
            </div>

            <div className="text-xs font-mono text-left bg-[#202429] p-3 rounded-xl border border-gray-700 space-y-1">
              <p><span className="text-gray-400">Bed:</span> <span className="text-white font-bold">{activeBooking.bedNumber}</span></p>
              <p><span className="text-gray-400">Hotel:</span> <span className="text-white">{activeBooking.propertyName}</span></p>
              <p><span className="text-gray-400">Code:</span> <span className="text-road-yellow font-bold">{activeBooking.bookingCode}</span></p>
            </div>

            <button
              onClick={() => setShowQRPopup(false)}
              className="w-full bg-road-yellow text-black font-black text-sm py-3.5 rounded-2xl"
            >
              CLOSE PASS
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
