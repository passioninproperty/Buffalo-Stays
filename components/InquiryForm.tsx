"use client";

import React, { useState, useEffect, useRef } from "react";
import { CheckCircle2, AlertCircle, Users, Plus, Minus, PawPrint, Calendar } from "lucide-react";
import { submitInquiry } from "@/app/actions/submitInquiry";

interface InquiryFormProps {
  spaceTitle: string;
}

export function InquiryForm({ spaceTitle }: InquiryFormProps) {
  // Client Contact Details
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [clientPhone, setClientPhone] = useState("");

  // Booking details
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [nights, setNights] = useState(0);

  // Guest count details
  const [countAdults, setCountAdults] = useState(1);
  const [countChildren, setCountChildren] = useState(0);
  const [countInfants, setCountInfants] = useState(0);
  const [isGuestPopoverOpen, setIsGuestPopoverOpen] = useState(false);

  // Pet option details
  const [hasPetsIncluded, setHasPetsIncluded] = useState(false);

  // Submission details
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const popoverRef = useRef<HTMLDivElement>(null);

  // Auto-compute stay duration in nights
  useEffect(() => {
    if (checkInDate && checkOutDate) {
      const start = new Date(checkInDate);
      const end = new Date(checkOutDate);
      const diffTime = end.getTime() - start.getTime();
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
      setNights(diffDays > 0 ? diffDays : 0);
    } else {
      setNights(0);
    }
  }, [checkInDate, checkOutDate]);

  // Handle click outside guest popover to close it
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (popoverRef.current && !popoverRef.current.contains(event.target as Node)) {
        setIsGuestPopoverOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleGuestIncrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults") setCountAdults((prev) => prev + 1);
    if (type === "children") setCountChildren((prev) => prev + 1);
    if (type === "infants") setCountInfants((prev) => prev + 1);
  };

  const handleGuestDecrement = (type: "adults" | "children" | "infants") => {
    if (type === "adults" && countAdults > 1) setCountAdults((prev) => prev - 1);
    if (type === "children" && countChildren > 0) setCountChildren((prev) => prev - 1);
    if (type === "infants" && countInfants > 0) setCountInfants((prev) => prev - 1);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError(null);

    if (nights <= 0) {
      setError("Please select a valid check-out date after your check-in date.");
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await submitInquiry({
        spaceTitle,
        clientName,
        clientEmail,
        clientPhone,
        checkInDate,
        checkOutDate,
        totalNightsDuration: `${nights} Nights`,
        countAdults,
        countChildren,
        countInfants,
        hasPetsIncluded,
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

  // Human-readable guest summary
  const guestSummary = `${countAdults} Adult${countAdults > 1 ? "s" : ""}${
    countChildren > 0 ? `, ${countChildren} Child${countChildren > 1 ? "ren" : ""}` : ""
  }${countInfants > 0 ? `, ${countInfants} Infant${countInfants > 1 ? "s" : ""}` : ""}`;

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

      {/* Guest contact details */}
      <div className="space-y-3">
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
            placeholder="Jane Doe"
            className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm px-3 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main placeholder-brand-text-muted/50 transition-colors"
          />
        </div>

        <div className="grid grid-cols-2 gap-3">
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
              placeholder="jane@company.com"
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
              placeholder="+44 7123 456789"
              className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm px-3 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main placeholder-brand-text-muted/50 transition-colors"
            />
          </div>
        </div>
      </div>

      {/* Date Picker Grid */}
      <div className="grid grid-cols-2 gap-3 border-t border-brand-border/40 pt-3">
        <div>
          <label htmlFor="checkInDate" className="text-[10px] uppercase tracking-widest font-bold text-brand-text-main/60 mb-1 block">
            Check-In
          </label>
          <div className="relative">
            <input
              id="checkInDate"
              type="date"
              required
              value={checkInDate}
              onChange={(e) => setCheckInDate(e.target.value)}
              className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm pl-3 pr-2 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main transition-colors select-none"
            />
          </div>
        </div>

        <div>
          <label htmlFor="checkOutDate" className="text-[10px] uppercase tracking-widest font-bold text-brand-text-main/60 mb-1 block">
            Check-Out
          </label>
          <div className="relative">
            <input
              id="checkOutDate"
              type="date"
              required
              value={checkOutDate}
              onChange={(e) => setCheckOutDate(e.target.value)}
              className="bg-brand-bg-surface border border-brand-border rounded-xl text-sm pl-3 pr-2 py-2.5 w-full focus:outline-none focus:border-brand-primary/30 text-brand-text-main transition-colors select-none"
            />
          </div>
        </div>
      </div>

      {/* Stay Duration Display */}
      {nights > 0 && (
        <div className="flex items-center gap-2 bg-brand-primary/5 text-brand-primary px-3.5 py-2.5 rounded-xl border border-brand-primary/10 text-xs font-semibold">
          <Calendar className="w-4 h-4" />
          <span>Calculated stay duration: <strong>{nights} Night{nights > 1 ? "s" : ""}</strong></span>
        </div>
      )}

      {/* Guest Allocation dropdown/popover */}
      <div className="relative" ref={popoverRef}>
        <label className="text-[10px] uppercase tracking-widest font-bold text-brand-text-main/60 mb-1 block">
          Guests
        </label>
        <button
          type="button"
          onClick={() => setIsGuestPopoverOpen((prev) => !prev)}
          className="flex items-center justify-between bg-brand-bg-surface border border-brand-border rounded-xl text-sm px-3.5 py-2.5 w-full text-left focus:outline-none focus:border-brand-primary/30 text-brand-text-main transition-colors cursor-pointer"
        >
          <span className="flex items-center gap-2 truncate font-medium">
            <Users className="w-4 h-4 text-brand-primary shrink-0" />
            {guestSummary}
          </span>
          <svg className={`fill-current h-4 w-4 text-brand-text-main/50 transition-transform duration-200 ${isGuestPopoverOpen ? "rotate-180" : ""}`} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
          </svg>
        </button>

        {isGuestPopoverOpen && (
          <div className="absolute left-0 right-0 z-30 mt-2 bg-white border border-brand-border rounded-2xl shadow-xl p-4 space-y-4">
            {/* Adults Counter */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-brand-text-main">Adults</p>
                <p className="text-[10px] text-brand-text-main/50">Age 13+</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleGuestDecrement("adults")}
                  disabled={countAdults <= 1}
                  className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-text-main/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-5 text-center text-sm font-bold text-brand-text-main">{countAdults}</span>
                <button
                  type="button"
                  onClick={() => handleGuestIncrement("adults")}
                  className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-text-main/70 hover:bg-neutral-50 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Children Counter */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-brand-text-main">Children</p>
                <p className="text-[10px] text-brand-text-main/50">Ages 2–12</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleGuestDecrement("children")}
                  disabled={countChildren <= 0}
                  className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-text-main/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-5 text-center text-sm font-bold text-brand-text-main">{countChildren}</span>
                <button
                  type="button"
                  onClick={() => handleGuestIncrement("children")}
                  className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-text-main/70 hover:bg-neutral-50 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>

            {/* Infants Counter */}
            <div className="flex items-center justify-between">
              <div>
                <p className="text-xs font-bold text-brand-text-main">Infants</p>
                <p className="text-[10px] text-brand-text-main/50">Under 2</p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => handleGuestDecrement("infants")}
                  disabled={countInfants <= 0}
                  className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-text-main/70 disabled:opacity-30 disabled:cursor-not-allowed hover:bg-neutral-50 transition cursor-pointer"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
                <span className="w-5 text-center text-sm font-bold text-brand-text-main">{countInfants}</span>
                <button
                  type="button"
                  onClick={() => handleGuestIncrement("infants")}
                  className="w-8 h-8 rounded-full border border-brand-border flex items-center justify-center text-brand-text-main/70 hover:bg-neutral-50 transition cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Pet verification toggle switch */}
      <div className="flex items-center justify-between border-y border-brand-border/40 py-3.5">
        <div className="flex items-center gap-2">
          <PawPrint className="w-4 h-4 text-brand-primary" />
          <div>
            <span className="text-xs font-bold text-brand-text-main block">Traveling with pets?</span>
            <span className="text-[10px] text-brand-text-main/50 block">Requires animal accommodation fee</span>
          </div>
        </div>
        <button
          type="button"
          onClick={() => setHasPetsIncluded((prev) => !prev)}
          className={`relative inline-flex h-6 w-11 shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none ${
            hasPetsIncluded ? "bg-brand-primary" : "bg-neutral-200"
          }`}
          role="switch"
          aria-checked={hasPetsIncluded}
        >
          <span
            className={`pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out ${
              hasPetsIncluded ? "translate-x-5" : "translate-x-0"
            }`}
          />
        </button>
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
