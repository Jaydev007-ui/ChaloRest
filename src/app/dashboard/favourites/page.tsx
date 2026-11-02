'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { DEMO_PROPERTIES } from '@/data/seedData';
import { ArrowLeft, MapPin, Star, Bed, ArrowRight, Heart } from 'lucide-react';

export default function FavouritesPage() {
  const favourites = DEMO_PROPERTIES.slice(0, 3);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-6">
      <Link
        href="/dashboard"
        className="text-xs text-highway-orange hover:underline flex items-center font-semibold"
      >
        <ArrowLeft className="w-3.5 h-3.5 mr-1" />
        Back to Dashboard
      </Link>

      <div className="border-b border-[#25292E] pb-4">
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          My Saved Rest Stops
        </h1>
        <p className="text-xs text-gray-400 mt-0.5">
          Your preferred highway stopovers with confirmed truck parking and high safety ratings.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {favourites.map((p) => (
          <div
            key={p.id}
            className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-5 space-y-4 shadow-xl flex flex-col justify-between"
          >
            <div className="space-y-3">
              <div className="relative h-44 rounded-2xl overflow-hidden bg-gray-900">
                <Image src={p.images[0]} alt={p.name} fill className="object-cover" sizes="400px" />
                <div className="absolute top-3 right-3 bg-black/80 px-2.5 py-1 rounded-lg text-xs font-mono font-bold text-road-yellow">
                  ₹{p.baseHourlyRate}/hr
                </div>
              </div>

              <div className="flex items-center justify-between">
                <h3 className="font-bold text-white text-base">{p.name}</h3>
                <span className="text-xs font-bold text-green-400 bg-green-500/10 px-2 py-0.5 rounded border border-green-500/30">
                  ★ {p.rating}
                </span>
              </div>

              <p className="text-xs text-gray-400 flex items-center">
                <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange" />
                {p.address}
              </p>
            </div>

            <div className="pt-2 border-t border-[#25292E] flex items-center justify-between">
              <span className="text-xs font-mono text-gray-400">
                Detour: {p.detourDistanceKm} km
              </span>
              <Link
                href={`/hotels/${p.slug}`}
                className="bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs px-4 py-2 rounded-xl transition-all"
              >
                Book Bed
              </Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
