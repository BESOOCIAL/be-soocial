import React, { Suspense } from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { CinematicProjectCard3D } from '@/components/work/CinematicProjectCard3D';
import { CategoryFilter } from '@/components/work/CategoryFilter';
import { getProjects } from '@/lib/data/repository';

interface WorkPageProps {
  searchParams: Promise<{ category?: string }>;
}

export default async function WorkPage({ searchParams }: WorkPageProps) {
  const resolvedParams = await searchParams;
  const activeCategory = resolvedParams?.category;
  const projects = await getProjects(activeCategory);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Subtle Ambient Radial Aura */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#C6FF3D]/5 rounded-full blur-[140px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Header Strip with Filter */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-12 relative z-10">
          <SectionHeading
            number="ARCHIVE"
            tagline="Selected Work"
            title="Production Portfolio & Proven Outcomes"
            description="Explore our verified commercial campaigns, AI filmmaking world-building, and digital growth platforms."
            className="mb-0"
          />

          <Suspense fallback={<div className="h-10 w-48 bg-neutral-900 rounded-lg animate-pulse" />}>
            <CategoryFilter />
          </Suspense>
        </div>

        {/* 3D Cinematic Project Grid */}
        {projects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10">
            {projects.map((project) => (
              <CinematicProjectCard3D key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="p-16 text-center rounded-2xl bg-neutral-900/40 border border-white/10 relative z-10">
            <h3 className="text-lg font-bold text-white mb-2">No projects found in this discipline</h3>
            <p className="text-xs text-neutral-400">
              Try selecting another discipline tab above or check back shortly.
            </p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
