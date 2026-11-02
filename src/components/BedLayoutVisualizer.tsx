'use client';

import React from 'react';
import { Room, Bed } from '@/types';
import { ShieldCheck, Lock, CheckCircle2, AlertCircle, Sparkles } from 'lucide-react';

interface BedLayoutVisualizerProps {
  rooms: Room[];
  selectedBedId?: string;
  onSelectBed: (bed: Bed, room: Room) => void;
  hourlyRate: number;
}

export const BedLayoutVisualizer: React.FC<BedLayoutVisualizerProps> = ({
  rooms,
  selectedBedId,
  onSelectBed,
  hourlyRate,
}) => {
  return (
    <div className="space-y-8">
      {/* Legend */}
      <div className="flex flex-wrap items-center gap-4 bg-[#1F2328] p-3.5 rounded-xl border border-[#2D333B] text-xs">
        <span className="font-bold text-gray-300 uppercase tracking-wider text-[11px]">Bed Status:</span>
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 rounded bg-success-green border border-green-400"></div>
          <span className="text-gray-300">Available Bed (Reserve Now)</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 rounded bg-highway-orange border border-white ring-2 ring-highway-orange/50"></div>
          <span className="text-white font-bold">Selected by You</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 rounded bg-[#2D3238] border border-gray-600"></div>
          <span className="text-gray-400">Occupied by Resting Guest</span>
        </div>
        <div className="flex items-center space-x-1.5">
          <div className="w-3.5 h-3.5 rounded bg-yellow-950 border border-yellow-600/50"></div>
          <span className="text-yellow-400">Sanitization in Progress</span>
        </div>
      </div>

      {rooms.map((room) => {
        const is4Bed = room.category === 'SHARED_4_BED';
        const is8Bed = room.category === 'SHARED_8_BED';
        const isPrivate = room.category === 'PRIVATE_ROOM';

        return (
          <div
            key={room.id}
            className="bg-[#181B1F] border border-[#2B3037] rounded-2xl overflow-hidden shadow-xl"
          >
            {/* Room Header */}
            <div className="bg-[#202429] border-b border-[#2D333B] px-5 py-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
              <div>
                <div className="flex items-center space-x-2">
                  <span className="font-bold text-white text-base">{room.name}</span>
                  <span className="text-xs bg-highway-orange/15 text-highway-orange border border-highway-orange/30 px-2 py-0.5 rounded font-mono font-semibold">
                    {room.roomNumber}
                  </span>
                </div>
                <p className="text-xs text-gray-400 mt-0.5">
                  {room.dimensionsFeet || 'Spacious, high-ventilation shared room with secure individual lockers'}
                </p>
              </div>

              <div className="flex items-center space-x-3">
                <span className="text-xs bg-gray-800 text-gray-300 px-2.5 py-1 rounded border border-gray-700">
                  {room.acType} • {room.bathroomType === 'ATTACHED' ? 'Attached Bath' : 'Common Washroom'}
                </span>
                <span className="text-sm font-black text-road-yellow font-mono">
                  ₹{room.hourlyRate}/hr <span className="text-[10px] text-gray-400 font-normal">per bed</span>
                </span>
              </div>
            </div>

            {/* Visual Floor Layout */}
            <div className="p-6">
              <div className="mb-3 flex items-center justify-between text-xs text-gray-400 border-b border-dashed border-gray-700 pb-2">
                <span className="font-mono flex items-center">
                  <span className="w-2 h-2 rounded-full bg-green-400 mr-2 animate-pulse"></span>
                  Architectural Layout (Select an individual bed):
                </span>
                <span className="text-[11px] text-gray-500">
                  {room.beds.filter(b => b.isAvailable && !b.isBlocked).length} of {room.beds.length} beds available
                </span>
              </div>

              {/* Grid of Beds */}
              <div
                className={`grid gap-4 ${
                  is4Bed
                    ? 'grid-cols-2 sm:grid-cols-4'
                    : is8Bed
                    ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'
                    : 'grid-cols-1'
                }`}
              >
                {room.beds.map((bed) => {
                  const isSelected = selectedBedId === bed.id;
                  const isOccupied = !bed.isAvailable && !bed.isBlocked;
                  const isBlocked = bed.isBlocked;

                  let cardStyle = 'bg-[#1E2227] border-[#313740] hover:border-highway-orange text-gray-200 cursor-pointer hover:shadow-lg hover:shadow-highway-orange/10';
                  if (isSelected) {
                    cardStyle = 'bg-highway-orange/20 border-2 border-highway-orange ring-2 ring-highway-orange/30 text-white cursor-pointer';
                  } else if (isOccupied) {
                    cardStyle = 'bg-[#141618] border-gray-800 text-gray-500 cursor-not-allowed opacity-60';
                  } else if (isBlocked) {
                    cardStyle = 'bg-yellow-950/20 border-yellow-800/40 text-yellow-600 cursor-not-allowed';
                  }

                  return (
                    <button
                      key={bed.id}
                      type="button"
                      disabled={isOccupied || isBlocked}
                      onClick={() => onSelectBed(bed, room)}
                      className={`relative flex flex-col items-center justify-between p-3.5 rounded-xl border transition-all text-center min-h-[140px] group ${cardStyle}`}
                    >
                      {/* Bed Icon & Layout Schematic */}
                      <div className="w-full flex justify-between items-center text-xs mb-1">
                        <span className="font-mono font-bold text-xs">{bed.bedNumber}</span>
                        {isSelected ? (
                          <CheckCircle2 className="w-4 h-4 text-highway-orange" />
                        ) : isOccupied ? (
                          <Lock className="w-3.5 h-3.5 text-gray-500" />
                        ) : isBlocked ? (
                          <AlertCircle className="w-3.5 h-3.5 text-yellow-500" />
                        ) : (
                          <span className="w-2.5 h-2.5 rounded-full bg-success-green"></span>
                        )}
                      </div>

                      {/* Schematic Pillow & Mattress Representation */}
                      <div className="w-full my-2 flex flex-col items-center justify-center">
                        <div
                          className={`w-14 h-18 rounded-md border-2 p-1 flex flex-col items-center justify-between transition-transform group-hover:scale-105 ${
                            isSelected
                              ? 'border-highway-orange bg-highway-orange/10'
                              : isOccupied
                              ? 'border-gray-700 bg-gray-900/50'
                              : isBlocked
                              ? 'border-yellow-700 bg-yellow-950/30'
                              : 'border-green-600/70 bg-green-950/20'
                          }`}
                        >
                          {/* Pillow */}
                          <div
                            className={`w-10 h-3 rounded-sm border ${
                              isSelected
                                ? 'bg-white border-highway-orange'
                                : isOccupied
                                ? 'bg-gray-700 border-gray-600'
                                : 'bg-gray-200 border-green-500'
                            }`}
                          ></div>
                          {/* Blanket / Sheet Fold */}
                          <div
                            className={`w-11 h-8 rounded-sm ${
                              isSelected
                                ? 'bg-highway-orange/40'
                                : isOccupied
                                ? 'bg-gray-800'
                                : 'bg-green-700/30'
                            }`}
                          ></div>
                        </div>
                      </div>

                      {/* Bed Label / Position */}
                      <div className="w-full text-center mt-1">
                        <p className="text-[10px] text-gray-400 font-medium truncate max-w-full">
                          {bed.label}
                        </p>
                        <p className="text-xs font-bold text-road-yellow mt-0.5">
                          ₹{bed.hourlyRate}/hr
                        </p>
                        <span
                          className={`inline-block mt-1 text-[9px] px-1.5 py-0.5 rounded font-bold uppercase tracking-wider ${
                            isSelected
                              ? 'bg-highway-orange text-white'
                              : isOccupied
                              ? 'bg-gray-800 text-gray-500'
                              : isBlocked
                              ? 'bg-yellow-900/50 text-yellow-400'
                              : 'bg-green-950 text-green-400'
                          }`}
                        >
                          {isSelected ? 'SELECTED' : isOccupied ? 'BOOKED' : isBlocked ? 'CLEANING' : 'AVAILABLE'}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Room Hygiene & Safety Notice */}
              <div className="mt-4 pt-3 border-t border-[#25292E] flex items-center justify-between text-xs text-gray-400">
                <span className="flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-1 text-green-400" />
                  Every bed comes with sanitized fresh bedsheet, clean pillow cover, personal reading lamp, and charging plug.
                </span>
                <span className="text-[11px] text-gray-500">
                  CCTV monitored entrance • Luggage locker included
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
