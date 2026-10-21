'use client';

import React from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

const CATEGORIES = [
  { id: 'all', label: 'All Disciplines' },
  { id: 'ai-filmmaking', label: 'AI Filmmaking' },
  { id: 'video-editing', label: 'Video Editing' },
  { id: 'brand-management', label: 'Brand Strategy' },
  { id: 'website-development', label: 'Web Experiences' },
  { id: 'digital-marketing', label: 'Growth Engines' },
  { id: 'ai-ugc-ads', label: 'AI UGC Ads' },
];

export function CategoryFilter() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const currentCategory = searchParams.get('category') || 'all';

  const handleSelect = (categoryId: string) => {
    if (categoryId === 'all') {
      router.push('/work', { scroll: false });
    } else {
      router.push(`/work?category=${categoryId}`, { scroll: false });
    }
  };

  return (
    <div className="flex items-center gap-1.5 p-1 bg-neutral-900/80 border border-white/[0.08] rounded-xl overflow-x-auto no-scrollbar max-w-full">
      {CATEGORIES.map((cat) => {
        const isActive = currentCategory === cat.id;
        return (
          <button
            key={cat.id}
            type="button"
            onClick={() => handleSelect(cat.id)}
            className={`px-3.5 py-2 text-xs font-medium rounded-lg transition-all whitespace-nowrap shrink-0 cursor-pointer ${
              isActive
                ? 'bg-[#C6FF3D] text-black font-semibold shadow-sm'
                : 'text-neutral-400 hover:text-white hover:bg-neutral-800/60'
            }`}
          >
            {cat.label}
          </button>
        );
      })}
    </div>
  );
}
