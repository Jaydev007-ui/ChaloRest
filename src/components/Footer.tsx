import React from 'react';
import Link from 'next/link';
import { Logo } from './Logo';
import { ShieldCheck, PhoneCall, MapPin, Truck, Heart, Compass, Route } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-[#101214] border-t border-[#25292E] text-gray-400">
      {/* 24/7 Driver Support Banner */}
      <div className="bg-[#17191C] border-b border-[#25292E] py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-highway-orange/10 border border-highway-orange/30 flex items-center justify-center text-highway-orange flex-shrink-0">
                <PhoneCall className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Highway Emergency & Rest Assistance</h4>
                <p className="text-xs text-gray-400">Toll-free 24/7 rest stop booking support across all Indian highways</p>
                <p className="text-highway-orange font-bold font-mono text-sm mt-0.5">1800-CHALO-REST (1800-242-567)</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 flex-shrink-0">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Verified Clean & CCTV Monitored</h4>
                <p className="text-xs text-gray-400">Fresh sanitized linens for every guest, verified hotel partners, and 24/7 security guard</p>
              </div>
            </div>

            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-xl bg-road-yellow/10 border border-road-yellow/30 flex items-center justify-center text-road-yellow flex-shrink-0">
                <Truck className="w-6 h-6" />
              </div>
              <div>
                <h4 className="text-white font-bold text-base">Driver Welfare & Anti-Fatigue Drive</h4>
                <p className="text-xs text-gray-400">Reducing highway accidents by making quality hourly rest accessible from just ₹30/hour</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Links */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-8">
          {/* Brand Info */}
          <div className="lg:col-span-2 space-y-4">
            <Logo variant="main" size="lg" />
            <p className="text-sm text-gray-400 max-w-sm leading-relaxed">
              India’s pioneer hourly highway rest platform. Connecting long-distance truck drivers, cab operators, motorcycle tourers, and road travellers with clean, affordable shared beds at ₹30–₹50/hour.
            </p>
            <div className="pt-2 flex items-center space-x-2 text-xs text-highway-yellow font-semibold">
              <span className="w-2 h-2 rounded-full bg-green-400 animate-ping"></span>
              <span>120+ Partner Highway Hotels Across NH 48, NH 44 & Golden Quadrilateral</span>
            </div>
            <div className="pt-2 text-xs text-gray-500">
              ChaloRest Technologies Private Limited &copy; {new Date().getFullYear()}. All Rights Reserved.
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-highway-orange pl-2">
              Explore Rest Stops
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search" className="hover:text-highway-orange transition-colors">Search Highway Rest Hubs</Link></li>
              <li><Link href="/search?tab=route" className="hover:text-highway-orange transition-colors">Highway Route Planner</Link></li>
              <li><Link href="/for-drivers" className="hover:text-highway-orange transition-colors">For Cab & Taxi Drivers</Link></li>
              <li><Link href="/for-drivers?type=truck" className="hover:text-highway-orange transition-colors">Truck Driver Accommodation</Link></li>
              <li><Link href="/for-drivers?type=motorcycle" className="hover:text-highway-orange transition-colors">Motorcycle Travellers</Link></li>
              <li><Link href="/driver-mode" className="text-road-yellow hover:underline font-semibold">One-Touch Driver Mode</Link></li>
            </ul>
          </div>

          {/* Top Corridors */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-road-yellow pl-2">
              Popular Routes
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/search?route=ahmedabad-mumbai" className="hover:text-highway-orange transition-colors">Ahmedabad - Mumbai (NH 48)</Link></li>
              <li><Link href="/search?route=delhi-jaipur" className="hover:text-highway-orange transition-colors">Delhi - Jaipur (NH 48)</Link></li>
              <li><Link href="/search?route=mumbai-pune" className="hover:text-highway-orange transition-colors">Mumbai - Pune Expressway</Link></li>
              <li><Link href="/search?route=bengaluru-pune" className="hover:text-highway-orange transition-colors">Bengaluru - Pune (NH 48)</Link></li>
              <li><Link href="/search?route=delhi-agra" className="hover:text-highway-orange transition-colors">Yamuna Expressway (Delhi-Agra)</Link></li>
              <li><Link href="/search?city=vadodara" className="hover:text-highway-orange transition-colors">Vadodara Bypass Rest Hubs</Link></li>
            </ul>
          </div>

          {/* Business & Partners */}
          <div>
            <h4 className="text-white font-bold text-sm tracking-wider uppercase mb-4 border-l-2 border-green-500 pl-2">
              Partner & Corporate
            </h4>
            <ul className="space-y-2 text-sm">
              <li><Link href="/partner" className="text-highway-yellow hover:underline font-semibold">List Your Hotel (Earn ₹50k/mo)</Link></li>
              <li><Link href="/corporate" className="hover:text-highway-orange transition-colors">Corporate Fleet Accounts</Link></li>
              <li><Link href="/hotel/dashboard" className="hover:text-highway-orange transition-colors">Hotel Partner Portal</Link></li>
              <li><Link href="/hotel/scanner" className="hover:text-highway-orange transition-colors">Staff QR Check-in Tool</Link></li>
              <li><Link href="/admin" className="text-gray-600 hover:text-gray-400">Admin Control Panel</Link></li>
              <li><Link href="/how-it-works" className="hover:text-highway-orange transition-colors">Safety Standards & Code</Link></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-[#25292E] flex flex-col md:flex-row items-center justify-between text-xs text-gray-500 space-y-4 md:space-y-0">
          <div className="flex items-center space-x-6">
            <span>Made with <Heart className="w-3.5 h-3.5 inline text-red-500 fill-red-500" /> for India’s Highway Heroes</span>
            <span>•</span>
            <Link href="/privacy" className="hover:text-gray-400">Privacy Policy</Link>
            <span>•</span>
            <Link href="/terms" className="hover:text-gray-400">Terms of Service</Link>
            <span>•</span>
            <Link href="/safety" className="hover:text-gray-400">Highway Rest Guidelines</Link>
          </div>
          <div className="font-mono text-gray-400 bg-[#17191C] px-3 py-1 rounded border border-[#25292E]">
            MVP Version 1.0.0 (Production Ready)
          </div>
        </div>
      </div>
    </footer>
  );
};
