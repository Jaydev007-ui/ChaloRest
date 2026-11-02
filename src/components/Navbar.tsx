'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Logo } from './Logo';
import { 
  Menu, 
  X, 
  Compass, 
  Route, 
  Truck, 
  Handshake, 
  User, 
  Gauge, 
  Bell,
  Clock,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const pathname = usePathname();

  const navLinks = [
    { label: 'Find Rest Stops', href: '/search', icon: Compass },
    { label: 'Route Planner', href: '/search?tab=route', icon: Route },
    { label: 'For Drivers', href: '/for-drivers', icon: Truck },
    { label: 'How It Works', href: '/how-it-works', icon: ShieldCheck },
    { label: 'Partner With Us', href: '/partner', icon: Handshake },
  ];

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header className="sticky top-0 z-50 bg-[#17191C]/95 backdrop-blur-md border-b border-[#25292E] text-white">
      {/* Top micro highway alert bar */}
      <div className="bg-[#101214] border-b border-[#25292E] px-4 py-1.5 text-xs text-gray-300 flex items-center justify-between">
        <div className="flex items-center space-x-3 overflow-x-auto whitespace-nowrap">
          <span className="flex items-center text-highway-yellow font-bold text-[11px] bg-highway-yellow/10 px-2 py-0.5 rounded">
            HIGHWAY ALERT
          </span>
          <span className="text-gray-300">
            NH 48 Ahmedabad–Mumbai corridor: 18 verified 24/7 rest hubs active with secure truck parking.
          </span>
        </div>
        <div className="hidden md:flex items-center space-x-4 text-xs">
          <span className="text-gray-400">Roadside Helpline:</span>
          <span className="text-highway-orange font-bold font-mono">1800-CHALO-REST (24/7)</span>
          <span className="text-gray-500">|</span>
          <Link href="/rewards" className="text-highway-yellow hover:underline flex items-center">
            ★ ChaloRewards (340 pts)
          </Link>
        </div>
      </div>

      {/* Main navigation */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18 py-3">
          {/* Brand Logo */}
          <div className="flex items-center">
            <Logo variant="main" size="md" />
          </div>

          {/* Desktop Navigation Links */}
          <nav className="hidden lg:flex items-center space-x-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              const active = isActive(link.href);
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  className={`flex items-center px-3.5 py-2 rounded-lg text-sm font-medium transition-all ${
                    active
                      ? 'text-highway-orange bg-[#25292E]'
                      : 'text-gray-300 hover:text-white hover:bg-[#25292E]/60'
                  }`}
                >
                  <Icon className="w-4 h-4 mr-1.5 opacity-80" />
                  {link.label}
                </Link>
              );
            })}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center space-x-3">
            {/* Driver Mode Button */}
            <Link
              href="/driver-mode"
              className="group flex items-center px-3 py-1.5 rounded-lg bg-yellow-500/10 border border-road-yellow/40 hover:bg-road-yellow hover:text-black transition-all text-xs font-bold text-road-yellow"
              title="Touch-friendly high contrast mode for drivers"
            >
              <Gauge className="w-4 h-4 mr-1.5 text-road-yellow group-hover:text-black animate-pulse" />
              <span>DRIVER MODE</span>
            </Link>

            {/* Active Stay Link */}
            <Link
              href="/dashboard/active-stay"
              className="flex items-center px-3 py-1.5 rounded-lg bg-green-500/10 border border-green-500/30 text-green-400 hover:bg-green-500/20 text-xs font-semibold"
            >
              <Clock className="w-3.5 h-3.5 mr-1" />
              <span>Active Stay</span>
            </Link>

            {/* User Account / Partner Portal Dropdown */}
            <div className="relative">
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                className="flex items-center space-x-2 px-3 py-1.5 rounded-lg bg-[#25292E] hover:bg-[#32373E] text-sm text-gray-200 transition-colors border border-gray-700/50"
              >
                <div className="w-6 h-6 rounded-full bg-highway-orange text-white flex items-center justify-center font-bold text-xs">
                  S
                </div>
                <span className="font-medium text-xs">Suresh</span>
                <ChevronDown className="w-3.5 h-3.5 text-gray-400" />
              </button>

              {userDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 rounded-xl bg-[#1E2125] border border-[#32373E] shadow-2xl py-2 z-50 text-sm">
                  <div className="px-4 py-2 border-b border-[#2D3238]">
                    <p className="font-bold text-white">Suresh Verma</p>
                    <p className="text-xs text-gray-400">+91 98765 43210</p>
                    <span className="inline-block mt-1 text-[10px] font-semibold bg-highway-orange/20 text-highway-orange px-2 py-0.5 rounded">
                      Cab Driver Partner
                    </span>
                  </div>
                  
                  <Link
                    href="/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-[#25292E] hover:text-white"
                  >
                    <User className="w-4 h-4 mr-2.5 text-gray-400" />
                    My Dashboard
                  </Link>
                  <Link
                    href="/dashboard/bookings"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-gray-300 hover:bg-[#25292E] hover:text-white"
                  >
                    <Clock className="w-4 h-4 mr-2.5 text-gray-400" />
                    Booking History
                  </Link>
                  <Link
                    href="/hotel/dashboard"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-highway-yellow hover:bg-[#25292E]"
                  >
                    <Handshake className="w-4 h-4 mr-2.5 text-highway-yellow" />
                    Hotel Partner Portal
                  </Link>
                  <Link
                    href="/admin"
                    onClick={() => setUserDropdownOpen(false)}
                    className="flex items-center px-4 py-2 text-red-400 hover:bg-[#25292E]"
                  >
                    <ShieldCheck className="w-4 h-4 mr-2.5 text-red-400" />
                    Admin Panel
                  </Link>
                </div>
              )}
            </div>

            {/* CTA Book Now */}
            <Link
              href="/search"
              className="bg-highway-orange hover:bg-highway-orange-hover text-white text-xs font-bold px-4 py-2.5 rounded-lg shadow-lg shadow-highway-orange/20 transition-all transform active:scale-95"
            >
              FIND REST STOP
            </Link>
          </div>

          {/* Mobile hamburger button */}
          <div className="flex md:hidden items-center space-x-2">
            <Link
              href="/driver-mode"
              className="p-2 rounded-lg bg-road-yellow/10 text-road-yellow border border-road-yellow/30"
              title="Driver Mode"
            >
              <Gauge className="w-5 h-5 animate-pulse" />
            </Link>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-lg text-gray-400 hover:text-white hover:bg-[#25292E]"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#1A1D20] border-t border-[#25292E] px-4 pt-3 pb-6 space-y-3">
          <Link
            href="/driver-mode"
            onClick={() => setMobileMenuOpen(false)}
            className="flex items-center justify-center w-full py-3 bg-road-yellow text-black font-black text-sm rounded-lg shadow-lg"
          >
            <Gauge className="w-5 h-5 mr-2" />
            OPEN DRIVER MODE
          </Link>

          <div className="space-y-1 pt-2">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  href={link.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className="flex items-center px-3 py-2.5 rounded-lg text-sm font-medium text-gray-200 hover:bg-[#25292E]"
                >
                  <Icon className="w-5 h-5 mr-3 text-highway-orange" />
                  {link.label}
                </Link>
              );
            })}
          </div>

          <div className="border-t border-[#25292E] pt-3 space-y-2">
            <Link
              href="/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2 text-sm text-gray-300 hover:text-white"
            >
              <User className="w-4 h-4 mr-2" />
              Customer Dashboard
            </Link>
            <Link
              href="/hotel/dashboard"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2 text-sm text-highway-yellow"
            >
              <Handshake className="w-4 h-4 mr-2" />
              Hotel Partner Dashboard
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center px-3 py-2 text-sm text-red-400"
            >
              <ShieldCheck className="w-4 h-4 mr-2" />
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
