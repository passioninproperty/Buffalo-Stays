"use client";

import React, { useState } from "react";
import { CheckCircle2, AlertCircle } from "lucide-react";
import { submitInquiry } from "@/app/actions/submitInquiry";

interface InquiryFormProps {
  spaceTitle: string;
}

export function InquiryForm({ spaceTitle }: InquiryFormProps) {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");
  const [targetStartDate, setTargetStartDate] = useState("");
  const [stayDuration, setStayDuration] = useState("1-3 Months");

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      const response = await submitInquiry({
        spaceTitle,
        clientName,
        clientEmail,
        clientPhone,
        targetStartDate,
        stayDuration,
      });

      if (response.success) {
        setIsSettled(true);
      } else {
        setError(response.error || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Failed to connect to inquiry service. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSettled) {
    return (
      <div className="bg-emerald-500/10 border border-emerald-500/20 text-emerald-950 p-6 rounded-2xl text-center flex flex-col items-center justify-center gap-3 animate-fade-in">
        <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-600">
          <CheckCircle2 className="w-6 h-6 animate-pulse" />
        </div>
        <h3 className="font-serif text-lg font-bold text-emerald-900">Inquiry Sent!</h3>
        <p className="text-xs text-emerald-950/80 leading-relaxed">
          Our corporate housing team will reach out to you within 24 hours.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      {error && (
        <div className="bg-rose-500/10 border border-rose-500/20 text-rose-900 p-3 rounded-xl flex items-start gap-2.5 text-xs">
          <AlertCircle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
          <span>{error}</span>
        </div>
      )}

      <div>
        <label htmlFor="clientName" className="text-[10px] uppercase tracking-widest font-bold text-brand-text-main/60 mb-1 block">
          Full Name
        </label>
        <input
          id="clientName"
          type="text"
          required
          value={clientName}
          onChange={(e) => setClientName(e.target.value)}
          placeholder="e.g. Jane Doe"
          className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm px-3 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main placeholder-brand-text-muted/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="clientEmail" className="text-[10px] uppercase tracking-widest font-bold text-brand-text-main/60 mb-1 block">
          Email Address
        </label>
        <input
          id="clientEmail"
          type="email"
          required
          value={clientEmail}
          onChange={(e) => setClientEmail(e.target.value)}
          placeholder="e.g. jane@company.com"
          className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm px-3 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main placeholder-brand-text-muted/50 transition-colors"
        />
      </div>

      <div>
        <label htmlFor="clientPhone" className="text-[10px] uppercase tracking-widest font-bold text-brand-text-main/60 mb-1 block">
          Phone Number
        </label>
        <input
          id="clientPhone"
          type="tel"
          required
          value={clientPhone}
          onChange={(e) => setClientPhone(e.target.value)}
          placeholder="e.g. +44 7123 456789"
          className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm px-3 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main placeholder-brand-text-muted/50 transition-colors"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <label htmlFor="targetStartDate" className="text-[10px] uppercase tracking-widest font-bold text-brand-text-main/60 mb-1 block">
            Move-in Date
          </label>
          <input
            id="targetStartDate"
            type="date"
            required
            value={targetStartDate}
            onChange={(e) => setTargetStartDate(e.target.value)}
            className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm px-3 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main transition-colors"
          />
        </div>

        <div>
          <label htmlFor="stayDuration" className="text-[10px] uppercase tracking-widest font-bold text-brand-text-main/60 mb-1 block">
            Duration
          </label>
          <div className="relative">
            <select
              id="stayDuration"
              required
              value={stayDuration}
              onChange={(e) => setStayDuration(e.target.value)}
              className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm px-3 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main transition-colors cursor-pointer appearance-none"
            >
              <option value="1-3 Months">1-3 Months</option>
              <option value="3-6 Months">3-6 Months</option>
              <option value="6-12 Months">6-12 Months</option>
              <option value="12+ Months">12+ Months</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-brand-text-main/50">
              <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
              </svg>
            </div>
          </div>
        </div>
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full mt-2 py-4 text-center text-xs tracking-[0.15em] uppercase bg-brand-primary text-brand-bg-surface hover:bg-brand-primary-hover disabled:bg-brand-primary/50 disabled:cursor-not-allowed border border-brand-primary font-bold shadow-md transition-all duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 cursor-pointer"
      >
        {isSubmitting ? "Sending Inquiry..." : "Check Availability"}
      </button>

      <div className="mt-4 text-center text-xs text-brand-text-main/50 font-medium leading-relaxed">
        <p className="mb-1">No payment required today</p>
        <p>Your inquiry is 100% free and secure</p>
      </div>
    </form>
  );
}
