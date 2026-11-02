'use client';

import React from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { ArrowLeft, Users, ShieldCheck, Phone, Mail } from 'lucide-react';

export default function AdminUsersPage() {
  const users = store.users;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <div>
        <Link
          href="/admin"
          className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Platform Admin Console
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Platform Registered Users & Drivers
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Manage user accounts, driver safety credentials, hotel partner accounts, and admin roles.
        </p>
      </div>

      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 shadow-xl space-y-4">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#202429] text-gray-400 uppercase text-[10px] font-mono">
              <tr>
                <th className="p-3 rounded-l-xl">User Name</th>
                <th className="p-3">Role</th>
                <th className="p-3">Mobile Phone</th>
                <th className="p-3">Email</th>
                <th className="p-3">Vehicle</th>
                <th className="p-3">Rewards</th>
                <th className="p-3 rounded-r-xl">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25292E]">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-[#202429]/50 transition-colors">
                  <td className="p-3 font-bold text-white">{u.name}</td>
                  <td className="p-3">
                    <span className="bg-road-yellow/20 text-road-yellow text-[10px] font-bold px-2 py-0.5 rounded uppercase">
                      {u.role}
                    </span>
                  </td>
                  <td className="p-3 text-gray-300 font-mono">{u.phone}</td>
                  <td className="p-3 text-gray-400 font-mono">{u.email}</td>
                  <td className="p-3 text-gray-300 capitalize">{u.preferredVehicle?.toLowerCase().replace('_', ' ') || 'Commercial'}</td>
                  <td className="p-3 font-mono text-road-yellow">{u.loyaltyPoints} pts</td>
                  <td className="p-3">
                    <span className="text-green-400 bg-green-500/20 text-[10px] font-bold px-2 py-0.5 rounded">
                      ACTIVE
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
