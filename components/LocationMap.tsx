"use client";

import React from 'react';
import dynamic from 'next/dynamic';

interface LocationMapProps {
  locationCoordinates?: {
    lat: number;
    lng: number;
  };
}

const MapComponent = dynamic(
  () => import('./LocationMapClient'),
  {
    ssr: false,
    loading: () => (
      <div className="w-full h-96 rounded-3xl bg-neutral-100 border border-brand-border flex items-center justify-center text-sm font-semibold text-brand-text-main/40 font-serif animate-pulse">
        Loading interactive map...
      </div>
    )
  }
);

export function LocationMap({ locationCoordinates }: LocationMapProps) {
  if (!locationCoordinates || !locationCoordinates.lat || !locationCoordinates.lng) {
    return null;
  }

  return (
    <div className="py-8 border-b border-brand-border">
      <h2 className="font-serif text-2xl font-bold mb-2 text-brand-text-main">
        Location Context
      </h2>
      <p className="text-sm text-brand-text-main/60 mb-6 max-w-xl leading-relaxed">
        To protect the privacy and safety of our long-term corporate tenants, the exact property address is shared only upon confirmed booking. The circle highlights the approximate 500m area.
      </p>
      <MapComponent lat={locationCoordinates.lat} lng={locationCoordinates.lng} />
    </div>
  );
}
