import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ShieldCheck, Heart, Truck, Award, ArrowRight, PhoneCall } from 'lucide-react';

export default function AboutPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-16">
      {/* Brand Mission */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-road-yellow text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          OUR STORY & MISSION
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          Dignified Rest for India’s Highway Heroes
        </h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          ChaloRest was founded on a simple observation: millions of commercial cab drivers, logistics truck operators, and long-distance road-trippers drive on Indian highways every single night with nowhere affordable to sleep.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-xl">
        <div className="space-y-4">
          <h2 className="text-2xl font-black text-white">
            The Problem: Sleep Deprivation on Indian Highways
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            According to road safety studies, over 40% of highway accidents in India are caused by driver fatigue. Commercial drivers often cannot afford ₹2,000 to ₹3,500 daily hotel rates just to get 3 hours of sleep, leading them to rest uncomfortably across vehicle steering wheels or roadside dhabas.
          </p>
          <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
            ChaloRest transforms this reality. By partnering with existing highway hotels and organizing dedicated 4-bed and 8-bed shared rooms at ₹30–₹50/hour, we make quality sleep, hot showers, and vehicle security accessible to everyone on the road.
          </p>
        </div>
        <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
          <Image src="/images/highway-hero.jpg" alt="Highway Mission" fill className="object-cover" sizes="50vw" />
        </div>
      </div>

      {/* Core Values */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        <div className="bg-[#1A1D21] border border-gray-800 p-6 rounded-2xl space-y-2">
          <span className="text-2xl">⚡</span>
          <h4 className="font-bold text-white text-base">Affordable</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Pay strictly for the time you stay. A 3-hour recharge break costs just ₹90–₹120.
          </p>
        </div>
        <div className="bg-[#1A1D21] border border-gray-800 p-6 rounded-2xl space-y-2">
          <span className="text-2xl">🛡️</span>
          <h4 className="font-bold text-white text-base">Accessible</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Strategically located along key highway corridors with 0 to 0.5 km detour from your main route.
          </p>
        </div>
        <div className="bg-[#1A1D21] border border-gray-800 p-6 rounded-2xl space-y-2">
          <span className="text-2xl">✨</span>
          <h4 className="font-bold text-white text-base">Convenient</h4>
          <p className="text-xs text-gray-400 leading-relaxed">
            Instant smartphone booking, live bed schematics, and 10-second digital QR code check-in.
          </p>
        </div>
      </div>
    </div>
  );
}
