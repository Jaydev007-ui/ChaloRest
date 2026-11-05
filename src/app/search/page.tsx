'use client';

import React, { useState, useMemo } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { DEMO_PROPERTIES } from '@/data/seedData';
import { RoutePlanner } from '@/components/RoutePlanner';
import { Property, GenderCategory } from '@/types';
import { 
  Search, 
  MapPin, 
  Star, 
  Bed, 
  Truck, 
  ShieldCheck, 
  SlidersHorizontal, 
  X, 
  ArrowRight,
  Compass,
  Route,
  Grid,
  Map,
  Check,
  Zap,
  RotateCcw,
  Sparkles,
  Car,
  Bus
} from 'lucide-react';

function SearchContent() {
  const searchParams = useSearchParams();
  const initialLocation = searchParams.get('location') || '';
  const initialCity = searchParams.get('city') || '';
  const initialRoute = searchParams.get('route') || '';
  const initialTab = searchParams.get('tab') === 'route' ? 'route' : 'nearby';

  const [activeTab, setActiveTab] = useState<'nearby' | 'route'>(initialTab);
  const [viewMode, setViewMode] = useState<'list' | 'map'>('list');
  const [searchLocation, setSearchLocation] = useState(initialCity || initialLocation);
  
  // Activated Filters (matches screenshot)
  const [maxPrice, setMaxPrice] = useState<number>(60);
  const [minRating, setMinRating] = useState<number>(4.0);
  const [truckParkingOnly, setTruckParkingOnly] = useState<boolean>(false);
  const [acOnly, setAcOnly] = useState<boolean>(false);
  const [nonAcOnly, setNonAcOnly] = useState<boolean>(false);
  const [attachedBathOnly, setAttachedBathOnly] = useState<boolean>(false);
  const [evChargingOnly, setEvChargingOnly] = useState<boolean>(false);
  const [genderFilter, setGenderFilter] = useState<GenderCategory>('ALL');
  const [sortBy, setSortBy] = useState<'recommended' | 'price_low' | 'rating_high' | 'available_beds'>('recommended');

  // Quick Location buttons
  const quickLocations = [
    { label: 'All India', query: '' },
    { label: 'Bengaluru / Bangalore (7)', query: 'Bengaluru' },
    { label: 'Electronic City (NH 44)', query: 'Electronic City' },
    { label: 'Nelamangala (NH 48)', query: 'Nelamangala' },
    { label: 'Devanahalli Airport (NH 44)', query: 'Devanahalli' },
    { label: 'Kengeri Mysuru Exp (NH 275)', query: 'Kengeri' },
    { label: 'Whitefield / KR Puram (NH 75)', query: 'Whitefield' },
    { label: 'Peenya Industrial', query: 'Peenya' },
    { label: 'Attibele Border', query: 'Attibele' },
    { label: 'Mumbai - Pune', query: 'Mumbai' },
    { label: 'Delhi - NCR', query: 'Delhi' },
    { label: 'Ahmedabad', query: 'Ahmedabad' },
  ];

  const handleResetFilters = () => {
    setMaxPrice(90);
    setMinRating(4.0);
    setTruckParkingOnly(false);
    setAcOnly(false);
    setNonAcOnly(false);
    setAttachedBathOnly(false);
    setEvChargingOnly(false);
    setGenderFilter('ALL');
    setSearchLocation('');
  };

  const handleRatingClick = (rating: number) => {
    if (minRating === rating) {
      setMinRating(4.0); // Toggle back if already selected
    } else {
      setMinRating(rating);
    }
  };

  // Active filters count for badges
  const activeFiltersCount = useMemo(() => {
    let count = 0;
    if (maxPrice < 90) count++;
    if (minRating > 4.0) count++;
    if (truckParkingOnly) count++;
    if (acOnly) count++;
    if (nonAcOnly) count++;
    if (attachedBathOnly) count++;
    if (evChargingOnly) count++;
    if (genderFilter !== 'ALL') count++;
    if (searchLocation.trim()) count++;
    return count;
  }, [maxPrice, minRating, truckParkingOnly, acOnly, nonAcOnly, attachedBathOnly, evChargingOnly, genderFilter, searchLocation]);

  // Reactive matching engine
  const filteredProperties = useMemo(() => {
    let list = [...DEMO_PROPERTIES];

    // Search query matching
    if (searchLocation.trim()) {
      const q = searchLocation.toLowerCase().trim();
      list = list.filter(p => {
        const isBangaloreSearch = q.includes('bangalore') || q.includes('bengaluru') || q.includes('blr');
        if (isBangaloreSearch) {
          return (
            p.city.toLowerCase().includes('bengaluru') ||
            p.city.toLowerCase().includes('bangalore') ||
            p.address.toLowerCase().includes('bengaluru') ||
            p.address.toLowerCase().includes('bangalore') ||
            p.state.toLowerCase() === 'karnataka'
          );
        }
        return (
          p.name.toLowerCase().includes(q) ||
          p.city.toLowerCase().includes(q) ||
          p.highway.toLowerCase().includes(q) ||
          p.address.toLowerCase().includes(q) ||
          p.state.toLowerCase().includes(q)
        );
      });
    }

    // Amenities & Security filters
    if (truckParkingOnly) {
      list = list.filter(p => p.truckParking);
    }
    if (acOnly) {
      list = list.filter(p => p.rooms.some(r => r.acType === 'AC'));
    }
    if (nonAcOnly) {
      list = list.filter(p => p.rooms.some(r => r.acType === 'NON_AC'));
    }
    if (attachedBathOnly) {
      list = list.filter(p => p.attachedBathrooms || p.rooms.some(r => r.bathroomType === 'ATTACHED'));
    }
    if (evChargingOnly) {
      list = list.filter(p => p.evChargingAvailable);
    }

    // Accommodation Type (Gender Dedicated)
    if (genderFilter !== 'ALL') {
      list = list.filter(p => 
        p.rooms.some(r => r.genderCategory === genderFilter) || 
        p.genderCategory === genderFilter
      );
    }

    // Tariff and Rating filters
    list = list.filter(p => p.baseHourlyRate <= maxPrice && p.rating >= minRating);

    // Sorting logic
    if (sortBy === 'price_low') {
      list.sort((a, b) => a.baseHourlyRate - b.baseHourlyRate);
    } else if (sortBy === 'rating_high') {
      list.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'available_beds') {
      list.sort((a, b) => {
        const bedsA = a.rooms.reduce((acc, r) => acc + r.beds.filter(x => x.isAvailable).length, 0);
        const bedsB = b.rooms.reduce((acc, r) => acc + r.beds.filter(x => x.isAvailable).length, 0);
        return bedsB - bedsA;
      });
    }

    return list;
  }, [
    searchLocation, 
    maxPrice, 
    minRating, 
    truckParkingOnly, 
    acOnly, 
    nonAcOnly, 
    attachedBathOnly, 
    evChargingOnly, 
    genderFilter, 
    sortBy
  ]);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8">
      {/* Search Header Bar */}
      <div className="bg-[#17191C] border border-[#2B3037] rounded-3xl p-6 shadow-xl space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#25292E] pb-4">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs bg-highway-orange text-white font-black px-2.5 py-0.5 rounded uppercase">
                REST ENGINE
              </span>
              <h1 className="text-2xl font-black text-white">Find Highway Rest Stops</h1>
            </div>
            <p className="text-xs text-gray-400 mt-1">
              Showing {filteredProperties.length} verified rest properties across India with live bed inventory
            </p>
          </div>

          {/* Mode switch */}
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setActiveTab('nearby')}
              className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'nearby'
                  ? 'bg-highway-orange text-white'
                  : 'bg-[#202429] text-gray-400 hover:text-white'
              }`}
            >
              <Compass className="w-3.5 h-3.5 mr-1.5" />
              Nearby & Corridor
            </button>
            <button
              onClick={() => setActiveTab('route')}
              className={`flex items-center px-4 py-2 rounded-xl text-xs font-bold transition-all ${
                activeTab === 'route'
                  ? 'bg-highway-orange text-white'
                  : 'bg-[#202429] text-gray-400 hover:text-white'
              }`}
            >
              <Route className="w-3.5 h-3.5 mr-1.5" />
              Highway Route Planner
            </button>
          </div>
        </div>

        {activeTab === 'nearby' ? (
          <div className="space-y-3">
            <div className="flex flex-col sm:flex-row gap-3">
              <div className="relative flex-1">
                <MapPin className="w-4 h-4 text-highway-orange absolute left-3.5 top-3.5" />
                <input
                  type="text"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  placeholder="Search highway (NH 48, NH 44), city (Bengaluru, Mumbai, Delhi, Ahmedabad), or local corridor..."
                  className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl pl-10 pr-4 py-2.5 text-sm text-white focus:outline-none"
                />
              </div>
              {searchLocation && (
                <button
                  onClick={() => setSearchLocation('')}
                  className="px-3 py-2 bg-[#25292E] text-xs text-gray-400 hover:text-white rounded-xl flex items-center"
                >
                  <X className="w-3.5 h-3.5 mr-1" />
                  <span>Clear Location</span>
                </button>
              )}
            </div>

            {/* Quick Location Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 text-xs no-scrollbar">
              <span className="text-[11px] font-bold text-gray-400 whitespace-nowrap mr-1">Quick Corridor:</span>
              {quickLocations.map((loc) => {
                const isActive = (loc.query === '' && searchLocation === '') || (loc.query !== '' && searchLocation.toLowerCase().includes(loc.query.toLowerCase()));
                return (
                  <button
                    key={loc.label}
                    onClick={() => setSearchLocation(loc.query)}
                    className={`px-3 py-1.5 rounded-xl whitespace-nowrap text-xs font-bold transition-all border ${
                      isActive
                        ? 'bg-road-yellow text-black border-road-yellow shadow-md'
                        : 'bg-[#202429] text-gray-300 border-[#2D333B] hover:border-gray-600'
                    }`}
                  >
                    {loc.label}
                  </button>
                );
              })}
            </div>
          </div>
        ) : (
          <RoutePlanner properties={DEMO_PROPERTIES} />
        )}
      </div>

      {activeTab === 'nearby' && (
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Left Sidebar Filters (Exact match with user specification) */}
          <div className="lg:col-span-1 space-y-6">
            <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-5 shadow-xl space-y-5 sticky top-24">
              {/* Header */}
              <div className="flex items-center justify-between border-b border-[#25292E] pb-3">
                <span className="font-black text-white text-sm flex items-center">
                  <SlidersHorizontal className="w-4 h-4 mr-2 text-highway-orange" />
                  Filter Rest Stops
                </span>
                <button
                  type="button"
                  onClick={handleResetFilters}
                  className="text-xs text-road-yellow hover:underline font-bold"
                >
                  Reset
                </button>
              </div>

              {/* Price Slider */}
              <div>
                <div className="flex justify-between text-xs font-bold mb-1.5">
                  <span className="text-gray-300">Max Price Per Hour</span>
                  <span className="text-road-yellow font-mono text-sm font-black">₹{maxPrice}/hr</span>
                </div>
                <input
                  type="range"
                  min="25"
                  max="90"
                  step="5"
                  value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-highway-orange cursor-pointer"
                />
                <div className="flex justify-between text-[10px] text-gray-400 font-mono mt-1">
                  <span>₹25/hr (Non-AC)</span>
                  <span>₹90/hr</span>
                </div>
              </div>

              {/* Minimum Rating */}
              <div>
                <label className="block text-xs font-bold text-gray-300 mb-1.5">Minimum Rating</label>
                <div className="grid grid-cols-3 gap-1.5 text-xs">
                  {[4.0, 4.5, 4.8].map((r) => {
                    const isSelected = minRating === r;
                    return (
                      <button
                        key={r}
                        type="button"
                        onClick={() => handleRatingClick(r)}
                        className={`py-2 rounded-xl border text-center font-black transition-all ${
                          isSelected
                            ? 'bg-road-yellow text-black border-road-yellow shadow-md ring-1 ring-road-yellow'
                            : 'bg-[#202429] text-gray-300 border-[#2D333B] hover:border-gray-600'
                        }`}
                      >
                        ★ {r}+
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Checkboxes: Amenities & Security */}
              <div className="space-y-3 pt-2 border-t border-[#25292E]">
                <label className="text-xs font-bold text-gray-300 block mb-1">Amenities & Security</label>
                
                <label className="flex items-center space-x-2.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={truckParkingOnly}
                    onChange={(e) => setTruckParkingOnly(e.target.checked)}
                    className="rounded bg-[#202429] border-gray-600 text-highway-orange focus:ring-highway-orange w-4 h-4"
                  />
                  <span className="flex items-center">
                    <Truck className="w-3.5 h-3.5 mr-1.5 text-blue-400" />
                    Heavy Truck Parking
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={acOnly}
                    onChange={(e) => {
                      setAcOnly(e.target.checked);
                      if (e.target.checked) setNonAcOnly(false);
                    }}
                    className="rounded bg-[#202429] border-gray-600 text-highway-orange focus:ring-highway-orange w-4 h-4"
                  />
                  <span className="flex items-center">
                    <span className="mr-1.5 text-sm">❄️</span>
                    Air-Conditioned Dorms (Low Count)
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={nonAcOnly}
                    onChange={(e) => {
                      setNonAcOnly(e.target.checked);
                      if (e.target.checked) setAcOnly(false);
                    }}
                    className="rounded bg-[#202429] border-gray-600 text-highway-orange focus:ring-highway-orange w-4 h-4"
                  />
                  <span className="flex items-center">
                    <span className="mr-1.5 text-sm">🌀</span>
                    Non-AC Dorms (High Count / Budget)
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={attachedBathOnly}
                    onChange={(e) => setAttachedBathOnly(e.target.checked)}
                    className="rounded bg-[#202429] border-gray-600 text-highway-orange focus:ring-highway-orange w-4 h-4"
                  />
                  <span className="flex items-center">
                    <span className="mr-1.5 text-sm">🚿</span>
                    Attached Bathrooms
                  </span>
                </label>

                <label className="flex items-center space-x-2.5 text-xs text-gray-300 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={evChargingOnly}
                    onChange={(e) => setEvChargingOnly(e.target.checked)}
                    className="rounded bg-[#202429] border-gray-600 text-highway-orange focus:ring-highway-orange w-4 h-4"
                  />
                  <span className="flex items-center">
                    <Zap className="w-3.5 h-3.5 mr-1.5 text-yellow-400" />
                    EV Fast Charging Plugs
                  </span>
                </label>
              </div>

              {/* Accommodation Type Dropdown */}
              <div className="pt-2 border-t border-[#25292E]">
                <label className="block text-xs font-bold text-gray-300 mb-1.5">Accommodation Type</label>
                <select
                  value={genderFilter}
                  onChange={(e) => setGenderFilter(e.target.value as GenderCategory)}
                  className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none"
                >
                  <option value="ALL">All Shared Rooms</option>
                  <option value="MALE_ONLY">Male Only Dorms</option>
                  <option value="FEMALE_ONLY">Female Dedicated Dorms</option>
                  <option value="FAMILY">Family Private Rooms</option>
                </select>
              </div>

              {/* Ratio Notice */}
              <div className="bg-[#121416] p-3 rounded-2xl border border-gray-800 text-[11px] text-gray-400 space-y-1">
                <span className="text-gray-300 font-bold block">📊 Inventory Structure:</span>
                <p>• <strong>Non-AC Dorms:</strong> High count (75% of beds, ₹25–₹30/hr)</p>
                <p>• <strong>AC Sleep Pods:</strong> Low count (25% of beds, ₹35–₹45/hr)</p>
              </div>
            </div>
          </div>

          {/* Right Main Listings Area */}
          <div className="lg:col-span-3 space-y-4">
            {/* Sorting & View Toggle bar */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-[#181B1F] border border-[#2B3037] p-3 rounded-2xl">
              <div className="flex items-center space-x-2">
                <span className="text-xs text-gray-400">Sort by:</span>
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as any)}
                  className="bg-[#202429] border border-gray-700 text-xs text-white font-medium rounded-lg px-2.5 py-1.5"
                >
                  <option value="recommended">Recommended (Nearest Highway Detour)</option>
                  <option value="price_low">Lowest Price Per Hour</option>
                  <option value="rating_high">Highest Rated</option>
                  <option value="available_beds">Most Available Beds</option>
                </select>
              </div>

              <div className="flex items-center space-x-1.5 self-end sm:self-auto">
                <button
                  type="button"
                  onClick={() => setViewMode('list')}
                  className={`p-1.5 rounded-lg border text-xs ${
                    viewMode === 'list'
                      ? 'bg-highway-orange text-white border-highway-orange'
                      : 'bg-[#202429] text-gray-400 border-gray-700'
                  }`}
                  title="List View"
                >
                  <Grid className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setViewMode('map')}
                  className={`p-1.5 rounded-lg border text-xs ${
                    viewMode === 'map'
                      ? 'bg-highway-orange text-white border-highway-orange'
                      : 'bg-[#202429] text-gray-400 border-gray-700'
                  }`}
                  title="Interactive Map View"
                >
                  <Map className="w-4 h-4" />
                </button>
              </div>
            </div>

            {/* Active Filters Row (if any filter active) */}
            {activeFiltersCount > 0 && (
              <div className="flex flex-wrap items-center gap-2 p-3 bg-[#14171A] border border-[#2B3037] rounded-2xl text-xs">
                <span className="text-gray-400 font-bold">Active Filters:</span>
                {maxPrice < 90 && (
                  <span className="bg-road-yellow/15 border border-road-yellow/40 text-road-yellow px-2.5 py-0.5 rounded-lg flex items-center">
                    Max ₹{maxPrice}/hr
                    <button onClick={() => setMaxPrice(90)} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                {minRating > 4.0 && (
                  <span className="bg-road-yellow/15 border border-road-yellow/40 text-road-yellow px-2.5 py-0.5 rounded-lg flex items-center">
                    ★ {minRating}+
                    <button onClick={() => setMinRating(4.0)} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                {genderFilter !== 'ALL' && (
                  <span className="bg-pink-500/20 border border-pink-500/40 text-pink-300 px-2.5 py-0.5 rounded-lg flex items-center">
                    {genderFilter === 'FEMALE_ONLY' ? 'Female Dedicated Dorms' : genderFilter === 'MALE_ONLY' ? 'Male Only' : 'Family Rooms'}
                    <button onClick={() => setGenderFilter('ALL')} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                {truckParkingOnly && (
                  <span className="bg-blue-500/20 border border-blue-500/40 text-blue-300 px-2.5 py-0.5 rounded-lg flex items-center">
                    Heavy Truck Parking
                    <button onClick={() => setTruckParkingOnly(false)} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                {acOnly && (
                  <span className="bg-cyan-500/20 border border-cyan-500/40 text-cyan-300 px-2.5 py-0.5 rounded-lg flex items-center">
                    AC Dorms
                    <button onClick={() => setAcOnly(false)} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                {nonAcOnly && (
                  <span className="bg-amber-500/20 border border-amber-500/40 text-amber-300 px-2.5 py-0.5 rounded-lg flex items-center">
                    Non-AC Dorms
                    <button onClick={() => setNonAcOnly(false)} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                {attachedBathOnly && (
                  <span className="bg-purple-500/20 border border-purple-500/40 text-purple-300 px-2.5 py-0.5 rounded-lg flex items-center">
                    Attached Bath
                    <button onClick={() => setAttachedBathOnly(false)} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                {evChargingOnly && (
                  <span className="bg-emerald-500/20 border border-emerald-500/40 text-emerald-300 px-2.5 py-0.5 rounded-lg flex items-center">
                    EV Charging
                    <button onClick={() => setEvChargingOnly(false)} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                {searchLocation && (
                  <span className="bg-[#25292E] border border-gray-700 text-gray-200 px-2.5 py-0.5 rounded-lg flex items-center">
                    Location: {searchLocation}
                    <button onClick={() => setSearchLocation('')} className="ml-1.5 text-xs hover:text-white">✕</button>
                  </span>
                )}
                <button
                  onClick={handleResetFilters}
                  className="text-xs text-road-yellow hover:underline ml-auto font-bold"
                >
                  Clear All
                </button>
              </div>
            )}

            {/* Simulated Interactive Map View if toggled */}
            {viewMode === 'map' && (
              <div className="bg-[#101214] border border-[#2B3037] rounded-3xl p-6 relative overflow-hidden min-h-[350px] flex flex-col justify-between">
                <div className="flex items-center justify-between z-10">
                  <span className="bg-highway-orange text-white text-xs font-black px-3 py-1 rounded-lg flex items-center">
                    <Map className="w-3.5 h-3.5 mr-1" />
                    Highway GIS Marker View
                  </span>
                  <span className="text-xs text-gray-400 font-mono">
                    {filteredProperties.length} Properties Located on Highway Corridors
                  </span>
                </div>

                {/* SVG Route Corridor Map Representation */}
                <div className="my-6 relative h-56 w-full flex items-center justify-center">
                  <svg className="w-full h-full max-w-2xl" viewBox="0 0 600 200">
                    <path
                      d="M 50 150 Q 200 40, 350 140 T 550 60"
                      stroke="#2A303A"
                      strokeWidth="20"
                      fill="none"
                      strokeLinecap="round"
                    />
                    <path
                      d="M 50 150 Q 200 40, 350 140 T 550 60"
                      stroke="#FFC928"
                      strokeWidth="2"
                      strokeDasharray="10 8"
                      fill="none"
                    />

                    {/* Interactive Hotel Markers */}
                    {filteredProperties.map((p, idx) => {
                      const xPositions = [100, 180, 260, 340, 420, 500, 140, 300, 460];
                      const yPositions = [130, 80, 120, 70, 110, 60, 100, 140, 85];
                      const cx = xPositions[idx % xPositions.length];
                      const cy = yPositions[idx % yPositions.length];

                      return (
                        <g key={p.id} className="cursor-pointer group">
                          <circle cx={cx} cy={cy} r="14" fill="#FF8A24" className="animate-pulse opacity-75" />
                          <circle cx={cx} cy={cy} r="8" fill="#FFFFFF" />
                          <text x={cx} y={cy - 12} fill="#FFC928" fontSize="10" fontWeight="bold" textAnchor="middle">
                            ₹{p.baseHourlyRate}/hr
                          </text>
                        </g>
                      );
                    })}
                  </svg>
                </div>

                <div className="text-center text-xs text-gray-400 z-10 border-t border-gray-800 pt-3">
                  Click any hotel card below to inspect bed availability and view 360° photographs.
                </div>
              </div>
            )}

            {/* Hotel Cards List */}
            {filteredProperties.length === 0 ? (
              <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-12 text-center space-y-4">
                <MapPin className="w-12 h-12 text-gray-600 mx-auto" />
                <h3 className="text-lg font-bold text-white">No Rest Stops Found Matching These Filters</h3>
                <p className="text-xs text-gray-400 max-w-md mx-auto">
                  Try adjusting the maximum price slider, relaxing the minimum rating, or resetting filters to explore all available highway properties.
                </p>
                <button
                  onClick={handleResetFilters}
                  className="bg-highway-orange text-white text-xs font-bold px-5 py-3 rounded-xl shadow"
                >
                  Reset All Filters
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredProperties.map((property) => {
                  const availableBeds = property.rooms.reduce(
                    (acc, r) => acc + r.beds.filter(b => b.isAvailable && !b.isBlocked).length,
                    0
                  );

                  // Calculate AC (Low count) vs Non-AC (High count) beds
                  const acBedsCount = property.rooms
                    .filter(r => r.acType === 'AC')
                    .reduce((acc, r) => acc + r.capacity, 0);

                  const nonAcBedsCount = property.rooms
                    .filter(r => r.acType === 'NON_AC')
                    .reduce((acc, r) => acc + r.capacity, 0);

                  const hasFemaleRoom = property.rooms.some(r => r.genderCategory === 'FEMALE_ONLY') || property.genderCategory === 'FEMALE_ONLY';

                  return (
                    <div
                      key={property.id}
                      className="bg-[#1A1D21] border border-[#272B31] hover:border-highway-orange rounded-3xl p-4 sm:p-5 transition-all shadow-xl group flex flex-col md:flex-row gap-5"
                    >
                      {/* Property Image thumbnail */}
                      <div className="relative w-full md:w-64 h-48 rounded-2xl overflow-hidden flex-shrink-0 bg-gray-900">
                        <Image
                          src={property.images[0]}
                          alt={property.name}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 100vw, 250px"
                        />
                        <div className="absolute top-3 right-3 bg-black/80 backdrop-blur-md px-2.5 py-1 rounded-lg text-xs font-black text-road-yellow border border-gray-700">
                          ₹{property.baseHourlyRate}/hr
                        </div>
                        <div className="absolute bottom-3 left-3 bg-black/70 px-2 py-0.5 rounded text-[10px] text-gray-300 font-mono">
                          {property.detourDistanceKm === 0 ? 'Direct on Highway' : `${property.detourDistanceKm} km detour`}
                        </div>
                      </div>

                      {/* Property Details */}
                      <div className="flex-1 flex flex-col justify-between space-y-3">
                        <div>
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <h3 className="text-lg font-black text-white group-hover:text-highway-orange transition-colors">
                              {property.name}
                            </h3>
                            <div className="flex items-center space-x-1 text-xs bg-green-500/10 text-green-400 font-bold px-2 py-0.5 rounded border border-green-500/30">
                              <Star className="w-3.5 h-3.5 fill-green-400" />
                              <span>{property.rating}</span>
                              <span className="text-gray-400 font-normal">({property.reviewCount})</span>
                            </div>
                          </div>

                          <p className="text-xs text-gray-400 flex items-center mt-1">
                            <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange flex-shrink-0" />
                            <span>{property.address}</span>
                          </p>

                          <p className="text-xs text-gray-300 mt-2 line-clamp-2">
                            {property.description}
                          </p>
                        </div>

                        {/* Inventory Breakdown: AC (Low count) vs Non-AC (High count) + Female Dorm */}
                        <div className="flex flex-wrap items-center gap-2 text-xs pt-1 border-t border-[#25292E]">
                          <span className="bg-[#202429] text-green-400 font-bold px-2.5 py-1 rounded-lg border border-green-500/20">
                            🛏️ {availableBeds} Total Beds
                          </span>

                          {/* Non-AC high count badge */}
                          <span className="bg-amber-500/15 text-amber-300 font-bold px-2.5 py-1 rounded-lg border border-amber-500/30">
                            🌀 Non-AC: {nonAcBedsCount} Beds (More Counts • ₹25–₹30/hr)
                          </span>

                          {/* AC low count badge */}
                          <span className="bg-cyan-500/15 text-cyan-300 font-bold px-2.5 py-1 rounded-lg border border-cyan-500/30">
                            ❄️ AC: {acBedsCount} Pods (Exclusive • ₹35–₹45/hr)
                          </span>

                          {/* Female dedicated badge if present */}
                          {hasFemaleRoom && (
                            <span className="bg-pink-500/20 text-pink-300 font-bold px-2.5 py-1 rounded-lg border border-pink-500/40">
                              🌸 Female Dedicated Dorms
                            </span>
                          )}

                          {/* Vehicle Capacities */}
                          <span className="bg-blue-500/10 text-blue-400 font-semibold px-2 py-1 rounded-lg border border-blue-500/20">
                            🚛 {property.truckParkingCapacity || 60} Trucks
                          </span>
                          <span className="bg-yellow-500/10 text-yellow-400 font-semibold px-2 py-1 rounded-lg border border-yellow-500/20">
                            🚌 {property.busParkingCapacity || 20} Buses
                          </span>
                          <span className="bg-green-500/10 text-green-400 font-semibold px-2 py-1 rounded-lg border border-green-500/20">
                            🚖 {property.carParkingCapacity || 45} Cars/Cabs
                          </span>
                          <span className="bg-emerald-500/10 text-emerald-400 font-semibold px-2 py-1 rounded-lg border border-emerald-500/20">
                            ⚡ {property.evChargingPoints || 6} EV Fast Plugs
                          </span>
                          <span className="bg-[#202429] text-gray-300 px-2 py-1 rounded-lg">
                            🔐 Bed Locker
                          </span>
                          <span className="bg-[#202429] text-gray-300 px-2 py-1 rounded-lg">
                            🚿 Attached Bath
                          </span>
                        </div>

                        {/* CTA Bottom Bar */}
                        <div className="flex items-center justify-between pt-2">
                          <div>
                            <span className="text-sm font-black text-road-yellow font-mono">
                              Starting at ₹{property.baseHourlyRate}
                            </span>
                            <span className="text-[11px] text-gray-400 font-normal"> / hour per bed</span>
                          </div>
                          <Link
                            href={`/hotels/${property.slug}`}
                            className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs px-5 py-2.5 rounded-xl shadow-lg shadow-highway-orange/20 transition-all flex items-center"
                          >
                            <span>SELECT ROOM & BED</span>
                            <ArrowRight className="w-4 h-4 ml-1.5" />
                          </Link>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default function SearchPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-asphalt-black text-white p-8 flex items-center justify-center">Loading rest stops...</div>}>
      <SearchContent />
    </React.Suspense>
  );
}
