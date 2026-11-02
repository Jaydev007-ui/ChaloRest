'use client';

import React, { useState } from 'react';
import { PhoneCall, Mail, MapPin, Clock, CheckCircle2, ShieldCheck } from 'lucide-react';

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10">
      <div className="text-center space-y-3">
        <span className="bg-highway-orange text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
          24/7 HIGHWAY SUPPORT
        </span>
        <h1 className="text-3xl sm:text-4xl font-black text-white">Contact ChaloRest</h1>
        <p className="text-xs sm:text-sm text-gray-400 max-w-lg mx-auto">
          Need immediate roadside rest assistance, partner onboarding support, or corporate fleet accounts? We are here 24 hours a day.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-[#181B1F] border border-gray-800 p-6 rounded-3xl space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-highway-orange/15 text-highway-orange flex items-center justify-center mx-auto mb-3">
            <PhoneCall className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base">Toll-Free Helpline</h4>
          <p className="text-xs text-gray-400">Available 24/7 across India</p>
          <p className="text-base font-black text-road-yellow font-mono pt-1">1800-CHALO-REST</p>
        </div>

        <div className="bg-[#181B1F] border border-gray-800 p-6 rounded-3xl space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-green-500/15 text-green-400 flex items-center justify-center mx-auto mb-3">
            <Mail className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base">Email Support</h4>
          <p className="text-xs text-gray-400">Driver & Partner inquiries</p>
          <p className="text-xs font-bold text-white font-mono pt-1">support@chalorest.in</p>
        </div>

        <div className="bg-[#181B1F] border border-gray-800 p-6 rounded-3xl space-y-2 text-center">
          <div className="w-12 h-12 rounded-2xl bg-blue-500/15 text-blue-400 flex items-center justify-center mx-auto mb-3">
            <MapPin className="w-6 h-6" />
          </div>
          <h4 className="font-bold text-white text-base">Headquarters</h4>
          <p className="text-xs text-gray-400">Ahmedabad - Mumbai Corridor</p>
          <p className="text-xs font-bold text-gray-300 pt-1">SG Highway, Ahmedabad, India</p>
        </div>
      </div>

      {/* Message Form */}
      <div className="bg-[#181B1F] border border-[#2B3037] rounded-3xl p-6 sm:p-10 shadow-xl space-y-4 max-w-2xl mx-auto">
        <h3 className="text-lg font-black text-white">Send Us A Highway Query</h3>

        {submitted ? (
          <div className="p-6 bg-green-950/60 border border-green-500/40 rounded-2xl text-center space-y-2">
            <CheckCircle2 className="w-8 h-8 text-green-400 mx-auto" />
            <p className="font-bold text-white text-sm">Message Received</p>
            <p className="text-xs text-gray-300">Our highway dispatch will respond to your mobile within 30 minutes.</p>
          </div>
        ) : (
          <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-3">
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Your Name</label>
              <input
                type="text"
                required
                placeholder="Ramesh Patel"
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Mobile Number</label>
              <input
                type="tel"
                required
                placeholder="+91 98000 00000"
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white"
              />
            </div>
            <div>
              <label className="block text-xs font-bold text-gray-400 mb-1">Highway / Inquiry Topic</label>
              <textarea
                required
                rows={3}
                placeholder="Tell us your rest stop question, route request, or partner feedback..."
                className="w-full bg-[#202429] border border-gray-700 rounded-xl px-3.5 py-2 text-xs text-white"
              ></textarea>
            </div>
            <button
              type="submit"
              className="w-full bg-highway-orange hover:bg-highway-orange-hover text-white font-black text-xs py-3 rounded-xl shadow-lg transition-all"
            >
              SEND MESSAGE TO DISPATCH
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
