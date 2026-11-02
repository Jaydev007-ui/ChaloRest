'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { VehicleType } from '@/types';
import { 
  User, 
  Phone, 
  Mail, 
  Car, 
  Truck, 
  ShieldAlert, 
  MapPin, 
  Save, 
  CheckCircle2, 
  ArrowLeft 
} from 'lucide-react';

export default function ProfilePage() {
  const user = store.currentUser;
  const [name, setName] = useState(user.name);
  const [phone, setPhone] = useState(user.phone);
  const [email, setEmail] = useState(user.email);
  const [preferredVehicle, setPreferredVehicle] = useState<VehicleType>(user.preferredVehicle || 'CAB_TAXI');
  const [emergencyName, setEmergencyName] = useState(user.emergencyContact?.name || 'Sunita Verma');
  const [emergencyPhone, setEmergencyPhone] = useState(user.emergencyContact?.phone || '+91 98765 00001');
  const [emergencyRelation, setEmergencyRelation] = useState(user.emergencyContact?.relation || 'Spouse');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    user.name = name;
    user.phone = phone;
    user.email = email;
    user.preferredVehicle = preferredVehicle;
    user.emergencyContact = {
      name: emergencyName,
      phone: emergencyPhone,
      relation: emergencyRelation,
    };
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      <div>
        <Link
          href="/dashboard"
          className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
        >
          <ArrowLeft className="w-3.5 h-3.5 mr-1" />
          Back to Dashboard
        </Link>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Driver Profile & Highway Safety Settings
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Your profile details are used for quick bed allocations, emergency roadside support, and parking bay reservations.
        </p>
      </div>

      <form onSubmit={handleSave} className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
        {/* Personal Details */}
        <div className="space-y-4">
          <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider border-b border-[#25292E] pb-2">
            Personal Information
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Full Legal Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Mobile Phone (Verified via SMS)</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Default Driving Vehicle</label>
              <select
                value={preferredVehicle}
                onChange={(e) => setPreferredVehicle(e.target.value as VehicleType)}
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              >
                <option value="CAB_TAXI">Commercial Cab / Taxi</option>
                <option value="TRUCK">Heavy Logistics Truck</option>
                <option value="MOTORCYCLE">Motorcycle Touring</option>
                <option value="PRIVATE_CAR">Private Car Roadtripper</option>
                <option value="BUS">Bus / Coach</option>
              </select>
            </div>
          </div>
        </div>

        {/* Emergency Contact */}
        <div className="space-y-4 pt-4 border-t border-[#25292E]">
          <div className="flex items-center space-x-2">
            <ShieldAlert className="w-4 h-4 text-road-yellow" />
            <h3 className="text-sm font-bold text-gray-300 uppercase tracking-wider">
              Emergency Roadside Contact
            </h3>
          </div>
          <p className="text-xs text-gray-400">
            In case of highway delays or safety emergencies, our 24/7 central dispatch can contact your designated person.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Contact Name</label>
              <input
                type="text"
                value={emergencyName}
                onChange={(e) => setEmergencyName(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Phone Number</label>
              <input
                type="tel"
                value={emergencyPhone}
                onChange={(e) => setEmergencyPhone(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Relationship</label>
              <input
                type="text"
                value={emergencyRelation}
                onChange={(e) => setEmergencyRelation(e.target.value)}
                required
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2.5 text-xs text-white"
              />
            </div>
          </div>
        </div>

        {savedSuccess && (
          <div className="p-3 bg-green-950/60 border border-green-500/50 rounded-xl text-xs text-green-300 flex items-center">
            <CheckCircle2 className="w-4 h-4 mr-2 text-green-400" />
            <span>Profile and emergency safety settings saved successfully!</span>
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs sm:text-sm py-3.5 rounded-xl shadow-lg transition-all flex items-center justify-center space-x-2"
          >
            <Save className="w-4 h-4" />
            <span>SAVE PROFILE SETTINGS</span>
          </button>
        </div>
      </form>
    </div>
  );
}
