"use client";

import React, { useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import { X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryLightboxProps {
  images: Array<{
    url: string;
    photoTag?: string;
  }>;
  initialIndex: number;
  onClose: () => void;
}

const slideVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? '100%' : '-100%',
    opacity: 0,
  }),
  center: {
    x: 0,
    opacity: 1,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  },
  exit: (direction: number) => ({
    x: direction < 0 ? '100%' : '-100%',
    opacity: 0,
    transition: {
      x: { type: 'spring' as const, stiffness: 300, damping: 30 },
      opacity: { duration: 0.2 },
    },
  }),
};

export function GalleryLightbox({ images, initialIndex, onClose }: GalleryLightboxProps) {
  const [[page, direction], setPage] = useState([initialIndex, 0]);

  const activeIndex = (page % images.length + images.length) % images.length;

  const paginate = useCallback((newDirection: number) => {
    setPage(([prevPage]) => [prevPage + newDirection, newDirection]);
  }, []);

  useEffect(() => {
    // Disable background scroll when modal is open
    document.body.style.overflow = 'hidden';
    
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      } else if (e.key === 'ArrowRight') {
        paginate(1);
      } else if (e.key === 'ArrowLeft') {
        paginate(-1);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [paginate, onClose]);

  if (images.length === 0) return null;

  const currentImage = images[activeIndex];

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-md flex flex-col justify-between select-none">
      {/* Top Header Bar */}
      <div className="w-full flex items-center justify-between p-6 z-10">
        <div className="text-white/80 text-sm font-semibold tracking-wider uppercase bg-white/10 backdrop-blur-md px-4 py-2 rounded-full">
          {currentImage.photoTag || 'Buffalo Stays Stay View'}
        </div>
        <button
          onClick={onClose}
          className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-all duration-200 cursor-pointer focus:outline-none"
          aria-label="Close lightbox"
        >
          <X className="w-6 h-6" />
        </button>
      </div>

      {/* Main Image Slider Viewport */}
      <div className="relative flex-1 w-full flex items-center justify-center overflow-hidden px-4">
        {/* Left Arrow Navigation */}
        <button
          onClick={() => paginate(-1)}
          className="absolute left-6 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer z-10 hidden md:flex items-center justify-center focus:outline-none"
          aria-label="Previous image"
        >
          <ChevronLeft className="w-6 h-6" />
        </button>

        {/* Sliding Animation Container */}
        <div className="relative w-full max-w-5xl h-[70vh] flex items-center justify-center">
          <AnimatePresence initial={false} custom={direction} mode="popLayout">
            <motion.div
              key={page}
              custom={direction}
              variants={slideVariants}
              initial="enter"
              animate="center"
              exit="exit"
              className="absolute w-full h-full flex items-center justify-center"
            >
              <div className="relative w-full h-full rounded-2xl overflow-hidden shadow-2xl">
                <Image
                  src={currentImage.url}
                  alt={`Stay view ${activeIndex + 1}`}
                  fill
                  className="object-contain"
                  priority
                  sizes="(max-width: 1024px) 100vw, 80vw"
                />
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Right Arrow Navigation */}
        <button
          onClick={() => paginate(1)}
          className="absolute right-6 p-4 rounded-full bg-white/10 text-white hover:bg-white/20 hover:scale-105 transition-all duration-200 cursor-pointer z-10 hidden md:flex items-center justify-center focus:outline-none"
          aria-label="Next image"
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      </div>

      {/* Footer / Pagination & Swipe controls */}
      <div className="w-full flex flex-col items-center gap-4 py-8 z-10">
        {/* Mobile Swipe / Arrow helper indicators */}
        <div className="flex md:hidden gap-6">
          <button
            onClick={() => paginate(-1)}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
            aria-label="Previous image"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>
          <button
            onClick={() => paginate(1)}
            className="p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition cursor-pointer"
            aria-label="Next image"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        <div className="text-white/60 text-sm font-semibold tracking-widest uppercase">
          {activeIndex + 1} / {images.length}
        </div>
      </div>
    </div>
  );
}
