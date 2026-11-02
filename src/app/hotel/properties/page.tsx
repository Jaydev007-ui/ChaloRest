'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { store } from '@/lib/store';
import { ArrowLeft, Building2, MapPin, Bed, Star, Edit3, Plus } from 'lucide-react';

export default function HotelPropertiesListPage() {
  const properties = store.properties;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25292E] pb-6">
        <div>
          <Link
            href="/hotel/dashboard"
            className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Partner Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            My Registered Properties
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Manage your partner listings, highway markers, and dedicated room allocations.
          </p>
        </div>

        <Link
          href="/partner"
          className="bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-xs px-5 py-3 rounded-xl shadow-lg flex items-center self-start sm:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Register Additional Property</span>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {properties.map((p) => {
          const totalBeds = p.rooms.reduce((acc, r) => acc + r.beds.length, 0);

          return (
            <div
              key={p.id}
              className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 shadow-xl flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-900 border border-gray-800">
                  <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="500px" />
                  <div className="absolute top-3 right-3 bg-black/80 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-road-yellow">
                    ₹{p.baseHourlyRate}/hr
                  </div>
                </div>

                <div className="flex items-center justify-between">
                  <h3 className="text-lg font-black text-white">{p.name}</h3>
                  <span className="text-xs text-green-400 font-bold bg-green-500/10 px-2 py-0.5 rounded border border-green-500/30">
                    ★ {p.rating}
                  </span>
                </div>

                <p className="text-xs text-gray-400 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange" />
                  {p.address}
                </p>

                <div className="flex flex-wrap gap-2 text-xs text-gray-300">
                  <span className="bg-[#202429] px-2.5 py-1 rounded-lg border border-gray-800">
                    🛏️ {p.rooms.length} Rooms • {totalBeds} Hourly Beds
                  </span>
                  {p.truckParking && (
                    <span className="bg-blue-500/10 text-blue-400 px-2.5 py-1 rounded-lg border border-blue-500/20">
                      🚛 {p.truckParkingCapacity} Truck Bays
                    </span>
                  )}
                </div>
              </div>

              <div className="pt-3 border-t border-[#25292E] flex items-center justify-between">
                <Link
                  href="/hotel/beds"
                  className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-200 font-bold text-xs px-4 py-2 rounded-xl"
                >
                  Configure Beds
                </Link>
                <Link
                  href={`/hotels/${p.slug}`}
                  className="text-xs text-highway-orange hover:underline font-bold"
                >
                  View Live Page ➔
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
