"use client";

import React, { useState, useEffect, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Wind, Sparkles, Droplet, Thermometer, Package, WashingMachine, Shirt,
  Pocket, Bed, EyeOff, Hammer, GitCommit, Box, Tv, Circle, Baby, Dices,
  Fan, Flame, Snowflake, Volume2, Bell, ShieldAlert, HeartHandshake, 
  Video, Wifi, Laptop, Utensils, Refrigerator, Microwave, CookingPot, 
  Coffee, GlassWater, Grid, Blend, Key, DoorOpen, Shrub,
  Armchair, Table, Car, PawPrint, Calendar, KeyRound, Brush, HelpCircle, X
} from 'lucide-react';

interface AmenityItem {
  isAvailable: boolean;
  amenity?: {
    title: string;
    iconSlug: string;
    category?: {
      title: string;
    };
  };
}

interface AmenitiesSectionProps {
  amenities: AmenityItem[];
}

const ICON_MAP: Record<string, React.ComponentType<{ className?: string }>> = {
  'wind': Wind,
  'sparkles': Sparkles,
  'droplet': Droplet,
  'thermometer': Thermometer,
  'container': Package,
  'washing-machine': WashingMachine,
  'shirt': Shirt,
  'pocket': Pocket,
  'bed': Bed,
  'eye-off': EyeOff,
  'utility-pole': Hammer,
  'git-commit': GitCommit,
  'box': Box,
  'tv': Tv,
  'circle': Circle,
  'baby': Baby,
  'dices': Dices,
  'fan': Fan,
  'flame': Flame,
  'snowflake': Snowflake,
  'volume-2': Volume2,
  'bell': Bell,
  'shield-alert': ShieldAlert,
  'shield-x': ShieldAlert, // fallback mapping
  'heart-handshake': HeartHandshake,
  'video': Video,
  'wifi': Wifi,
  'laptop': Laptop,
  'utensils': Utensils,
  'refrigerator': Refrigerator,
  'microwave': Microwave,
  'pan': CookingPot,
  'fork-knife': Utensils,
  'cooking-pot': CookingPot,
  'oven': CookingPot,
  'coffee': Coffee,
  'glass-water': GlassWater,
  'toast': Box,
  'grid': Grid,
  'blend': Blend,
  'key': Key,
  'door-open': DoorOpen,
  'shrub': Shrub,
  'armchair': Armchair,
  'table': Table,
  'car': Car,
  'paw-print': PawPrint,
  'calendar': Calendar,
  'keypad': KeyRound,
  'brush': Brush
};

const getAmenityIcon = (slug?: string) => {
  if (!slug) return HelpCircle;
  const cleanSlug = slug.toLowerCase().trim();
  return ICON_MAP[cleanSlug] || HelpCircle;
};

export function AmenitiesSection({ amenities }: AmenitiesSectionProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Group full amenities by category for the modal list
  const groupedAmenitiesMap = amenities.reduce<
    Record<string, Array<{ title: string; iconSlug: string; isAvailable: boolean }>>
  >((acc, item) => {
    if (item.amenity && item.amenity.category?.title) {
      const categoryTitle = item.amenity.category.title;
      if (!acc[categoryTitle]) {
        acc[categoryTitle] = [];
      }
      acc[categoryTitle].push({
        title: item.amenity.title,
        iconSlug: item.amenity.iconSlug,
        isAvailable: item.isAvailable !== false,
      });
    }
    return acc;
  }, {});

  const amenityGroups = Object.entries(groupedAmenitiesMap).map(([title, list]) => ({
    title,
    list,
  }));

  // Limit to exactly 6 key amenities for curated preview
  const previewAmenities = amenities.slice(0, 6);

  // Keyboard Escape listener
  const handleKeyDown = useCallback((e: KeyboardEvent) => {
    if (e.key === 'Escape') {
      setIsModalOpen(false);
    }
  }, []);

  useEffect(() => {
    if (isModalOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
    } else {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    }
    return () => {
      document.body.style.overflow = '';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isModalOpen, handleKeyDown]);

  return (
    <div className="py-8 border-b border-brand-border">
      <h2 className="font-serif text-2xl font-bold mb-6 text-brand-text-main">
        What this space offers
      </h2>

      {/* Curated Preview Grid (Exactly 6 Items) */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-8">
        {previewAmenities.map((item, idx) => {
          if (!item.amenity) return null;
          const isAvailable = item.isAvailable;
          const IconComponent = getAmenityIcon(item.amenity.iconSlug);
          return (
            <div
              key={idx}
              className={`flex items-center gap-3.5 ${
                isAvailable
                  ? 'text-brand-text-main'
                  : 'line-through text-neutral-400 opacity-60'
              }`}
            >
              <div className={`w-9 h-9 rounded-full flex items-center justify-center shrink-0 ${
                isAvailable ? 'bg-brand-primary/5 text-brand-primary' : 'bg-brand-text-main/5 text-brand-text-main/30'
              }`}>
                <IconComponent className="w-4.5 h-4.5" />
              </div>
              <span className="text-sm font-semibold">
                {isAvailable ? '' : 'Unavailable: '}{item.amenity.title}
              </span>
            </div>
          );
        })}
      </div>

      {/* Show All Trigger Button */}
      {amenities.length > 6 && (
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-6 py-3 border border-brand-text-main/20 hover:border-brand-text-main/60 rounded-xl text-xs font-bold uppercase tracking-wider text-brand-text-main hover:bg-neutral-50 transition-colors duration-200 cursor-pointer"
        >
          Show all {amenities.length} amenities
        </button>
      )}

      {/* Structured Overlay Modal Dialog */}
      <AnimatePresence>
        {isModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsModalOpen(false)}
              className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            />

            {/* Modal Box */}
            <motion.div
              initial={{ opacity: 0, scale: 0.95, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95, y: 15 }}
              transition={{ type: 'spring', duration: 0.4 }}
              className="relative bg-white w-full max-w-2xl rounded-3xl shadow-2xl overflow-hidden flex flex-col max-h-[85vh] z-10 border border-brand-border"
            >
              {/* Header */}
              <div className="flex items-center justify-between p-6 border-b border-brand-border bg-brand-bg-surface">
                <div>
                  <h3 className="font-serif text-xl font-bold text-brand-text-main">
                    All Amenities
                  </h3>
                  <p className="text-xs text-brand-text-main/50 mt-1">
                    Complete breakdown of features available in this stay
                  </p>
                </div>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="p-2.5 rounded-full hover:bg-neutral-100 transition-colors duration-200 cursor-pointer text-brand-text-main/70"
                  aria-label="Close amenities modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Scrollable Viewport Container */}
              <div className="flex-1 overflow-y-auto p-8 space-y-8 scrollbar-thin">
                {amenityGroups.map((group) => (
                  <div key={group.title} className="border-b border-brand-border/60 pb-6 last:border-0 last:pb-0">
                    <h4 className="font-serif text-sm font-bold text-brand-text-main/50 mb-4 uppercase tracking-widest">
                      {group.title}
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {group.list.map((amenity, idx) => {
                        const isAvailable = amenity.isAvailable;
                        const IconComponent = getAmenityIcon(amenity.iconSlug);
                        return (
                          <div
                            key={idx}
                            className={`flex items-center gap-3 ${
                              isAvailable
                                ? 'text-brand-text-main'
                                : 'line-through text-neutral-400 opacity-60'
                            }`}
                          >
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 ${
                              isAvailable ? 'bg-brand-primary/5 text-brand-primary' : 'bg-brand-text-main/5 text-brand-text-main/30'
                            }`}>
                              <IconComponent className="w-4 h-4" />
                            </div>
                            <span className="text-sm font-semibold">
                              {isAvailable ? '' : 'Unavailable: '}{amenity.title}
                            </span>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
