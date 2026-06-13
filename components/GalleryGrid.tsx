"use client";

import React, { useState } from 'react';
import Image from 'next/image';
import { LayoutGrid } from 'lucide-react';
import { urlFor } from '@/sanity/lib/image';
import { GalleryLightbox } from './GalleryLightbox';

interface GalleryGridProps {
  spaceTitle: string;
  gallery: Array<{
    image?: {
      asset?: {
        _ref?: string;
        _type?: string;
      };
    };
    isFeatured?: boolean;
    photoTag?: string;
  }>;
}

export function GalleryGrid({ spaceTitle, gallery }: GalleryGridProps) {
  const [isLightboxOpen, setIsLightboxOpen] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const galleryImages = gallery || [];

  if (galleryImages.length === 0) {
    return (
      <div className="h-64 bg-brand-bg-surface shadow-sm border border-brand-border flex items-center justify-center rounded-3xl text-brand-text-main/40 font-serif">
        No photos available for this property
      </div>
    );
  }

  // Pre-generate full URLs for the Lightbox component
  const resolvedImages = galleryImages.map((img) => {
    const photo = img.image || img;
    const photoObj = photo as { asset?: { _ref?: string }; _ref?: string };
    const url = photoObj && (photoObj.asset || photoObj._ref)
      ? urlFor(photoObj).width(1200).height(900).url()
      : '';
    return {
      url,
      photoTag: img.photoTag || '',
    };
  }).filter((img) => img.url !== '');

  const featuredImageItem = galleryImages.find((img) => img.isFeatured === true) || galleryImages[0];

  const otherImages = galleryImages.filter(img => img !== featuredImageItem);

  const mainPhoto = featuredImageItem?.image || featuredImageItem;
  const mainPhotoObj = mainPhoto as { asset?: { _ref?: string }; _ref?: string };
  const mainImageUrl = mainPhotoObj && (mainPhotoObj.asset || mainPhotoObj._ref)
    ? urlFor(mainPhotoObj).width(800).height(600).url()
    : null;

  const handleImageClick = (item: (typeof galleryImages)[number]) => {
    const index = galleryImages.indexOf(item);
    setActiveIndex(index !== -1 ? index : 0);
    setIsLightboxOpen(true);
  };

  return (
    <>
      <div className="mb-10">
        {/* Desktop Mosaic Layout */}
        <div className="hidden md:grid grid-cols-4 gap-4 h-[450px] overflow-hidden rounded-3xl">
          {/* Main Large Image */}
          <div 
            onClick={() => handleImageClick(featuredImageItem)}
            className="col-span-2 relative h-full w-full overflow-hidden bg-slate-200 group cursor-pointer"
          >
            {mainImageUrl ? (
              <Image
                src={mainImageUrl}
                alt={`${spaceTitle} primary view`}
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
                  {spaceTitle}
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
                      {spaceTitle}
                    </span>
                  </div>
                );
              }

              const isLastCard = idx === 3;

              return (
                <div 
                  key={idx} 
                  onClick={() => handleImageClick(img)}
                  className="relative h-full w-full overflow-hidden bg-slate-200 group cursor-pointer"
                >
                  <Image
                    src={src}
                    alt={`${spaceTitle} view ${idx + 2}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 50vw, 25vw"
                  />
                  {img.photoTag && (
                    <div className="absolute bottom-3 left-3 bg-black/60 backdrop-blur-sm px-2 py-1 text-[10px] font-bold text-white uppercase tracking-wider rounded z-10">
                      {img.photoTag}
                    </div>
                  )}

                  {/* Floating View All Button Over Bottom-Right auxiliary card */}
                  {galleryImages.length > 5 && isLastCard && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        setActiveIndex(0);
                        setIsLightboxOpen(true);
                      }}
                      className="absolute bottom-4 right-4 flex items-center bg-white/90 border border-neutral-200 text-neutral-800 text-xs font-semibold px-4 py-2.5 rounded-xl shadow-md hover:bg-white hover:scale-[1.02] active:scale-[0.98] transition-all cursor-pointer z-20"
                    >
                      <LayoutGrid className="w-4 h-4 mr-2 text-neutral-600" />
                      Show all photos
                    </button>
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
                    {spaceTitle}
                  </span>
                </div>
              );
            }

            return (
              <div 
                key={idx} 
                onClick={() => handleImageClick(img)}
                className="snap-start shrink-0 w-full h-full relative cursor-pointer"
              >
                <Image
                  src={src}
                  alt={`${spaceTitle} gallery ${idx + 1}`}
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
      </div>

      {/* Lightbox Slider Modal */}
      {isLightboxOpen && (
        <GalleryLightbox
          images={resolvedImages}
          initialIndex={activeIndex}
          onClose={() => setIsLightboxOpen(false)}
        />
      )}
    </>
  );
}
