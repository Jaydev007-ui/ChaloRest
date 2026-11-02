'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { DEMO_CORPORATE_ACCOUNTS } from '@/data/seedData';
import { 
  Building2, 
  Truck, 
  Users, 
  CreditCard, 
  Download, 
  Plus, 
  CheckCircle2, 
  FileText,
  ShieldCheck,
  ArrowRight
} from 'lucide-react';

export default function CorporatePage() {
  const corp = DEMO_CORPORATE_ACCOUNTS[0];
  const [drivers, setDrivers] = useState(corp.drivers);
  const [newDriverName, setNewDriverName] = useState('');
  const [newDriverPhone, setNewDriverPhone] = useState('');
  const [newVehicleNum, setNewVehicleNum] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);

  const handleAddDriver = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newDriverName || !newDriverPhone) return;

    const newDriver = {
      id: `cd-${Date.now()}`,
      name: newDriverName,
      phone: newDriverPhone,
      vehicleNumber: newVehicleNum || 'MH-04-XX-0000',
      vehicleType: 'TRUCK' as const,
      isActive: true,
    };

    setDrivers([...drivers, newDriver]);
    setShowAddModal(false);
    setNewDriverName('');
    setNewDriverPhone('');
    setNewVehicleNum('');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-6 shadow-xl">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-blue-600 text-white text-xs font-black px-2.5 py-0.5 rounded uppercase">
              CORPORATE FLEET PORTAL
            </span>
            <span className="text-xs text-gray-400 font-mono">GST: {corp.gstNumber}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black text-white mt-1">
            {corp.companyName}
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Fleet Coordinator: {corp.contactPerson} • {corp.contactPhone}
          </p>
        </div>

        <button
          onClick={() => setShowAddModal(true)}
          className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs px-5 py-3 rounded-xl shadow-lg flex items-center self-start md:self-auto"
        >
          <Plus className="w-4 h-4 mr-1.5" />
          <span>Add Fleet Driver</span>
        </button>
      </div>

      {/* Credit & Spending Metrics */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="bg-[#1A1D21] border border-[#272B31] p-5 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Monthly Credit Facility</span>
          <p className="text-2xl font-black text-white font-mono mt-1">₹{corp.creditLimit.toLocaleString()}</p>
          <span className="text-[10px] text-green-400">Pre-approved highway credit line</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-5 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Available Balance</span>
          <p className="text-2xl font-black text-green-400 font-mono mt-1">₹{corp.currentBalance.toLocaleString()}</p>
          <span className="text-[10px] text-gray-500">Auto-deducted per driver check-in</span>
        </div>
        <div className="bg-[#1A1D21] border border-[#272B31] p-5 rounded-2xl">
          <span className="text-xs text-gray-400 font-medium">Active Fleet Drivers</span>
          <p className="text-2xl font-black text-road-yellow font-mono mt-1">{drivers.length} Drivers</p>
          <span className="text-[10px] text-gray-500">Linked to centralized billing</span>
        </div>
      </div>

      {/* Fleet Driver Roster */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
        <div className="flex items-center justify-between border-b border-[#25292E] pb-3">
          <div>
            <h3 className="text-lg font-black text-white">Authorized Drivers & Commercial Vehicles</h3>
            <p className="text-xs text-gray-400">Drivers authorized to bill resting beds directly to company balance</p>
          </div>
          <button
            onClick={() => alert('Monthly GST Fleet statement downloaded!')}
            className="text-xs text-highway-yellow hover:underline flex items-center font-bold"
          >
            <Download className="w-3.5 h-3.5 mr-1" />
            <span>Download GST Statement</span>
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-[#202429] text-gray-400 uppercase text-[10px] font-mono">
              <tr>
                <th className="p-3 rounded-l-xl">Driver Name</th>
                <th className="p-3">Mobile Number</th>
                <th className="p-3">Vehicle Number</th>
                <th className="p-3">Vehicle Type</th>
                <th className="p-3">Billing Status</th>
                <th className="p-3 rounded-r-xl">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#25292E]">
              {drivers.map((d) => (
                <tr key={d.id} className="hover:bg-[#202429]/50 transition-colors">
                  <td className="p-3 font-bold text-white">{d.name}</td>
                  <td className="p-3 text-gray-300 font-mono">{d.phone}</td>
                  <td className="p-3 text-road-yellow font-mono font-bold">{d.vehicleNumber}</td>
                  <td className="p-3 text-gray-300 capitalize">{d.vehicleType.toLowerCase()}</td>
                  <td className="p-3">
                    <span className="bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded text-[10px]">
                      AUTHORIZED
                    </span>
                  </td>
                  <td className="p-3">
                    <button
                      onClick={() => alert(`Showing rest logs for driver ${d.name}`)}
                      className="text-xs text-highway-orange hover:underline font-bold"
                    >
                      View Stays
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Driver Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#17191C] border border-[#2B3037] rounded-3xl max-w-md w-full p-6 space-y-4 shadow-2xl">
            <h3 className="text-lg font-black text-white">Add Driver to Corporate Account</h3>
            <p className="text-xs text-gray-400">
              The driver will be able to book any ChaloRest partner rest stop with cashless company billing.
            </p>

            <form onSubmit={handleAddDriver} className="space-y-3">
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Driver Full Name</label>
                <input
                  type="text"
                  value={newDriverName}
                  onChange={(e) => setNewDriverName(e.target.value)}
                  placeholder="e.g. Jaswinder Singh"
                  required
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Driver Mobile Number</label>
                <input
                  type="tel"
                  value={newDriverPhone}
                  onChange={(e) => setNewDriverPhone(e.target.value)}
                  placeholder="+91 98000 00000"
                  required
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1">Assigned Vehicle Plate</label>
                <input
                  type="text"
                  value={newVehicleNum}
                  onChange={(e) => setNewVehicleNum(e.target.value)}
                  placeholder="e.g. GJ-06-AX-8910"
                  className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white font-mono"
                />
              </div>

              <div className="flex items-center space-x-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="w-1/2 bg-[#202429] text-gray-300 font-bold text-xs py-2.5 rounded-xl"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="w-1/2 bg-highway-orange text-white font-bold text-xs py-2.5 rounded-xl"
                >
                  Authorize Driver
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
