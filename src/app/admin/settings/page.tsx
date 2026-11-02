'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { ArrowLeft, Settings, Save, CheckCircle2, ShieldAlert } from 'lucide-react';

export default function AdminSettingsPage() {
  const [takeRate, setTakeRate] = useState(store.platformCommissionPercent);
  const [emergencyPhone, setEmergencyPhone] = useState('1800-242-567');
  const [maxStayHours, setMaxStayHours] = useState(12);
  const [minPrice, setMinPrice] = useState(30);
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    store.platformCommissionPercent = takeRate;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        href="/admin"
        className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Platform Admin Console
      </Link>

      <div className="border-b border-[#25292E] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          ChaloRest Global Platform Configuration
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Configure default highway rest pricing corridors, emergency dispatch routing, and commission take rates.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Default Platform Commission (%)
            </label>
            <input
              type="number"
              min="5"
              max="25"
              value={takeRate}
              onChange={(e) => setTakeRate(Number(e.target.value))}
              required
              className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Highway Emergency Dispatch Toll-Free Phone
            </label>
            <input
              type="text"
              value={emergencyPhone}
              onChange={(e) => setEmergencyPhone(e.target.value)}
              required
              className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Minimum Hourly Rate Floor (₹)
            </label>
            <input
              type="number"
              min="20"
              max="50"
              value={minPrice}
              onChange={(e) => setMinPrice(Number(e.target.value))}
              required
              className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">
              Maximum Single Stay Duration (Hours)
            </label>
            <input
              type="number"
              min="6"
              max="24"
              value={maxStayHours}
              onChange={(e) => setMaxStayHours(Number(e.target.value))}
              required
              className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white font-mono"
            />
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-green-950/60 border border-green-500/50 rounded-xl text-xs text-green-300 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
            <span>Global platform configuration updated successfully!</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition-all"
        >
          UPDATE PLATFORM SETTINGS
        </button>
      </form>
    </div>
  );
}
