'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle, Menu, X } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/constants';

const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 72;

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-50 bg-brand-bg-main/80 backdrop-blur-md border-b border-brand-border">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-6">
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-xl"
          aria-label="Buffalo Stays home"
        >
          <Image
            src="/logo.png"
            alt="Buffalo Stays logo"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            priority
            className="h-12 w-auto object-contain transition-all duration-300 ease-in-out group-hover:opacity-90"
          />
          <span className="hidden sm:flex flex-col leading-none text-brand-text-main select-none">
            <span className="text-2xl font-bold tracking-tight">Buffalo</span>
            <span className="text-lg font-semibold tracking-tight text-brand-text-main/90">Stays</span>
          </span>
        </Link>
        <nav className="flex gap-6 items-center text-sm font-medium">
          <Link href="/spaces" className="hidden lg:block hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-lg">The Spaces</Link>
          <Link href="/#experience" className="hidden lg:block hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-lg">Experience</Link>
          <Link href="/#amenities" className="hidden lg:block hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-lg">Amenities</Link>
          <Link href="/#how-it-works" className="hidden lg:block hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-lg">How It Works</Link>
          <Link
            href="/spaces"
            className="bg-brand-primary text-brand-bg-surface px-6 py-2.5 border border-brand-primary uppercase tracking-[0.1em] text-xs font-medium hover:bg-brand-primary-hover shadow-none transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary"
          >
            Book Now
          </Link>
          <button
            onClick={() => setIsOpen(true)}
            className="lg:hidden flex items-center justify-center p-2 -mr-2 text-brand-text-main hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg transition-colors"
            aria-expanded={isOpen}
            aria-label="Open main menu"
          >
            <Menu className="w-6 h-6" />
          </button>
        </nav>
      </div>

      {/* Mobile Drawer Backdrop */}
      <div
        className={`fixed inset-0 z-40 bg-black/45 backdrop-blur-sm transition-opacity duration-300 lg:hidden ${
          isOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={() => setIsOpen(false)}
      />

      {/* Mobile Drawer Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-50 w-full max-w-xs sm:max-w-sm bg-brand-bg-surface border-l border-brand-border p-6 shadow-2xl transition-transform duration-300 ease-out transform lg:hidden ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between pb-6 border-b border-brand-border">
          <Link
            href="/"
            onClick={() => setIsOpen(false)}
            className="flex items-center gap-2 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-xl"
            aria-label="Buffalo Stays home"
          >
            <Image
              src="/logo.png"
              alt="Buffalo Stays logo"
              width={LOGO_WIDTH}
              height={LOGO_HEIGHT}
              className="h-10 w-auto object-contain"
            />
          </Link>
          <button
            onClick={() => setIsOpen(false)}
            className="flex items-center justify-center p-2 -mr-2 text-brand-text-main hover:text-brand-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary rounded-lg transition-colors"
            aria-label="Close menu"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        <nav className="flex flex-col gap-5 py-8">
          <Link
            href="/spaces"
            onClick={() => setIsOpen(false)}
            className="text-base font-semibold text-brand-text-main hover:text-brand-primary transition-colors duration-200 py-1"
          >
            The Spaces
          </Link>
          <Link
            href="/#experience"
            onClick={() => setIsOpen(false)}
            className="text-base font-semibold text-brand-text-main hover:text-brand-primary transition-colors duration-200 py-1"
          >
            Experience
          </Link>
          <Link
            href="/#amenities"
            onClick={() => setIsOpen(false)}
            className="text-base font-semibold text-brand-text-main hover:text-brand-primary transition-colors duration-200 py-1"
          >
            Amenities
          </Link>
          <Link
            href="/#how-it-works"
            onClick={() => setIsOpen(false)}
            className="text-base font-semibold text-brand-text-main hover:text-brand-primary transition-colors duration-200 py-1"
          >
            How It Works
          </Link>
          <div className="pt-6 border-t border-brand-border mt-2">
            <Link
              href="/spaces"
              onClick={() => setIsOpen(false)}
              className="block w-full text-center bg-brand-primary text-brand-bg-surface py-3 border border-brand-primary uppercase tracking-[0.1em] text-xs font-semibold hover:bg-brand-primary-hover shadow-none transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary"
            >
              Book Now
            </Link>
          </div>
        </nav>
      </div>
    </header>
  );
}

export function Footer() {
  return (
    <footer className="px-6 lg:px-10 py-8 max-w-7xl mx-auto w-full flex flex-col md:flex-row gap-6 justify-between items-center text-xs opacity-90 font-medium pb-10">
      <div className="flex flex-col items-center md:items-start gap-3">
        <Link
          href="/"
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-xl"
          aria-label="Buffalo Stays home"
        >
          <Image
            src="/logo.png"
            alt="Buffalo Stays logo"
            width={LOGO_WIDTH}
            height={LOGO_HEIGHT}
            className="h-10 w-auto object-contain"
          />
        </Link>
        <p className="text-brand-text-main/75">&copy; {new Date().getFullYear()} Buffalo Stays. All rights reserved.</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 uppercase tracking-widest text-[10px] text-brand-text-main/60">
        <a href="#" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-md">Instagram</a>
        <Link href="/privacy" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-md">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-brand-primary hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main rounded-md">Terms of Service</Link>
      </div>
    </footer>
  );
}

export function WhatsAppFAB() {
  return (
    <a
      href={getWhatsAppLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-brand-primary text-white rounded-full shadow-lg shadow-brand-primary/20 hover:-translate-y-0.5 hover:scale-110 hover:brightness-110 transition-all duration-300 ease-in-out cursor-pointer group fab-breathe active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary focus-visible:ring-offset-2 focus-visible:ring-offset-brand-bg-main"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
      <span className="absolute right-full mr-4 bg-brand-primary text-brand-bg-surface text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap shadow-md border border-brand-primary">
        Chat
      </span>
    </a>
  );
}

export function WorkflowSection() {
  return (
    <section id="how-it-works" className="py-8 px-6 lg:px-10 scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <div className="bg-brand-text-main text-white rounded-3xl p-6 flex flex-col md:flex-row justify-around items-center gap-4 mt-2 shadow-lg">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <p className="font-bold whitespace-nowrap">Browse Spaces</p>
              <p className="text-xs opacity-70">Browse our premium, fully-serviced spaces.</p>
            </div>
          </div>
          
          <div className="hidden md:block w-8 h-px bg-white/20 shrink-0"></div>
          <div className="md:hidden w-px h-8 bg-white/20 shrink-0"></div>

          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <p className="font-bold whitespace-nowrap">Check Availability</p>
              <p className="text-xs opacity-70">Select stay duration and click &apos;Check Availability&apos;.</p>
            </div>
          </div>
          
          <div className="hidden md:block w-8 h-px bg-white/20 shrink-0"></div>
          <div className="md:hidden w-px h-8 bg-white/20 shrink-0"></div>

          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-brand-primary flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <p className="font-bold whitespace-nowrap">Digital Intake</p>
              <p className="text-xs opacity-70">Complete our quick Intake Ledger to lock in rates.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
