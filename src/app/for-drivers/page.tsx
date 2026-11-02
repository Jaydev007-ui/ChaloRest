'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  Truck, 
  Car, 
  Compass, 
  ShieldCheck, 
  Clock, 
  MapPin, 
  ArrowRight, 
  PhoneCall, 
  Coffee, 
  Heart,
  CheckCircle2,
  Gauge
} from 'lucide-react';

export default function ForDriversPage() {
  const [activeTab, setActiveTab] = useState<'cab' | 'truck' | 'bike'>('cab');

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12">
      {/* Driver Welfare Banner */}
      <div className="bg-gradient-to-r from-[#17191C] via-[#20252C] to-[#17191C] border border-[#2B3037] rounded-3xl p-8 sm:p-12 text-center space-y-4 shadow-2xl">
        <div className="inline-flex items-center space-x-2 bg-road-yellow/15 border border-road-yellow/40 px-3.5 py-1 rounded-full text-xs font-black text-road-yellow">
          <Truck className="w-4 h-4" />
          <span>DEDICATED TO INDIA’S COMMERCIAL & ROAD TRAVELLERS</span>
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
          Rest Like A King. Pay Like A Driver.
        </h1>
        <p className="text-sm sm:text-base text-gray-300 max-w-2xl mx-auto leading-relaxed">
          Driving continuously without proper rest causes microsleep, slow reflexes, and fatal highway collisions. ChaloRest provides clean beds with cold AC and hot showers at just ₹30–₹50/hour.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <Link
            href="/driver-mode"
            className="bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-sm px-6 py-3.5 rounded-xl shadow-lg flex items-center"
          >
            <Gauge className="w-5 h-5 mr-2" />
            <span>OPEN ONE-TOUCH DRIVER MODE</span>
          </Link>
          <a
            href="tel:1800242567"
            className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-white font-bold text-sm px-6 py-3.5 rounded-xl flex items-center"
          >
            <PhoneCall className="w-4 h-4 mr-2 text-highway-orange" />
            <span>Call 24/7 Driver Helpline</span>
          </a>
        </div>
      </div>

      {/* Driver Category Tabs */}
      <div className="flex justify-center">
        <div className="inline-flex p-1.5 bg-[#17191C] border border-gray-800 rounded-2xl">
          <button
            onClick={() => setActiveTab('cab')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'cab' ? 'bg-highway-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🚕 Cab & Taxi Operators
          </button>
          <button
            onClick={() => setActiveTab('truck')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'truck' ? 'bg-highway-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🚛 Heavy Logistics & Truckers
          </button>
          <button
            onClick={() => setActiveTab('bike')}
            className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-bold transition-all ${
              activeTab === 'bike' ? 'bg-highway-orange text-white' : 'text-gray-400 hover:text-white'
            }`}
          >
            🏍️ Motorcycle Tourers
          </button>
        </div>
      </div>

      {/* Tab Content 1: Cab Drivers */}
      {activeTab === 'cab' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-4">
            <span className="text-xs bg-highway-orange/15 text-highway-orange font-bold px-2 py-0.5 rounded uppercase">
              Intercity & Airport Cabs
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              No More Sleeping Across Folded Car Seats
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Did a one-way trip from Mumbai to Pune or Ahmedabad to Vadodara and have a return booking in the evening? Don’t waste fuel running the engine AC while trying to sleep in the passenger seat.
            </p>
            <ul className="space-y-2 text-xs text-gray-300 pt-1">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Pay only ₹105 for 3 hours of deep, dark, soundproof air-conditioned sleep.</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Take a hot shower, recharge phone, and drink fresh clean water.</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Wake up refreshed and drive your passengers with 100% alertness.</span>
              </li>
            </ul>
            <div className="pt-2">
              <Link
                href="/search"
                className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg inline-flex items-center"
              >
                <span>Find Cab Rest Stays Near Me</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
            <Image
              src="/images/shared-accommodation.jpg"
              alt="Cab Driver Resting Pod"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      )}

      {/* Tab Content 2: Truck Drivers */}
      {activeTab === 'truck' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#181B1F] border border-blue-500/40 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-4">
            <span className="text-xs bg-blue-500/20 text-blue-400 font-bold px-2 py-0.5 rounded uppercase">
              Heavy Freight & Long-Haul
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Secured Heavy Vehicle Parking & Sanitized Linens
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              We know your trailer carries precious cargo worth lakhs. ChaloRest rest hubs feature wide turning radii, heavy compaction parking lots, 24/7 armed watchmen, and high-mast floodlights.
            </p>
            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-300">
              <div className="bg-[#202429] p-3 rounded-xl border border-gray-800">
                <p className="font-bold text-white">Trailer Parking</p>
                <p className="text-gray-400 text-[11px] mt-0.5">50+ Heavy vehicle bays</p>
              </div>
              <div className="bg-[#202429] p-3 rounded-xl border border-gray-800">
                <p className="font-bold text-white">Dhaba Canteen</p>
                <p className="text-gray-400 text-[11px] mt-0.5">Pure veg hot meals 24/7</p>
              </div>
            </div>
            <div className="pt-2">
              <Link
                href="/search?truckParking=true"
                className="bg-blue-600 hover:bg-blue-700 text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg inline-flex items-center"
              >
                <span>Find Truck Rest Hubs</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
            <Image
              src="/images/truck-highway.jpg"
              alt="Highway Truck Parking"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      )}

      {/* Tab Content 3: Motorcycle Riders */}
      {activeTab === 'bike' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center bg-[#181B1F] border border-road-yellow/40 rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-4">
            <span className="text-xs bg-road-yellow/20 text-road-yellow font-bold px-2 py-0.5 rounded uppercase">
              Bikers & Moto Tourers
            </span>
            <h2 className="text-2xl sm:text-3xl font-black text-white">
              Gated Bike Parking & Locked Gear Pods
            </h2>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              Don’t drag heavy saddlebags, riding boots, and helmets around. Store them in our oversized steel luggage lockers while your bike rests in a locked covered bay with tire pressure inflators.
            </p>
            <div className="pt-2">
              <Link
                href="/search"
                className="bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-xs px-6 py-3 rounded-xl shadow-lg inline-flex items-center"
              >
                <span>Find Biker Rest Hubs</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>

          <div className="relative h-72 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
            <Image
              src="/images/motorcycle-road.jpg"
              alt="Motorcycle Travellers"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </div>
      )}
    </div>
  );
}
