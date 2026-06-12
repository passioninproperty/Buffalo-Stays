"use client";

import React, { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Search, MapPin, Users, BedDouble, Bath, XCircle } from 'lucide-react';

interface Property {
  _id: string;
  title: string;
  slug: string;
  location?: string;
  pricePerNight?: number;
  tags?: string[];
  gallery?: Array<{
    asset?: string;
    isFeatured?: boolean;
    photoTag?: string;
  }>;
  availabilityStatus?: string;
  summaryText?: string;
  specs?: {
    guests?: number;
    bedrooms?: number;
    beds?: number;
    bathrooms?: number;
  };
  amenityStatuses?: Array<{
    name: string;
  }>;
}

interface SpacesClientCatalogProps {
  initialSpaces: Property[];
}

type FilterType = 'all' | 'available' | '2+beds' | 'workspace';

export default function SpacesClientCatalog({ initialSpaces }: SpacesClientCatalogProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeFilter, setActiveFilter] = useState<FilterType>('all');

  // Computed filtered list
  const filteredSpaces = useMemo(() => {
    return initialSpaces.filter((space) => {
      // 1. Search Query filter (title or location, case-insensitive)
      const query = searchQuery.toLowerCase().trim();
      const titleMatch = space.title.toLowerCase().includes(query);
      const locationMatch = space.location?.toLowerCase().includes(query) || false;
      const matchesSearch = titleMatch || locationMatch;

      if (!matchesSearch) return false;

      // 2. Active filter pill
      if (activeFilter === 'available') {
        return space.availabilityStatus?.toLowerCase() === 'available';
      }
      if (activeFilter === '2+beds') {
        return space.specs?.bedrooms !== undefined && space.specs.bedrooms >= 2;
      }
      if (activeFilter === 'workspace') {
        const hasWorkspaceTag = space.tags?.some(tag => 
          tag.toLowerCase().includes('workspace') || tag.toLowerCase().includes('dedicated workspace')
        ) || false;
        
        const hasWorkspaceAmenity = space.amenityStatuses?.some(amenity => 
          amenity.name.toLowerCase().includes('workspace') || amenity.name.toLowerCase().includes('dedicated workspace')
        ) || false;

        return hasWorkspaceTag || hasWorkspaceAmenity;
      }

      return true;
    });
  }, [initialSpaces, searchQuery, activeFilter]);

  const handleResetFilters = () => {
    setSearchQuery('');
    setActiveFilter('all');
  };

  return (
    <div className="w-full">
      {/* Search and Filter Control Bar */}
      <div className="border-b border-brand-border py-4 mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
        {/* Left Side: Elegant Search Input Wrapper */}
        <div className="relative w-full md:w-80">
          <span className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
            <Search className="h-4 w-4 text-brand-text-muted/60" />
          </span>
          <input
            type="text"
            placeholder="Search spaces or locations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="bg-brand-bg-surface border border-brand-border rounded-xl pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-brand-primary/30 w-full text-brand-text-main placeholder-brand-text-muted/50 transition-colors"
          />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute inset-y-0 right-0 flex items-center pr-3 text-brand-text-muted hover:text-brand-text-main"
            >
              <XCircle className="h-4 w-4" />
            </button>
          )}
        </div>

        {/* Right Side: Micro-filter pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto">
          {(
            [
              { key: 'all', label: 'All Spaces' },
              { key: 'available', label: 'Available' },
              { key: '2+beds', label: '2+ Bedrooms' },
              { key: 'workspace', label: 'Workspace' },
            ] as const
          ).map((filter) => {
            const isActive = activeFilter === filter.key;
            return (
              <button
                key={filter.key}
                onClick={() => setActiveFilter(filter.key)}
                className={`text-xs font-semibold tracking-wider uppercase px-4 py-2 rounded-full border transition-all duration-200 cursor-pointer ${
                  isActive
                    ? 'bg-brand-primary text-brand-bg-surface border-brand-primary'
                    : 'bg-brand-bg-surface text-brand-text-main/60 border-brand-border hover:text-brand-text-main hover:border-brand-text-main/20'
                }`}
              >
                {filter.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* Property Grid & Cards */}
      {filteredSpaces.length === 0 ? (
        /* Sleek Minimalist Empty State */
        <div className="py-20 flex flex-col items-center justify-center text-center max-w-md mx-auto">
          <div className="w-16 h-16 rounded-full bg-brand-bg-surface border border-brand-border flex items-center justify-center mb-6 text-brand-text-muted/60">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="font-serif text-2xl font-bold text-brand-text-main mb-2">No spaces found</h3>
          <p className="text-sm text-brand-text-muted mb-8">
            We couldn&apos;t find any spaces matching your search query or selected filters. Try updating your criteria or resetting.
          </p>
          <button
            onClick={handleResetFilters}
            className="px-6 py-3 bg-brand-primary text-brand-bg-surface hover:bg-brand-primary-hover text-xs font-bold uppercase tracking-widest transition-colors duration-200"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredSpaces.map((space) => {
            const featuredImage = space.gallery?.find((img) => img.isFeatured) || space.gallery?.[0];
            const imageUrl = featuredImage?.asset || null;

            return (
              <div
                key={space._id}
                className="bg-brand-bg-surface p-5 rounded-3xl shadow-lg border border-brand-border flex flex-col group hover:-translate-y-1 hover:shadow-xl transition-all duration-300 ease-in-out"
              >
                {/* Image Section */}
                <div className="aspect-[4/3] w-full rounded-2xl overflow-hidden relative bg-slate-200 mb-6">
                  {imageUrl ? (
                    <Image
                      src={imageUrl}
                      alt={`${space.title} at Buffalo Stays`}
                      fill
                      className="object-cover group-hover:scale-105 transition-all duration-300 ease-in-out"
                      referrerPolicy="no-referrer"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                  ) : (
                    <div className="absolute inset-0 bg-brand-bg-main flex items-center justify-center text-brand-text-main/40 font-serif text-lg font-semibold">
                      No Image Available
                    </div>
                  )}
                  {space.availabilityStatus && (
                    <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm text-xs font-bold text-brand-primary uppercase tracking-widest">
                      {space.availabilityStatus}
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <h3 className="font-serif font-bold text-2xl mb-3 px-2 line-clamp-1">{space.title}</h3>
                
                {/* Location & Price Metadata Row */}
                <div className="flex items-center justify-between mb-4 px-2">
                  <span className="text-sm text-brand-text-main/60 flex items-center gap-1 font-medium">
                    <MapPin className="w-3.5 h-3.5 text-brand-primary shrink-0" />
                    {space.location || 'Buffalo, NY'}
                  </span>
                  {space.pricePerNight && (
                    <span className="text-sm font-semibold text-brand-text-main">
                      £{space.pricePerNight} <span className="text-xs text-brand-text-muted font-normal">/ night</span>
                    </span>
                  )}
                </div>

                {/* Specs Row */}
                {space.specs && (
                  <div className="flex items-center gap-4 text-xs font-medium text-brand-text-main/60 mb-4 px-2 border-t border-brand-border/40 pt-3">
                    {space.specs.bedrooms !== undefined && (
                      <span className="flex items-center gap-1">
                        <BedDouble className="w-3.5 h-3.5 text-brand-primary" />
                        {space.specs.bedrooms} Bed{space.specs.bedrooms === 1 ? '' : 's'}
                      </span>
                    )}
                    {space.specs.bathrooms !== undefined && (
                      <span className="flex items-center gap-1">
                        <Bath className="w-3.5 h-3.5 text-brand-primary" />
                        {space.specs.bathrooms} Bath{space.specs.bathrooms === 1 ? '' : 's'}
                      </span>
                    )}
                    {space.specs.guests !== undefined && (
                      <span className="flex items-center gap-1">
                        <Users className="w-3.5 h-3.5 text-brand-primary" />
                        {space.specs.guests} Guest{space.specs.guests === 1 ? '' : 's'}
                      </span>
                    )}
                  </div>
                )}

                {/* Tags Row */}
                <div className="flex flex-wrap gap-2 mb-5 px-2">
                  {(space.tags || []).slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="text-xs px-3 py-1.5 bg-brand-bg-main rounded-full font-bold uppercase tracking-wider text-brand-text-main/80 shadow-sm"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Summary Text */}
                <p className="text-sm text-brand-text-main/70 mb-8 px-2 flex-grow line-clamp-2 min-h-[40px] leading-relaxed">
                  {space.summaryText || 'Discover a curated selection of warm, modern spaces designed for comfort, creativity, and extended stays.'}
                </p>

                {/* Action Button */}
                <Link
                  href={`/spaces/${space.slug}`}
                  className="w-full py-4 text-center text-xs tracking-[0.1em] uppercase bg-brand-primary text-brand-bg-surface hover:bg-brand-primary-hover border border-brand-primary font-medium transition-colors duration-500 ease-out focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-brand-primary focus-visible:ring-offset-1 focus-visible:ring-offset-brand-bg-main"
                >
                  View Details
                </Link>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
