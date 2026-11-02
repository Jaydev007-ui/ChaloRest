import React from 'react';
import Link from 'next/link';
import { PhoneCall, HelpCircle, ArrowRight } from 'lucide-react';

export default function FAQPage() {
  const faqs = [
    {
      q: 'What is ChaloRest and how does it differ from a standard highway hotel?',
      a: 'ChaloRest is India’s first dedicated hourly highway rest marketplace. Ordinary hotels charge for full 24-hour cycles (₹2,000–₹3,500) and take 15–20 minutes to register guests. ChaloRest partners with top highway motels to convert dedicated rooms into 4-bed and 8-bed air-conditioned shared rooms. You book individual beds and pay strictly for the hours you need (from ₹30 to ₹50/hour) with 10-second digital QR check-in.',
    },
    {
      q: 'Can I extend my rest period if I am still exhausted?',
      a: 'Yes, seamlessly. From your dashboard, tap "Extend My Stay" and pick 1, 2, or 4 additional hours. The system checks bed inventory to ensure no conflicts and immediately updates your scheduled check-out.',
    },
    {
      q: 'Is it safe for commercial truck drivers with valuable cargo?',
      a: 'All ChaloRest properties marked with the "Truck Parking" badge offer heavy-vehicle parking spaces (20 to 75 multi-axle trailer bays), high-mast floodlights, continuous CCTV cameras, and 24/7 security guards.',
    },
    {
      q: 'Are bedsheets and pillows sanitized for every single customer?',
      a: 'Absolutely. We enforce an uncompromising hygiene protocol: clean, washed bedsheets, fresh pillow covers, and mattress sanitization after every guest check-out.',
    },
    {
      q: 'Do you offer separate male, female, or family rooms?',
      a: 'Yes. Every property page displays room gender categorization: Male-Only dormitories, Female-Dedicated chambers, and Family Private Rooms.',
    },
    {
      q: 'What payment modes are accepted?',
      a: 'We support all major Indian payment gateways: UPI (Google Pay, PhonePe, Paytm, BHIM), RuPay, Visa, Mastercard, Net Banking, and Corporate Transport Fleet billing.',
    },
    {
      q: 'How does the 10-second QR FastPass work?',
      a: 'Upon booking confirmation, your phone displays a digital QR pass. When you reach the property, hotel staff scans your QR with their staff tool, confirms your bed number, and hands you your resting key/bunk card.',
    },
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="bg-road-yellow text-black text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          KNOWLEDGE BASE
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">
          Frequently Asked Questions
        </h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
          Everything you need to know about hourly bed booking, vehicle safety, hygiene protocols, and check-in.
        </p>
      </div>

      <div className="space-y-4">
        {faqs.map((f, i) => (
          <details
            key={i}
            className="bg-[#181B1F] border border-[#2B3037] rounded-2xl p-5 text-xs group"
          >
            <summary className="font-bold text-white text-sm sm:text-base cursor-pointer list-none flex items-center justify-between">
              <span>{f.q}</span>
              <span className="text-highway-orange font-bold text-lg group-open:rotate-45 transition-transform">
                +
              </span>
            </summary>
            <p className="text-gray-300 mt-3 pt-3 border-t border-[#25292E] leading-relaxed text-xs sm:text-sm">
              {f.a}
            </p>
          </details>
        ))}
      </div>

      <div className="bg-[#181B1F] border border-gray-800 rounded-3xl p-6 text-center space-y-3">
        <h3 className="text-base font-black text-white">Still Have Questions on the Road?</h3>
        <p className="text-xs text-gray-400">Our highway helpline dispatchers are available 24 hours a day, 365 days a year.</p>
        <a
          href="tel:1800242567"
          className="bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs px-6 py-3 rounded-xl shadow-lg inline-flex items-center"
        >
          <PhoneCall className="w-4 h-4 mr-2" />
          <span>Call Toll-Free: 1800-CHALO-REST</span>
        </a>
      </div>
    </div>
  );
}
