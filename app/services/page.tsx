import React from 'react';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { ServicesSpatialArcHero } from '@/components/services/ServicesSpatialArcHero';
import { ServiceSpatialCard } from '@/components/services/ServiceSpatialCard';
import { Card3D } from '@/components/ui/Card3D';
import { ClosingCta3D } from '@/components/cta/ClosingCta3D';
import { getServices } from '@/lib/data/repository';
import { Sparkles, ShieldCheck, Zap, Globe, Layers } from 'lucide-react';

export const metadata = {
  title: '06 Services. One Vision. | BE SOOCIAL',
  description:
    'From ideas to impact — we create, manage and grow your brand through creativity and technology. Explore our 6 core agency disciplines.',
};

export default async function ServicesPage() {
  const services = await getServices();

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 w-full relative">
        {/* Subtle Ambient Radial Aura */}
        <div
          className="absolute top-12 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#C6FF3D]/5 rounded-full blur-[160px] pointer-events-none"
          aria-hidden="true"
        />

        {/* 1. Spatial Arc Hero Section */}
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <ServicesSpatialArcHero services={services} />
        </div>

        {/* 2. Six Interactive 3D Service Cards Grid */}
        <section className="py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10 border-t border-white/[0.06]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <div className="inline-flex items-center gap-2 text-xs font-mono text-[#C6FF3D] uppercase tracking-widest mb-3">
                <Layers className="w-3.5 h-3.5 text-[#C6FF3D]" />
                <span>ALL DISCIPLINE PANELS</span>
              </div>
              <h2 className="text-3xl sm:text-5xl font-black text-white uppercase tracking-tight">
                Deep Dive Architecture
              </h2>
            </div>
            <p className="text-sm text-neutral-400 max-w-md font-light">
              Every discipline operates as an independent production unit or orchestrates together as an enterprise agency partner. Hover to inspect 3D layers; click to view dedicated scope.
            </p>
          </div>

          {/* Responsive 3D Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, idx) => (
              <ServiceSpatialCard key={service.id} service={service} index={idx} />
            ))}
          </div>
        </section>

        {/* 3. The BE SOOCIAL Advantage Strip */}
        <section className="py-16 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative z-10">
          <Card3D maxTilt={5} perspective={1400} liftZ={15}>
            <div className="p-8 sm:p-12 rounded-3xl bg-neutral-900/60 border border-white/10 backdrop-blur-xl grid grid-cols-1 md:grid-cols-3 gap-8 shadow-2xl">
              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 flex items-center justify-center text-[#C6FF3D]">
                  <Zap className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">High Velocity Production</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Generative pre-visualization and modular edit suites cut campaign turnaround from months to weeks without compromising fidelity.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 flex items-center justify-center text-[#C6FF3D]">
                  <ShieldCheck className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Full Intellectual Property</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  Every asset, codebase, 3D model, token system, and audio stem delivered is 100% owned by your enterprise with zero recurring royalties.
                </p>
              </div>

              <div className="space-y-3">
                <div className="w-10 h-10 rounded-xl bg-[#C6FF3D]/10 border border-[#C6FF3D]/30 flex items-center justify-center text-[#C6FF3D]">
                  <Globe className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-white">Global Scalability</h3>
                <p className="text-xs sm:text-sm text-neutral-400 leading-relaxed">
                  From localized social cutdowns to multi-currency 3D digital flagships, our outputs are tested across international viewing environments.
                </p>
              </div>
            </div>
          </Card3D>
        </section>

        {/* 4. Closing CTA */}
        <ClosingCta3D />
      </main>

      <Footer />
    </div>
  );
}
