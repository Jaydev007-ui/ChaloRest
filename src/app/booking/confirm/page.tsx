'use client';

import React, { useState, useEffect } from 'react';
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
  Share2,
  Smartphone,
  Building2,
  Lock,
  Sparkles,
  Zap,
  Check,
  RefreshCw,
  ExternalLink
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

  // User input states
  const [guestName, setGuestName] = useState('Suresh Verma');
  const [guestPhone, setGuestPhone] = useState('+91 98765 43210');
  const [paymentMethod, setPaymentMethod] = useState<'UPI' | 'CARD' | 'NETBANKING' | 'FLEET'>('UPI');

  // UPI sub-states
  const [upiMode, setUpiMode] = useState<'ID' | 'QR'>('ID');
  const [upiId, setUpiId] = useState('suresh.verma@okhdfcbank');
  const [qrTimer, setQrTimer] = useState(299); // 5 mins countdown

  // Card sub-states
  const [cardNumber, setCardNumber] = useState('6072 8841 9920 1024');
  const [cardHolder, setCardHolder] = useState('SURESH VERMA');
  const [cardExpiry, setCardExpiry] = useState('08/28');
  const [cardCvv, setCardCvv] = useState('842');
  const [cardBrand, setCardBrand] = useState<'RUPAY' | 'VISA' | 'MASTERCARD'>('RUPAY');

  // NetBanking sub-states
  const [selectedBank, setSelectedBank] = useState('SBI');

  // Corporate Fleet sub-states
  const [fleetCompany, setFleetCompany] = useState('VRL Logistics Fleet Account (#VRL-88210)');
  const [vehicleRegNo, setVehicleRegNo] = useState('GJ-01-AB-8824');
  const [fleetPin, setFleetPin] = useState('4421');

  // Processing simulation states
  const [isProcessing, setIsProcessing] = useState(false);
  const [processStep, setProcessStep] = useState<string>('');
  const [confirmedBooking, setConfirmedBooking] = useState<Booking | null>(null);
  const [txnRef, setTxnRef] = useState<string>('');
  const [error, setError] = useState<string | null>(null);

  // QR countdown timer
  useEffect(() => {
    let timer: any;
    if (paymentMethod === 'UPI' && upiMode === 'QR' && qrTimer > 0 && !confirmedBooking) {
      timer = setInterval(() => {
        setQrTimer((prev) => (prev > 0 ? prev - 1 : 0));
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [paymentMethod, upiMode, qrTimer, confirmedBooking]);

  // Card formatting
  const handleCardNumberChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 16);
    const formatted = raw.replace(/(\d{4})(?=\d)/g, '$1 ');
    setCardNumber(formatted);

    if (raw.startsWith('6') || raw.startsWith('8')) {
      setCardBrand('RUPAY');
    } else if (raw.startsWith('4')) {
      setCardBrand('VISA');
    } else {
      setCardBrand('MASTERCARD');
    }
  };

  const handleExpiryChange = (val: string) => {
    const raw = val.replace(/\D/g, '').slice(0, 4);
    if (raw.length >= 3) {
      setCardExpiry(`${raw.slice(0, 2)}/${raw.slice(2)}`);
    } else {
      setCardExpiry(raw);
    }
  };

  // Payment execution
  const handlePayAndConfirm = async () => {
    setIsProcessing(true);
    setError(null);
    setProcessStep('1/3: Encrypting payment payload with 256-bit banking SSL...');

    // Method description string
    let resolvedMethod = 'UPI (Instant NPCI 2.0)';
    if (paymentMethod === 'UPI') {
      resolvedMethod = upiMode === 'ID' ? `UPI (${upiId})` : 'UPI (Dynamic Highway QR)';
    } else if (paymentMethod === 'CARD') {
      resolvedMethod = `${cardBrand} Card (ending ${cardNumber.slice(-4) || '1024'})`;
    } else if (paymentMethod === 'NETBANKING') {
      resolvedMethod = `Net Banking (${selectedBank})`;
    } else if (paymentMethod === 'FLEET') {
      resolvedMethod = `Fleet Allowance (${fleetCompany.split(' ')[0]} - Reg: ${vehicleRegNo})`;
    }

    const generatedTxn = `TXN-IND-${Date.now().toString(36).toUpperCase()}-${Math.floor(1000 + Math.random() * 9000)}`;
    setTxnRef(generatedTxn);

    try {
      await new Promise(r => setTimeout(r, 600));
      setProcessStep('2/3: Authorizing with Indian Payment Gateway / NPCI Switch...');
      await new Promise(r => setTimeout(r, 600));
      setProcessStep('3/3: Locking reserved bed & issuing digital FastPass token...');
      await new Promise(r => setTimeout(r, 500));

      // Attempt server API call
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
          paymentMethod: resolvedMethod,
          paymentReference: generatedTxn,
        })
      });

      const data = await res.json();
      if (!data.success) {
        // Fallback to local store
        const directRes = createBooking({
          propertyId,
          roomId,
          bedId,
          checkInTime: new Date().toISOString(),
          durationHours: duration,
          vehicleType: vehicle,
          userName: guestName,
          userPhone: guestPhone,
          paymentMethod: resolvedMethod,
          paymentReference: generatedTxn,
        });

        if (!directRes.success) {
          setError(directRes.error || 'Bed lock conflict: Another traveller just reserved this bed.');
          setIsProcessing(false);
          return;
        }
        setConfirmedBooking(directRes.booking!);
      } else {
        setConfirmedBooking(data.booking);
      }
    } catch (e: any) {
      // Fallback direct execution
      const directRes = createBooking({
        propertyId,
        roomId,
        bedId,
        checkInTime: new Date().toISOString(),
        durationHours: duration,
        vehicleType: vehicle,
        userName: guestName,
        userPhone: guestPhone,
        paymentMethod: resolvedMethod,
        paymentReference: generatedTxn,
      });

      if (directRes.success) {
        setConfirmedBooking(directRes.booking!);
      } else {
        setError(directRes.error || 'Failed to complete transaction.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
      {/* If booking confirmed: Show Confirmation & Digital FastPass with Receipt */}
      {confirmedBooking ? (
        <div className="bg-[#181B1F] border border-green-500/40 rounded-3xl p-6 sm:p-10 shadow-2xl text-center space-y-6">
          <div className="w-16 h-16 rounded-full bg-green-500/20 border-2 border-green-500 flex items-center justify-center text-green-400 mx-auto">
            <CheckCircle2 className="w-10 h-10" />
          </div>

          <div>
            <span className="text-xs bg-green-500/20 text-green-400 font-bold px-3 py-1 rounded-full uppercase tracking-wider">
              PAYMENT VERIFIED & BED RESERVED
            </span>
            <h2 className="text-3xl font-black text-white mt-2">
              You’re All Set To Rest!
            </h2>
            <p className="text-xs sm:text-sm text-gray-400 mt-1 max-w-lg mx-auto">
              Your bed in <strong className="text-white">{property.name}</strong> is reserved exclusively for the next {duration} hours. Show this QR FastPass at reception for 10-second check-in.
            </p>
          </div>

          {/* QR Code Pass Card */}
          <div className="max-w-md mx-auto bg-[#101214] border border-[#2B3037] rounded-3xl p-6 shadow-2xl space-y-4">
            <div className="flex items-center justify-between border-b border-gray-800 pb-3">
              <span className="font-bold text-xs text-white flex items-center">
                <span className="w-2 h-2 rounded-full bg-green-400 mr-2"></span>
                ChaloRest Digital FastPass
              </span>
              <span className="font-mono text-xs text-road-yellow font-bold">#{confirmedBooking.bookingCode}</span>
            </div>

            {/* Visual SVG QR */}
            <div className="bg-white p-4 rounded-2xl inline-block mx-auto shadow-inner relative">
              <svg className="w-44 h-44" viewBox="0 0 100 100" fill="none">
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
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-8 h-8 rounded-lg bg-highway-orange text-white flex items-center justify-center font-black text-xs shadow-lg">
                  CR
                </div>
              </div>
            </div>

            {/* Reservation & Payment Details */}
            <div className="text-left text-xs space-y-2 font-mono bg-[#181B1F] p-4 rounded-2xl border border-gray-800">
              <div className="flex justify-between text-gray-400">
                <span>Guest Name:</span>
                <span className="text-white font-bold">{confirmedBooking.userName}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Reserved Bed:</span>
                <span className="text-road-yellow font-bold">{confirmedBooking.bedNumber} ({confirmedBooking.roomName})</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Rest Duration:</span>
                <span className="text-white">{confirmedBooking.durationHours} Hours (Anti-Fatigue)</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Payment Mode:</span>
                <span className="text-white font-semibold">{confirmedBooking.paymentMethod || 'UPI Instant'}</span>
              </div>
              <div className="flex justify-between text-gray-400">
                <span>Gateway Txn ID:</span>
                <span className="text-gray-300 font-mono text-[10px]">{confirmedBooking.razorpayPaymentId || txnRef}</span>
              </div>
              <div className="border-t border-gray-800 pt-2 flex justify-between text-sm">
                <span className="text-gray-300 font-bold">Total Paid:</span>
                <span className="text-green-400 font-bold">₹{confirmedBooking.totalAmount} (GST incl.)</span>
              </div>
            </div>

            <div className="text-[11px] text-gray-400">
              Security Token: <span className="font-mono text-highway-orange">{confirmedBooking.qrToken}</span>
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
              <span>Download Tax Invoice</span>
            </button>
          </div>
        </div>
      ) : (
        /* Booking Review & Active Payment Form */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Guest Details & Active Payment Gateway */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-8 space-y-6 shadow-xl">
              <div>
                <span className="text-xs bg-highway-orange text-white font-bold px-2 py-0.5 rounded uppercase">
                  STEP 2 OF 2
                </span>
                <h2 className="text-2xl font-black text-white mt-1">Review & Confirm Stay</h2>
                <p className="text-xs text-gray-400 mt-0.5">
                  Transactional reservation lock prevents duplicate booking of {bedNumber}.
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
                      className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-highway-orange"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-[11px] text-gray-400 mb-1">Mobile (For FastPass SMS)</label>
                    <input
                      type="text"
                      value={guestPhone}
                      onChange={(e) => setGuestPhone(e.target.value)}
                      className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-highway-orange"
                      required
                    />
                  </div>
                </div>
              </div>

              {/* Payment Methods Selection */}
              <div className="space-y-4 pt-2 border-t border-[#25292E]">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-bold text-gray-300 uppercase tracking-wider flex items-center">
                    <ShieldCheck className="w-4 h-4 mr-1 text-green-400" />
                    Indian Payment Gateway (Active)
                  </h4>
                  <span className="text-[10px] bg-green-500/20 text-green-400 px-2 py-0.5 rounded font-mono font-bold">
                    256-Bit SSL Secured
                  </span>
                </div>
                
                <div className="grid grid-cols-2 gap-2 text-xs">
                  <button
                    type="button"
                    onClick={() => setPaymentMethod('UPI')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'UPI'
                        ? 'bg-highway-orange/15 border-highway-orange text-white font-bold ring-1 ring-highway-orange/50'
                        : 'bg-[#202429] text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs text-white">UPI Instant</p>
                      <p className="text-[10px] text-gray-400">GPay, PhonePe, Paytm</p>
                    </div>
                    <span className="text-lg">⚡</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('CARD')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'CARD'
                        ? 'bg-highway-orange/15 border-highway-orange text-white font-bold ring-1 ring-highway-orange/50'
                        : 'bg-[#202429] text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs text-white">RuPay / Cards</p>
                      <p className="text-[10px] text-gray-400">Debit / Credit</p>
                    </div>
                    <span className="text-lg">💳</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('NETBANKING')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'NETBANKING'
                        ? 'bg-highway-orange/15 border-highway-orange text-white font-bold ring-1 ring-highway-orange/50'
                        : 'bg-[#202429] text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs text-white">Net Banking</p>
                      <p className="text-[10px] text-gray-400">SBI, HDFC, ICICI, PNB</p>
                    </div>
                    <span className="text-lg">🏦</span>
                  </button>

                  <button
                    type="button"
                    onClick={() => setPaymentMethod('FLEET')}
                    className={`p-3 rounded-xl border text-left flex items-center justify-between transition-all ${
                      paymentMethod === 'FLEET'
                        ? 'bg-highway-orange/15 border-highway-orange text-white font-bold ring-1 ring-highway-orange/50'
                        : 'bg-[#202429] text-gray-400 border-gray-800 hover:border-gray-700'
                    }`}
                  >
                    <div>
                      <p className="text-xs text-white">Corporate Fleet</p>
                      <p className="text-[10px] text-gray-400">Direct Transport Billing</p>
                    </div>
                    <span className="text-lg">🚛</span>
                  </button>
                </div>

                {/* Sub-form 1: UPI Interactive Form */}
                {paymentMethod === 'UPI' && (
                  <div className="bg-[#131618] border border-gray-800 rounded-2xl p-4 space-y-4">
                    <div className="flex border-b border-gray-800 pb-3 gap-2">
                      <button
                        type="button"
                        onClick={() => setUpiMode('ID')}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all ${
                          upiMode === 'ID'
                            ? 'bg-highway-orange text-white'
                            : 'bg-[#202429] text-gray-400 hover:text-white'
                        }`}
                      >
                        Enter UPI VPA / ID
                      </button>
                      <button
                        type="button"
                        onClick={() => setUpiMode('QR')}
                        className={`text-xs px-3 py-1.5 rounded-lg font-bold transition-all flex items-center ${
                          upiMode === 'QR'
                            ? 'bg-highway-orange text-white'
                            : 'bg-[#202429] text-gray-400 hover:text-white'
                        }`}
                      >
                        <QrCode className="w-3.5 h-3.5 mr-1" />
                        Scan Highway Dynamic QR
                      </button>
                    </div>

                    {upiMode === 'ID' ? (
                      <div className="space-y-3">
                        <label className="block text-[11px] text-gray-400">Enter Virtual Payment Address (VPA)</label>
                        <div className="relative">
                          <input
                            type="text"
                            value={upiId}
                            onChange={(e) => setUpiId(e.target.value)}
                            placeholder="e.g. 9876543210@paytm or driver@okhdfcbank"
                            className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-3 py-2.5 text-xs text-white focus:outline-none focus:border-highway-orange font-mono"
                          />
                          <div className="absolute right-2.5 top-2.5 flex items-center text-green-400 text-[11px]">
                            <Check className="w-3.5 h-3.5 mr-1" />
                            <span>NPCI Verified</span>
                          </div>
                        </div>

                        {/* Quick UPI Handle suggestions */}
                        <div className="flex flex-wrap gap-1.5 text-[11px]">
                          <span className="text-gray-500 self-center mr-1">Quick handle:</span>
                          {['@okhdfcbank', '@paytm', '@ybl', '@okaxis', '@upi'].map(handle => (
                            <button
                              key={handle}
                              type="button"
                              onClick={() => {
                                const base = upiId.includes('@') ? upiId.split('@')[0] : upiId;
                                setUpiId(`${base || 'driver'}${handle}`);
                              }}
                              className="px-2 py-0.5 bg-[#202429] hover:bg-[#2B3037] text-gray-300 rounded border border-gray-700 font-mono text-[10px]"
                            >
                              {handle}
                            </button>
                          ))}
                        </div>

                        <div className="bg-green-950/30 border border-green-800/40 rounded-xl p-2.5 text-[11px] text-green-400 flex items-center">
                          <Zap className="w-4 h-4 mr-2 flex-shrink-0 text-road-yellow" />
                          <span>Zero convenience fee on UPI transfers. Instant collect request will be sent to your phone.</span>
                        </div>
                      </div>
                    ) : (
                      <div className="text-center py-2 space-y-3">
                        <p className="text-xs text-gray-300">Scan this dynamic UPI QR with any Indian payment app</p>
                        <div className="bg-white p-3 rounded-2xl inline-block mx-auto shadow-lg relative">
                          <svg className="w-36 h-36" viewBox="0 0 100 100" fill="none">
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
                          <div className="text-[10px] font-mono text-gray-700 mt-1 font-bold">
                            ₹{total}.00 INR
                          </div>
                        </div>

                        <div className="text-[11px] text-gray-400 font-mono">
                          QR expires in: <span className="text-road-yellow font-bold">{Math.floor(qrTimer / 60)}:{String(qrTimer % 60).padStart(2, '0')} min</span>
                        </div>

                        <div className="flex justify-center gap-2 text-[10px] text-gray-400 pt-1">
                          <span className="bg-[#1C2025] px-2 py-0.5 rounded border border-gray-800">Google Pay</span>
                          <span className="bg-[#1C2025] px-2 py-0.5 rounded border border-gray-800">PhonePe</span>
                          <span className="bg-[#1C2025] px-2 py-0.5 rounded border border-gray-800">Paytm</span>
                          <span className="bg-[#1C2025] px-2 py-0.5 rounded border border-gray-800">BHIM 2.0</span>
                        </div>
                      </div>
                    )}
                  </div>
                )}

                {/* Sub-form 2: Cards / RuPay Interactive Form */}
                {paymentMethod === 'CARD' && (
                  <div className="bg-[#131618] border border-gray-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] text-gray-400">Card Number</label>
                      <span className={`text-[10px] font-bold px-2 py-0.5 rounded border ${
                        cardBrand === 'RUPAY' 
                          ? 'bg-green-500/20 text-green-400 border-green-500/40' 
                          : 'bg-blue-500/20 text-blue-400 border-blue-500/40'
                      }`}>
                        {cardBrand === 'RUPAY' ? '🇮🇳 RuPay (Zero Surcharge)' : cardBrand}
                      </span>
                    </div>

                    <input
                      type="text"
                      value={cardNumber}
                      onChange={(e) => handleCardNumberChange(e.target.value)}
                      placeholder="XXXX XXXX XXXX XXXX"
                      className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white font-mono tracking-widest focus:outline-none focus:border-highway-orange"
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Cardholder Name</label>
                        <input
                          type="text"
                          value={cardHolder}
                          onChange={(e) => setCardHolder(e.target.value.toUpperCase())}
                          className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-highway-orange uppercase font-mono"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-2">
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">Expiry (MM/YY)</label>
                          <input
                            type="text"
                            value={cardExpiry}
                            onChange={(e) => handleExpiryChange(e.target.value)}
                            placeholder="08/28"
                            className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-2.5 py-2 text-xs text-white font-mono text-center focus:outline-none focus:border-highway-orange"
                          />
                        </div>
                        <div>
                          <label className="block text-[11px] text-gray-400 mb-1">CVV</label>
                          <input
                            type="password"
                            maxLength={4}
                            value={cardCvv}
                            onChange={(e) => setCardCvv(e.target.value.replace(/\D/g, ''))}
                            placeholder="•••"
                            className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-2.5 py-2 text-xs text-white font-mono text-center focus:outline-none focus:border-highway-orange"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center space-x-2 pt-1 text-[11px] text-gray-400">
                      <Lock className="w-3.5 h-3.5 text-highway-orange" />
                      <span>Tokenized under RBI Guidelines. We do not store raw card numbers.</span>
                    </div>
                  </div>
                )}

                {/* Sub-form 3: Net Banking Interactive Form */}
                {paymentMethod === 'NETBANKING' && (
                  <div className="bg-[#131618] border border-gray-800 rounded-2xl p-4 space-y-3">
                    <label className="block text-[11px] text-gray-400">Select Popular Indian Bank</label>
                    <div className="grid grid-cols-3 gap-2">
                      {[
                        { code: 'SBI', name: 'State Bank of India' },
                        { code: 'HDFC', name: 'HDFC Bank' },
                        { code: 'ICICI', name: 'ICICI Bank' },
                        { code: 'AXIS', name: 'Axis Bank' },
                        { code: 'PNB', name: 'Punjab National' },
                        { code: 'BOB', name: 'Bank of Baroda' },
                      ].map(bank => (
                        <button
                          key={bank.code}
                          type="button"
                          onClick={() => setSelectedBank(bank.code)}
                          className={`p-2.5 rounded-xl border text-center transition-all ${
                            selectedBank === bank.code
                              ? 'bg-highway-orange/20 border-highway-orange text-white font-bold'
                              : 'bg-[#1C2025] border-gray-800 text-gray-300 hover:border-gray-700'
                          }`}
                        >
                          <p className="text-xs font-black">{bank.code}</p>
                          <p className="text-[9px] text-gray-400 truncate">{bank.name}</p>
                        </button>
                      ))}
                    </div>

                    <div className="pt-2">
                      <label className="block text-[11px] text-gray-400 mb-1">Or choose from 50+ other Indian banks</label>
                      <select
                        value={selectedBank}
                        onChange={(e) => setSelectedBank(e.target.value)}
                        className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-highway-orange"
                      >
                        <option value="SBI">State Bank of India</option>
                        <option value="HDFC">HDFC Bank</option>
                        <option value="ICICI">ICICI Bank</option>
                        <option value="AXIS">Axis Bank</option>
                        <option value="KOTAK">Kotak Mahindra Bank</option>
                        <option value="CANARA">Canara Bank</option>
                        <option value="UNION">Union Bank of India</option>
                        <option value="INDUS">IndusInd Bank</option>
                        <option value="IDBI">IDBI Bank</option>
                      </select>
                    </div>
                  </div>
                )}

                {/* Sub-form 4: Corporate Fleet Interactive Form */}
                {paymentMethod === 'FLEET' && (
                  <div className="bg-[#131618] border border-gray-800 rounded-2xl p-4 space-y-3">
                    <div className="flex items-center justify-between">
                      <label className="text-[11px] text-gray-400">Select Registered Fleet Transport Account</label>
                      <span className="text-[10px] text-green-400 font-mono font-bold bg-green-500/20 px-2 py-0.5 rounded">
                        Transport B2B Active
                      </span>
                    </div>

                    <select
                      value={fleetCompany}
                      onChange={(e) => setFleetCompany(e.target.value)}
                      className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white focus:outline-none focus:border-highway-orange"
                    >
                      <option value="VRL Logistics Fleet Account (#VRL-88210)">VRL Logistics Fleet (#VRL-88210 • Bal: ₹24,800)</option>
                      <option value="Delhivery Commercial Fleet (#DLH-99214)">Delhivery Commercial Fleet (#DLH-99214 • Bal: ₹18,450)</option>
                      <option value="SafeXpress National Pass (#SFX-7719)">SafeXpress Logistics Pass (#SFX-7719 • Bal: ₹32,000)</option>
                      <option value="All-India Tourist Bus Drivers Association (#AIT-4401)">All-India Tourist Bus Assoc (#AIT-4401 • Bal: ₹9,200)</option>
                      <option value="TCI Freight Express Transport (#TCI-1102)">TCI Freight Express (#TCI-1102 • Bal: ₹15,750)</option>
                    </select>

                    <div className="grid grid-cols-2 gap-3 pt-1">
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Vehicle Reg Number</label>
                        <input
                          type="text"
                          value={vehicleRegNo}
                          onChange={(e) => setVehicleRegNo(e.target.value.toUpperCase())}
                          placeholder="e.g. GJ-01-AB-8824"
                          className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white font-mono uppercase focus:outline-none focus:border-highway-orange"
                        />
                      </div>
                      <div>
                        <label className="block text-[11px] text-gray-400 mb-1">Driver Fleet PIN</label>
                        <input
                          type="password"
                          maxLength={4}
                          value={fleetPin}
                          onChange={(e) => setFleetPin(e.target.value)}
                          placeholder="••••"
                          className="w-full bg-[#1C2025] border border-gray-700 rounded-xl px-3 py-2 text-xs text-white font-mono text-center focus:outline-none focus:border-highway-orange"
                        />
                      </div>
                    </div>

                    <div className="bg-highway-orange/10 border border-highway-orange/30 rounded-xl p-2.5 text-[11px] text-highway-orange flex items-center">
                      <Truck className="w-4 h-4 mr-2 flex-shrink-0" />
                      <span>Company direct invoicing enabled. No out-of-pocket cash required for verified fleet drivers.</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Status or Error Notifications */}
              {error && (
                <div className="p-3.5 bg-red-950/60 border border-red-600/40 rounded-xl text-xs text-red-300 flex items-center">
                  <AlertCircle className="w-4 h-4 mr-2 text-red-400 flex-shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              {/* Live Processing Indicator */}
              {isProcessing && (
                <div className="bg-[#121416] border border-highway-orange/50 p-4 rounded-2xl space-y-2">
                  <div className="flex items-center space-x-2 text-xs font-bold text-highway-orange">
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{processStep}</span>
                  </div>
                  <div className="w-full bg-gray-800 rounded-full h-1.5 overflow-hidden">
                    <div className="bg-highway-orange h-1.5 rounded-full animate-pulse w-3/4"></div>
                  </div>
                </div>
              )}

              {/* Confirm & Pay Button */}
              <button
                type="button"
                disabled={isProcessing}
                onClick={handlePayAndConfirm}
                className="w-full bg-gradient-to-r from-highway-orange to-orange-600 hover:from-orange-600 hover:to-orange-700 disabled:opacity-50 text-white font-black text-sm py-4 rounded-xl shadow-xl shadow-highway-orange/25 transition-all flex items-center justify-center space-x-2"
              >
                {isProcessing ? (
                  <span>AUTHORIZING PAYMENT & SECURING BED...</span>
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
                <div className="flex justify-between">
                  <span className="text-gray-400">Active Parking:</span>
                  <span className="text-green-400 font-medium">Guaranteed Free Parking Space</span>
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
                  <span>Convenience & Bed Sanitization:</span>
                  <span className="text-white font-mono">₹10</span>
                </div>
                <div className="border-t border-gray-700 pt-2 flex justify-between font-bold text-base text-white">
                  <span>Total Payable:</span>
                  <span className="text-road-yellow font-mono text-lg">₹{total}</span>
                </div>
              </div>

              {/* Shared room features */}
              <div className="bg-[#121416] p-3 rounded-xl border border-gray-800 space-y-1 text-[11px] text-gray-400">
                <p className="font-bold text-gray-300">Included With Every Bed:</p>
                <p>✓ 24x7 CCTV & Security Guard</p>
                <p>✓ Private Bed Luggage Locker</p>
                <p>✓ Bedside Charging Socket & Reading Lamp</p>
                <p>✓ Sanitized Bed Linen Kit</p>
              </div>

              <div className="pt-1 text-[11px] text-gray-500">
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
