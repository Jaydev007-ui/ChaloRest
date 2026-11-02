'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { Bed, Room } from '@/types';
import { 
  Bed as BedIcon, 
  ShieldAlert, 
  CheckCircle2, 
  Plus, 
  Trash2, 
  Settings, 
  Sparkles,
  ArrowLeft
} from 'lucide-react';

export default function HotelBedsManagementPage() {
  const property = store.properties[0];
  const [rooms, setRooms] = useState<Room[]>(property.rooms);
  const [maintenanceReason, setMaintenanceReason] = useState('Fresh Sanitization in progress');

  const toggleBedBlocked = (roomId: string, bedId: string) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id !== roomId) return room;
      return {
        ...room,
        beds: room.beds.map((b) => {
          if (b.id !== bedId) return b;
          const nextBlocked = !b.isBlocked;
          return {
            ...b,
            isBlocked: nextBlocked,
            isAvailable: !nextBlocked,
            maintenanceReason: nextBlocked ? maintenanceReason : undefined,
          };
        }),
      };
    });

    property.rooms = updatedRooms;
    setRooms(updatedRooms);
  };

  const handleAddBed = (roomId: string) => {
    const updatedRooms = rooms.map((room) => {
      if (room.id !== roomId) return room;
      const newBedNum = room.beds.length + 1;
      const newBed: Bed = {
        id: `bed-${Date.now()}-${newBedNum}`,
        roomId: room.id,
        propertyId: property.id,
        bedNumber: `Bed ${room.category === 'SHARED_4_BED' ? 'A' : 'B'}${newBedNum}`,
        label: `Bunk #${newBedNum} - Clean Linens`,
        hourlyRate: room.hourlyRate,
        isAvailable: true,
        isBlocked: false,
      };
      return {
        ...room,
        capacity: room.capacity + 1,
        beds: [...room.beds, newBed],
      };
    });

    property.rooms = updatedRooms;
    setRooms(updatedRooms);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-[#25292E] pb-6">
        <div>
          <Link
            href="/hotel/dashboard"
            className="text-xs text-highway-orange hover:underline flex items-center mb-1 font-semibold"
          >
            <ArrowLeft className="w-3.5 h-3.5 mr-1" />
            Back to Partner Dashboard
          </Link>
          <h1 className="text-2xl sm:text-3xl font-black text-white">
            Bed Inventory & Maintenance Control
          </h1>
          <p className="text-xs text-gray-400 mt-0.5">
            Independently manage each individual bed. Block beds for sanitization or toggle instant availability.
          </p>
        </div>

        <div className="flex items-center space-x-2">
          <span className="text-xs text-gray-400 font-mono">
            Total Inventory: {rooms.reduce((acc, r) => acc + r.beds.length, 0)} Beds
          </span>
        </div>
      </div>

      {/* Rooms List */}
      <div className="space-y-8">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl"
          >
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-[#25292E] pb-4">
              <div>
                <div className="flex items-center space-x-2">
                  <h3 className="text-lg font-black text-white">{room.name}</h3>
                  <span className="text-xs font-mono font-bold bg-[#25292E] text-road-yellow px-2 py-0.5 rounded">
                    {room.roomNumber}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  Category: {room.category.replace('_', ' ')} • Capacity: {room.beds.length} Beds • Tariff: ₹{room.hourlyRate}/hr
                </p>
              </div>

              <button
                type="button"
                onClick={() => handleAddBed(room.id)}
                className="bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-xs px-4 py-2.5 rounded-xl transition-all flex items-center self-start sm:self-auto"
              >
                <Plus className="w-4 h-4 mr-1.5" />
                <span>Add Extra Bed</span>
              </button>
            </div>

            {/* Beds Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {room.beds.map((bed) => {
                const isBlocked = bed.isBlocked;
                const isAvailable = bed.isAvailable && !bed.isBlocked;

                return (
                  <div
                    key={bed.id}
                    className={`p-4 rounded-2xl border transition-all space-y-3 ${
                      isBlocked
                        ? 'bg-yellow-950/20 border-yellow-800/50'
                        : isAvailable
                        ? 'bg-[#202429] border-gray-700'
                        : 'bg-black/40 border-gray-800 opacity-60'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="font-mono font-black text-sm text-white">
                        {bed.bedNumber}
                      </span>
                      <span
                        className={`text-[10px] font-bold px-2 py-0.5 rounded uppercase ${
                          isBlocked
                            ? 'bg-yellow-900/60 text-yellow-400'
                            : isAvailable
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-blue-500/20 text-blue-400'
                        }`}
                      >
                        {isBlocked ? 'MAINTENANCE' : isAvailable ? 'AVAILABLE' : 'RESTING GUEST'}
                      </span>
                    </div>

                    <p className="text-[11px] text-gray-400 truncate">{bed.label}</p>
                    <p className="text-xs font-mono font-bold text-road-yellow">₹{bed.hourlyRate}/hour</p>

                    {isBlocked && (
                      <p className="text-[10px] text-yellow-400 font-mono italic">
                        Reason: {bed.maintenanceReason || 'Sanitization'}
                      </p>
                    )}

                    <div className="pt-2 border-t border-gray-800 flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => toggleBedBlocked(room.id, bed.id)}
                        className={`w-full py-2 rounded-xl text-xs font-bold transition-all ${
                          isBlocked
                            ? 'bg-green-600 hover:bg-green-700 text-white'
                            : 'bg-[#2A3038] hover:bg-[#343C46] text-yellow-400 border border-yellow-600/30'
                        }`}
                      >
                        {isBlocked ? 'Mark Clean & Available' : 'Block for Sanitization'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
