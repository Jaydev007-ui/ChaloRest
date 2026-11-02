import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { 
  MapPin, 
  Bed, 
  Clock, 
  ShieldCheck, 
  ArrowRight, 
  CheckCircle2, 
  QrCode, 
  Sparkles,
  Truck,
  PhoneCall
} from 'lucide-react';

export default function HowItWorksPage() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16">
      {/* Header */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <span className="bg-highway-orange text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          CHALOREST REST PROTOCOL
        </span>
        <h1 className="text-3xl sm:text-5xl font-black text-white">
          How ChaloRest Delivers Dignified Rest in 4 Simple Steps
        </h1>
        <p className="text-sm sm:text-base text-gray-300 leading-relaxed">
          From long highways to clean resting beds in under 60 seconds. Learn how our technology connects drivers with verified roadside accommodation.
        </p>
      </div>

      {/* 4 Deep Dive Steps */}
      <div className="space-y-12">
        {/* Step 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-3">
            <span className="text-3xl font-black text-highway-orange font-mono">01</span>
            <h2 className="text-2xl font-black text-white">Discover verified Highway Rest Hubs</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Open ChaloRest on your smartphone while parked or during a toll booth break. Enter your highway (e.g. NH 48, Mumbai-Pune Expressway) or use one-touch GPS detection to see every rest stop within 0 to 0.5 km of your route.
            </p>
            <ul className="text-xs text-gray-300 space-y-1.5 pt-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Zero guesswork on parking safety or cleanliness.</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-green-400" />
                <span>Shows exact heavy vehicle and cab parking bay counts.</span>
              </li>
            </ul>
          </div>
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
            <Image src="/images/highway-hero.jpg" alt="Discover Stops" fill className="object-cover" sizes="50vw" />
          </div>
        </div>

        {/* Step 2 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-800 order-2 md:order-1">
            <Image src="/images/shared-accommodation.jpg" alt="Select Bed" fill className="object-cover" sizes="50vw" />
          </div>
          <div className="space-y-3 order-1 md:order-2">
            <span className="text-3xl font-black text-road-yellow font-mono">02</span>
            <h2 className="text-2xl font-black text-white">Select Your Individual Bed & Bunk</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Unlike ordinary hotel aggregators that only book entire rooms, ChaloRest displays live architectural bed schematics. Choose Bed A1 (lower berth with charging point) or Bed A2 (quiet upper berth). Our database guarantees zero double bookings.
            </p>
            <ul className="text-xs text-gray-300 space-y-1.5 pt-2">
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-road-yellow" />
                <span>4-Bed and 8-Bed organized, air-conditioned chambers.</span>
              </li>
              <li className="flex items-center space-x-2">
                <CheckCircle2 className="w-4 h-4 text-road-yellow" />
                <span>Strict gender separation filters (Male-only and Family wings).</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Step 3 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="space-y-3">
            <span className="text-3xl font-black text-green-400 font-mono">03</span>
            <h2 className="text-2xl font-black text-white">Pay by the Hour (₹30–₹50/Hour)</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Choose your rest duration: 1 hour for a quick power nap, 3 hours for deep sleep, or 8 hours for an overnight stop. Pay transparently with UPI (GPay, PhonePe, Paytm), RuPay cards, or Corporate Transport account.
            </p>
          </div>
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-800">
            <Image src="/images/partner-hotel.jpg" alt="Pay by Hour" fill className="object-cover" sizes="50vw" />
          </div>
        </div>

        {/* Step 4 */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-xl">
          <div className="relative h-64 sm:h-80 rounded-2xl overflow-hidden border border-gray-800 order-2 md:order-1">
            <Image src="/images/truck-highway.jpg" alt="QR Check-in" fill className="object-cover" sizes="50vw" />
          </div>
          <div className="space-y-3 order-1 md:order-2">
            <span className="text-3xl font-black text-blue-400 font-mono">04</span>
            <h2 className="text-2xl font-black text-white">10-Second Digital QR Check-in</h2>
            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Arrive at the hotel reception, flash your digital ChaloRest FastPass QR code, and the staff scanner instantly confirms your reservation and directs you to your reserved bed. No long register sign-ins or document hassles.
            </p>
            <div className="pt-2">
              <Link
                href="/search"
                className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg inline-flex items-center"
              >
                <span>Find Your Rest Stop Now</span>
                <ArrowRight className="w-4 h-4 ml-1.5" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
