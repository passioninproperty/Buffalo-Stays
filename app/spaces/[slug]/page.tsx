import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Users, BedDouble, Bed, Bath, ArrowLeft, Calendar, ShieldCheck, Clock } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { SITE_NAME, getAbsoluteUrl } from '@/lib/site';
import { CollapsibleDescription } from '@/components/CollapsibleDescription';
import { InquiryForm } from '@/components/InquiryForm';
import { GalleryGrid } from '@/components/GalleryGrid';
import { AmenitiesSection } from '@/components/AmenitiesSection';
import { LocationMap } from '@/components/LocationMap';

interface Property {
  title: string;
  location?: string;
  pricePerNight?: number;
  minimumStay?: number;
  availabilityStatus?: string;
  gallery?: Array<{
    image?: {
      asset?: {
        _ref?: string;
        _type?: string;
      };
    };
    isFeatured?: boolean;
    photoTag?: string;
  }>;
  tags?: string[];
  specs?: {
    guests?: number;
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
  };
  detailedDescription?: string;
  summaryText?: string;
  locationCoordinates?: {
    lat: number;
    lng: number;
  };
  amenities?: Array<{
    isAvailable: boolean;
    amenity?: {
      title: string;
      iconSlug: string;
      category?: {
        title: string;
      };
    };
  }>;
}

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const query = `*[_type == "property" && slug.current == $slug][0] {
    title,
    location,
    summaryText
  }`;

  const space = await client.fetch<Pick<Property, 'title' | 'location'> & { summaryText?: string } | null>(
    query,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!space) {
    return {
      title: 'Property Not Found',
    };
  }

  const title = `${space.title} | ${SITE_NAME}`;
  const description = space.summaryText || `Explore ${space.title} in ${space.location || 'Buffalo'} from Buffalo Stays.`;

  return {
    title,
    description,
    alternates: {
      canonical: `/spaces/${slug}`,
    },
    openGraph: {
      title,
      description,
      url: getAbsoluteUrl(`/spaces/${slug}`),
    },
    twitter: {
      title,
      description,
    },
  };
}

export default async function SpaceDetailPage({ params }: PageProps) {
  const { slug } = await params;
  const query = `*[_type == "property" && slug.current == $slug][0] {
    title,
    location,
    pricePerNight,
    minimumStay,
    availabilityStatus,
    gallery[]{ image, isFeatured, photoTag },
    tags,
    specs,
    detailedDescription,
    locationCoordinates,
    amenities[]{
      isAvailable,
      amenity->{
        title,
        iconSlug,
        category->{
          title
        }
      }
    }
  }`;

  const space = await client.fetch<Property | null>(
    query,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!space) {
    notFound();
  }

  return (
    <div className="bg-brand-bg-main min-h-screen pb-16">
      {/* Detail Container */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 py-10">
        
        {/* Navigation Breadcrumb */}
        <div className="mb-6 flex items-center justify-between">
          <Link
            href="/spaces"
            className="inline-flex items-center gap-2 text-sm text-brand-text-main/70 hover:text-brand-primary font-medium transition-colors group"
          >
            <ArrowLeft className="w-4 h-4 group-hover:-translate-x-0.5 transition-transform" />
            Back to all spaces
          </Link>
          <div className="hidden sm:flex items-center gap-2 text-xs font-semibold text-brand-text-main/50 uppercase tracking-widest">
            <span>Home</span>
            <span>/</span>
            <span>Spaces</span>
            <span>/</span>
            <span className="text-brand-text-main font-medium">{space.title}</span>
          </div>
        </div>

        {/* Header Section */}
        <header className="mb-8">
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4">
            <div>
              <h1 className="font-serif text-3xl md:text-5xl font-bold text-brand-text-main leading-tight mb-3">
                {space.title}
              </h1>
              <div className="flex flex-wrap items-center gap-4 text-brand-text-main/70 text-sm">
                {space.location && (
                  <div className="flex items-center gap-1.5 font-medium">
                    <MapPin className="w-4 h-4 text-brand-primary shrink-0" />
                    <span>{space.location}</span>
                  </div>
                )}
                {space.availabilityStatus && (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-brand-primary/10 text-brand-primary text-xs font-bold uppercase tracking-wider">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-primary animate-pulse" />
                    {space.availabilityStatus}
                  </span>
                )}
              </div>
            </div>
            
            {/* Direct Tags / Badges */}
            {space.tags && space.tags.length > 0 && (
              <div className="flex flex-wrap gap-2">
                {space.tags.slice(0, 3).map((tag) => (
                  <span key={tag} className="text-xs px-3 py-1.5 bg-brand-bg-main border border-brand-border rounded-full font-bold uppercase tracking-wider text-brand-text-main/80 shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </header>

        <GalleryGrid spaceTitle={space.title} gallery={space.gallery || []} />

        {/* Two-Column Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column (2/3 width on desktop) */}
          <div className="lg:col-span-2 flex flex-col">
            
            {/* Core Specs Row */}
            {space.specs && (
              <div className="flex flex-wrap gap-x-8 gap-y-4 py-6 border-b border-brand-border text-sm font-medium text-brand-text-main/80">
                {space.specs.guests && (
                  <div className="flex items-center gap-2">
                    <Users className="w-5 h-5 text-brand-primary shrink-0" />
                    <span>{space.specs.guests} {space.specs.guests === 1 ? 'Guest' : 'Guests'}</span>
                  </div>
                )}
                {space.specs.bedrooms && (
                  <div className="flex items-center gap-2">
                    <BedDouble className="w-5 h-5 text-brand-primary shrink-0" />
                    <span>{space.specs.bedrooms} {space.specs.bedrooms === 1 ? 'Bedroom' : 'Bedrooms'}</span>
                  </div>
                )}
                {space.specs.beds && (
                  <div className="flex items-center gap-2">
                    <Bed className="w-5 h-5 text-brand-primary shrink-0" />
                    <span>{space.specs.beds} {space.specs.beds === 1 ? 'Bed' : 'Beds'}</span>
                  </div>
                )}
                {space.specs.bathrooms && (
                  <div className="flex items-center gap-2">
                    <Bath className="w-5 h-5 text-brand-primary shrink-0" />
                    <span>{space.specs.bathrooms} {space.specs.bathrooms === 1 ? 'Bathroom' : 'Bathrooms'}</span>
                  </div>
                )}
              </div>
            )}

            {/* Detailed Description */}
            <div className="py-8 border-b border-brand-border">
              <h2 className="font-serif text-2xl font-bold mb-4 text-brand-text-main">
                About this space
              </h2>
              <CollapsibleDescription description={space.detailedDescription || ''} />
            </div>

            {/* Curated Amenities Grid & Modal Portal */}
            <AmenitiesSection amenities={space.amenities || []} />

            {/* Privacy-First Location Map Module */}
            <LocationMap locationCoordinates={space.locationCoordinates} />

          </div>

          {/* Right Column (1/3 width on desktop - Floating Booking Card) */}
          <div className="lg:col-span-1">
            <div className="sticky top-28 bg-brand-bg-surface p-6 rounded-3xl shadow-xl border border-brand-border flex flex-col">
              
              {/* Pricing & Min Nights */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-brand-text-main">
                    £{space.pricePerNight || '—'}
                  </span>
                  <span className="text-sm font-normal text-brand-text-main/60">/ night</span>
                </div>
                {space.minimumStay && (
                  <div className="text-xs text-brand-text-main/60 mt-1 uppercase tracking-wider font-bold">
                    {space.minimumStay} night minimum stay
                  </div>
                )}
              </div>

              {/* Highlight Perks Grid */}
              <div className="space-y-4 mb-6 border-y border-brand-border py-4 text-xs font-semibold text-brand-text-main/80 uppercase tracking-wider">
                <div className="flex items-center gap-3">
                  <Calendar className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Flexible long-term leases</span>
                </div>
                <div className="flex items-center gap-3">
                  <ShieldCheck className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Fully verified premium stay</span>
                </div>
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 text-brand-primary shrink-0" />
                  <span>Fast approval & communication</span>
                </div>
              </div>

              {/* Native Inquiry Form */}
              <div className="mt-2">
                <InquiryForm spaceTitle={space.title} />
              </div>

            </div>
          </div>

        </div>

      </div>
    </div>
  );
}
