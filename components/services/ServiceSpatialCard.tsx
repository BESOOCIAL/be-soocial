'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Card3D } from '@/components/ui/Card3D';
import { Service3DVisual } from './Service3DVisuals';
import { Service } from '@/types';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import { motion } from 'motion/react';

interface ServiceSpatialCardProps {
  service: Service;
  index: number;
}

export function ServiceSpatialCard({ service, index }: ServiceSpatialCardProps) {
  const [isHovered, setIsHovered] = useState(false);
  const [isNavigating, setIsNavigating] = useState(false);
  const router = useRouter();

  const handleCardClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    // Smooth transition in same tab
    setIsNavigating(true);
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLAnchorElement>) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      setIsNavigating(true);
      router.push(`/services/${service.slug}`);
    }
  };

  return (
    <Link
      href={`/services/${service.slug}`}
      onClick={handleCardClick}
      onKeyDown={handleKeyDown}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onFocus={() => setIsHovered(true)}
      onBlur={() => setIsHovered(false)}
      className="group block relative outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF3D] focus-visible:ring-offset-4 focus-visible:ring-offset-[#0A0A0A] rounded-3xl"
      aria-label={`Explore ${service.title} discipline and deliverables`}
    >
      <Card3D
        maxTilt={7}
        perspective={1200}
        liftZ={22}
        className="w-full h-full"
      >
        <motion.div
          animate={{
            scale: isNavigating ? 1.07 : isHovered ? 1.04 : 1,
          }}
          transition={{ duration: 0.3, ease: 'easeOut' }}
          className={`relative rounded-3xl p-6 sm:p-7 flex flex-col justify-between h-full bg-gradient-to-b from-neutral-900/90 via-neutral-950/90 to-black border transition-all duration-300 shadow-2xl backdrop-blur-md overflow-hidden ${
            isHovered
              ? 'border-[#C6FF3D]/70 shadow-[0_20px_60px_rgba(198,255,61,0.22)]'
              : 'border-white/[0.08] hover:border-white/20'
          }`}
          style={{ transformStyle: 'preserve-3d' }}
        >
          {/* Subtle Ambient Radial Glow on Hover */}
          <div
            className={`absolute -top-12 -right-12 w-48 h-48 rounded-full bg-[#C6FF3D]/10 blur-3xl pointer-events-none transition-opacity duration-500 ${
              isHovered ? 'opacity-100' : 'opacity-0'
            }`}
            aria-hidden="true"
          />

          {/* Top Bar: Number Tag & Directional Arrow */}
          <div
            className="flex items-center justify-between mb-4 z-10"
            style={{ transform: 'translateZ(25px)' }}
          >
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#C6FF3D] shadow-[0_0_8px_#C6FF3D]" />
              <span className="text-xs font-mono tracking-widest text-[#C6FF3D] font-bold">
                0{index + 1}
              </span>
              <span className="text-[11px] font-mono text-neutral-400 uppercase tracking-wider">
                · DISCIPLINE
              </span>
            </div>

            <div
              className={`w-9 h-9 rounded-full flex items-center justify-center border transition-all duration-300 ${
                isHovered
                  ? 'bg-[#C6FF3D] border-[#C6FF3D] text-black shadow-[0_0_15px_rgba(198,255,61,0.5)] rotate-45'
                  : 'bg-neutral-900/80 border-white/10 text-neutral-400 group-hover:text-white'
              }`}
            >
              <ArrowUpRight className="w-4 h-4 transition-transform duration-300" />
            </div>
          </div>

          {/* 3D Visual Centerpiece */}
          <div className="my-2 z-10" style={{ transform: 'translateZ(30px)' }}>
            <Service3DVisual slug={service.slug} isHovered={isHovered} />
          </div>

          {/* Content Block */}
          <div className="mt-4 z-10 flex-1 flex flex-col justify-between" style={{ transform: 'translateZ(20px)' }}>
            <div>
              <h3 className="text-xl sm:text-2xl font-bold text-white mb-2 group-hover:text-[#C6FF3D] transition-colors">
                {service.title}
              </h3>
              <p className="text-xs sm:text-sm text-neutral-300/90 leading-relaxed line-clamp-2 mb-4">
                {service.shortDescription}
              </p>
            </div>

            {/* Feature Bullets preview */}
            <div className="pt-3 border-t border-white/[0.06] space-y-1.5">
              {service.features.slice(0, 2).map((feat, fIdx) => (
                <div key={fIdx} className="flex items-center gap-2 text-[11px] text-neutral-400">
                  <CheckCircle2 className="w-3 h-3 text-[#C6FF3D] shrink-0" />
                  <span className="truncate">{feat}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom Action Footer */}
          <div
            className="mt-5 pt-3 flex items-center justify-between text-xs font-mono z-10 border-t border-white/[0.04]"
            style={{ transform: 'translateZ(22px)' }}
          >
            <span className="text-neutral-400 group-hover:text-neutral-200 transition-colors">
              Explore Dedicated Scope
            </span>
            <span className="text-[#C6FF3D] font-bold group-hover:translate-x-1 transition-transform">
              View Service →
            </span>
          </div>
        </motion.div>
      </Card3D>
    </Link>
  );
}
