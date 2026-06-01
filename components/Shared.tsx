import Image from 'next/image';
import Link from 'next/link';
import { MessageCircle } from 'lucide-react';
import { getWhatsAppLink } from '@/lib/constants';

const LOGO_WIDTH = 240;
const LOGO_HEIGHT = 72;

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 bg-[#F9F7F3]/80 backdrop-blur-md border-b border-black/5">
      <div className="max-w-7xl mx-auto flex items-center justify-between px-6 lg:px-10 py-6">
        <Link
          href="/"
          className="group flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-xl"
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
          <span className="hidden sm:flex flex-col leading-none text-[#2D3142] select-none">
            <span className="text-2xl font-bold tracking-tight">Buffalo</span>
            <span className="text-lg font-semibold tracking-tight text-[#2D3142]/90">Stays</span>
          </span>
        </Link>
        <nav className="flex gap-6 items-center text-sm font-medium">
          <Link href="/spaces" className="hidden lg:block hover:text-[#E07A5F] hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-lg">The Spaces</Link>
          <Link href="/#experience" className="hidden lg:block hover:text-[#E07A5F] hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-lg">Experience</Link>
          <Link href="/#amenities" className="hidden lg:block hover:text-[#E07A5F] hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-lg">Amenities</Link>
          <Link href="/#how-it-works" className="hidden lg:block hover:text-[#E07A5F] hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-lg">How It Works</Link>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-[#E07A5F] text-white px-6 py-2.5 rounded-full font-bold shadow-lg shadow-[#E07A5F]/20 hover:bg-[#c96a50] hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg active:scale-95 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3]"
          >
            Book Now
          </a>
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
          className="focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-xl"
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
        <p className="text-[#2D3142]/75">&copy; {new Date().getFullYear()} Buffalo Stays. All rights reserved.</p>
      </div>
      <div className="flex flex-wrap items-center justify-center gap-6 uppercase tracking-widest text-[10px] text-[#2D3142]/60">
        <a href="#" className="hover:text-[#E07A5F] hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-md">Instagram</a>
        <Link href="/privacy" className="hover:text-[#E07A5F] hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-md">Privacy Policy</Link>
        <Link href="/terms" className="hover:text-[#E07A5F] hover:-translate-y-0.5 transition-all duration-300 ease-in-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] rounded-md">Terms of Service</Link>
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
      className="fixed bottom-8 right-8 z-50 flex items-center justify-center w-16 h-16 bg-[#25D366] text-white rounded-full shadow-2xl shadow-green-500/40 hover:-translate-y-0.5 hover:scale-110 hover:brightness-95 transition-all duration-300 ease-in-out cursor-pointer group fab-breathe active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#25D366] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3]"
      aria-label="Chat with us on WhatsApp"
    >
      <MessageCircle className="w-8 h-8 text-white" />
      <span className="absolute right-full mr-4 bg-[#2D3142] text-white text-xs font-bold uppercase tracking-widest px-4 py-2 rounded-xl opacity-0 group-hover:opacity-100 transition-all duration-300 ease-in-out pointer-events-none whitespace-nowrap shadow-lg">
        Chat
      </span>
    </a>
  );
}

export function WorkflowSection() {
  return (
    <section id="how-it-works" className="py-8 px-6 lg:px-10 scroll-mt-28">
      <div className="max-w-7xl mx-auto">
        <div className="bg-[#2D3142] text-white rounded-3xl p-6 flex flex-col md:flex-row justify-around items-center gap-4 mt-2 shadow-lg">
          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center font-bold shrink-0">1</div>
            <div>
              <p className="font-bold whitespace-nowrap">Browse Spaces</p>
              <p className="text-xs opacity-70">Find your favorite room</p>
            </div>
          </div>
          
          <div className="hidden md:block w-8 h-px bg-white/20 shrink-0"></div>
          <div className="md:hidden w-px h-8 bg-white/20 shrink-0"></div>

          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center font-bold shrink-0">2</div>
            <div>
              <p className="font-bold whitespace-nowrap">Chat on WhatsApp</p>
              <p className="text-xs opacity-70">Check dates in seconds</p>
            </div>
          </div>
          
          <div className="hidden md:block w-8 h-px bg-white/20 shrink-0"></div>
          <div className="md:hidden w-px h-8 bg-white/20 shrink-0"></div>

          <div className="flex gap-4 items-center">
            <div className="w-10 h-10 rounded-full bg-[#E07A5F] flex items-center justify-center font-bold shrink-0">3</div>
            <div>
              <p className="font-bold whitespace-nowrap">Enjoy Your Stay</p>
              <p className="text-xs opacity-70">Get check-in & enjoy</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
