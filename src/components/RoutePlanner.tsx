'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Property, VehicleType } from '@/types';
import { 
  Navigation, 
  MapPin, 
  Clock, 
  Bed, 
  Truck, 
  ShieldCheck, 
  Car, 
  Fuel, 
  ArrowRight,
  Sparkles,
  Milestone,
  CheckCircle2
} from 'lucide-react';

interface RoutePlannerProps {
  properties: Property[];
  onSelectProperty?: (property: Property) => void;
}

export const RoutePlanner: React.FC<RoutePlannerProps> = ({
  properties,
  onSelectProperty,
}) => {
  const [origin, setOrigin] = useState('Ahmedabad');
  const [destination, setDestination] = useState('Mumbai');
  const [vehicle, setVehicle] = useState<VehicleType>('CAB_TAXI');
  const [selectedHighway, setSelectedHighway] = useState('NH 48 (Ahmedabad - Vadodara - Surat - Mumbai)');

  const popularRoutes = [
    { from: 'Ahmedabad', to: 'Mumbai', highway: 'NH 48', distanceKm: 530, avgDriveHours: '9-10h' },
    { from: 'Delhi', to: 'Jaipur', highway: 'NH 48', distanceKm: 270, avgDriveHours: '5h' },
    { from: 'Delhi', to: 'Agra', highway: 'Yamuna Expressway', distanceKm: 210, avgDriveHours: '3.5h' },
    { from: 'Mumbai', to: 'Pune', highway: 'Mumbai-Pune Expressway', distanceKm: 150, avgDriveHours: '3h' },
    { from: 'Mumbai', to: 'Nagpur', highway: 'Samruddhi Mahamarg', distanceKm: 701, avgDriveHours: '8-9h' },
    { from: 'Delhi', to: 'Chandigarh', highway: 'NH 44 (GT Road)', distanceKm: 245, avgDriveHours: '4.5h' },
    { from: 'Chennai', to: 'Vijayawada', highway: 'NH 16', distanceKm: 450, avgDriveHours: '7.5h' },
    { from: 'Bengaluru', to: 'Pune', highway: 'NH 48', distanceKm: 840, avgDriveHours: '14-16h' },
    { from: 'Salem', to: 'Kochi', highway: 'NH 544', distanceKm: 360, avgDriveHours: '6.5h' },
    { from: 'Pune', to: 'Hyderabad', highway: 'NH 65', distanceKm: 560, avgDriveHours: '10h' },
  ];

  const handleQuickRoute = (route: typeof popularRoutes[0]) => {
    setOrigin(route.from);
    setDestination(route.to);
    setSelectedHighway(`${route.highway} (${route.from} - ${route.to})`);
  };

  // Filter properties along the selected corridor
  const stopsOnRoute = properties.filter((p) => {
    const origLower = origin.toLowerCase();
    const destLower = destination.toLowerCase();
    const highwayLower = p.highway.toLowerCase();
    const cityLower = p.city.toLowerCase();

    if (origLower.includes('ahmedabad') || destLower.includes('mumbai')) {
      return p.highway.includes('NH 48') || cityLower.includes('bharuch') || cityLower.includes('manor');
    }
    if (origLower.includes('delhi') && (destLower.includes('jaipur') || destLower.includes('udaipur'))) {
      return p.highway.includes('Delhi') || cityLower.includes('neemrana') || cityLower.includes('udaipur');
    }
    if ((origLower.includes('delhi') || origLower.includes('noida')) && destLower.includes('agra')) {
      return p.highway.toLowerCase().includes('yamuna') || cityLower.includes('mathura');
    }
    if (origLower.includes('mumbai') && destLower.includes('pune')) {
      return p.highway.includes('Expressway') || cityLower.includes('khalapur');
    }
    if (origLower.includes('mumbai') && destLower.includes('nagpur')) {
      return p.highway.toLowerCase().includes('samruddhi') || cityLower.includes('shirdi');
    }
    if (origLower.includes('delhi') && (destLower.includes('chandigarh') || destLower.includes('amritsar'))) {
      return p.highway.includes('NH 44') || cityLower.includes('ambala');
    }
    if (origLower.includes('chennai') || destLower.includes('vijayawada') || destLower.includes('kolkata')) {
      return p.highway.includes('NH 16') || cityLower.includes('nellore');
    }
    if (origLower.includes('pune') && destLower.includes('hyderabad')) {
      return p.highway.includes('NH 65') || cityLower.includes('hadapsar') || cityLower.includes('pune');
    }
    if (destLower.includes('kochi') || origLower.includes('salem') || destLower.includes('coimbatore')) {
      return p.highway.includes('NH 544') || cityLower.includes('coimbatore');
    }
    if (origLower.includes('bengaluru') || destLower.includes('bengaluru')) {
      return p.highway.includes('NH 48') || cityLower.includes('tumakuru');
    }
    return true;
  });

  return (
    <div className="bg-[#17191C] border border-[#2B3037] rounded-3xl p-6 sm:p-8 shadow-2xl">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-[#25292E] pb-6">
        <div>
          <div className="flex items-center space-x-2">
            <span className="bg-road-yellow text-black text-xs font-black px-2.5 py-1 rounded">
              FEATURED ENGINE
            </span>
            <h3 className="text-xl sm:text-2xl font-black text-white">
              Highway Route Rest Planner
            </h3>
          </div>
          <p className="text-sm text-gray-400 mt-1 max-w-2xl">
            Never drive tired or guess roadside safety. Plan your rest breaks at verified hourly rest hubs directly along your route with zero or minimal detour.
          </p>
        </div>

        {/* Quick Route Pills */}
        <div className="flex flex-wrap items-center gap-2">
          {popularRoutes.map((r) => (
            <button
              key={`${r.from}-${r.to}`}
              type="button"
              onClick={() => handleQuickRoute(r)}
              className={`text-xs px-3 py-1.5 rounded-lg border transition-all ${
                origin === r.from && destination === r.to
                  ? 'bg-highway-orange text-white border-highway-orange font-bold'
                  : 'bg-[#202429] text-gray-300 border-gray-700 hover:border-gray-500'
              }`}
            >
              {r.from} ➔ {r.to}
            </button>
          ))}
        </div>
      </div>

      {/* Input Route Bar */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-6">
        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1 flex items-center">
            <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange" />
            Origin (Starting Point)
          </label>
          <input
            type="text"
            value={origin}
            onChange={(e) => setOrigin(e.target.value)}
            className="w-full bg-[#202429] border border-[#343A43] focus:border-highway-orange rounded-xl px-4 py-2.5 text-sm text-white font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1 flex items-center">
            <Navigation className="w-3.5 h-3.5 mr-1 text-road-yellow" />
            Destination (Final City)
          </label>
          <input
            type="text"
            value={destination}
            onChange={(e) => setDestination(e.target.value)}
            className="w-full bg-[#202429] border border-[#343A43] focus:border-road-yellow rounded-xl px-4 py-2.5 text-sm text-white font-semibold"
          />
        </div>

        <div>
          <label className="block text-xs font-bold text-gray-400 mb-1 flex items-center">
            <Truck className="w-3.5 h-3.5 mr-1 text-green-400" />
            Vehicle Type
          </label>
          <select
            value={vehicle}
            onChange={(e) => setVehicle(e.target.value as VehicleType)}
            className="w-full bg-[#202429] border border-[#343A43] focus:border-green-400 rounded-xl px-4 py-2.5 text-sm text-white font-semibold"
          >
            <option value="CAB_TAXI">Cab / Taxi (Commercial)</option>
            <option value="TRUCK">Heavy Logistics Truck</option>
            <option value="MOTORCYCLE">Motorcycle / Bike Tourer</option>
            <option value="PRIVATE_CAR">Private Car Roadtrip</option>
          </select>
        </div>
      </div>

      {/* Route Journey Visualization Line */}
      <div className="my-8 relative">
        <div className="bg-[#1F2329] border border-[#2D333B] rounded-2xl p-5">
          <div className="flex items-center justify-between text-xs font-bold text-gray-400 mb-4 border-b border-[#2A2E35] pb-2">
            <span className="flex items-center text-highway-yellow">
              <Milestone className="w-4 h-4 mr-1.5" />
              Highway Milestone Corridors ({stopsOnRoute.length} verified rest hubs on this road)
            </span>
            <span>Total Route ~530 km • Recommended Break Every 3-4 Hours</span>
          </div>

          {/* Timeline Nodes */}
          <div className="space-y-4">
            {/* Origin Node */}
            <div className="flex items-start space-x-3 text-xs">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-green-500 text-black flex items-center justify-center font-bold text-[11px]">
                  A
                </div>
                <div className="w-0.5 h-10 bg-gradient-to-b from-green-500 to-highway-orange"></div>
              </div>
              <div className="pt-0.5">
                <span className="font-bold text-white text-sm">{origin}</span>
                <p className="text-gray-400 text-xs">Trip Start Point • KM 0</p>
              </div>
            </div>

            {/* Rest Stops along the way */}
            {stopsOnRoute.map((stop, index) => {
              const availableBeds = stop.rooms.reduce(
                (acc, r) => acc + r.beds.filter((b) => b.isAvailable && !b.isBlocked).length,
                0
              );

              return (
                <div key={stop.id} className="flex items-start space-x-3 text-xs group">
                  <div className="flex flex-col items-center">
                    <div className="w-6 h-6 rounded-full bg-highway-orange text-white flex items-center justify-center font-bold text-[11px] shadow-md group-hover:scale-110 transition-transform">
                      {index + 1}
                    </div>
                    {index < stopsOnRoute.length - 1 && (
                      <div className="w-0.5 h-14 bg-gradient-to-b from-highway-orange to-road-yellow"></div>
                    )}
                  </div>

                  <div className="flex-1 bg-[#15171A] border border-[#262A30] hover:border-highway-orange rounded-xl p-3.5 transition-all">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                      <div>
                        <div className="flex items-center space-x-2">
                          <h4 className="font-bold text-white text-sm group-hover:text-highway-orange transition-colors">
                            {stop.name}
                          </h4>
                          <span className="text-[10px] bg-green-500/20 text-green-400 font-bold px-2 py-0.5 rounded border border-green-500/30">
                            ★ {stop.rating} ({stop.reviewCount})
                          </span>
                        </div>
                        <p className="text-xs text-gray-400 mt-0.5 flex items-center space-x-2">
                          <span>{stop.address}</span>
                          <span>•</span>
                          <span className="text-road-yellow font-bold font-mono">
                            {stop.detourDistanceKm === 0 ? '0 km detour (On Highway)' : `${stop.detourDistanceKm} km off highway`}
                          </span>
                        </p>
                      </div>

                      <div className="flex items-center space-x-3 sm:text-right">
                        <div>
                          <p className="text-sm font-black text-road-yellow font-mono">
                            ₹{stop.baseHourlyRate}/hr
                          </p>
                          <p className="text-[10px] text-green-400 font-medium">
                            {availableBeds} beds available
                          </p>
                        </div>
                        <Link
                          href={`/hotels/${stop.slug}`}
                          className="bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs px-3.5 py-2 rounded-lg shadow transition-all flex items-center"
                        >
                          <span>Reserve Bed</span>
                          <ArrowRight className="w-3.5 h-3.5 ml-1" />
                        </Link>
                      </div>
                    </div>

                    {/* Facility pills */}
                    <div className="flex flex-wrap gap-2 mt-2 pt-2 border-t border-[#22262B] text-[11px] text-gray-400">
                      {stop.truckParking && (
                        <span className="flex items-center text-blue-400 bg-blue-500/10 px-2 py-0.5 rounded border border-blue-500/20">
                          <Truck className="w-3 h-3 mr-1" />
                          Truck Parking ({stop.truckParkingCapacity} bays)
                        </span>
                      )}
                      {stop.cctvSecured && (
                        <span className="flex items-center text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/20">
                          <ShieldCheck className="w-3 h-3 mr-1" />
                          24/7 CCTV & Guard
                        </span>
                      )}
                      <span className="flex items-center text-gray-300 bg-gray-800 px-2 py-0.5 rounded">
                        🚿 Hot Water Shower & Restrooms
                      </span>
                    </div>
                  </div>
                </div>
              );
            })}

            {/* Destination Node */}
            <div className="flex items-start space-x-3 text-xs pt-2">
              <div className="flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-road-yellow text-black flex items-center justify-center font-bold text-[11px]">
                  B
                </div>
              </div>
              <div className="pt-0.5">
                <span className="font-bold text-white text-sm">{destination}</span>
                <p className="text-gray-400 text-xs">Journey Destination</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
