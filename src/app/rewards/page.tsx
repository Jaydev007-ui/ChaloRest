'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { 
  Award, 
  Gift, 
  Sparkles, 
  Star, 
  CheckCircle2, 
  Copy, 
  ArrowRight,
  ShieldCheck,
  Zap
} from 'lucide-react';

export default function RewardsPage() {
  const user = store.currentUser;
  const [copiedCoupon, setCopiedCoupon] = useState<string | null>(null);

  const coupons = [
    { code: 'REST30', discount: '₹30 Instant Off', desc: 'Valid on stays of 3 hours or more', minHours: 3 },
    { code: 'NIGHTNAP', discount: 'Free 1-Hour Extension', desc: 'Valid between 11 PM and 5 AM', minHours: 4 },
    { code: 'TRUCKER50', discount: '₹50 Off Heavy Truck Stays', desc: 'Exclusive for commercial logistics drivers', minHours: 4 },
  ];

  const handleCopy = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCoupon(code);
    setTimeout(() => setCopiedCoupon(null), 2000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Rewards Hero Banner */}
      <div className="bg-gradient-to-r from-[#17191C] via-[#242A32] to-[#17191C] border border-road-yellow/40 rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
        <span className="bg-road-yellow text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          CHALOREWARDS & HIGHWAY MILES
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Rest More. Save More. Drive Safe.
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Earn 10 Sleep Points for every hour rested at any verified ChaloRest partner lodge across Indian highways. Redeem points for free extension hours and dhaba meal discounts.
        </p>

        {/* User Balance Card */}
        <div className="inline-flex items-center space-x-4 bg-[#121417] border border-gray-800 p-4 rounded-2xl shadow-xl mt-4">
          <div className="w-12 h-12 rounded-xl bg-road-yellow text-black flex items-center justify-center font-black text-xl">
            ★
          </div>
          <div className="text-left">
            <p className="text-xs text-gray-400">Your Current Sleep Balance</p>
            <p className="text-2xl font-black text-white font-mono">{user.loyaltyPoints} Points</p>
          </div>
        </div>
      </div>

      {/* Tiers Matrix */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#181B1F] border border-gray-800 rounded-3xl p-6 space-y-4">
          <span className="text-xs font-bold text-gray-400 uppercase">Tier 1</span>
          <h3 className="text-xl font-black text-white">Silver Roadie</h3>
          <p className="text-xs text-gray-400">1 – 20 Hours Rested</p>
          <ul className="text-xs text-gray-300 space-y-2 pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Earn 10 pts per rested hour</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-green-400" />
              <span>Free instant check-in pass</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#1C2025] border-2 border-highway-orange rounded-3xl p-6 space-y-4 relative shadow-xl">
          <span className="absolute top-3 right-4 bg-highway-orange text-white text-[10px] font-black px-2 py-0.5 rounded">
            ACTIVE TIER
          </span>
          <span className="text-xs font-bold text-highway-orange uppercase">Tier 2</span>
          <h3 className="text-xl font-black text-white">Gold Transporter</h3>
          <p className="text-xs text-gray-400">20 – 60 Hours Rested</p>
          <ul className="text-xs text-gray-300 space-y-2 pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-highway-orange" />
              <span>15 pts per rested hour (1.5x)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-highway-orange" />
              <span>1 Free 30-min extension grace period</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-highway-orange" />
              <span>Complimentary morning tea/coffee</span>
            </li>
          </ul>
        </div>

        <div className="bg-[#181B1F] border border-road-yellow/40 rounded-3xl p-6 space-y-4">
          <span className="text-xs font-bold text-road-yellow uppercase">Tier 3</span>
          <h3 className="text-xl font-black text-white">Highway Master</h3>
          <p className="text-xs text-gray-400">60+ Hours Rested</p>
          <ul className="text-xs text-gray-300 space-y-2 pt-2">
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-road-yellow" />
              <span>20 pts per rested hour (2x)</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-road-yellow" />
              <span>Priority bed hold during peak hours</span>
            </li>
            <li className="flex items-center space-x-2">
              <CheckCircle2 className="w-4 h-4 text-road-yellow" />
              <span>Guaranteed free trailer parking bay</span>
            </li>
          </ul>
        </div>
      </div>

      {/* Active Discount Coupons */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        <h3 className="text-lg font-black text-white">Active Highway Rest Coupons</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {coupons.map((c) => (
            <div
              key={c.code}
              className="bg-[#202429] border border-gray-800 rounded-2xl p-4 flex flex-col justify-between space-y-3"
            >
              <div>
                <p className="font-mono font-black text-base text-road-yellow">{c.code}</p>
                <p className="font-bold text-white text-sm mt-0.5">{c.discount}</p>
                <p className="text-[11px] text-gray-400 mt-1">{c.desc}</p>
              </div>

              <button
                type="button"
                onClick={() => handleCopy(c.code)}
                className="w-full bg-[#2A3037] hover:bg-[#343C45] text-xs font-bold py-2 rounded-xl text-gray-200 transition-all flex items-center justify-center space-x-1"
              >
                {copiedCoupon === c.code ? (
                  <span className="text-green-400">COPIED!</span>
                ) : (
                  <>
                    <Copy className="w-3.5 h-3.5" />
                    <span>Copy Coupon Code</span>
                  </>
                )}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
