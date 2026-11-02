'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Logo } from '@/components/Logo';
import { User, Phone, Mail, Car, ShieldCheck } from 'lucide-react';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [vehicle, setVehicle] = useState('CAB_TAXI');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    router.push('/dashboard');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-2xl">
        <div className="text-center space-y-2">
          <Logo variant="main" size="lg" className="justify-center" />
          <h2 className="text-xl font-black text-white pt-2">Join ChaloRest Network</h2>
          <p className="text-xs text-gray-400">
            Create your account to unlock hourly bed booking starting at ₹30/hour
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Full Legal Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="e.g. Balwinder Singh"
              required
              className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Mobile Phone (For FastPass SMS)</label>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              placeholder="+91 98765 00000"
              required
              className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Email Address</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="driver@example.com"
              required
              className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-300 mb-1">Primary Vehicle Type</label>
            <select
              value={vehicle}
              onChange={(e) => setVehicle(e.target.value)}
              className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
            >
              <option value="CAB_TAXI">Commercial Cab / Taxi</option>
              <option value="TRUCK">Heavy Logistics Truck</option>
              <option value="MOTORCYCLE">Motorcycle Touring</option>
              <option value="PRIVATE_CAR">Private Car Roadtripper</option>
            </select>
          </div>

          <button
            type="submit"
            className="w-full bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs py-3.5 rounded-xl shadow-lg transition-all"
          >
            CREATE ACCOUNT & CLAIM 50 REWARD MILES
          </button>
        </form>

        <div className="text-center text-xs text-gray-400">
          Already have an account?{' '}
          <Link href="/login" className="text-highway-orange font-bold hover:underline">
            Sign In Here
          </Link>
        </div>
      </div>
    </div>
  );
}
