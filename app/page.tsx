import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import type { ReactElement } from 'react';
import { MessageCircle, CheckCircle2, Home as HomeIcon, Wifi, DollarSign, Calendar, Users, HeartHandshake, Utensils, WashingMachine, Star, Lock, Sparkles } from 'lucide-react';
import { WHATSAPP_NUMBER } from '@/lib/constants';
import { WorkflowSection } from '@/components/Shared';
import { FAQAccordion } from '@/components/FAQAccordion';
import { SITE_DESCRIPTION, SITE_IMAGE, SITE_NAME, getAbsoluteUrl } from '@/lib/site';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';

interface Property {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  pricePerNight?: number;
  tags?: string[];
  gallery?: Array<{
    image?: {
      asset?: {
        _ref?: string;
        _type?: string;
      };
    };
    isFeatured?: boolean;
    photoTag?: string;
    asset?: {
      _ref?: string;
    };
    label?: string;
  }>;
  isFeatured?: boolean;
  availabilityStatus?: string;
  summaryText?: string;
  amenitiesBathroom?: string[];
  amenitiesBedroomLaundry?: string[];
  amenitiesInternetOffice?: string[];
}

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

const AUDIENCE_ICON_MAP: Record<AudienceIconKey, ReactElement> = {
  home: <HomeIcon className="w-6 h-6 text-brand-primary" />,
  users: <Users className="w-6 h-6 text-brand-primary" />,
  wifi: <Wifi className="w-6 h-6 text-brand-primary" />,
  support: <HeartHandshake className="w-6 h-6 text-brand-primary" />,
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

export const metadata: Metadata = {
  title: 'Extended Stay Homes in Buffalo',
  description: SITE_DESCRIPTION,
  alternates: {
    canonical: '/',
  },
  openGraph: {
    title: `${SITE_NAME} | Extended Stay Homes in Buffalo`,
    description: SITE_DESCRIPTION,
    url: getAbsoluteUrl('/'),
    images: [
      {
        url: SITE_IMAGE,
        width: 512,
        height: 512,
        alt: `${SITE_NAME} logo`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: `${SITE_NAME} | Extended Stay Homes in Buffalo`,
    description: SITE_DESCRIPTION,
    images: [SITE_IMAGE],
  },
};

export default async function Home() {
  const query = `*[_type == "property"] {
    _id,
    title,
    "slug": slug.current,
    location,
    pricePerNight,
    tags,
    gallery,
    isFeatured,
    availabilityStatus,
    summaryText,
    amenitiesBathroom,
    amenitiesBedroomLaundry,
    amenitiesInternetOffice
  }`;

  let properties: Property[] = [];
  try {
    properties = await client.fetch<Property[]>(query, {}, { next: { revalidate: 60 } });
  } catch (error) {
    console.error('Failed to fetch properties from Sanity for home page:', error);
  }

  // Find the featured property, default to the first one if not set
  const featuredProperty = properties.find((p) => p.isFeatured) || properties[0] || null;

  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'LodgingBusiness',
    name: SITE_NAME,
    url: getAbsoluteUrl('/'),
    image: getAbsoluteUrl(SITE_IMAGE),
    description: SITE_DESCRIPTION,
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Buffalo',
      addressRegion: 'NY',
      addressCountry: 'US',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 42.8864,
      longitude: -78.8784,
    },
    priceRange: '$$',
    telephone: `+1-${WHATSAPP_NUMBER}`,
    areaServed: 'Buffalo, NY',
    amenityFeature: FULLY_EQUIPPED_AMENITIES.map((amenity) => ({
      '@type': 'LocationFeatureSpecification',
      name: amenity.title,
      value: true,
    })),
  };

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }} />
      <HeroSection featuredProperty={featuredProperty} />
      <StatsBanner />
      <TargetAudienceSection />
      <NarrativeSection />
      <AmenitiesGrid />
      <DesignedForStaysSection />
      <SpacesPreview properties={properties} />
      <FAQSection />
      <WorkflowSection />
    </>
  );
}

function FAQSection() {
  return (
    <section id="faq" className="py-20 px-6 lg:px-10 scroll-mt-28 bg-brand-bg-main">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <div className="text-center mb-12">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-lg text-brand-text-main/70 max-w-xl mx-auto">Everything you need to know about your extended stay with Buffalo Stays.</p>
        </div>
        <FAQAccordion />
      </div>
    </section>
  );
}

function HeroSection({ featuredProperty }: { featuredProperty: Property | null }) {
  const title = featuredProperty?.title || 'The Rust Studio';
  const slug = featuredProperty?.slug || 'the-rust-studio';
  const rawPhoto = featuredProperty?.gallery?.[0];
  const photo = rawPhoto?.image || rawPhoto;
  const photoObj = photo as { asset?: { _ref?: string }; _ref?: string };
  const image = photoObj && (photoObj.asset || photoObj._ref)
    ? urlFor(photoObj).width(800).height(600).url()
    : null;
  const location = featuredProperty?.location || 'Buffalo, NY';

  return (
    <section className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-10 items-center min-h-[550px] px-6 lg:px-10 py-12">
      <div className="w-full lg:w-1/2 flex flex-col gap-6">
        <h1 className="font-serif text-5xl lg:text-7xl font-bold leading-[1.1] text-brand-text-main">
          Your cozy home,<br/><span className="text-brand-primary">away from home.</span>
        </h1>
        <p className="text-lg text-brand-text-main/70 max-w-lg leading-relaxed">
          Discover our curated selection of warm, modern spaces designed for comfort, creativity, and extended stays that feel truly authentic.
        </p>
        <div className="flex flex-wrap gap-4">
          <Link
            href="/spaces"
            className="inline-flex items-center gap-2 bg-brand-primary hover:bg-brand-primary-hover text-brand-bg-surface px-8 py-4 uppercase tracking-[0.1em] text-sm font-medium transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:ring-offset-1 focus-visible:ring-offset-brand-bg-main"
          >
            <span>Explore Spaces</span>
            <MessageCircle className="w-5 h-5" />
          </Link>
          {featuredProperty && (
            <Link
              href={`/spaces/${slug}`}
              className="inline-flex items-center gap-2 bg-white hover:bg-brand-bg-main text-brand-text-main px-8 py-4 uppercase tracking-[0.1em] text-sm font-medium border border-black/10 transition-colors duration-500 ease-out"
            >
              <span>View Featured Space</span>
            </Link>
          )}
        </div>
      </div>
      <div className="w-full lg:w-1/2 h-[450px] bg-brand-bg-main rounded-[2.5rem] shadow-2xl border-4 border-brand-bg-surface overflow-hidden relative">
        {image ? (
          <Image 
            src={image}
            alt={`Sunlit Buffalo Stays living space featuring ${title} in ${location}`}
            fill
            className="object-cover object-center"
            referrerPolicy="no-referrer"
            priority
          />
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-bg-surface via-brand-bg-main to-brand-bg-surface flex flex-col items-center justify-center text-center p-8 select-none">
            <span className="font-serif text-sm font-bold tracking-widest text-brand-primary/40 uppercase mb-3 animate-pulse">
              Buffalo Stays
            </span>
            <span className="font-serif text-2xl font-bold text-brand-text-main/60 px-6">
              {title}
            </span>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-brand-text-main/60 via-transparent to-transparent" />
        <div className="absolute bottom-6 left-6 right-6 p-5 bg-brand-bg-surface/95 backdrop-blur-md rounded-2xl flex justify-between items-center shadow-lg border border-brand-bg-surface/50">
          <div>
            <p className="text-xs font-bold text-brand-primary uppercase tracking-widest mb-1">Featured</p>
            <p className="font-bold text-brand-text-main text-lg">{title}</p>
          </div>
          <div className="flex -space-x-3">
             <div className="w-10 h-10 rounded-full border-2 border-brand-bg-surface bg-slate-200"></div>
             <div className="w-10 h-10 rounded-full border-2 border-brand-bg-surface bg-slate-300"></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function StatsBanner() {
  return (
    <section className="px-6 lg:px-10 pb-16">
      <div className="max-w-7xl mx-auto bg-brand-bg-surface rounded-3xl p-8 flex flex-col md:flex-row justify-between items-center gap-8 shadow-sm border border-black/5">
        <div className="flex flex-col items-center text-center">
          <Calendar className="w-10 h-10 text-brand-primary mb-3 opacity-90" />
          <h4 className="font-serif text-xl font-bold">30+ Days</h4>
          <p className="text-sm font-medium text-brand-text-main/60">Minimum Stay</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-brand-text-main/10 rounded-full"></div>
        <div className="flex flex-col items-center text-center">
          <Users className="w-10 h-10 text-brand-primary mb-3 opacity-90" />
          <h4 className="font-serif text-xl font-bold">4 Guest Types</h4>
          <p className="text-sm font-medium text-brand-text-main/60">Served Across Properties</p>
        </div>
        <div className="hidden md:block w-px h-16 bg-brand-text-main/10 rounded-full"></div>
        <div className="flex flex-col items-center text-center">
          <HeartHandshake className="w-10 h-10 text-brand-primary mb-3 opacity-90" />
          <h4 className="font-serif text-xl font-bold">24/7 Support</h4>
          <p className="text-sm font-medium text-brand-text-main/60">Via WhatsApp</p>
        </div>
      </div>
    </section>
  );
}

function TargetAudienceSection() {
  return (
    <section className="py-16 bg-brand-bg-main px-6 lg:px-10 rounded-[3rem] mx-4 lg:mx-10 my-4 shadow-sm">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-serif text-3xl lg:text-4xl font-bold text-center mb-12">The perfect fit for <span className="text-brand-primary">driven stays.</span></h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {DRIVEN_STAYS_TARGET_GROUPS.map((audience) => (
            <div key={audience.title} className="bg-brand-bg-surface p-8 rounded-3xl shadow-sm border border-transparent hover:border-brand-primary/20 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out flex flex-col items-start gap-4">
              <div className="p-3 bg-brand-primary/10 rounded-2xl">
                {AUDIENCE_ICON_MAP[audience.iconKey]}
              </div>
              <h3 className="font-serif font-bold text-lg leading-tight">{audience.title}</h3>
              <p className="text-brand-text-main/70 text-sm leading-relaxed">{audience.desc}</p>
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
          <div className="absolute -bottom-6 -right-6 lg:-right-10 bg-brand-primary text-white p-6 rounded-3xl shadow-xl shadow-brand-primary/30">
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
          <h2 className="font-serif text-4xl lg:text-5xl font-bold mb-10 leading-tight">More than just <br/>a room.</h2>
          <div className="space-y-8">
            {pillars.map(pillar => (
              <div key={pillar.num} className="flex gap-6 items-start group">
                <span className="text-3xl font-bold text-brand-text-main/20 group-hover:text-brand-primary transition-all duration-300 ease-in-out">{pillar.num}</span>
                <div>
                  <h3 className="font-serif text-xl font-bold mb-2">{pillar.title}</h3>
                  <p className="text-brand-text-main/70 text-base leading-relaxed max-w-md">{pillar.desc}</p>
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
    <section id="amenities" className="py-20 px-6 lg:px-10 bg-brand-bg-surface scroll-mt-28">
      <div className="max-w-7xl mx-auto flex flex-col items-center">
        <h2 className="font-serif text-3xl lg:text-5xl font-bold mb-16 text-center max-w-xl">Every stay comes <span className="text-brand-primary">fully equipped.</span></h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 w-full">
          {FULLY_EQUIPPED_AMENITIES.map((item) => (
            <div key={item.title} className="bg-brand-bg-main p-8 rounded-3xl flex flex-col items-center text-center gap-4 shadow-sm border border-black/5 hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
              <div className="w-14 h-14 bg-brand-bg-surface rounded-full flex items-center justify-center text-brand-primary shadow-md mb-2">
                {AMENITY_ICON_MAP[item.iconKey]}
              </div>
              <h4 className="font-serif font-bold text-lg px-4">{item.title}</h4>
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
          <h2 className="font-serif text-4xl lg:text-5xl font-bold leading-[1.1]">Designed for stays <br/><span className="text-brand-primary border-b-4 border-brand-primary/30 pb-1">that last.</span></h2>
          <p className="text-lg text-brand-text-main/70 mb-2">We obsess over the details that transform a short-term rental into a genuine living space.</p>
          <ul className="space-y-5">
            {checks.map((text, i) => (
              <li key={i} className="flex items-start gap-4">
                <CheckCircle2 className="w-6 h-6 text-brand-primary shrink-0 mt-0.5" />
                <span className="font-medium text-brand-text-main/90 text-lg leading-relaxed">{text}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="w-full lg:w-7/12 relative h-[550px] lg:h-[700px] flex justify-center items-center">
           <div className="absolute top-0 right-0 w-3/4 h-[60%] rounded-[3rem] overflow-hidden shadow-2xl rotate-3 z-10 border-8 border-brand-bg-surface">
              <Image src="https://picsum.photos/seed/buffalo-collage1/600/400" alt="Open-plan Buffalo Stays lounge with natural light and warm contemporary styling" fill className="object-cover" referrerPolicy="no-referrer" />
           </div>
           <div className="absolute bottom-0 left-0 w-2/3 h-[50%] rounded-[3rem] overflow-hidden shadow-2xl -rotate-6 z-20 border-8 border-brand-bg-surface">
              <Image src="https://picsum.photos/seed/buffalo-collage2/600/400" alt="Cozy Buffalo Stays bedroom with layered bedding and calming earth-tone palette" fill className="object-cover" referrerPolicy="no-referrer" />
           </div>
           <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full overflow-hidden shadow-2xl z-30 border-8 border-brand-bg-surface">
              <Image src="https://picsum.photos/seed/buffalo-collage3/400/400" alt="Detail shot of curated decor and textures that define Buffalo Stays' premium hospitality feel" fill className="object-cover" referrerPolicy="no-referrer" />
           </div>
        </div>
      </div>
    </section>
  );
}

function SpacesPreview({ properties }: { properties: Property[] }) {
  const displaySpaces = properties.length > 0 ? properties.slice(0, 3) : [];

  return (
    <section className="py-20 px-6 lg:px-10 bg-brand-bg-surface rounded-[3rem] mx-4 lg:mx-10 my-10 shadow-sm border border-black/5">
      <div className="max-w-7xl mx-auto flex flex-col gap-10">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <h2 className="font-serif text-3xl lg:text-4xl font-bold">Featured Spaces</h2>
          <Link href="/spaces" className="px-6 py-3 bg-brand-bg-main shadow-none border border-brand-text-muted/30 text-xs tracking-wide uppercase font-medium text-brand-text-main hover:bg-brand-primary hover:text-brand-bg-surface hover:border-brand-primary transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:ring-offset-1 focus-visible:ring-offset-brand-bg-main">
            View all properties
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {displaySpaces.length === 0 ? (
            <div className="col-span-full py-10 text-center">
              <p className="text-brand-text-main/60 font-serif">No spaces available at this time.</p>
            </div>
          ) : (
            displaySpaces.map((space) => {
              const rawPhoto = space.gallery?.[0];
              const photo = rawPhoto?.image || rawPhoto;
              const photoObj = photo as { asset?: { _ref?: string }; _ref?: string };
              const image = photoObj && (photoObj.asset || photoObj._ref)
                ? urlFor(photoObj).width(600).height(400).url()
                : null;
              
              // Resolve tags or collect them dynamically from selected amenities
              const tags = space.tags && space.tags.length > 0 
                ? space.tags 
                : [
                    ...(space.amenitiesInternetOffice || []).slice(0, 1),
                    ...(space.amenitiesBathroom || []).slice(0, 1),
                    ...(space.amenitiesBedroomLaundry || []).slice(0, 1)
                  ].filter(Boolean).slice(0, 3);

              return (
                <div key={space._id} className="bg-brand-bg-surface p-5 rounded-3xl shadow-lg border border-black/5 flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out">
                  <div className="relative w-full h-56 bg-slate-200 rounded-2xl mb-6 overflow-hidden">
                    {image ? (
                      <Image 
                        src={image}
                        alt={`${space.title} at Buffalo Stays`}
                        fill
                        className="object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
                        referrerPolicy="no-referrer"
                      />
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-brand-bg-surface via-brand-bg-main to-brand-bg-surface flex flex-col items-center justify-center text-center p-6 select-none border border-brand-border">
                        <div className="font-serif text-xs font-bold tracking-widest text-brand-primary/40 uppercase mb-2">
                          Buffalo Stays
                        </div>
                        <div className="font-serif text-lg font-bold text-brand-text-main/60 line-clamp-2 px-4 font-medium">
                          {space.title}
                        </div>
                      </div>
                    )}
                  </div>
                  <h3 className="font-serif font-bold text-xl mb-3 px-2">{space.title}</h3>
                  <div className="flex flex-wrap gap-2 mb-5 px-2">
                    {tags.map((tag: string) => (
                      <span key={tag} className="text-xs px-3 py-1.5 bg-brand-bg-main rounded-full font-bold uppercase tracking-wider text-brand-text-main/80 shadow-sm">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <Link
                    href={`/spaces/${space.slug}`}
                    className="w-full mt-auto py-3.5 text-center text-xs tracking-wide uppercase bg-transparent border border-brand-primary/20 text-brand-text-main hover:bg-brand-primary hover:border-brand-primary hover:text-brand-bg-surface font-medium transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:ring-offset-1 focus-visible:ring-offset-brand-bg-main"
                  >
                    Check Availability
                  </Link>
                </div>
              );
            })
          )}
        </div>
      </div>
    </section>
  );
}
