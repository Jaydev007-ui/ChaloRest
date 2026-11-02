'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Booking } from '@/types';
import { 
  Clock, 
  QrCode, 
  PlusCircle, 
  ShieldAlert, 
  MapPin, 
  CheckCircle2, 
  AlertTriangle,
  PhoneCall,
  Bed,
  RefreshCw
} from 'lucide-react';

interface ActiveStayTimerProps {
  booking: Booking;
  onExtend?: (hours: number) => Promise<boolean>;
  onCheckOut?: () => Promise<boolean>;
}

export const ActiveStayTimer: React.FC<ActiveStayTimerProps> = ({
  booking,
  onExtend,
  onCheckOut,
}) => {
  const [timeLeft, setTimeLeft] = useState<{ hours: number; minutes: number; seconds: number; isExpired: boolean }>({
    hours: 0,
    minutes: 0,
    seconds: 0,
    isExpired: false,
  });
  const [progressPercent, setProgressPercent] = useState<number>(0);
  const [showQRModal, setShowQRModal] = useState<boolean>(false);
  const [showExtendModal, setShowExtendModal] = useState<boolean>(false);
  const [extendHours, setExtendHours] = useState<number>(1);
  const [isExtending, setIsExtending] = useState<boolean>(false);
  const [extendError, setExtendError] = useState<string | null>(null);
  const [extendSuccess, setExtendSuccess] = useState<string | null>(null);

  useEffect(() => {
    const calculateTime = () => {
      const now = new Date().getTime();
      const checkIn = new Date(booking.checkInTime).getTime();
      const checkOut = new Date(booking.scheduledCheckOut).getTime();
      const totalDuration = checkOut - checkIn;
      const remaining = checkOut - now;

      if (remaining <= 0) {
        setTimeLeft({ hours: 0, minutes: 0, seconds: 0, isExpired: true });
        setProgressPercent(100);
      } else {
        const hours = Math.floor(remaining / (1000 * 60 * 60));
        const minutes = Math.floor((remaining % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((remaining % (1000 * 60)) / 1000);
        setTimeLeft({ hours, minutes, seconds, isExpired: false });

        const elapsed = now - checkIn;
        const pct = Math.min(100, Math.max(0, (elapsed / totalDuration) * 100));
        setProgressPercent(pct);
      }
    };

    calculateTime();
    const interval = setInterval(calculateTime, 1000);
    return () => clearInterval(interval);
  }, [booking.checkInTime, booking.scheduledCheckOut]);

  const handleConfirmExtension = async () => {
    setIsExtending(true);
    setExtendError(null);
    setExtendSuccess(null);
    try {
      if (onExtend) {
        const ok = await onExtend(extendHours);
        if (ok) {
          setExtendSuccess(`Stay successfully extended by ${extendHours} hour(s)!`);
          setTimeout(() => setShowExtendModal(false), 1500);
        } else {
          setExtendError(`Extension unavailable. Bed ${booking.bedNumber} has an upcoming reservation.`);
        }
      }
    } catch (e: any) {
      setExtendError(e?.message || 'Error processing extension');
    } finally {
      setIsExtending(false);
    }
  };

  return (
    <div className="bg-[#181B1F] border border-green-500/30 rounded-3xl p-6 sm:p-8 shadow-2xl relative overflow-hidden">
      {/* Active pulse aura */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-green-500/10 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>

      {/* Top Banner */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 border-b border-[#25292E] pb-5">
        <div className="flex items-center space-x-3">
          <span className="flex h-3 w-3 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500"></span>
          </span>
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-xs font-black tracking-wider uppercase bg-green-500/20 text-green-400 border border-green-500/40 px-2 py-0.5 rounded">
                ACTIVE REST IN PROGRESS
              </span>
              <span className="text-xs text-gray-400 font-mono">
                Booking #{booking.bookingCode}
              </span>
            </div>
            <h3 className="text-xl font-black text-white mt-1">
              {booking.propertyName}
            </h3>
            <p className="text-xs text-gray-400 flex items-center mt-0.5">
              <MapPin className="w-3.5 h-3.5 mr-1 text-highway-orange" />
              {booking.propertyAddress}
            </p>
          </div>
        </div>

        {/* Room & Bed Pill */}
        <div className="flex items-center space-x-2 bg-[#202429] border border-[#2D333B] px-4 py-2.5 rounded-xl">
          <Bed className="w-5 h-5 text-road-yellow" />
          <div>
            <p className="text-[11px] text-gray-400 font-medium">Reserved Resting Bed</p>
            <p className="text-sm font-black text-white font-mono">{booking.bedNumber} ({booking.roomName})</p>
          </div>
        </div>
      </div>

      {/* Countdown Timer Centerpiece */}
      <div className="my-8 text-center">
        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-3 flex items-center justify-center">
          <Clock className="w-4 h-4 mr-1.5 text-highway-orange" />
          Time Remaining for Scheduled Rest
        </p>

        {timeLeft.isExpired ? (
          <div className="inline-flex items-center space-x-2 bg-red-950/60 border border-red-600/50 text-red-300 px-6 py-3 rounded-2xl">
            <AlertTriangle className="w-5 h-5 text-red-400" />
            <span className="font-bold text-base">Rest Period Finished. Please checkout or extend stay.</span>
          </div>
        ) : (
          <div className="flex items-center justify-center space-x-4 sm:space-x-8">
            <div className="flex flex-col items-center">
              <span className="font-black text-4xl sm:text-6xl text-white font-mono bg-[#111315] border border-[#262A30] px-4 sm:px-6 py-3 rounded-2xl shadow-inner">
                {String(timeLeft.hours).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase mt-2">Hours</span>
            </div>
            <span className="text-3xl sm:text-5xl font-black text-highway-orange">:</span>
            <div className="flex flex-col items-center">
              <span className="font-black text-4xl sm:text-6xl text-road-yellow font-mono bg-[#111315] border border-[#262A30] px-4 sm:px-6 py-3 rounded-2xl shadow-inner">
                {String(timeLeft.minutes).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase mt-2">Minutes</span>
            </div>
            <span className="text-3xl sm:text-5xl font-black text-highway-orange">:</span>
            <div className="flex flex-col items-center">
              <span className="font-black text-4xl sm:text-6xl text-green-400 font-mono bg-[#111315] border border-[#262A30] px-4 sm:px-6 py-3 rounded-2xl shadow-inner">
                {String(timeLeft.seconds).padStart(2, '0')}
              </span>
              <span className="text-[11px] font-bold text-gray-400 uppercase mt-2">Seconds</span>
            </div>
          </div>
        )}

        {/* Progress bar */}
        <div className="max-w-xl mx-auto mt-6">
          <div className="w-full bg-[#111315] rounded-full h-2.5 overflow-hidden border border-[#22262B]">
            <div
              className="bg-gradient-to-r from-green-500 via-highway-orange to-road-yellow h-2.5 rounded-full transition-all duration-1000"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          <div className="flex justify-between text-[11px] text-gray-500 mt-2 font-mono">
            <span>Check-in: {new Date(booking.checkInTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
            <span>Check-out: {new Date(booking.scheduledCheckOut).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
          </div>
        </div>
      </div>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2 border-t border-[#25292E]">
        {/* QR Access Button */}
        <button
          type="button"
          onClick={() => setShowQRModal(true)}
          className="flex items-center justify-center space-x-2 bg-[#202429] hover:bg-[#282E35] border border-gray-700 text-white font-bold text-xs py-3 px-4 rounded-xl transition-all"
        >
          <QrCode className="w-4 h-4 text-highway-orange" />
          <span>SHOW CHECK-IN QR</span>
        </button>

        {/* Extend Stay Button */}
        <button
          type="button"
          onClick={() => setShowExtendModal(true)}
          className="flex items-center justify-center space-x-2 bg-gradient-to-r from-highway-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white font-black text-xs py-3 px-4 rounded-xl shadow-lg shadow-highway-orange/20 transition-all"
        >
          <PlusCircle className="w-4 h-4" />
          <span>EXTEND MY STAY (+HOURLY)</span>
        </button>

        {/* Reception / SOS */}
        <a
          href="tel:1800242567"
          className="flex items-center justify-center space-x-2 bg-[#202429] hover:bg-[#282E35] border border-gray-700 text-gray-300 hover:text-white font-bold text-xs py-3 px-4 rounded-xl transition-all"
        >
          <PhoneCall className="w-4 h-4 text-green-400" />
          <span>HOTEL RECEPTION / SOS</span>
        </a>
      </div>

      {/* QR Modal */}
      {showQRModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#17191C] border border-[#2B3037] rounded-3xl max-w-sm w-full p-6 text-center space-y-4 shadow-2xl">
            <h4 className="text-lg font-black text-white">ChaloRest Fast Pass</h4>
            <p className="text-xs text-gray-400">Present this QR to hotel staff at desk for 10-second check-in or checkout.</p>

            {/* Visual SVG QR Representation */}
            <div className="bg-white p-5 rounded-2xl inline-block mx-auto shadow-xl">
              <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
                <rect width="100" height="100" fill="white" />
                {/* QR Pattern simulated with authentic dark modules */}
                <rect x="5" y="5" width="25" height="25" fill="#17191C" />
                <rect x="9" y="9" width="17" height="17" fill="white" />
                <rect x="13" y="13" width="9" height="9" fill="#17191C" />

                <rect x="70" y="5" width="25" height="25" fill="#17191C" />
                <rect x="74" y="9" width="17" height="17" fill="white" />
                <rect x="78" y="13" width="9" height="9" fill="#17191C" />

                <rect x="5" y="70" width="25" height="25" fill="#17191C" />
                <rect x="9" y="74" width="17" height="17" fill="white" />
                <rect x="13" y="78" width="9" height="9" fill="#17191C" />

                {/* Data modules */}
                <rect x="35" y="8" width="8" height="8" fill="#17191C" />
                <rect x="47" y="8" width="8" height="8" fill="#FF8A24" />
                <rect x="35" y="20" width="12" height="6" fill="#17191C" />
                <rect x="52" y="20" width="12" height="6" fill="#17191C" />

                <rect x="8" y="35" width="12" height="8" fill="#17191C" />
                <rect x="25" y="35" width="10" height="10" fill="#17191C" />
                <rect x="40" y="35" width="20" height="10" fill="#17191C" />
                <rect x="65" y="35" width="12" height="12" fill="#17191C" />
                <rect x="82" y="35" width="10" height="8" fill="#17191C" />

                <rect x="8" y="50" width="15" height="12" fill="#17191C" />
                <rect x="30" y="50" width="10" height="10" fill="#17191C" />
                <rect x="45" y="48" width="10" height="10" fill="#FF8A24" />
                <rect x="60" y="52" width="15" height="8" fill="#17191C" />
                <rect x="80" y="50" width="12" height="12" fill="#17191C" />

                <rect x="35" y="65" width="15" height="12" fill="#17191C" />
                <rect x="55" y="65" width="15" height="12" fill="#17191C" />
                <rect x="75" y="68" width="18" height="10" fill="#17191C" />

                <rect x="35" y="82" width="25" height="10" fill="#17191C" />
                <rect x="65" y="82" width="12" height="10" fill="#FF8A24" />
                <rect x="82" y="82" width="10" height="10" fill="#17191C" />
              </svg>
            </div>

            <div className="bg-[#1F2328] p-3 rounded-xl border border-gray-800 text-left text-xs font-mono">
              <p className="text-gray-400">Token: <span className="text-road-yellow">{booking.qrToken}</span></p>
              <p className="text-gray-400">Guest: <span className="text-white">{booking.userName}</span></p>
              <p className="text-gray-400">Bed: <span className="text-white font-bold">{booking.bedNumber}</span></p>
            </div>

            <button
              type="button"
              onClick={() => setShowQRModal(false)}
              className="w-full bg-[#25292E] hover:bg-[#32373E] text-white font-bold text-xs py-2.5 rounded-xl"
            >
              Close Pass
            </button>
          </div>
        </div>
      )}

      {/* Stay Extension Modal */}
      {showExtendModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
          <div className="bg-[#17191C] border border-[#2B3037] rounded-3xl max-w-md w-full p-6 text-left space-y-4 shadow-2xl">
            <div className="flex items-center justify-between border-b border-[#25292E] pb-3">
              <h4 className="text-lg font-black text-white flex items-center">
                <PlusCircle className="w-5 h-5 mr-2 text-highway-orange" />
                Extend Your Stay
              </h4>
              <button
                onClick={() => setShowExtendModal(false)}
                className="text-gray-400 hover:text-white text-sm"
              >
                ✕
              </button>
            </div>

            <p className="text-xs text-gray-400">
              Need more sleep before getting back behind the wheel? Extend your stay in {booking.bedNumber}. We verify live availability to prevent booking conflicts.
            </p>

            <div className="space-y-2">
              <label className="text-xs font-bold text-gray-300">Select Extension Duration:</label>
              <div className="grid grid-cols-3 gap-2">
                {[1, 2, 4].map((hrs) => (
                  <button
                    key={hrs}
                    type="button"
                    onClick={() => setExtendHours(hrs)}
                    className={`py-3 px-2 rounded-xl border text-center transition-all ${
                      extendHours === hrs
                        ? 'bg-highway-orange text-white border-highway-orange font-bold shadow-md'
                        : 'bg-[#202429] text-gray-300 border-[#2D333B] hover:border-gray-600'
                    }`}
                  >
                    <p className="text-sm font-black">+{hrs} Hour{hrs > 1 ? 's' : ''}</p>
                    <p className="text-[10px] opacity-80 font-mono mt-0.5">
                      +₹{booking.hourlyRate * hrs}
                    </p>
                  </button>
                ))}
              </div>
            </div>

            {/* Pricing breakdown */}
            <div className="bg-[#1F2328] p-3.5 rounded-xl border border-gray-800 text-xs space-y-1">
              <div className="flex justify-between text-gray-400">
                <span>Hourly Rate ({booking.bedNumber}):</span>
                <span>₹{booking.hourlyRate}/hr</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Additional Duration:</span>
                <span>{extendHours} Hour(s)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>GST (12%):</span>
                <span>₹{(booking.hourlyRate * extendHours * 0.12).toFixed(1)}</span>
              </div>
              <div className="border-t border-gray-700 pt-1.5 flex justify-between font-bold text-white text-sm">
                <span>Total Amount to Pay:</span>
                <span className="text-road-yellow font-mono">
                  ₹{Math.round(booking.hourlyRate * extendHours * 1.12)}
                </span>
              </div>
            </div>

            {extendError && (
              <div className="p-3 bg-red-950/50 border border-red-600/40 rounded-xl text-xs text-red-300 flex items-center">
                <AlertTriangle className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                <span>{extendError}</span>
              </div>
            )}

            {extendSuccess && (
              <div className="p-3 bg-green-950/50 border border-green-600/40 rounded-xl text-xs text-green-300 flex items-center">
                <CheckCircle2 className="w-4 h-4 mr-2 text-green-400 flex-shrink-0" />
                <span>{extendSuccess}</span>
              </div>
            )}

            <div className="flex items-center space-x-3 pt-2">
              <button
                type="button"
                onClick={() => setShowExtendModal(false)}
                className="w-1/2 bg-[#202429] hover:bg-[#282E35] text-gray-300 font-bold text-xs py-3 rounded-xl"
              >
                Cancel
              </button>
              <button
                type="button"
                disabled={isExtending}
                onClick={handleConfirmExtension}
                className="w-1/2 bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs py-3 rounded-xl shadow-lg shadow-highway-orange/20 transition-all flex items-center justify-center space-x-1"
              >
                {isExtending ? (
                  <RefreshCw className="w-4 h-4 animate-spin" />
                ) : (
                  <span>PAY & CONFIRM EXTENSION</span>
                )}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
