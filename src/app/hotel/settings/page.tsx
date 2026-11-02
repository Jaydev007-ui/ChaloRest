'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { ArrowLeft, Building2, Save, CheckCircle2 } from 'lucide-react';

export default function HotelSettingsPage() {
  const property = store.properties[0];
  const [phone, setPhone] = useState(property.contactPhone);
  const [email, setEmail] = useState(property.contactEmail);
  const [gracePeriod, setGracePeriod] = useState(property.gracePeriodMins || 15);
  const [bankAccount, setBankAccount] = useState('HDFC Bank - A/C ********9821');
  const [ifsc, setIfsc] = useState('HDFC0001234');
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    property.contactPhone = phone;
    property.contactEmail = email;
    property.gracePeriodMins = gracePeriod;
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        href="/hotel/dashboard"
        className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Partner Dashboard
      </Link>

      <div className="border-b border-[#25292E] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Hotel Partner Settings & Bank Payout Details
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Configure check-in grace periods, reception dispatch numbers, and settlement account.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider border-b border-[#25292E] pb-2">
            Operations & Contact
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Reception 24/7 Helpline</label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Manager Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">
                Check-in Hold Grace Period (Minutes)
              </label>
              <input
                type="number"
                min="10"
                max="45"
                value={gracePeriod}
                onChange={(e) => setGracePeriod(Number(e.target.value))}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        <div className="space-y-4 pt-4 border-t border-[#25292E]">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider border-b border-[#25292E] pb-2">
            Bank Settlement Account (For Weekly Payouts)
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Bank Name & Account Number</label>
              <input
                type="text"
                value={bankAccount}
                onChange={(e) => setBankAccount(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">IFSC Code</label>
              <input
                type="text"
                value={ifsc}
                onChange={(e) => setIfsc(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white font-mono"
              />
            </div>
          </div>
        </div>

        {saved && (
          <div className="p-3 bg-green-950/60 border border-green-500/50 rounded-xl text-xs text-green-300 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
            <span>Settings and settlement parameters saved successfully!</span>
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-xs py-3.5 rounded-xl shadow-lg transition-all"
        >
          SAVE PARTNER SETTINGS
        </button>
      </form>
    </div>
  );
}
