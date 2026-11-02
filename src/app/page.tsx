import React from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { SearchWidget } from '@/components/SearchWidget';
import { RoutePlanner } from '@/components/RoutePlanner';
import { DEMO_PROPERTIES, DEMO_REVIEWS } from '@/data/seedData';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Truck, 
  Car, 
  Bed, 
  CheckCircle2, 
  Star, 
  ArrowRight, 
  HeartHandshake, 
  PhoneCall, 
  HelpCircle, 
  ChevronRight,
  Flame,
  Zap,
  Gauge,
  Sparkles,
  Coffee,
  Bath
} from 'lucide-react';

export default function HomePage() {
  const properties = DEMO_PROPERTIES;

  return (
    <div className="space-y-16 sm:space-y-24 pb-16">
      {/* ================================================== */}
      {/* HERO SECTION                                      */}
      {/* ================================================== */}
      <section className="relative min-h-[90vh] flex items-center justify-center pt-8 pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Background Image with Dark Highway Gradient Overlay */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/highway-hero.jpg"
            alt="Endless Indian Highway at Twilight"
            fill
            priority
            className="object-cover object-center filter brightness-50"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#17191C] via-[#17191C]/75 to-[#17191C]/50"></div>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,#17191C_90%)]"></div>
        </div>

        {/* Content Box */}
        <div className="relative z-10 max-w-5xl mx-auto text-center space-y-6 pt-4">
          {/* Trust Badge */}
          <div className="inline-flex items-center space-x-2 bg-[#25292E]/90 border border-road-yellow/40 backdrop-blur-md px-4 py-1.5 rounded-full text-xs font-bold text-road-yellow shadow-lg">
            <span className="w-2 h-2 rounded-full bg-success-green animate-ping"></span>
            <span>INDIA’S 1ST HOURLY HIGHWAY REST NETWORK • STARTING AT ₹30/HR</span>
          </div>

          {/* Master Headline */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black text-white tracking-tight leading-tight uppercase">
            Long Roads Deserve <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-highway-orange via-road-yellow to-orange-400">
              Better Rest.
            </span>
          </h1>

          {/* Subheading */}
          <p className="text-base sm:text-xl text-gray-300 max-w-3xl mx-auto font-normal leading-relaxed">
            Find affordable hourly stays wherever your journey takes you. Rest, recharge in clean shared beds with hot showers, and get back safely on the road.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
            <Link
              href="/search"
              className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-sm sm:text-base px-8 py-3.5 rounded-xl shadow-2xl shadow-highway-orange/30 transition-all transform active:scale-95 flex items-center"
            >
              <span>FIND A REST STOP</span>
              <ArrowRight className="w-5 h-5 ml-2" />
            </Link>
            <Link
              href="/partner"
              className="bg-[#25292E]/90 hover:bg-[#32373E] text-gray-200 border border-gray-600 font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl backdrop-blur-md transition-all flex items-center"
            >
              <span>PARTNER WITH CHALOREST</span>
            </Link>
          </div>

          {/* Main Search Widget Component */}
          <div className="pt-6 text-left">
            <SearchWidget />
          </div>

          {/* Highway Stats strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 pt-4 text-center max-w-4xl mx-auto">
            <div className="bg-[#17191C]/80 border border-gray-800 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-xl sm:text-2xl font-black text-road-yellow font-mono">₹30 - ₹50</p>
              <p className="text-[11px] text-gray-400">Pay-Per-Hour Rate</p>
            </div>
            <div className="bg-[#17191C]/80 border border-gray-800 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-xl sm:text-2xl font-black text-white font-mono">10 Seconds</p>
              <p className="text-[11px] text-gray-400">QR Check-in Speed</p>
            </div>
            <div className="bg-[#17191C]/80 border border-gray-800 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-xl sm:text-2xl font-black text-green-400 font-mono">100%</p>
              <p className="text-[11px] text-gray-400">Fresh Sanitized Linens</p>
            </div>
            <div className="bg-[#17191C]/80 border border-gray-800 p-3 rounded-xl backdrop-blur-sm">
              <p className="text-xl sm:text-2xl font-black text-highway-orange font-mono">24/7</p>
              <p className="text-[11px] text-gray-400">CCTV & Heavy Parking</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 1. NEARBY REST STOPS                               */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-highway-orange font-bold text-xs uppercase tracking-wider">
              <MapPin className="w-4 h-4" />
              <span>Verified Highway Locations</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
              Nearby Highway Rest Stops
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Top-rated partner hotels with dedicated 4-bed and 8-bed shared rooms reserved for travellers.
            </p>
          </div>
          <Link
            href="/search"
            className="text-xs sm:text-sm font-bold text-highway-yellow hover:underline flex items-center self-start sm:self-auto"
          >
            <span>View All 120+ Stays</span>
            <ChevronRight className="w-4 h-4 ml-1" />
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {properties.slice(0, 3).map((property) => {
            const availableBeds = property.rooms.reduce(
              (acc, r) => acc + r.beds.filter((b) => b.isAvailable && !b.isBlocked).length,
              0
            );

            return (
              <div
                key={property.id}
                className="bg-[#1C2025] border border-[#2B3037] hover:border-highway-orange rounded-2xl overflow-hidden shadow-xl transition-all duration-300 group flex flex-col"
              >
                {/* Property Card Image */}
                <div className="relative h-48 w-full overflow-hidden bg-gray-900">
                  <Image
                    src={property.images[0]}
                    alt={property.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#1C2025] via-transparent to-transparent"></div>

                  {/* Hourly Rate Badge */}
                  <div className="absolute top-3 right-3 bg-[#17191C]/90 backdrop-blur-md border border-highway-orange/40 text-road-yellow px-3 py-1 rounded-xl text-xs font-black shadow-lg">
                    ₹{property.baseHourlyRate}/hour
                  </div>

                  {/* Highway Marker Tag */}
                  <div className="absolute bottom-3 left-3 bg-black/80 backdrop-blur-sm text-gray-200 px-2.5 py-1 rounded-lg text-[11px] font-mono flex items-center border border-gray-700">
                    <MapPin className="w-3 h-3 mr-1 text-highway-orange" />
                    {property.highway}
                  </div>
                </div>

                {/* Property Card Details */}
                <div className="p-5 flex-1 flex flex-col justify-between space-y-4">
                  <div>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-white text-base group-hover:text-highway-orange transition-colors line-clamp-1">
                        {property.name}
                      </h3>
                      <div className="flex items-center space-x-1 text-xs bg-green-500/10 text-green-400 px-2 py-0.5 rounded font-bold border border-green-500/20">
                        <Star className="w-3 h-3 fill-green-400" />
                        <span>{property.rating}</span>
                      </div>
                    </div>
                    <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                      {property.tagline}
                    </p>
                  </div>

                  {/* Key Highlights */}
                  <div className="flex flex-wrap gap-2 text-[11px] text-gray-300">
                    <span className="bg-[#25292E] px-2 py-1 rounded">
                      🛏️ {availableBeds} Beds Ready
                    </span>
                    {property.truckParking && (
                      <span className="bg-[#25292E] text-blue-300 px-2 py-1 rounded">
                        🚛 Truck Parking
                      </span>
                    )}
                    <span className="bg-[#25292E] px-2 py-1 rounded">
                      🚿 Hot Shower
                    </span>
                  </div>

                  {/* Card Bottom CTA */}
                  <div className="border-t border-[#25292E] pt-3 flex items-center justify-between">
                    <div className="text-[11px] text-gray-400">
                      Detour: <span className="text-road-yellow font-bold font-mono">{property.detourDistanceKm} km</span>
                    </div>
                    <Link
                      href={`/hotels/${property.slug}`}
                      className="bg-highway-orange hover:bg-highway-orange-hover text-white text-xs font-bold px-4 py-2 rounded-lg transition-all flex items-center"
                    >
                      <span>Book Bed</span>
                      <ArrowRight className="w-3.5 h-3.5 ml-1" />
                    </Link>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================== */}
      {/* 2. AFFORDABLE STAYS STARTING AT ₹30/HOUR           */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-br from-[#1C2025] to-[#121417] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <span className="bg-highway-orange text-white text-xs font-black px-2.5 py-1 rounded uppercase tracking-wider">
                Price Transparency
              </span>
              <h2 className="text-3xl sm:text-4xl font-black text-white mt-3 leading-tight">
                Why Pay ₹2,500 For A Full Day When You Only Need 3 Hours?
              </h2>
              <p className="text-sm text-gray-400 mt-3 leading-relaxed">
                Traditional roadside hotels force drivers and road-trippers to purchase an entire 24-hour room even for a short daytime power nap or quick refresh. With ChaloRest, you reserve individual beds and pay strictly for the hours you sleep.
              </p>

              {/* Comparison Matrix */}
              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-[#141618] border border-red-500/30 rounded-2xl p-4">
                  <p className="text-xs font-bold text-red-400 uppercase">Regular Highway Hotel</p>
                  <p className="text-2xl font-black text-white font-mono mt-1">₹2,000 – ₹3,500</p>
                  <p className="text-xs text-gray-500 mt-1">Fixed 24-hour tariff, slow check-in, full room expense for solo rest.</p>
                </div>
                <div className="bg-[#17201C] border border-green-500/40 rounded-2xl p-4 shadow-lg">
                  <p className="text-xs font-bold text-green-400 uppercase">ChaloRest Hourly Model</p>
                  <p className="text-2xl font-black text-road-yellow font-mono mt-1">₹90 – ₹150</p>
                  <p className="text-xs text-gray-300 mt-1">Pay for 3 hours rest. Clean bed, hot shower, vehicle parking included.</p>
                </div>
              </div>

              <div className="mt-6 flex items-center space-x-3 text-xs text-gray-400">
                <CheckCircle2 className="w-4 h-4 text-green-400 flex-shrink-0" />
                <span>Zero hidden cancellation charges • Instant 1-hour extensions anytime</span>
              </div>
            </div>

            {/* Visual Graphic with shared accommodation photograph */}
            <div className="relative rounded-2xl overflow-hidden border border-[#2D333B] shadow-2xl h-80 lg:h-96">
              <Image
                src="/images/shared-accommodation.jpg"
                alt="ChaloRest Shared 4-Bed Dormitory"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
              <div className="absolute bottom-4 left-4 right-4 bg-[#17191C]/90 backdrop-blur-md p-4 rounded-xl border border-gray-700">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-xs text-gray-400 font-mono">Dorm Bed A1 - Lower Berth</p>
                    <p className="text-sm font-bold text-white">4-Bed Air-Conditioned Suite</p>
                  </div>
                  <span className="text-base font-black text-road-yellow font-mono">
                    ₹35/hr
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 3. POPULAR HIGHWAY ROUTES & ROUTE REST PLANNER     */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <RoutePlanner properties={properties} />
      </section>

      {/* ================================================== */}
      {/* 4. REST STOPS NEAR MAJOR CITIES                    */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-highway-orange text-xs font-black uppercase tracking-wider">
            City Entry Corridors
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Rest Stops Near Major Logistics Hubs & Cities
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">
            Take a nap before entering city rush hours or waiting for daytime commercial vehicle entry windows.
          </p>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-3">
          {[
            { city: 'Ahmedabad', highway: 'NH 48 / Ring Road', stops: '12 Rest Hubs' },
            { city: 'Vadodara', highway: 'NH 48 Bypass', stops: '8 Rest Hubs' },
            { city: 'Surat', highway: 'Kadodara Junction', stops: '14 Rest Hubs' },
            { city: 'Mumbai', highway: 'Thane / Manor Entry', stops: '16 Rest Hubs' },
            { city: 'Pune', highway: 'Talegaon / Khalapur', stops: '9 Rest Hubs' },
            { city: 'Delhi NCR', highway: 'Manesar / Neemrana', stops: '18 Rest Hubs' },
            { city: 'Jaipur', highway: 'Shahpura Toll', stops: '10 Rest Hubs' },
            { city: 'Udaipur', highway: 'Debari Bypass', stops: '7 Rest Hubs' },
            { city: 'Bengaluru', highway: 'Tumakuru / Nelamangala', stops: '15 Rest Hubs' },
            { city: 'Rajkot', highway: 'Shapar-Veraval', stops: '6 Rest Hubs' },
          ].map((item) => (
            <Link
              key={item.city}
              href={`/search?city=${item.city.toLowerCase()}`}
              className="bg-[#1A1D21] border border-[#272B31] hover:border-highway-orange p-3.5 rounded-xl transition-all group"
            >
              <p className="font-bold text-white text-sm group-hover:text-highway-orange transition-colors">
                {item.city}
              </p>
              <p className="text-[11px] text-gray-400 mt-0.5 truncate">{item.highway}</p>
              <span className="inline-block mt-2 text-[10px] bg-[#25292E] text-road-yellow font-mono px-2 py-0.5 rounded font-bold">
                {item.stops}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 5. TRUCK DRIVER ACCOMMODATION (IMAGE 3)            */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#181B1F] border border-blue-500/30 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
          {/* Visual Photograph with Unsplash truck-highway.jpg */}
          <div className="relative h-72 sm:h-96 lg:h-auto min-h-[300px]">
            <Image
              src="/images/truck-highway.jpg"
              alt="Highway Truck Transport in India"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-[#181B1F] hidden lg:block"></div>
            <div className="absolute top-4 left-4 bg-blue-600 text-white text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              Heavy Logistics Special
            </div>
          </div>

          <div className="p-6 sm:p-10 flex flex-col justify-center space-y-4">
            <div className="inline-flex items-center space-x-1.5 text-blue-400 font-bold text-xs uppercase tracking-wider">
              <Truck className="w-4 h-4" />
              <span>Dedicated Transporter Infrastructure</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Dignified Rest for India’s Truck & Fleet Drivers
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Long-haul drivers keep our country moving. Rather than sleeping uncomfortably across vehicle steering wheels in roadside dust, ChaloRest provides secure, gated stops specifically built for heavy multi-axle trailers.
            </p>

            <div className="grid grid-cols-2 gap-3 pt-2 text-xs text-gray-300">
              <div className="flex items-center space-x-2 bg-[#202429] p-2.5 rounded-xl border border-gray-800">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>Heavy Vehicle Parking (50+ Bays)</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#202429] p-2.5 rounded-xl border border-gray-800">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>24/7 Gated Guard & CCTV</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#202429] p-2.5 rounded-xl border border-gray-800">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>High Pressure Hot Showers</span>
              </div>
              <div className="flex items-center space-x-2 bg-[#202429] p-2.5 rounded-xl border border-gray-800">
                <CheckCircle2 className="w-4 h-4 text-blue-400 flex-shrink-0" />
                <span>RO Drinking Water & Pure Veg Canteen</span>
              </div>
            </div>

            <div className="pt-2">
              <Link
                href="/for-drivers?type=truck"
                className="inline-flex items-center bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
              >
                <span>Find Truck Rest Stops</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 6. MOTORCYCLE TRAVELLER STAYS (IMAGE 4)            */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#181B1F] border border-highway-orange/30 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
          <div className="p-6 sm:p-10 flex flex-col justify-center space-y-4 order-2 lg:order-1">
            <div className="inline-flex items-center space-x-1.5 text-highway-orange font-bold text-xs uppercase tracking-wider">
              <span>🏍️</span>
              <span>Bikers & Solo Roadtrippers</span>
            </div>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Safe Biker Pods & Gear Lockers Along Touring Highways
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Touring across Ladakh, Rajasthan, Western Ghats, or Konkan? Stop for 2–4 hours during peak afternoon heat or late night exhaustion. Securely store your riding jacket, boots, and helmet while your bike rests in a locked covered enclosure.
            </p>

            <ul className="space-y-2 text-xs text-gray-300 pt-1">
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-road-yellow"></span>
                <span>Individual steel lockers large enough for riding luggage & helmets.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-road-yellow"></span>
                <span>Basic motorcycle tool kit & tire inflator available on site.</span>
              </li>
              <li className="flex items-center space-x-2">
                <span className="w-1.5 h-1.5 rounded-full bg-road-yellow"></span>
                <span>Cold AC resting chambers to combat riding fatigue.</span>
              </li>
            </ul>

            <div className="pt-2">
              <Link
                href="/for-drivers?type=motorcycle"
                className="inline-flex items-center bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
              >
                <span>Find Biker Rest Hubs</span>
                <ArrowRight className="w-4 h-4 ml-2" />
              </Link>
            </div>
          </div>

          {/* Photograph with motorcycle-road.jpg */}
          <div className="relative h-72 sm:h-96 lg:h-auto min-h-[300px] order-1 lg:order-2">
            <Image
              src="/images/motorcycle-road.jpg"
              alt="Motorcycle Travellers on Indian Highway"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-l from-transparent via-black/40 to-[#181B1F] hidden lg:block"></div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 7. TOURIST DESTINATION REST STOPS                  */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C2025] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
            <div>
              <span className="text-road-yellow text-xs font-black uppercase tracking-wider">
                Holiday Routes & Tourism Corridors
              </span>
              <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
                Tourist Route Rest Stops
              </h2>
            </div>
            <Link
              href="/search?category=tourist"
              className="text-xs font-bold text-highway-orange hover:underline flex items-center"
            >
              <span>Explore Tourist Corridors</span>
              <ArrowRight className="w-4 h-4 ml-1" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="bg-[#141619] p-5 rounded-2xl border border-gray-800">
              <span className="text-2xl mb-2 block">🏰</span>
              <h4 className="font-bold text-white text-base">Rajasthan Golden Route</h4>
              <p className="text-xs text-gray-400 mt-1">
                Rest stops along Delhi-Jaipur-Udaipur corridor. Attached heritage dhabas, clean air-conditioned rest dorms, and safe family amenities.
              </p>
              <p className="text-xs font-black text-road-yellow font-mono mt-3">From ₹35/Hour</p>
            </div>

            <div className="bg-[#141619] p-5 rounded-2xl border border-gray-800">
              <span className="text-2xl mb-2 block">⛰️</span>
              <h4 className="font-bold text-white text-base">Mumbai-Pune-Goa Highway</h4>
              <p className="text-xs text-gray-400 mt-1">
                Strategic spots before mountain passes and ghat climbs. Rest before navigating hairpin bends in rain or fog.
              </p>
              <p className="text-xs font-black text-road-yellow font-mono mt-3">From ₹40/Hour</p>
            </div>

            <div className="bg-[#141619] p-5 rounded-2xl border border-gray-800">
              <span className="text-2xl mb-2 block">🛕</span>
              <h4 className="font-bold text-white text-base">South India Pilgrim Corridors</h4>
              <p className="text-xs text-gray-400 mt-1">
                Bengaluru-Tirupati & Chennai-Madurai highways. Fresh showers, South Indian breakfast, and quiet 2-hour sleep bays.
              </p>
              <p className="text-xs font-black text-road-yellow font-mono mt-3">From ₹30/Hour</p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 8. HOW CHALOREST WORKS                            */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-12">
          <span className="text-highway-orange text-xs font-black uppercase tracking-wider">
            Simple 4-Step Process
          </span>
          <h2 className="text-3xl sm:text-4xl font-black text-white mt-1">
            How ChaloRest Works
          </h2>
          <p className="text-xs sm:text-sm text-gray-400 mt-2">
            No endless paperwork. No full-day commitments. From road to restful sleep in under 60 seconds.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              step: '01',
              title: 'Spot on Highway',
              desc: 'Use GPS or enter your route to discover verified rest hubs with 0 to 0.5 km detour from your road.',
              icon: MapPin,
            },
            {
              step: '02',
              title: 'Pick Your Bed',
              desc: 'View live 4-bed and 8-bed room schematics. Select Bed A1, A2, or B1 with real-time availability.',
              icon: Bed,
            },
            {
              step: '03',
              title: 'Pay by the Hour',
              desc: 'Select 1h to 8h duration. Pay ₹30–₹50/hour securely via UPI, Card, or Corporate Fleet billing.',
              icon: Clock,
            },
            {
              step: '04',
              title: '10-Second QR Check-in',
              desc: 'Show your digital booking QR pass to the front desk staff, get your bed, and rest peacefully.',
              icon: ShieldCheck,
            },
          ].map((item) => {
            const Icon = item.icon;
            return (
              <div
                key={item.step}
                className="bg-[#1C2025] border border-[#2B3037] p-6 rounded-2xl relative overflow-hidden group hover:border-highway-orange transition-all"
              >
                <span className="text-5xl font-black text-[#262B32] font-mono absolute top-2 right-4 group-hover:text-highway-orange/20 transition-colors">
                  {item.step}
                </span>
                <div className="w-12 h-12 rounded-xl bg-highway-orange/10 border border-highway-orange/30 flex items-center justify-center text-highway-orange mb-4">
                  <Icon className="w-6 h-6" />
                </div>
                <h4 className="text-base font-bold text-white mb-2">{item.title}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* ================================================== */}
      {/* 9. WHY CHOOSE CHALOREST?                           */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-[#17191C] via-[#1E2227] to-[#17191C] border border-[#2D333B] rounded-3xl p-8 sm:p-12 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto mb-10">
            <h2 className="text-3xl font-black text-white">
              Why Choose ChaloRest?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-2">
              Engineered specifically for the safety, schedule, and economics of long-distance driving in India.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-green-500/10 border border-green-500/30 flex items-center justify-center text-green-400 font-bold">
                1
              </div>
              <h4 className="text-base font-bold text-white">Strict Hygiene Protocol</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Fresh sanitised linens, washed pillow covers, and mattress sanitization after every guest check-out. No reused sheets.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-road-yellow/10 border border-road-yellow/30 flex items-center justify-center text-road-yellow font-bold">
                2
              </div>
              <h4 className="text-base font-bold text-white">24/7 Check-in & Security</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                Highways never sleep, neither do we. Check in at 2:00 AM or 2:00 PM with guarded parking and continuous CCTV surveillance.
              </p>
            </div>

            <div className="space-y-3">
              <div className="w-10 h-10 rounded-lg bg-highway-orange/10 border border-highway-orange/30 flex items-center justify-center text-highway-orange font-bold">
                3
              </div>
              <h4 className="text-base font-bold text-white">Anti-Fatigue Safety Impact</h4>
              <p className="text-xs text-gray-400 leading-relaxed">
                40% of highway fatal collisions involve driver sleep deprivation. Affordable hourly rest saves lives on Indian highways.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 10. HOTEL PARTNERSHIP PROGRAM (IMAGE 5)            */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-[#1C2025] border border-road-yellow/40 rounded-3xl overflow-hidden shadow-2xl grid grid-cols-1 lg:grid-cols-2">
          {/* Visual with partner-hotel.jpg */}
          <div className="relative h-72 sm:h-96 lg:h-auto min-h-[320px]">
            <Image
              src="/images/partner-hotel.jpg"
              alt="ChaloRest Partner Hotel Facility"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-black/40 to-[#1C2025] hidden lg:block"></div>
            <div className="absolute top-4 left-4 bg-road-yellow text-black text-xs font-black px-3 py-1 rounded-lg uppercase tracking-wider shadow-lg">
              Partner Earnings Opportunity
            </div>
          </div>

          <div className="p-6 sm:p-10 flex flex-col justify-center space-y-4">
            <span className="text-road-yellow text-xs font-black uppercase tracking-wider">
              Hotel & Lodge Owners
            </span>

            <h2 className="text-2xl sm:text-3xl font-black text-white leading-tight">
              Convert Just 2–3 Empty Rooms Into ₹40,000–₹85,000 Monthly Revenue
            </h2>

            <p className="text-xs sm:text-sm text-gray-400 leading-relaxed">
              Don’t let highway rooms stay vacant during daytime or slow seasons. Partner with ChaloRest to convert 2–3 standard rooms into dedicated 4-bed or 8-bed shared rest pods. Receive steady hourly guests 24/7 with zero marketing cost.
            </p>

            <div className="bg-[#15171A] p-4 rounded-xl border border-gray-800 space-y-2 text-xs">
              <div className="flex justify-between text-gray-300">
                <span>Rooms Reserved:</span>
                <span className="font-bold text-white">2 Standard Rooms</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Organized Capacity:</span>
                <span className="font-bold text-white">12 Hourly Beds</span>
              </div>
              <div className="flex justify-between text-gray-300">
                <span>Average Hourly Rate:</span>
                <span className="font-bold text-road-yellow">₹35/Bed/Hour</span>
              </div>
              <div className="border-t border-gray-700 pt-2 flex justify-between text-white font-bold text-sm">
                <span>Estimated Partner Net Payout:</span>
                <span className="text-green-400 font-mono">₹62,000 / Month</span>
              </div>
            </div>

            <div className="pt-2 flex items-center space-x-3">
              <Link
                href="/partner"
                className="bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
              >
                List Your Hotel Free
              </Link>
              <Link
                href="/partner#calculator"
                className="text-xs text-gray-300 hover:text-white underline font-semibold"
              >
                View Earnings Calculator
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ================================================== */}
      {/* 11. AUTHENTIC TESTIMONIALS                         */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-2xl mx-auto mb-10">
          <span className="text-highway-orange text-xs font-black uppercase tracking-wider">
            Voices From The Asphalt
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Trusted by India’s Road Heroes
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {DEMO_REVIEWS.map((review) => (
            <div
              key={review.id}
              className="bg-[#1A1D21] border border-[#272B31] p-6 rounded-2xl flex flex-col justify-between space-y-4"
            >
              <div>
                <div className="flex items-center space-x-1 text-road-yellow mb-3">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-road-yellow" />
                  ))}
                </div>
                <p className="text-xs sm:text-sm text-gray-300 italic leading-relaxed">
                  &ldquo;{review.comment}&rdquo;
                </p>
              </div>

              <div className="border-t border-[#25292E] pt-3 flex items-center justify-between">
                <div>
                  <p className="font-bold text-white text-xs">{review.userName}</p>
                  <p className="text-[10px] text-highway-orange font-semibold">
                    {review.vehicleType === 'TRUCK'
                      ? 'Heavy Logistics Operator'
                      : review.vehicleType === 'CAB_TAXI'
                      ? 'Commercial Taxi Driver'
                      : 'Motorcycle Tourer'}
                  </p>
                </div>
                <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 font-bold">
                  Verified Stay
                </span>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 12. FREQUENTLY ASKED QUESTIONS                     */}
      {/* ================================================== */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-8">
          <span className="text-highway-orange text-xs font-black uppercase tracking-wider">
            Clear Answers
          </span>
          <h2 className="text-2xl sm:text-3xl font-black text-white mt-1">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {[
            {
              q: 'How does hourly booking work? Do I have to pay for a full day?',
              a: 'No! You only pay for the exact hours you select (from 1 hour to 12 hours). If you need 3 hours of sleep at ₹35/hour, your base stay is just ₹105. You reserve an individual bed, not the entire room.',
            },
            {
              q: 'Can I extend my stay if I am still tired?',
              a: 'Yes! From your user dashboard, tap "Extend Stay" to add 1, 2, or 4 additional hours. The system instantly checks bed availability to prevent overlaps and extends your scheduled check-out.',
            },
            {
              q: 'Is parking safe for heavy trucks and loaded commercial vehicles?',
              a: 'Properties marked with the "Truck Parking" badge have dedicated heavy-vehicle yards, 24/7 security watchmen, and continuous CCTV surveillance.',
            },
            {
              q: 'What about washroom hygiene and linens?',
              a: 'ChaloRest enforces a strict hygiene standard: fresh sanitised bedsheets and pillow covers for every booking, plus hot water showers and clean restrooms.',
            },
            {
              q: 'How do I check in at the hotel?',
              a: 'Upon booking confirmation, you receive a digital QR code pass on your phone. Simply present the QR code to hotel reception. Staff scans it with the ChaloRest Partner scanner, and you are assigned your bed in under 15 seconds.',
            },
          ].map((faq, i) => (
            <details
              key={i}
              className="bg-[#181B1F] border border-[#272B31] rounded-2xl p-4 text-xs group"
            >
              <summary className="font-bold text-white text-sm cursor-pointer list-none flex items-center justify-between">
                <span>{faq.q}</span>
                <span className="text-highway-orange font-bold text-base transition-transform group-open:rotate-45">
                  +
                </span>
              </summary>
              <p className="text-gray-400 mt-3 pt-3 border-t border-[#22262B] leading-relaxed">
                {faq.a}
              </p>
            </details>
          ))}
        </div>
      </section>

      {/* ================================================== */}
      {/* 13. EMERGENCY HELPLINE CALLOUT                    */}
      {/* ================================================== */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-gradient-to-r from-highway-orange to-orange-600 rounded-3xl p-8 sm:p-10 shadow-2xl text-white flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <span className="bg-black/30 text-white text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              24/7 Roadside Driver Helpline
            </span>
            <h3 className="text-2xl sm:text-3xl font-black">
              Driving Tired Tonight? Don’t Risk Your Life.
            </h3>
            <p className="text-sm opacity-90 max-w-xl">
              Call our toll-free 24-hour dispatch. Our team will guide you to the nearest safe rest hub and hold an available bed for you.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-center gap-3">
            <a
              href="tel:1800242567"
              className="bg-black text-white hover:bg-gray-900 font-black text-base px-6 py-3.5 rounded-xl shadow-xl transition-all flex items-center"
            >
              <PhoneCall className="w-5 h-5 mr-2 text-road-yellow" />
              <span>1800-CHALO-REST</span>
            </a>
            <Link
              href="/search"
              className="bg-white text-black hover:bg-gray-100 font-black text-sm px-6 py-3.5 rounded-xl shadow-xl transition-all"
            >
              Book Online Now
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
