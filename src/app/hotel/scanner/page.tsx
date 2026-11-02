'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { store } from '@/lib/store';
import { Booking } from '@/types';
import { 
  QrCode, 
  CheckCircle2, 
  AlertCircle, 
  Search, 
  Bed, 
  Clock, 
  LogOut, 
  LogIn, 
  RefreshCw,
  Camera,
  ShieldCheck
} from 'lucide-react';

export default function HotelScannerPage() {
  const [qrInput, setQrInput] = useState('');
  const [selectedAction, setSelectedAction] = useState<'CHECK_IN' | 'CHECK_OUT'>('CHECK_IN');
  const [scanResult, setScanResult] = useState<{
    success: boolean;
    message: string;
    booking?: Booking;
  } | null>(null);
  const [isVerifying, setIsVerifying] = useState(false);

  const handleProcessScan = async (tokenToVerify?: string) => {
    const token = (tokenToVerify || qrInput).trim();
    if (!token) return;

    setIsVerifying(true);
    setScanResult(null);

    try {
      const res = await fetch('/api/scanner', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          qrToken: token,
          action: selectedAction,
        }),
      });

      const data = await res.json();
      if (data.success) {
        setScanResult({
          success: true,
          message:
            selectedAction === 'CHECK_IN'
              ? `Check-in Verified! Guest assigned to ${data.booking.bedNumber} (${data.booking.roomName}).`
              : `Checkout Successful! Bed ${data.booking.bedNumber} marked clean and ready for next guest.`,
          booking: data.booking,
        });
      } else {
        setScanResult({
          success: false,
          message: data.error || 'Token invalid or expired',
        });
      }
    } catch (e: any) {
      setScanResult({
        success: false,
        message: e?.message || 'Error communicating with validation server',
      });
    } finally {
      setIsVerifying(false);
    }
  };

  const sampleTokens = [
    { label: 'Active Guest (Bed A2)', token: 'CR-2026-4402' },
    { label: 'Past Stay (Bed A3)', token: 'CR-2026-1092' },
  ];

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* Header */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 text-center space-y-3 shadow-xl">
        <div className="w-14 h-14 rounded-2xl bg-highway-orange/15 border border-highway-orange/40 text-highway-orange flex items-center justify-center mx-auto">
          <QrCode className="w-7 h-7" />
        </div>
        <h1 className="text-2xl sm:text-3xl font-black text-white">
          Hotel Front Desk FastPass Scanner
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
          Scan guest booking QR pass using your phone camera or enter the 4-digit booking code for 10-second check-in and checkout.
        </p>

        {/* Action Toggle: Check-in vs Check-out */}
        <div className="inline-flex p-1 bg-[#121416] border border-gray-800 rounded-2xl">
          <button
            type="button"
            onClick={() => {
              setSelectedAction('CHECK_IN');
              setScanResult(null);
            }}
            className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedAction === 'CHECK_IN'
                ? 'bg-green-600 text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LogIn className="w-4 h-4 mr-1.5" />
            Guest Check-in
          </button>
          <button
            type="button"
            onClick={() => {
              setSelectedAction('CHECK_OUT');
              setScanResult(null);
            }}
            className={`flex items-center px-5 py-2.5 rounded-xl text-xs font-bold transition-all ${
              selectedAction === 'CHECK_OUT'
                ? 'bg-highway-orange text-white shadow-md'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <LogOut className="w-4 h-4 mr-1.5" />
            Guest Check-out
          </button>
        </div>
      </div>

      {/* Camera Viewfinder Simulation */}
      <div className="bg-[#101214] border-2 border-dashed border-gray-700 rounded-3xl p-8 text-center space-y-4 relative overflow-hidden">
        <div className="w-48 h-48 mx-auto border-2 border-road-yellow rounded-2xl relative flex items-center justify-center shadow-inner bg-black/40">
          {/* Animated scan bar */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-road-yellow to-transparent animate-pulse"></div>
          <Camera className="w-12 h-12 text-gray-600" />
          <span className="absolute bottom-2 text-[10px] text-road-yellow font-mono font-bold">
            Optical Sensor Active
          </span>
        </div>
        <p className="text-xs text-gray-400">
          Point device camera at ChaloRest booking QR code pass on guest’s phone screen
        </p>
      </div>

      {/* Manual Code / Token Entry */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 shadow-xl space-y-4">
        <label className="block text-xs font-bold text-gray-300">
          Or Enter Booking Code / Token Manually:
        </label>
        <div className="flex gap-2">
          <input
            type="text"
            value={qrInput}
            onChange={(e) => setQrInput(e.target.value)}
            placeholder="e.g. CR-2026-4402 or CR-SECURE-TOKEN-..."
            className="flex-1 bg-[#202429] border border-gray-700 focus:border-highway-orange rounded-xl px-4 py-3 text-sm text-white font-mono"
          />
          <button
            type="button"
            disabled={isVerifying || !qrInput.trim()}
            onClick={() => handleProcessScan()}
            className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg transition-all flex items-center"
          >
            {isVerifying ? (
              <RefreshCw className="w-4 h-4 animate-spin" />
            ) : (
              <span>VERIFY TOKEN</span>
            )}
          </button>
        </div>

        {/* Quick Test Demo Chips */}
        <div className="pt-2 flex flex-wrap items-center gap-2 text-xs">
          <span className="text-gray-400 text-[11px]">Quick Test:</span>
          {sampleTokens.map((s) => (
            <button
              key={s.token}
              type="button"
              onClick={() => {
                setQrInput(s.token);
                handleProcessScan(s.token);
              }}
              className="bg-[#202429] hover:bg-[#282E35] border border-gray-700 text-road-yellow px-2.5 py-1 rounded-lg font-mono text-[11px]"
            >
              Test {s.label} ({s.token})
            </button>
          ))}
        </div>
      </div>

      {/* Result Card */}
      {scanResult && (
        <div
          className={`border rounded-3xl p-6 space-y-4 shadow-2xl transition-all ${
            scanResult.success
              ? 'bg-[#142017] border-green-500/50 text-green-200'
              : 'bg-[#201416] border-red-500/50 text-red-200'
          }`}
        >
          <div className="flex items-center space-x-3">
            {scanResult.success ? (
              <CheckCircle2 className="w-7 h-7 text-green-400 flex-shrink-0" />
            ) : (
              <AlertCircle className="w-7 h-7 text-red-400 flex-shrink-0" />
            )}
            <div>
              <h3 className="font-black text-base">
                {scanResult.success ? 'Authentication Verified' : 'Scan Failed'}
              </h3>
              <p className="text-xs">{scanResult.message}</p>
            </div>
          </div>

          {scanResult.booking && (
            <div className="bg-black/40 rounded-2xl p-4 border border-green-500/30 text-xs font-mono space-y-1.5 text-gray-300">
              <div className="flex justify-between">
                <span>Guest Name:</span>
                <span className="text-white font-bold">{scanResult.booking.userName}</span>
              </div>
              <div className="flex justify-between">
                <span>Assigned Bed:</span>
                <span className="text-road-yellow font-bold text-sm">
                  {scanResult.booking.bedNumber} ({scanResult.booking.roomName})
                </span>
              </div>
              <div className="flex justify-between">
                <span>Duration:</span>
                <span className="text-white">{scanResult.booking.durationHours} Hours</span>
              </div>
              <div className="flex justify-between">
                <span>Vehicle:</span>
                <span className="text-white">{scanResult.booking.vehicleType}</span>
              </div>
              <div className="flex justify-between border-t border-gray-700 pt-1.5 font-bold">
                <span>Scheduled Checkout:</span>
                <span className="text-green-400">
                  {new Date(scanResult.booking.scheduledCheckOut).toLocaleTimeString()}
                </span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
