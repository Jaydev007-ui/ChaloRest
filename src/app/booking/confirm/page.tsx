'use client';

import React, { useState } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import Link from 'next/link';
import { DEMO_PROPERTIES } from '@/data/seedData';
import { createBooking } from '@/lib/store';
import { VehicleType, Booking } from '@/types';
import { 
  ShieldCheck, 
  Clock, 
  MapPin, 
  Bed, 
  CreditCard, 
  CheckCircle2, 
  ArrowRight, 
  QrCode, 
  Truck, 
  AlertCircle,
  Download,
  Share2
} from 'lucide-react';

function BookingConfirmContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const propertyId = searchParams.get('propertyId') || 'prop-1';
  const roomId = searchParams.get('roomId') || 'room-1a';
  const bedId = searchParams.get('bedId') || 'bed-1a-1';
  const bedNumber = searchParams.get('bedNumber') || 'Bed A1';
  const duration = Number(searchParams.get('duration')) || 3;
  const checkInTimeStr = searchParams.get('checkInTime') || 'Immediate (Now)';
  const vehicle = (searchParams.get('vehicle') as VehicleType) || 'CAB_TAXI';
  const rate = Number(searchParams.get('rate')) || 35;
  const total = Number(searchParams.get('total')) || Math.round(rate * duration * 1.12 + 10);

  const property = DEMO_PROPERTIES.find(p => p.id === propertyId) || DEMO_PROPERTIES[0];

  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'FLEET'>('UPI');
  const [guestName, setGuestName] = useState('Suresh Verma');
  const [guestPhone, setGuestPhone] = useState('+91 98765 43210');
  const [isProcessing, setIsProcessing] = useState(false);
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handlePayAndConfirm = async () => {
    setIsProcessing(true);
    setError(null);

    try {
      // Simulate real server call to /api/bookings
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          propertyId,
          roomId,
          bedId,
          checkInTime: new Date().toISOString(),
          durationHours: duration,
          vehicleType: vehicle,
          userName: guestName,
          userPhone: guestPhone,
        })
      });

      const data = await res.json();
      if (!data.success) {
        // Fallback to local store directly if running client-only
        const directRes = createBooking({
          propertyId,
          roomId,
          bedId,
          checkInTime: new Date().toISOString(),
          durationHours: duration,
          vehicleType: vehicle,
          userName: guestName,
          userPhone: guestPhone,
        });

        if (!directRes.success) {
          setError(directRes.error || 'Booking overlap conflict detected.');
          setIsProcessing(false);
          return;
        }
        setConfirmedBooking(directRes.booking!);
      } else {
        setConfirmedBooking(data.booking);
      }
    } catch (e: any) {
      // Fallback
      const directRes = createBooking({
        propertyId,
        roomId,
        bedId,
        checkInTime: new Date().toISOString(),
        durationHours: duration,
        vehicleType: vehicle,
        userName: guestName,
        userPhone: guestPhone,
      });
      if (directRes.success) {
        setConfirmedBooking(directRes.booking!);
      } else {
        setError(directRes.error || 'Failed to confirm booking.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* If booking confirmed: Show Confirmation & QR Pass */}
      {confirmedBooking ? (
        <div className="bg-[#181B1F] border border-green-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-400 mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              BOOKING CONFIRMED & BED RESERVED
            </span>
            <h2 className="text-3xl font-black text-white mt-2">
              You’re All Set To Rest!
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1">
              Your bed is reserved exclusively for the next {duration} hours. Show this QR code at hotel reception.
            </p>
          </div>

          {/* QR Code Pass Card */}
          <div className="max-w-sm mx-auto bg-[#101214] border border-[#2B3037] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="font-bold text-xs text-white">ChaloRest FastPass</span>
              <span className="font-mono text-xs text-road-yellow font-bold">#{confirmedBooking.bookingCode}</span>
            </div>

            {/* Visual SVG QR */}
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-inner">
              <svg className="w-40 h-40" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                <rect x="5" y="5" width="25" height="25" fill="#17191C" />
                <rect x="9" y="9" width="17" height="17" fill="white" />
                <rect x="13" y="13" width="9" height="9" fill="#17191C" />
                <rect x="70" y="5" width="25" height="25" fill="#17191C" />
                <rect x="74" y="9" width="17" height="17" fill="white" />
                <rect x="78" y="13" width="9" height="9" fill="#17191C" />
                <rect x="5" y="70" width="25" height="25" fill="#17191C" />
                <rect x="9" y="74" width="17" height="17" fill="white" />
                <rect x="13" y="78" width="9" height="9" fill="#17191C" />
                <rect x="35" y="10" width="10" height="10" fill="#FF8A24" />
                <rect x="50" y="25" width="15" height="8" fill="#17191C" />
                <rect x="35" y="45" width="30" height="12" fill="#17191C" />
                <rect x="75" y="50" width="15" height="15" fill="#FF8A24" />
                <rect x="35" y="75" width="20" height="12" fill="#17191C" />
                <rect x="65" y="75" width="20" height="12" fill="#17191C" />
              </svg>
            </div>

            <div className="text-left text-xs space-y-1.5 font-mono bg-[#181B1F] p-3 rounded-xl border border-gray-800">
              <div className="flex justify-between text-gray-400">
                <span>Guest:</span>
                <span className="text-white font-bold">{confirmedBooking.userName}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Bed:</span>
                <span className="text-road-yellow font-bold">{confirmedBooking.bedNumber}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Duration:</span>
                <span className="text-white">{confirmedBooking.durationHours} Hours</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Total Paid:</span>
                <span className="text-green-400 font-bold">₹{confirmedBooking.totalAmount}</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-400">
              Token: <span className="font-mono text-highway-orange">{confirmedBooking.qrToken}</span>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="flex flex-wrap items-center justify-center gap-4 pt-4">
            <Link
              href="/dashboard/active-stay"
              className="bg-highway-orange hover:bg-highway-orange-hover text-white font-bold text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              Open Active Stay Timer
            </Link>
            <Link
              href="/driver-mode"
              className="bg-road-yellow hover:bg-road-yellow-hover text-black font-black text-xs sm:text-sm px-6 py-3 rounded-xl shadow-lg transition-all"
            >
              Driver Mode Navigation
            </Link>
            <button
              onClick={() => window.print()}
              className="bg-[#202429] hover:bg-[#2A3037] border border-gray-700 text-gray-300 font-bold text-xs sm:text-sm px-5 py-3 rounded-xl flex items-center"
            >
              <Download className="w-4 h-4 mr-1.5" />
              <span>Download Receipt</span>
            </button>
          </div>
        </div>
      ) : (
        /* Booking Review & Payment Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Guest Details & Payment Mode */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs bg-highway-orange text-white font-bold px-2 py-0.5 rounded uppercase">
                  STEP 2 OF 2
                </span>
                <h2 className="text-2xl font-black text-white mt-1">Review & Confirm Stay</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Transactional reservation lock prevents two travellers from booking the same bed.
                </p>
              </div>

              {/* Guest Details Input */}
              <div className="space-y-3 pt-2 border-t border-[#25292E]">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">Guest Information</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Full Name</label>
                    <input
                      type="text"
                      value={guestName}
                      onChange={(e) => setGuestName(e.target.value)}
                      className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Mobile (For OTP & QR SMS)</label>
                    <input
                      type="text"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-2 border-t border-[#25292E]">
                <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider">
                  Payment Method (Indian Gateways)
                </h4>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'UPI'
                        ? 'bg-highway-orange/15 border-highway-orange text-white font-bold'
                        : 'bg-[#202429] text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs">UPI (Instant)</p>
                      <p className="text-[10px] text-gray-400">GPay, PhonePe, Paytm</p>
                    </div>
                    <span className="text-lg">⚡</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'CARD'
                        ? 'bg-highway-orange/15 border-highway-orange text-white font-bold'
                        : 'bg-[#202429] text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs">Cards / RuPay</p>
                      <p className="text-[10px] text-gray-400">Debit / Credit</p>
                    </div>
                    <span className="text-lg">💳</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'NETBANKING'
                        ? 'bg-highway-orange/15 border-highway-orange text-white font-bold'
                        : 'bg-[#202429] text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs">Net Banking</p>
                      <p className="text-[10px] text-gray-400">SBI, HDFC, ICICI, PNB</p>
                    </div>
                    <span className="text-lg">🏦</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('FLEET')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'FLEET'
                        ? 'bg-highway-orange/15 border-highway-orange text-white font-bold'
                        : 'bg-[#202429] text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs">Corporate Fleet</p>
                      <p className="text-[10px] text-gray-400">Direct Transport Billing</p>
                    </div>
                    <span className="text-lg">🚛</span>
                  </button>
                </div>
              </div>

              {/* Demo Mode Notice */}
              <div className="bg-[#121416] p-3 rounded-xl border border-gray-800 text-[11px] text-gray-400 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-green-400 flex-shrink-0"></span>
                <span>
                  Demo Mode: Server verifies signature and transaction instantly without deducting actual rupees.
                </span>
              </div>

              {error && (
                <div className="p-3.5 bg-red-950/60 border border-red-600/40 rounded-xl text-xs text-red-300 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePayAndConfirm}
                className="w-full bg-gradient-to-r from-highway-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-sm py-4 rounded-xl shadow-xl shadow-highway-orange/25 transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span>Securing Bed & Verifying Payment...</span>
                ) : (
                  <>
                    <span>CONFIRM & PAY ₹{total}</span>
                    <ArrowRight className="w-4 h-4 ml-1" />
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Right Column: Reservation Summary Card */}
          <div className="lg:col-span-5">
            <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 shadow-xl space-y-4">
              <h3 className="text-sm font-bold text-white border-b border-[#25292E] pb-3">
                Rest Stop Summary
              </h3>

              <div className="space-y-1">
                <h4 className="text-base font-black text-white">{property.name}</h4>
                <p className="text-xs text-gray-400 flex items-center">
                  <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange" />
                  {property.address}
                </p>
              </div>

              <div className="bg-[#202429] p-3.5 rounded-2xl border border-gray-800 space-y-2 text-xs">
                <div className="flex justify-between">
                  <span className="text-gray-400">Reserved Bed:</span>
                  <span className="font-bold text-white">{bedNumber}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Scheduled Duration:</span>
                  <span className="font-bold text-road-yellow">{duration} Hours</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Hourly Tariff:</span>
                  <span className="font-mono text-white">₹{rate}/hr</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Vehicle Type:</span>
                  <span className="text-white capitalize">{vehicle.replace('_', ' ').toLowerCase()}</span>
                </div>
              </div>

              {/* Price Calculation breakdown */}
              <div className="space-y-1.5 text-xs pt-2 border-t border-[#25292E]">
                <div className="flex justify-between text-gray-400">
                  <span>Base Stay ({duration}h × ₹{rate}):</span>
                  <span className="text-white font-mono">₹{rate * duration}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>GST (12%):</span>
                  <span className="text-white font-mono">₹{Math.round(rate * duration * 0.12 * 10) / 10}</span>
                </div>
                <div className="flex justify-between text-gray-400">
                  <span>Convenience & Linen Sanitization:</span>
                  <span className="text-white font-mono">₹10</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-base text-white">
                  <span>Total Payable:</span>
                  <span className="text-road-yellow font-mono text-lg">₹{total}</span>
                </div>
              </div>

              <div className="pt-2 text-[11px] text-gray-500">
                🛡️ Verified Anti-Fatigue Stop. Hotel will hold bed up to 30 mins after scheduled check-in time.
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default function BookingConfirmPage() {
  return (
    <React.Suspense fallback={<div className="min-h-screen bg-asphalt-black text-white p-8 flex items-center justify-center">Loading booking confirmation...</div>}>
      <BookingConfirmContent />
    </React.Suspense>
  );
}
