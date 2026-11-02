'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { ArrowLeft, Building2, MapPin, CheckCircle2, XCircle, Search, ShieldCheck } from 'lucide-react';

export default function AdminHotelsPage() {
  const [properties, setProperties] = useState(store.properties);
  const [search, setSearch] = useState('');

  const toggleApproval = (id: string) => {
    const updated = properties.map((p) => {
      if (p.id !== id) return p;
      return { ...p, isVerified: !p.isVerified };
    });
    store.properties = updated;
    setProperties(updated);
  };

  const filtered = properties.filter(p =>
    p.name.toLowerCase().includes(search.toLowerCase()) ||
    p.city.toLowerCase().includes(search.toLowerCase()) ||
    p.highway.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <Link
          href="/admin"
          className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Admin Console
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Hotel Partner Approvals & Safety Verification
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Review accommodation floor dimensions, fire exits, and approve properties before they appear on the public engine.
        </p>
      </div>

      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 shadow-xl space-y-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Filter by hotel name, city, highway..."
          className="w-full bg-[#202429] border border-gray-700 rounded-xl px-4 py-2.5 text-xs text-white"
        />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filtered.map((p) => (
            <div
              key={p.id}
              className="bg-[#202429] p-5 rounded-2xl border border-gray-800 space-y-3"
            >
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="font-bold text-white text-base">{p.name}</h3>
                  <p className="text-xs text-gray-400">{p.highway} • {p.city}</p>
                  <p className="text-[11px] text-gray-500 font-mono mt-0.5">Owner: {p.ownerName} ({p.contactPhone})</p>
                </div>
                <span
                  className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                    p.isVerified
                      ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                      : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                  }`}
                >
                  {p.isVerified ? 'VERIFIED' : 'PENDING'}
                </span>
              </div>

              <div className="grid grid-cols-2 gap-2 text-xs text-gray-300">
                <span className="bg-[#181B1F] p-2 rounded-lg border border-gray-800">
                  Rooms: {p.rooms.length} Dedicated
                </span>
                <span className="bg-[#181B1F] p-2 rounded-lg border border-gray-800">
                  Truck Parking: {p.truckParking ? 'Yes (Verified)' : 'No'}
                </span>
              </div>

              <div className="pt-2 border-t border-gray-800 flex items-center justify-between">
                <span className="text-xs font-mono font-bold text-road-yellow">
                  Base: ₹{p.baseHourlyRate}/hr
                </span>
                <button
                  type="button"
                  onClick={() => toggleApproval(p.id)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    p.isVerified
                      ? 'bg-red-950 text-red-400 hover:bg-red-900'
                      : 'bg-green-600 hover:bg-green-700 text-white'
                  }`}
                >
                  {p.isVerified ? 'Revoke Approval' : 'Grant Verification'}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
