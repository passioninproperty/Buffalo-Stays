import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { MapPin, Users, BedDouble, Bed, Bath, ArrowLeft, Calendar, ShieldCheck, Clock } from 'lucide-react';
import { client } from '@/sanity/lib/client';
import { urlFor } from '@/sanity/lib/image';
import { SITE_NAME, getAbsoluteUrl } from '@/lib/site';
import { AmenityIcon } from '@/components/AmenityIcon';
import { CollapsibleDescription } from '@/components/CollapsibleDescription';
import { InquiryForm } from '@/components/InquiryForm';

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
  amenityStatuses?: Array<{
    isAvailable: boolean;
    name: string;
    categoryName: string;
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
    amenityStatuses[]{ isAvailable, "name": amenityRef->title, "categoryName": amenityRef->category->title }
  }`;

  const space = await client.fetch<Property | null>(
    query,
    { slug },
    { next: { revalidate: 60 } }
  );

  if (!space) {
    notFound();
  }

  const galleryImages = space.gallery || [];
  const rawPhoto = galleryImages.find((img) => img.isFeatured === true) || galleryImages[0];
  const featuredPhoto = rawPhoto?.image || rawPhoto;
  const featuredPhotoObj = featuredPhoto as { asset?: { _ref?: string }; _ref?: string };
  const mainImage = featuredPhotoObj && (featuredPhotoObj.asset || featuredPhotoObj._ref)
    ? urlFor(featuredPhotoObj).width(800).height(600).url()
    : null;

  const featuredImageItem = galleryImages.find((img) => img.isFeatured === true) || galleryImages[0];

  // Organize grouped list for rendering
  const amenityGroupsMap: Record<string, Array<{ name: string; isAvailable: boolean }>> = {};
  space.amenityStatuses?.forEach((status) => {
    if (status.name && status.categoryName) {
      if (!amenityGroupsMap[status.categoryName]) {
        amenityGroupsMap[status.categoryName] = [];
      }
      amenityGroupsMap[status.categoryName].push({
        name: status.name,
        isAvailable: status.isAvailable !== false,
      });
    }
  });

  const amenityGroups = Object.entries(amenityGroupsMap).map(([title, list]) => ({
    title,
    list,
  }));

  // Filtering out the main/featured image from other mosaic images to avoid duplicate rendering
  const otherImages = galleryImages.filter(img => img !== featuredImageItem);

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

        {/* Photo Grid Gallery Section */}
        <div className="mb-10">
          {galleryImages.length > 0 ? (
            <>
              {/* Desktop Mosaic Layout */}
              <div className="hidden md:grid grid-cols-4 gap-4 h-[450px] overflow-hidden rounded-3xl">
                {/* Main Large Image */}
                <div className="col-span-2 relative h-full w-full overflow-hidden bg-slate-200 group">
                  {mainImage ? (
                    <Image
                      src={mainImage}
                      alt={`${space.title} primary view`}
                      fill
                      className="object-cover group-hover:scale-[1.01] transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      priority
                    />
                  ) : (
                    <div className="absolute inset-0 bg-gradient-to-br from-brand-bg-surface via-brand-bg-main to-brand-bg-surface flex flex-col items-center justify-center text-center p-8 select-none">
                      <span className="font-serif text-sm font-bold tracking-widest text-brand-primary/40 uppercase mb-3 animate-pulse">
                        Buffalo Stays
                      </span>
                      <span className="font-serif text-2xl font-bold text-brand-text-main/60 px-6">
                        {space.title}
                      </span>
                    </div>
                  )}
                  {featuredImageItem?.photoTag && (
                    <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white uppercase tracking-widest rounded-md z-10">
                      {featuredImageItem.photoTag}
                    </div>
                  )}
                </div>

                {/* Auxiliary Mosaic Stack */}
                <div className="col-span-2 grid grid-cols-2 gap-4 h-full">
                  {otherImages.slice(0, 4).map((img, idx) => {
                    const photo = img.image || img;
                    const photoObj = photo as { asset?: { _ref?: string }; _ref?: string };
                    const src = photoObj && (photoObj.asset || photoObj._ref)
                      ? urlFor(photoObj).width(400).height(300).url()
                      : null;
                    if (!src) {
                      return (
                        <div key={idx} className="relative h-full w-full overflow-hidden bg-gradient-to-br from-brand-bg-surface via-brand-bg-main to-brand-bg-surface flex flex-col items-center justify-center text-center p-4 select-none border border-brand-border">
                          <span className="font-serif text-[10px] font-bold tracking-widest text-brand-primary/40 uppercase mb-1">
                            Buffalo Stays
                          </span>
                          <span className="font-serif text-xs font-semibold text-brand-text-main/50 line-clamp-1 px-2">
                            {space.title}
                          </span>
                        </div>
                      );
                    }
                    return (
                      <div key={idx} className="relative h-full w-full overflow-hidden bg-slate-200 group">
                        <Image
                          src={src}
                          alt={`${space.title} view ${idx + 2}`}
                          fill
                          className="object-cover group-hover:scale-105 transition-transform duration-500"
                          sizes="(max-width: 768px) 50vw, 25vw"
                        />
                        {img.photoTag && (
                          <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider rounded z-10">
                            {img.photoTag}
                          </div>
                        )}
                      </div>
                    );
                  })}
                  {/* Fallback items if gallery has fewer than 5 images */}
                  {Array.from({ length: Math.max(0, 4 - otherImages.slice(0, 4).length) }).map((_, idx) => (
                    <div key={`pad-${idx}`} className="bg-brand-bg-surface/50 border border-brand-border flex items-center justify-center rounded-none text-brand-text-main/10 font-serif font-bold tracking-widest text-sm uppercase">
                      Buffalo Stays
                    </div>
                  ))}
                </div>
              </div>

              {/* Mobile Carousel Swipeable Layout */}
              <div className="md:hidden flex gap-4 overflow-x-auto snap-x snap-mandatory scrollbar-none h-[300px] rounded-3xl">
                {galleryImages.map((img, idx) => {
                  const photo = img.image || img;
                  const photoObj = photo as { asset?: { _ref?: string }; _ref?: string };
                  const src = photoObj && (photoObj.asset || photoObj._ref)
                    ? urlFor(photoObj).width(600).height(450).url()
                    : null;
                  if (!src) {
                    return (
                      <div key={idx} className="snap-start shrink-0 w-full h-full relative bg-gradient-to-br from-brand-bg-surface via-brand-bg-main to-brand-bg-surface flex flex-col items-center justify-center text-center p-6 select-none border border-brand-border">
                        <span className="font-serif text-xs font-bold tracking-widest text-brand-primary/40 uppercase mb-2">
                          Buffalo Stays
                        </span>
                        <span className="font-serif text-sm font-semibold text-brand-text-main/50 line-clamp-2 px-4">
                          {space.title}
                        </span>
                      </div>
                    );
                  }
                  return (
                    <div key={idx} className="snap-start shrink-0 w-full h-full relative">
                      <Image
                        src={src}
                        alt={`${space.title} gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                        sizes="100vw"
                      />
                      {img.photoTag && (
                        <div className="absolute bottom-4 left-4 bg-black/60 backdrop-blur-sm px-3 py-1.5 text-xs font-bold text-white uppercase tracking-widest rounded-md z-10">
                          {img.photoTag}
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </>
          ) : (
            <div className="h-64 bg-brand-bg-surface shadow-sm border border-brand-border flex items-center justify-center rounded-3xl text-brand-text-main/40 font-serif">
              No photos available for this property
            </div>
          )}
        </div>

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

            {/* Grouped Amenities Grid */}
            {amenityGroups.length > 0 && (
              <div className="py-8 border-b border-brand-border">
                <h2 className="font-serif text-2xl font-bold mb-8 text-brand-text-main">
                  What this space offers
                </h2>
                <div className="space-y-8">
                  {amenityGroups.map((group) => (
                    <div key={group.title} className="border-b border-brand-border pb-6 last:border-b-0 last:pb-0">
                      <h3 className="font-serif text-sm font-bold text-brand-text-main/50 mb-4 uppercase tracking-widest">
                        {group.title}
                      </h3>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        {group.list.map((amenity) => {
                          const isAvailable = amenity.isAvailable;
                          return (
                            <div
                              key={amenity.name}
                              className={`flex items-center gap-3 ${
                                isAvailable ? 'text-brand-text-main/80' : 'text-brand-text-main/40 line-through'
                              }`}
                            >
                              <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                                isAvailable ? 'bg-brand-primary/5 text-brand-primary' : 'bg-brand-text-main/5 text-brand-text-main/30'
                              }`}>
                                <AmenityIcon
                                  name={amenity.name}
                                  className={`w-4 h-4 ${
                                    isAvailable ? 'text-brand-primary' : 'text-brand-text-main/30'
                                  }`}
                                />
                              </div>
                              <span className="text-sm font-semibold">{amenity.name}</span>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

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
