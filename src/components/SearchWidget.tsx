'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { 
  MapPin, 
  Navigation, 
  Calendar, 
  Clock, 
  Hourglass, 
  Users, 
  Car, 
  Truck, 
  Search, 
  LocateFixed,
  Route,
  ArrowRight
} from 'lucide-react';
import { VehicleType } from '@/types';

interface SearchWidgetProps {
  className?: string;
  isCompact?: boolean;
  initialValues?: {
    location?: string;
    destination?: string;
    duration?: number;
    vehicleType?: VehicleType;
  };
}

export const SearchWidget: React.FC<SearchWidgetProps> = ({
  className = '',
  isCompact = false,
  initialValues,
}) => {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState<'nearby' | 'route'>('nearby');
  const [location, setLocation] = useState(initialValues?.location || 'NH 48 (Bharuch - Surat Corridor)');
  const [destination, setDestination] = useState(initialValues?.destination || 'Mumbai BKC');
  const [date, setDate] = useState(() => new Date().toISOString().split('T')[0]);
  const [checkInTime, setCheckInTime] = useState('Now (Immediate Rest)');
  const [duration, setDuration] = useState<number>(initialValues?.duration || 3);
  const [travellers, setTravellers] = useState<number>(1);
  const [vehicleType, setVehicleType] = useState<VehicleType>(initialValues?.vehicleType || 'CAB_TAXI');
  const [detectingLocation, setDetectingLocation] = useState(false);

  const durationOptions = [
    { label: '1 Hour', value: 1, desc: 'Quick Power Nap' },
    { label: '2 Hours', value: 2, desc: 'Shower & Rest' },
    { label: '3 Hours', value: 3, desc: 'Driver Recharge' },
    { label: '4 Hours', value: 4, desc: 'Deep Rest' },
    { label: '6 Hours', value: 6, desc: 'Extended Break' },
    { label: '8 Hours', value: 8, desc: 'Full Shift Sleep' },
    { label: 'Overnight (10h)', value: 10, desc: 'Night Stopover' },
  ];

  const vehicleOptions: { type: VehicleType; label: string; icon: string }[] = [
    { type: 'CAB_TAXI', label: 'Cab / Taxi', icon: '🚕' },
    { type: 'TRUCK', label: 'Heavy Truck / Logistics', icon: '🚛' },
    { type: 'MOTORCYCLE', label: 'Motorcycle / Biker', icon: '🏍️' },
    { type: 'PRIVATE_CAR', label: 'Private Car / Roadtrip', icon: '🚗' },
    { type: 'BUS', label: 'Bus / Travellers', icon: '🚌' },
    { type: 'OTHER', label: 'Other Commercial', icon: '🚚' },
  ];

  const handleDetectLocation = () => {
    if (!navigator.geolocation) {
      alert('Geolocation is not supported by your browser');
      return;
    }
    setDetectingLocation(true);
    navigator.geolocation.getCurrentPosition(
      (position) => {
        setDetectingLocation(false);
        // Set detected highway location
        setLocation(`GPS: NH 48 Toll (${position.coords.latitude.toFixed(3)}°N, ${position.coords.longitude.toFixed(3)}°E)`);
      },
      (error) => {
        setDetectingLocation(false);
        console.error('Location error:', error);
        setLocation('NH 48 Bharuch Toll Plaza, Gujarat');
      },
      { timeout: 8000 }
    );
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const query = new URLSearchParams();
    query.set('location', location);
    if (activeTab === 'route') {
      query.set('destination', destination);
      query.set('tab', 'route');
    }
    query.set('duration', duration.toString());
    query.set('vehicle', vehicleType);
    query.set('travellers', travellers.toString());
    query.set('date', date);

    router.push(`/search?${query.toString()}`);
  };

  return (
    <div className={`bg-[#17191C]/95 border border-[#2B3037] rounded-2xl shadow-2xl p-4 sm:p-6 backdrop-blur-xl ${className}`}>
      {/* Search Mode Tabs */}
      <div className="flex items-center space-x-2 border-b border-[#25292E] pb-3 mb-5">
        <button
          type="button"
          onClick={() => setActiveTab('nearby')}
          className={`flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'nearby'
              ? 'bg-highway-orange text-white shadow-md shadow-highway-orange/30'
              : 'text-gray-400 hover:text-white hover:bg-[#25292E]'
          }`}
        >
          <MapPin className="w-4 h-4 mr-1.5" />
          Nearby Rest Stops
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('route')}
          className={`flex items-center px-4 py-2 rounded-xl text-xs sm:text-sm font-bold transition-all ${
            activeTab === 'route'
              ? 'bg-highway-orange text-white shadow-md shadow-highway-orange/30'
              : 'text-gray-400 hover:text-white hover:bg-[#25292E]'
          }`}
        >
          <Route className="w-4 h-4 mr-1.5" />
          Highway Route Rest Planner
        </button>
        <div className="hidden sm:flex ml-auto items-center text-xs text-highway-yellow font-semibold">
          ⚡ Starting at ₹30/Hour • Pay Only for Time Rested
        </div>
      </div>

      <form onSubmit={handleSearch} className="space-y-4">
        {/* Row 1: Locations */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-3">
          <div className={`${activeTab === 'route' ? 'md:col-span-6' : 'md:col-span-12'} relative`}>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center justify-between">
              <span className="flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange" />
                {activeTab === 'route' ? 'Starting Point / Current Highway' : 'Your Location / Highway Corridor'}
              </span>
              <button
                type="button"
                onClick={handleDetectLocation}
                disabled={detectingLocation}
                className="text-road-yellow hover:underline text-[11px] flex items-center font-bold"
              >
                <LocateFixed className="w-3 h-3 mr-1" />
                {detectingLocation ? 'Detecting...' : 'Detect GPS'}
              </button>
            </label>
            <div className="relative">
              <input
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="e.g. NH 48 Bharuch, Vadodara, or Neemrana"
                className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange focus:ring-1 focus:ring-highway-orange rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 font-medium transition-colors"
                required
              />
            </div>
          </div>

          {activeTab === 'route' && (
            <div className="md:col-span-6 relative">
              <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center">
                <Navigation className="w-3.5 h-3.5 mr-1 text-road-yellow" />
                Final Destination
              </label>
              <input
                type="text"
                value={destination}
                onChange={(e) => setDestination(e.target.value)}
                placeholder="e.g. Mumbai, Jaipur, Bengaluru, or Pune"
                className="w-full bg-[#202429] border border-[#343A43] focus:border-road-yellow focus:ring-1 focus:ring-road-yellow rounded-xl px-3.5 py-2.5 text-sm text-white placeholder-gray-500 font-medium transition-colors"
                required
              />
            </div>
          )}
        </div>

        {/* Row 2: Vehicle Type selection */}
        <div>
          <label className="block text-xs font-semibold text-gray-300 mb-1.5 flex items-center">
            <Car className="w-3.5 h-3.5 mr-1 text-highway-orange" />
            Vehicle Type (Required for Dedicated Parking & Washroom Allocation)
          </label>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-2">
            {vehicleOptions.map((v) => {
              const selected = vehicleType === v.type;
              return (
                <button
                  key={v.type}
                  type="button"
                  onClick={() => setVehicleType(v.type)}
                  className={`flex flex-col items-center justify-center py-2 px-2 rounded-xl border text-center transition-all ${
                    selected
                      ? 'bg-highway-orange/15 border-highway-orange text-white font-bold shadow-sm'
                      : 'bg-[#202429] border-[#2D333B] text-gray-400 hover:text-gray-200 hover:border-gray-600'
                  }`}
                >
                  <span className="text-lg mb-0.5">{v.icon}</span>
                  <span className="text-[11px] leading-tight line-clamp-1">{v.label}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Row 3: Duration, Date, Check-in Time, Travellers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3 pt-1">
          {/* Duration Selector */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center">
              <Hourglass className="w-3.5 h-3.5 mr-1 text-road-yellow" />
              Rest Duration
            </label>
            <select
              value={duration}
              onChange={(e) => setDuration(Number(e.target.value))}
              className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl px-3 py-2.5 text-sm text-white font-medium"
            >
              {durationOptions.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#1E2125]">
                  {opt.label} – {opt.desc}
                </option>
              ))}
            </select>
          </div>

          {/* Travel Date */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center">
              <Calendar className="w-3.5 h-3.5 mr-1 text-gray-400" />
              Date of Check-in
            </label>
            <input
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl px-3 py-2.5 text-sm text-white font-medium"
            />
          </div>

          {/* Check-in Time */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center">
              <Clock className="w-3.5 h-3.5 mr-1 text-gray-400" />
              Check-in Time
            </label>
            <select
              value={checkInTime}
              onChange={(e) => setCheckInTime(e.target.value)}
              className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl px-3 py-2.5 text-sm text-white font-medium"
            >
              <option className="bg-[#1E2125]">Now (Immediate Rest)</option>
              <option className="bg-[#1E2125]">In 30 Minutes</option>
              <option className="bg-[#1E2125]">In 1 Hour</option>
              <option className="bg-[#1E2125]">Tonight (10:00 PM - 12:00 AM)</option>
              <option className="bg-[#1E2125]">Late Night (01:00 AM - 04:00 AM)</option>
              <option className="bg-[#1E2125]">Early Morning (05:00 AM - 08:00 AM)</option>
            </select>
          </div>

          {/* Travellers */}
          <div>
            <label className="block text-xs font-semibold text-gray-300 mb-1 flex items-center">
              <Users className="w-3.5 h-3.5 mr-1 text-gray-400" />
              Beds Needed
            </label>
            <select
              value={travellers}
              onChange={(e) => setTravellers(Number(e.target.value))}
              className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl px-3 py-2.5 text-sm text-white font-medium"
            >
              <option value={1} className="bg-[#1E2125]">1 Individual Bed (Solo Driver)</option>
              <option value={2} className="bg-[#1E2125]">2 Beds (Driver + Co-driver)</option>
              <option value={3} className="bg-[#1E2125]">3 Beds</option>
              <option value={4} className="bg-[#1E2125]">4 Beds (Full 4-Bed Dorm)</option>
              <option value={8} className="bg-[#1E2125]">8 Beds (Team / Fleet Crew)</option>
            </select>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-highway-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-base py-3.5 px-6 rounded-xl shadow-xl shadow-highway-orange/25 transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2"
          >
            <Search className="w-5 h-5" />
            <span>FIND AVAILABLE REST STOPS & BEDS</span>
            <ArrowRight className="w-5 h-5 ml-1" />
          </button>
        </div>
      </form>
    </div>
  );
};
