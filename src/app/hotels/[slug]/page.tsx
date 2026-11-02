'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { DEMO_PROPERTIES } from '@/data/seedData';
import { BedLayoutVisualizer } from '@/components/BedLayoutVisualizer';
import { Bed, Room, VehicleType } from '@/types';
import { 
  MapPin, 
  Star, 
  ShieldCheck, 
  Truck, 
  Clock, 
  Calendar, 
  CheckCircle2, 
  Share2, 
  Heart, 
  Car, 
  ArrowRight,
  PhoneCall,
  Sparkles,
  AlertCircle
} from 'lucide-react';

export default function HotelDetailsPage({ params }: { params: { slug: string } }) {
  const router = useRouter();
  const property = DEMO_PROPERTIES.find((p) => p.slug === params.slug) || DEMO_PROPERTIES[0];

  const [selectedRoom, setSelectedRoom] = useState<Room>(property.rooms[0]);
  const [selectedBed, setSelectedBed] = useState<Bed | null>(
    property.rooms[0]?.beds.find((b) => b.isAvailable && !b.isBlocked) || null
  );
  const [durationHours, setDurationHours] = useState<number>(3);
  const [checkInTime, setCheckInTime] = useState<string>('Immediate (Now)');
  const [vehicleType, setVehicleType] = useState<VehicleType>('CAB_TAXI');
  const [activeImageIndex, setActiveImageIndex] = useState<number>(0);
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  // Price calculations
  const bedRate = selectedBed?.hourlyRate || selectedRoom.hourlyRate || property.baseHourlyRate;
  const baseAmount = bedRate * durationHours;
  const gstAmount = Math.round(baseAmount * 0.12 * 100) / 100;
  const platformFee = 10;
  const totalPayable = baseAmount + gstAmount + platformFee;

  const handleSelectBed = (bed: Bed, room: Room) => {
    setSelectedBed(bed);
    setSelectedRoom(room);
    setErrorMessage(null);
  };

  const handleProceedBooking = () => {
    if (!selectedBed) {
      setErrorMessage('Please select an available bed from the visual room layout.');
      return;
    }

    setIsSubmitting(true);
    // Encode parameters to booking page
    const query = new URLSearchParams({
      propertyId: property.id,
      roomId: selectedRoom.id,
      bedId: selectedBed.id,
      bedNumber: selectedBed.bedNumber,
      duration: durationHours.toString(),
      checkInTime: checkInTime,
      vehicle: vehicleType,
      rate: bedRate.toString(),
      total: totalPayable.toString(),
    });

    router.push(`/booking/confirm?${query.toString()}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10">
      {/* Property Title & Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#25292E] pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-highway-orange text-white text-xs font-black px-2.5 py-0.5 rounded uppercase">
              VERIFIED REST HUB
            </span>
            <span className="text-xs text-road-yellow font-mono font-bold">
              ★ {property.rating} ({property.reviewCount} verified driver reviews)
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black text-white mt-1.5">
            {property.name}
          </h1>

          <p className="text-xs sm:text-sm text-gray-400 flex items-center mt-1">
            <MapPin className="w-4 h-4 mr-1 text-highway-orange flex-shrink-0" />
            <span>{property.address} • </span>
            <span className="text-road-yellow font-bold ml-1">
              {property.detourDistanceKm === 0 ? 'Direct on Highway' : `${property.detourDistanceKm} km detour from ${property.highway}`}
            </span>
          </p>
        </div>

        <div className="flex items-center space-x-3">
          <button
            onClick={() => alert('Property link copied to clipboard!')}
            className="p-2.5 bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-300 rounded-xl"
            title="Share with Driver Co-pilot"
          >
            <Share2 className="w-4 h-4" />
          </button>
          <a
            href={`tel:${property.contactPhone}`}
            className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-green-400 font-bold text-xs px-4 py-2.5 rounded-xl flex items-center"
          >
            <PhoneCall className="w-4 h-4 mr-1.5" />
            <span>Call Reception</span>
          </a>
        </div>
      </div>

      {/* Photo Gallery Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-4">
        {/* Main Hero Photo */}
        <div className="lg:col-span-8 relative h-80 sm:h-96 rounded-3xl overflow-hidden border border-[#2B3037] bg-gray-900 shadow-2xl">
          <Image
            src={property.images[activeImageIndex] || property.images[0]}
            alt={property.name}
            fill
            priority
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 66vw"
          />
          <div className="absolute bottom-4 left-4 bg-black/80 backdrop-blur-md px-3.5 py-1.5 rounded-xl text-xs font-mono text-gray-200 border border-gray-700">
            Image {activeImageIndex + 1} of {property.images.length}
          </div>
        </div>

        {/* Thumbnail Selector */}
        <div className="lg:col-span-4 grid grid-cols-2 lg:grid-cols-1 gap-3">
          {property.images.map((img, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setActiveImageIndex(idx)}
              className={`relative h-28 lg:h-[118px] rounded-2xl overflow-hidden border-2 transition-all ${
                activeImageIndex === idx
                  ? 'border-highway-orange ring-2 ring-highway-orange/30'
                  : 'border-transparent opacity-70 hover:opacity-100'
              }`}
            >
              <Image src={img} alt="" fill className="object-cover" sizes="200px" />
            </button>
          ))}
        </div>
      </div>

      {/* Main Content Layout: Room Layout & Booking Sticky Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left 8 Cols: Description, Amenities, and Interactive Bed Visualizer */}
        <div className="lg:col-span-8 space-y-8">
          {/* Description */}
          <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-lg font-black text-white">About This Rest Facility</h3>
            <p className="text-xs sm:text-sm text-gray-300 leading-relaxed">
              {property.description}
            </p>

            {/* Verification Badge */}
            <div className="bg-[#1F242A] p-4 rounded-2xl border border-green-500/30 flex items-center space-x-3 text-xs text-green-300">
              <ShieldCheck className="w-5 h-5 text-green-400 flex-shrink-0" />
              <span>
                Verified ChaloRest partner. Meets highway fire compliance, fresh linen replacement guidelines, and CCTV security standards.
              </span>
            </div>
          </div>

          {/* Amenities & Facility Badges */}
          <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-4 shadow-xl">
            <h3 className="text-lg font-black text-white">Key Highway Facilities</h3>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              {property.truckParking && (
                <div className="bg-[#202429] p-3 rounded-xl border border-blue-500/20 text-blue-300 flex items-center">
                  <Truck className="w-4 h-4 mr-2 text-blue-400" />
                  <span>Heavy Truck Parking ({property.truckParkingCapacity} bays)</span>
                </div>
              )}
              {property.cctvSecured && (
                <div className="bg-[#202429] p-3 rounded-xl border border-gray-800 text-gray-300 flex items-center">
                  <ShieldCheck className="w-4 h-4 mr-2 text-green-400" />
                  <span>24/7 CCTV & Security</span>
                </div>
              )}
              <div className="bg-[#202429] p-3 rounded-xl border border-gray-800 text-gray-300 flex items-center">
                <span>🚿</span>
                <span className="ml-2">Hot Water High Pressure Shower</span>
              </div>
              <div className="bg-[#202429] p-3 rounded-xl border border-gray-800 text-gray-300 flex items-center">
                <span>❄️</span>
                <span className="ml-2">Air-Conditioned Resting Dorms</span>
              </div>
              <div className="bg-[#202429] p-3 rounded-xl border border-gray-800 text-gray-300 flex items-center">
                <span>💧</span>
                <span className="ml-2">RO Pure Drinking Water</span>
              </div>
              <div className="bg-[#202429] p-3 rounded-xl border border-gray-800 text-gray-300 flex items-center">
                <span>🍲</span>
                <span className="ml-2">Pure Veg Highway Canteen</span>
              </div>
            </div>
          </div>

          {/* Interactive Bed Layout Visualizer */}
          <div className="space-y-4">
            <div>
              <div className="flex items-center space-x-2">
                <span className="bg-road-yellow text-black text-xs font-black px-2 py-0.5 rounded">
                  STEP 1
                </span>
                <h3 className="text-xl font-black text-white">
                  Select Your Resting Bed
                </h3>
              </div>
              <p className="text-xs text-gray-400 mt-1">
                Click any available green bed to choose your specific bunk (lower or upper berth).
              </p>
            </div>

            <BedLayoutVisualizer
              rooms={property.rooms}
              selectedBedId={selectedBed?.id}
              onSelectBed={handleSelectBed}
              hourlyRate={property.baseHourlyRate}
            />
          </div>
        </div>

        {/* Right 4 Cols: Sticky Hourly Booking Calculation Widget */}
        <div className="lg:col-span-4 sticky top-24">
          <div className="bg-[#181B1F] border border-highway-orange/40 rounded-3xl p-6 shadow-2xl space-y-5">
            <div className="border-b border-[#25292E] pb-4">
              <span className="text-[11px] font-bold text-highway-orange uppercase tracking-wider">
                Instant Hourly Reservation
              </span>
              <div className="flex items-baseline space-x-2 mt-1">
                <span className="text-3xl font-black text-white font-mono">
                  ₹{bedRate}
                </span>
                <span className="text-xs text-gray-400">/ hour per bed</span>
              </div>
              <p className="text-[11px] text-green-400 mt-1">
                ⚡ 10-Second Check-in with Digital Fast Pass
              </p>
            </div>

            {/* Selected Bed Indicator */}
            <div className="bg-[#202429] border border-gray-700/60 p-3.5 rounded-2xl flex items-center justify-between">
              <div>
                <p className="text-[11px] text-gray-400">Selected Bed</p>
                <p className="text-sm font-black text-white font-mono">
                  {selectedBed ? `${selectedBed.bedNumber} (${selectedBed.label})` : 'None Selected'}
                </p>
              </div>
              {selectedBed && (
                <span className="text-xs bg-highway-orange text-white px-2 py-1 rounded font-bold">
                  Active
                </span>
              )}
            </div>

            {/* Duration Selector */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1 flex items-center justify-between">
                <span>Select Rest Duration</span>
                <span className="text-road-yellow font-mono font-bold">{durationHours} Hours</span>
              </label>
              <div className="grid grid-cols-4 gap-1.5">
                {[1, 2, 3, 4, 6, 8, 10, 12].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setDurationHours(hrs)}
                    className={`py-2 text-xs font-bold rounded-xl border text-center transition-all ${
                      durationHours === hrs
                        ? 'bg-highway-orange text-white border-highway-orange shadow-md'
                        : 'bg-[#202429] text-gray-300 border-gray-700 hover:border-gray-500'
                    }`}
                  >
                    {hrs}h
                  </button>
                ))}
              </div>
            </div>

            {/* Check-in Time */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Check-in Time</label>
              <select
                value={checkInTime}
                onChange={(e) => setCheckInTime(e.target.value)}
                className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl px-3 py-2 text-xs text-white"
              >
                <option>Immediate (Now)</option>
                <option>In 30 Minutes</option>
                <option>In 1 Hour</option>
                <option>Tonight (11:00 PM)</option>
                <option>Late Night (02:00 AM)</option>
              </select>
            </div>

            {/* Vehicle Type */}
            <div>
              <label className="block text-xs font-bold text-gray-300 mb-1">Vehicle Type (For Parking Bay)</label>
              <select
                value={vehicleType}
                onChange={(e) => setVehicleType(e.target.value as VehicleType)}
                className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl px-3 py-2 text-xs text-white"
              >
                <option value="CAB_TAXI">Cab / Taxi (Commercial)</option>
                <option value="TRUCK">Heavy Logistics Truck / Trailer</option>
                <option value="MOTORCYCLE">Motorcycle / Biker</option>
                <option value="PRIVATE_CAR">Private Car Roadtrip</option>
              </select>
            </div>

            {/* Price Breakdown */}
            <div className="bg-[#15171A] p-4 rounded-2xl border border-[#25292E] space-y-2 text-xs">
              <div className="flex justify-between text-gray-400">
                <span>Base ({durationHours}h × ₹{bedRate}):</span>
                <span className="font-mono text-white">₹{baseAmount}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>GST (12%):</span>
                <span className="font-mono text-white">₹{gstAmount}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Highway Cleanliness & Safety Fee:</span>
                <span className="font-mono text-white">₹{platformFee}</span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-bold text-base">
                <span>Total Amount:</span>
                <span className="text-road-yellow font-mono text-lg">
                  ₹{Math.round(totalPayable)}
                </span>
              </div>
            </div>

            {errorMessage && (
              <div className="p-3 bg-red-950/60 border border-red-600/40 rounded-xl text-xs text-red-300 flex items-center">
                <AlertCircle className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                <span>{errorMessage}</span>
              </div>
            )}

            {/* Proceed CTA */}
            <button
              type="button"
              disabled={isSubmitting}
              onClick={handleProceedBooking}
              className="w-full bg-gradient-to-r from-highway-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm py-3.5 rounded-xl shadow-xl shadow-highway-orange/25 transition-all flex items-center justify-center space-x-2"
            >
              <span>CONFIRM BED & PAY HOURLY</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </button>

            <p className="text-[11px] text-gray-500 text-center">
              Guaranteed Bed Allocation • 100% Refund if cancelled before check-in
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
