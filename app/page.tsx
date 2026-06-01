import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { MessageCircle, CheckCircle2, Home as HomeIcon, Wifi, DollarSign, Calendar, Users, HeartHandshake, Utensils, WashingMachine, Star, Lock, Sparkles } from 'lucide-react';
import { getWhatsAppLink, SPACES_DATA, WHATSAPP_MESSAGES } from '@/lib/constants';
import { WorkflowSection } from '@/components/Shared';
import { FAQAccordion } from '@/components/FAQAccordion';

type AudienceIconKey = 'home' | 'users' | 'wifi' | 'support';
type AmenityIconKey = 'home' | 'kitchen' | 'wifi' | 'laundry' | 'sparkles' | 'dollar' | 'storage' | 'lock' | 'chat';

type AudienceItem = {
  title: string;
  desc: string;
  iconKey: AudienceIconKey;
};

type AmenityItem = {
  title: string;
  iconKey: AmenityIconKey;
};

const DRIVEN_STAYS_TARGET_GROUPS: AudienceItem[] = [
  {
    title: 'Contractors & Site Workers',
    desc: 'Spacious, relaxing environments focused on recovery and rest after long shifts. Fast Wi-Fi and laundry included.',
    iconKey: 'home',
  },
  {
    title: 'Relocators & New Arrivals',
    desc: 'A seamless landing pad. Fully furnished homes with all bills integrated, reducing the stress of moving cities.',
    iconKey: 'users',
  },
  {
    title: 'Working Professionals',
    desc: 'Dedicated work zones, enterprise-grade internet, and quiet spaces designed for uninterrupted deep work and meetings.',
    iconKey: 'wifi',
  },
  {
    title: 'Families & Long-Term Guests',
    desc: 'Kid-friendly setups, multiple bedrooms, full kitchens, and plenty of space to spread out for extended periods.',
    iconKey: 'support',
  },
];

const FULLY_EQUIPPED_AMENITIES: AmenityItem[] = [
  { iconKey: 'home', title: 'Fully Furnished Rooms' },
  { iconKey: 'kitchen', title: 'Equipped Kitchen' },
  { iconKey: 'wifi', title: 'High-Speed Wi-Fi' },
  { iconKey: 'laundry', title: 'Laundry Access' },
  { iconKey: 'sparkles', title: 'Weekly Housekeeping' },
  { iconKey: 'dollar', title: 'All Bills Included' },
  { iconKey: 'storage', title: 'Dedicated Storage' },
  { iconKey: 'lock', title: 'Secure Private Access' },
  { iconKey: 'chat', title: '24/7 WhatsApp Support' },
];

const FEATURED_SPACES = SPACES_DATA.slice(0, 3);

const AUDIENCE_ICON_MAP: Record<AudienceIconKey, ReactElement> = {
  home: <HomeIcon className="w-6 h-6 text-[#E07A5F]" />,
  users: <Users className="w-6 h-6 text-[#E07A5F]" />,
  wifi: <Wifi className="w-6 h-6 text-[#E07A5F]" />,
  support: <HeartHandshake className="w-6 h-6 text-[#E07A5F]" />,
};

const AMENITY_ICON_MAP: Record<AmenityIconKey, ReactElement> = {
  home: <HomeIcon className="w-6 h-6" />,
  kitchen: <Utensils className="w-6 h-6" />,
  wifi: <Wifi className="w-6 h-6" />,
  laundry: <WashingMachine className="w-6 h-6" />,
  sparkles: <Sparkles className="w-6 h-6" />,
  dollar: <DollarSign className="w-6 h-6" />,
  storage: <HomeIcon className="w-6 h-6" />,
  lock: <Lock className="w-6 h-6" />,
  chat: <MessageCircle className="w-6 h-6" />,
};

export default function Home() {
  return (
    <>
      <HeroSection />
      <StatsBanner />
      <TargetAudienceSection />
      <NarrativeSection />
      <AmenitiesGrid />
      <DesignedForStaysSection />
      <SpacesPreview />
      <FAQSection />
      <WorkflowSection />
    </>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-20 px-6 lg:px-10 scroll-mt-28">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-[#2D3142]/70 max-w-xl mx-auto">Everything you need to know about your extended stay with Buffalo Stays.</p>
        </div>
        <FAQAccordion />
      </div>
    </section>
  );
}

function HeroSection() {
  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center min-h-[550px] px-6 lg:px-10 py-12">
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="text-5xl lg:text-7xl font-bold leading-[1.1] text-[#2D3142]">
          Your cozy home,<br/><span className="text-[#E07A5F]">away from home.</span>
        </h1>
        <p className="text-lg text-[#2D3142]/70 max-w-lg leading-relaxed">
          Discover our curated selection of warm, modern spaces designed for comfort, creativity, and extended stays that feel truly authentic.
        </p>
        <div>
          <a
            href={getWhatsAppLink()}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-[#E07A5F] hover:bg-[#c96a50] text-white px-8 py-4 rounded-full font-bold shadow-xl shadow-[#E07A5F]/30 transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:scale-[1.02] hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3] text-lg"
          >
            <span>Inquire via WhatsApp</span>
            <MessageCircle className="w-5 h-5" />
          </a>
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-[450px] bg-[#E9E4DB] rounded-[2.5rem] shadow-2xl border-4 border-white overflow-hidden relative">
        <Image 
          src="https://picsum.photos/seed/buffalo-hero-longstay/800/600"
          alt="Sunlit Buffalo Stays living space with warm tones, soft textiles, and modern furnishings for long-term comfort"
          fill
          className="object-cover object-center"
          referrerPolicy="no-referrer"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#2D3142]/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 p-5 bg-white/95 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-lg border border-white/50">
          <div>
            <p className="text-xs font-bold text-[#E07A5F] uppercase tracking-widest mb-1">Featured</p>
            <p className="font-bold text-[#2D3142] text-lg">The Rust Studio</p>
          </div>
          <div className="flex -space-x-3">
             <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-200"></div>
             <div className="w-10 h-10 rounded-full border-2 border-white bg-slate-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section className="px-6 lg:px-10 pb-16">
      <div className="max-w-7xl mx-auto bg-white rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm border border-black/5">
        <div className="flex flex-col items-center text-center">
          <Calendar className="w-10 h-10 text-[#E07A5F] mb-3 opacity-90" />
          <h4 className="text-xl font-bold">30+ Days</h4>
          <p className="text-sm font-medium text-[#2D3142]/60">Minimum Stay</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-[#2D3142]/10 rounded-full"></div>
        <div className="flex flex-col items-center text-center">
          <Users className="w-10 h-10 text-[#E07A5F] mb-3 opacity-90" />
          <h4 className="text-xl font-bold">4 Guest Types</h4>
          <p className="text-sm font-medium text-[#2D3142]/60">Served Across Properties</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-[#2D3142]/10 rounded-full"></div>
        <div className="flex flex-col items-center text-center">
          <HeartHandshake className="w-10 h-10 text-[#E07A5F] mb-3 opacity-90" />
          <h4 className="text-xl font-bold">24/7 Support</h4>
          <p className="text-sm font-medium text-[#2D3142]/60">Via WhatsApp</p>
        </div>
      </div>
    </section>
  );
}

function TargetAudienceSection() {
  return (
    <section className="py-16 bg-[#F3EFE9] px-6 lg:px-10 rounded-[3rem] mx-4 lg:mx-10 my-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">The perfect fit for <span className="text-[#E07A5F]">driven stays.</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DRIVEN_STAYS_TARGET_GROUPS.map((audience) => (
            <div key={audience.title} className="bg-white p-8 rounded-3xl shadow-sm border border-transparent hover:border-[#E07A5F]/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col items-start gap-4">
              <div className="p-3 bg-[#E07A5F]/10 rounded-2xl">
                {AUDIENCE_ICON_MAP[audience.iconKey]}
              </div>
              <h3 className="font-bold text-lg leading-tight">{audience.title}</h3>
              <p className="text-[#2D3142]/70 text-sm leading-relaxed">{audience.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function NarrativeSection() {
  const pillars = [
    { num: "01", title: "Fully Furnished", desc: "Move in immediately with premium furniture, comfortable beds, and stylish decor—no heavy lifting required." },
    { num: "02", title: "Bills Included", desc: "Water, electricity, heating, and internet are fully covered. One predictable cost for your entire stay." },
    { num: "03", title: "Professionally Managed", desc: "Our dedicated team ensures clean lines, regular maintenance, and swift support whenever you need it." },
    { num: "04", title: "Stay Longer, Save More", desc: "Designed for longevity. Enjoy favorable monthly rates and discounts tailored specifically for minimum 30-day stays." },
  ];

  return (
    <section id="experience" className="py-20 px-6 lg:px-10 scroll-mt-28">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16 items-center">
        <div className="w-full lg:w-1/2 relative">
          <div className="relative w-full aspect-[4/5] rounded-[2.5rem] shadow-2xl overflow-hidden">
            <Image 
              src="https://picsum.photos/seed/buffalo-narrative/800/1000"
              alt="Elegant long-stay suite with neutral decor, plush bedding, and a restful atmosphere"
              fill
              className="object-cover"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-[#E07A5F] text-white p-6 rounded-3xl shadow-xl shadow-[#E07A5F]/30">
            <div className="flex items-center gap-3">
              <Star className="w-8 h-8 fill-white" />
              <div>
                <p className="font-bold text-lg leading-tight">Long Stay</p>
                <p className="text-sm font-medium opacity-90 uppercase tracking-widest">Specialists</p>
              </div>
            </div>
          </div>
        </div>
        <div className="w-full lg:w-1/2">
          <h2 className="text-4xl lg:text-5xl font-bold mb-10 leading-tight">More than just <br/>a room.</h2>
          <div className="space-y-8">
            {pillars.map(pillar => (
              <div key={pillar.num} className="flex gap-6 items-start group">
                <span className="text-3xl font-bold text-[#2D3142]/20 group-hover:text-[#E07A5F] transition-all duration-300 ease-in-out">{pillar.num}</span>
                <div>
                  <h3 className="text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-[#2D3142]/70 text-base leading-relaxed max-w-md">{pillar.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function AmenitiesGrid() {
  return (
    <section id="amenities" className="py-20 px-6 lg:px-10 bg-white scroll-mt-28">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="text-3xl lg:text-5xl font-bold mb-16 text-center max-w-xl">Every stay comes <span className="text-[#E07A5F]">fully equipped.</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {FULLY_EQUIPPED_AMENITIES.map((item) => (
            <div key={item.title} className="bg-[#F9F7F3] p-8 rounded-3xl flex flex-col items-center text-center gap-4 shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
              <div className="w-14 h-14 bg-white rounded-full flex items-center justify-center text-[#E07A5F] shadow-md mb-2">
                {AMENITY_ICON_MAP[item.iconKey]}
              </div>
              <h4 className="font-bold text-lg px-4">{item.title}</h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

function DesignedForStaysSection() {
  const checks = [
    "Flexible rolling contracts tailored to your schedule",
    "Boutique workspaces designed for remote productivity",
    "Smart access control with keyless entry systems",
    "Curated neighborhood guides highlighting local gems",
    "Welcome hamper with fresh coffee, snacks, and essentials",
    "Direct communication channel to your dedicated host"
  ];

  return (
    <section className="py-24 px-6 lg:px-10 overflow-hidden">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
        <div className="w-full lg:w-5/12 flex flex-col gap-8">
          <h2 className="text-4xl lg:text-5xl font-bold leading-[1.1]">Designed for stays <br/><span className="text-[#E07A5F] border-b-4 border-[#E07A5F]/30 pb-1">that last.</span></h2>
          <p className="text-lg text-[#2D3142]/70 mb-2">We obsess over the details that transform a short-term rental into a genuine living space.</p>
          <ul className="space-y-5">
            {checks.map((text, i) => (
              <li key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-[#E07A5F] shrink-0 mt-0.5" />
                <span className="font-medium text-[#2D3142]/90 text-lg leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-7/12 relative h-[550px] lg:h-[700px] flex justify-center items-center">
           <div className="absolute top-0 right-0 w-3/4 h-[60%] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 z-10 border-8 border-white">
              <Image src="https://picsum.photos/seed/buffalo-collage1/600/400" alt="Open-plan Buffalo Stays lounge with natural light and warm contemporary styling" fill className="object-cover" referrerPolicy="no-referrer" />
           </div>
           <div className="absolute bottom-0 left-0 w-2/3 h-[50%] rounded-[3rem] overflow-hidden shadow-2xl -rotate-6 z-20 border-8 border-white">
              <Image src="https://picsum.photos/seed/buffalo-collage2/600/400" alt="Cozy Buffalo Stays bedroom with layered bedding and calming earth-tone palette" fill className="object-cover" referrerPolicy="no-referrer" />
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden shadow-2xl z-30 border-8 border-white">
              <Image src="https://picsum.photos/seed/buffalo-collage3/400/400" alt="Detail shot of curated decor and textures that define Buffalo Stays' premium hospitality feel" fill className="object-cover" referrerPolicy="no-referrer" />
           </div>
        </div>
      </div>
    </section>
  );
}

function SpacesPreview() {
  return (
    <section className="py-20 px-6 lg:px-10 bg-white rounded-[3rem] mx-4 lg:mx-10 my-10 shadow-sm border border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="text-3xl lg:text-4xl font-bold">Featured Spaces</h2>
          <Link href="/spaces" className="px-6 py-3 bg-[#F9F7F3] shadow-sm rounded-full text-base font-bold text-[#2D3142] hover:bg-[#E07A5F] hover:text-white hover:-translate-y-0.5 transition-all duration-300 ease-in-out border border-black/5 active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3]">
            View all properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {FEATURED_SPACES.map((space) => (
            <div key={space.id} className="bg-white p-5 rounded-3xl shadow-lg border border-black/5 flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
              <div className="relative w-full h-56 bg-slate-200 rounded-2xl mb-6 overflow-hidden">
                <Image 
                  src={space.image}
                  alt={`${space.title} at Buffalo Stays featuring ${space.amenities.join(', ')} and a welcoming modern interior for extended stays`}
                  fill
                  className="object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
                  referrerPolicy="no-referrer"
                />
              </div>
              <h3 className="font-bold text-xl mb-3 px-2">{space.title}</h3>
              <div className="flex flex-wrap gap-2 mb-5 px-2">
                {space.amenities.map(amenity => (
                  <span key={amenity} className="text-xs px-3 py-1.5 bg-[#F9F7F3] rounded-full font-bold uppercase tracking-wider text-[#2D3142]/80 shadow-sm">
                    {amenity}
                  </span>
                ))}
              </div>
              <a
                href={getWhatsAppLink(WHATSAPP_MESSAGES.spaceInquiry(space.title))}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full mt-auto py-3.5 text-center text-sm bg-transparent border-2 border-[#E07A5F]/20 text-[#2D3142] hover:bg-[#E07A5F] hover:border-[#E07A5F] hover:text-white rounded-full font-bold transition-all duration-300 ease-in-out hover:-translate-y-0.5 hover:shadow-lg active:scale-95 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#E07A5F] focus-visible:ring-offset-2 focus-visible:ring-offset-[#F9F7F3]"
              >
                Check Availability
              </a>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
