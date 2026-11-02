'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { store } from '@/lib/store';
import { Logo } from '@/components/Logo';
import { Phone, Mail, Lock, ShieldCheck, ArrowRight, CheckCircle2 } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const [authMode, setAuthMode] = useState<'PHONE_OTP' | 'EMAIL'>('PHONE_OTP');
  const [phone, setPhone] = useState('9876543210');
  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [email, setEmail] = useState('suresh.verma@example.com');
  const [password, setPassword] = useState('pass123');

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setOtpSent(true);
    setOtp('4402'); // Simulated auto-filled OTP for fast testing
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  const handleQuickLoginAs = (role: 'CUSTOMER' | 'HOTEL' | 'ADMIN') => {
    if (role === 'CUSTOMER') {
      store.currentUser = store.users[0];
      router.push('/dashboard');
    } else if (role === 'HOTEL') {
      store.currentUser = store.users[1];
      router.push('/hotel/dashboard');
    } else if (role === 'ADMIN') {
      store.currentUser = store.users[2];
      router.push('/admin');
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Logo variant="main" size="lg" className="justify-center" />
          <h2 className="text-xl font-black text-white pt-2">Welcome to ChaloRest</h2>
          <p className="text-xs text-gray-400">
            Sign in to access your hourly bed bookings, QR FastPass, and sleep points
          </p>
        </div>

        {/* Quick Demo Role Logins */}
        <div className="bg-[#121417] p-3.5 rounded-2xl border border-gray-800 space-y-2">
          <p className="text-[11px] font-bold text-road-yellow uppercase tracking-wider text-center">
            ⚡ 1-Click Instant Demo Login:
          </p>
          <div className="grid grid-cols-3 gap-2 text-xs">
            <button
              type="button"
              onClick={() => handleQuickLoginAs('CUSTOMER')}
              className="bg-[#202429] hover:bg-highway-orange hover:text-white p-2 rounded-xl border border-gray-700 font-bold transition-all text-center"
            >
              Cab Driver
            </button>
            <button
              type="button"
              onClick={() => handleQuickLoginAs('HOTEL')}
              className="bg-[#202429] hover:bg-road-yellow hover:text-black p-2 rounded-xl border border-gray-700 font-bold transition-all text-center"
            >
              Hotel Owner
            </button>
            <button
              type="button"
              onClick={() => handleQuickLoginAs('ADMIN')}
              className="bg-[#202429] hover:bg-red-600 hover:text-white p-2 rounded-xl border border-gray-700 font-bold transition-all text-center"
            >
              Admin
            </button>
          </div>
        </div>

        {/* Auth Method Selector */}
        <div className="flex border-b border-[#25292E] pb-2 text-xs font-bold text-center">
          <button
            onClick={() => setAuthMode('PHONE_OTP')}
            className={`w-1/2 py-2 border-b-2 transition-all ${
              authMode === 'PHONE_OTP'
                ? 'border-highway-orange text-highway-orange'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Mobile Number (OTP)
          </button>
          <button
            onClick={() => setAuthMode('EMAIL')}
            className={`w-1/2 py-2 border-b-2 transition-all ${
              authMode === 'EMAIL'
                ? 'border-highway-orange text-highway-orange'
                : 'border-transparent text-gray-400 hover:text-white'
            }`}
          >
            Email & Password
          </button>
        </div>

        {authMode === 'PHONE_OTP' ? (
          !otpSent ? (
            <form onSubmit={handleSendOtp} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Mobile Number</label>
                <div className="flex">
                  <span className="bg-[#202429] border border-r-0 border-gray-700 rounded-l-xl px-3 py-2.5 text-xs text-gray-400 flex items-center font-mono">
                    +91
                  </span>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="98765 43210"
                    required
                    className="w-full bg-[#202429] border border-gray-700 rounded-r-xl px-3 py-2.5 text-xs text-white font-mono"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all"
              >
                SEND OTP VIA SMS
              </button>
            </form>
          ) : (
            <form onSubmit={handleVerifyOtp} className="space-y-4">
              <div className="bg-green-950/40 p-2.5 rounded-xl border border-green-500/30 text-[11px] text-green-300">
                OTP sent to +91 {phone}. Enter 4-digit code.
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Enter 4-Digit OTP</label>
                <input
                  type="text"
                  maxLength={4}
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                  placeholder="4402"
                  required
                  className="w-full bg-[#202429] border border-highway-orange rounded-xl px-3 py-3 text-center text-lg font-mono font-black text-white tracking-widest"
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 hover:bg-green-700 text-white font-black text-xs py-3 rounded-xl shadow-lg transition-all"
              >
                VERIFY & ENTER CHALOREST
              </button>
            </form>
          )
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); router.push('/dashboard'); }} className="space-y-4">
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs py-3 rounded-xl shadow-lg transition-all"
            >
              SIGN IN
            </button>
          </form>
        )}

        <div className="pt-2 text-center text-xs text-gray-500">
          By signing in, you agree to ChaloRest highway safety and rest guidelines.
        </div>
      </div>
    </div>
  );
}
