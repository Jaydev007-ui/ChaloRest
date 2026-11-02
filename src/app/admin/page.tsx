'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { 
  ShieldCheck, 
  Building2, 
  Users, 
  DollarSign, 
  Percent, 
  CheckCircle2, 
  XCircle, 
  Clock, 
  Settings, 
  AlertTriangle,
  Sliders,
  TrendingUp,
  Download
} from 'lucide-react';

export default function AdminDashboardPage() {
  const [properties, setProperties] = useState(store.properties);
  const [commissionPercent, setCommissionPercent] = useState(store.platformCommissionPercent || 12);
  const [commissionSaved, setCommissionSaved] = useState(false);
  const bookings = store.bookings;
  const users = store.users;

  const totalGrossRevenue = bookings.reduce((acc, b) => acc + b.totalAmount, 0) + 128500;
  const platformRevenue = Math.round(totalGrossRevenue * (commissionPercent / 100));
  const hotelPayouts = totalGrossRevenue - platformRevenue;

  const togglePropertyApproval = (propId: string) => {
    const updated = properties.map((p) => {
      if (p.id !== propId) return p;
      return { ...p, isVerified: !p.isVerified };
    });
    store.properties = updated;
    setProperties(updated);
  };

  const togglePropertyPublished = (propId: string) => {
    const updated = properties.map((p) => {
      if (p.id !== propId) return p;
      return { ...p, isPublished: !p.isPublished };
    });
    store.properties = updated;
    setProperties(updated);
  };

  const handleSaveCommission = () => {
    store.platformCommissionPercent = commissionPercent;
    setCommissionSaved(true);
    setTimeout(() => setCommissionSaved(false), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Admin Title */}
      <div className="bg-[#181B1F] border border-red-500/30 rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-red-500 text-white text-xs font-black px-2.5 py-0.5 rounded uppercase">
              CHALOREST SYSTEM ADMIN
            </span>
            <span className="text-xs text-gray-400 font-mono">ROLE: SUPERADMINISTRATOR</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Platform Master Console
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Overseeing all highway hotels, transactional bed locks, commission payouts, and driver safety audits.
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('Platform compliance report exported!')}
            className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-200 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center"
          >
            <Download className="w-4 h-4 mr-1.5 text-highway-orange" />
            <span>Export Financial Audit</span>
          </button>
        </div>
      </div>

      {/* Overview Analytics Matrix */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Total Platform Volume</span>
          <p className="text-2xl font-black text-white font-mono mt-1">₹{totalGrossRevenue.toLocaleString()}</p>
          <span className="text-[10px] text-green-400">Total customer spend</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">ChaloRest Commission</span>
          <p className="text-2xl font-black text-highway-orange font-mono mt-1">₹{platformRevenue.toLocaleString()}</p>
          <span className="text-[10px] text-gray-400">At {commissionPercent}% take rate</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Partner Hotel Payouts</span>
          <p className="text-2xl font-black text-road-yellow font-mono mt-1">₹{hotelPayouts.toLocaleString()}</p>
          <span className="text-[10px] text-gray-500">Settled weekly to hotels</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-4 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Registered Hotels</span>
          <p className="text-2xl font-black text-green-400 font-mono mt-1">{properties.length}</p>
          <span className="text-[10px] text-gray-500">{properties.filter(p => p.isVerified).length} Verified</span>
        </div>
      </div>

      {/* Commission Configuration Slider */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25292E] pb-4">
          <div>
            <h3 className="text-lg font-black text-white">Platform Commission Settings</h3>
            <p className="text-xs text-gray-400">
              Configure the revenue share deducted from hotel partner earnings per hourly booking.
            </p>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-2xl font-black text-highway-orange font-mono">
              {commissionPercent}%
            </span>
            <button
              onClick={handleSaveCommission}
              className="bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
            >
              Save Take Rate
            </button>
          </div>
        </div>

        <div className="pt-2">
          <input
            type="range"
            min="5"
            max="25"
            step="1"
            value={commissionPercent}
            onChange={(e) => setCommissionPercent(Number(e.target.value))}
            className="w-full accent-highway-orange cursor-pointer"
          />
          <div className="flex justify-between text-xs text-gray-500 font-mono mt-1">
            <span>5% (Growth Incentive)</span>
            <span>12% (Standard Model)</span>
            <span>25% (Premium Hubs)</span>
          </div>
        </div>

        {commissionSaved && (
          <p className="text-xs text-green-400 font-bold flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-1" />
            Platform commission updated to {commissionPercent}%!
          </p>
        )}
      </div>

      {/* Hotel Approvals & Verification Table */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#25292E] pb-3">
          <div>
            <h3 className="text-lg font-black text-white">Partner Hotel Verification Roster</h3>
            <p className="text-xs text-gray-400">Approve, verify, or suspend partner listings on the public engine</p>
          </div>
          <span className="text-xs text-gray-400 font-mono">{properties.length} Properties</span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#202429] text-gray-400 uppercase text-[10px] font-mono">
              <tr>
                <th className="p-3 rounded-l-xl">Hotel Name</th>
                <th className="p-3">Highway Location</th>
                <th className="p-3">Rooms / Beds</th>
                <th className="p-3">Hourly Rate</th>
                <th className="p-3">Audit Status</th>
                <th className="p-3">Visibility</th>
                <th className="p-3 rounded-r-xl">Controls</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25292E]">
              {properties.map((prop) => {
                const totalBedCount = prop.rooms.reduce((acc, r) => acc + r.beds.length, 0);

                return (
                  <tr key={prop.id} className="hover:bg-[#202429]/50 transition-colors">
                    <td className="p-3 font-bold text-white">
                      <p className="text-sm">{prop.name}</p>
                      <p className="text-[10px] text-gray-400 font-normal">Owner: {prop.ownerName}</p>
                    </td>
                    <td className="p-3 text-gray-300">
                      <p>{prop.highway}</p>
                      <p className="text-[10px] text-gray-500">{prop.city}, {prop.state}</p>
                    </td>
                    <td className="p-3 font-mono font-bold text-white">
                      {prop.rooms.length} Rooms • {totalBedCount} Beds
                    </td>
                    <td className="p-3 font-mono text-road-yellow font-bold">
                      ₹{prop.baseHourlyRate}/hr
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          prop.isVerified
                            ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                            : 'bg-yellow-500/20 text-yellow-400 border border-yellow-500/30'
                        }`}
                      >
                        {prop.isVerified ? 'VERIFIED' : 'PENDING AUDIT'}
                      </span>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-2 py-0.5 rounded text-[10px] font-bold uppercase ${
                          prop.isPublished
                            ? 'bg-blue-500/20 text-blue-400'
                            : 'bg-red-500/20 text-red-400'
                        }`}
                      >
                        {prop.isPublished ? 'PUBLIC' : 'SUSPENDED'}
                      </span>
                    </td>
                    <td className="p-3 space-x-2">
                      <button
                        onClick={() => togglePropertyApproval(prop.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          prop.isVerified
                            ? 'bg-[#25292E] text-gray-300 hover:text-white'
                            : 'bg-green-600 hover:bg-green-700 text-white'
                        }`}
                      >
                        {prop.isVerified ? 'Revoke Verification' : 'Approve Partner'}
                      </button>
                      <button
                        onClick={() => togglePropertyPublished(prop.id)}
                        className={`px-2.5 py-1 rounded-lg text-[11px] font-bold transition-all ${
                          prop.isPublished
                            ? 'bg-red-950 text-red-400 hover:bg-red-900'
                            : 'bg-blue-600 text-white hover:bg-blue-700'
                        }`}
                      >
                        {prop.isPublished ? 'Suspend' : 'Publish'}
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
