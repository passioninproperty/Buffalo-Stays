'use client';

import React, { useState, useRef, useEffect } from 'react';

interface CollapsibleDescriptionProps {
  description: string;
}

export function CollapsibleDescription({ description }: CollapsibleDescriptionProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [shouldShowButton, setShouldShowButton] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (contentRef.current) {
      if (contentRef.current.scrollHeight > 280) {
        setShouldShowButton(true);
      }
    }
  }, [description]);

  if (!description) {
    return (
      <div className="text-brand-text-main/80 leading-relaxed space-y-4 whitespace-pre-line text-base">
        No description is currently available for this workspace/extended stay. Contact us for direct inquiries.
      </div>
    );
  }

  const isCollapsed = !isExpanded && shouldShowButton;

  return (
    <div className="flex flex-col">
      <div
        className={`overflow-hidden relative transition-all duration-500 ease-in-out ${
          isCollapsed ? 'max-h-[280px]' : 'max-h-[2000px]'
        }`}
      >
        <div
          ref={contentRef}
          className="text-brand-text-main/80 leading-relaxed space-y-4 whitespace-pre-line text-base"
        >
          {description}
        </div>
        
        {/* Smooth gradient overlay when collapsed */}
        {isCollapsed && (
          <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-brand-bg-main to-transparent pointer-events-none transition-opacity duration-300" />
        )}
      </div>

      {shouldShowButton && (
        <button
          onClick={() => setIsExpanded(!isExpanded)}
          className="mt-4 text-left text-sm font-bold text-brand-primary hover:text-brand-primary-hover tracking-wider uppercase inline-flex items-center gap-1 w-fit focus:outline-none transition-colors"
        >
          {isExpanded ? 'Show less' : 'Show more'}
        </button>
      )}
    </div>
  );
}
