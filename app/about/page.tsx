import React from 'react';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card3D } from '@/components/ui/Card3D';
import { SpatialConstellationScene } from '@/components/three/SpatialConstellationScene';
import { ArrowRight, Eye, Shield, Zap, Sparkles, Globe } from 'lucide-react';

export default function AboutPage() {
  const leadership = [
    {
      name: 'Arman Vance',
      role: 'Founding Partner & Executive Creative Director',
      background: 'Former commercial director at RSA Films. Directs global campaigns combining live cinematography with experimental VFX.',
      location: 'New York',
    },
    {
      name: 'Elena Rostova',
      role: 'Head of AI Studio & Virtual Production',
      background: 'Pioneered generative video workflows in Hollywood. Leads our proprietary ComfyUI rigs, character consistency engines, and LoRA labs.',
      location: 'London',
    },
    {
      name: 'Marcus Sterling',
      role: 'Supervising Post Director',
      background: '15+ years in high-tempo commercial and trailer editing. Obsessed with rhythmic pacing, kinetic typography, and Atmos spatial audio.',
      location: 'Tokyo',
    },
    {
      name: 'Liam Chen',
      role: 'Head of Performance Growth',
      background: 'Engineered $120M+ in direct-response ad spend across Meta, TikTok, and YouTube. Architect of our high-velocity creative testing systems.',
      location: 'New York',
    },
  ];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-16 md:py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Real 3D Spatial Constellation in the background */}
        <SpatialConstellationScene className="opacity-30" />

        {/* Hero Manifesto */}
        <div className="relative z-10 mb-16">
          <SectionHeading
            number="MANIFESTO"
            tagline="About BE SOOCIAL"
            title="We Exist to Create Unshakable Cultural Gravity"
            description="In an ocean of algorithmic mediocrity, ordinary brand content evaporates. We build visual worlds that command undivided human attention."
          />
        </div>

        {/* Core Principles Grid with 3D Depth */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24 relative z-10">
          <Card3D maxTilt={9} perspective={1000} liftZ={15}>
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full">
              <Eye className="w-6 h-6 text-[#C6FF3D] mb-4" />
              <h3 className="text-base font-bold text-white mb-2">Taste Precedes Tooling</h3>
              <p className="text-xs text-neutral-300/90 leading-relaxed">
                Anyone can push a prompt into an AI model. Only directors with refined taste and deep film literacy know which 24 frames belong in the cut.
              </p>
            </div>
          </Card3D>

          <Card3D maxTilt={9} perspective={1000} liftZ={15}>
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full">
              <Zap className="w-6 h-6 text-[#C6FF3D] mb-4" />
              <h3 className="text-base font-bold text-white mb-2">Pacing is Currency</h3>
              <p className="text-xs text-neutral-300/90 leading-relaxed">
                Feeds reward immediate momentum. We treat the first 800ms of any commercial or video as sacred ground for retention and story setup.
              </p>
            </div>
          </Card3D>

          <Card3D maxTilt={9} perspective={1000} liftZ={15}>
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full">
              <Shield className="w-6 h-6 text-[#C6FF3D] mb-4" />
              <h3 className="text-base font-bold text-white mb-2">Zero Slop Discipline</h3>
              <p className="text-xs text-neutral-300/90 leading-relaxed">
                No generic buzzwords, fake engagement vanity metrics, or low-effort filler. Every production is designed to endure as a genuine case study.
              </p>
            </div>
          </Card3D>

          <Card3D maxTilt={9} perspective={1000} liftZ={15}>
            <div className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors backdrop-blur-md shadow-xl h-full">
              <Sparkles className="w-6 h-6 text-[#C6FF3D] mb-4" />
              <h3 className="text-base font-bold text-white mb-2">Engineering Parity</h3>
              <p className="text-xs text-neutral-300/90 leading-relaxed">
                Our web experiences are built with headless performance, 60fps 3D spatial WebGL, and microsecond latency to mirror our visual standards.
              </p>
            </div>
          </Card3D>
        </div>

        {/* Leadership Team with 3D Depth */}
        <div className="mb-24 relative z-10">
          <SectionHeading
            number="LEADERSHIP"
            tagline="Studio Directors"
            title="The Minds Directing the Work"
            description="Our studio is led by veteran cinematographers, technical artists, and growth engineers."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {leadership.map((leader, idx) => (
              <Card3D key={idx} maxTilt={6} perspective={1200} liftZ={15}>
                <div
                  className="p-8 rounded-3xl bg-neutral-900/60 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-all backdrop-blur-md shadow-xl flex flex-col justify-between h-full"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div style={{ transform: 'translateZ(20px)' }}>
                    <div className="flex items-center justify-between mb-3 text-xs font-mono text-neutral-400">
                      <span>{leader.location}</span>
                      <span className="text-[#C6FF3D] font-bold">PARTNER</span>
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-1">{leader.name}</h3>
                    <div className="text-xs font-mono text-neutral-400 mb-4">{leader.role}</div>
                    <p className="text-xs md:text-sm text-neutral-300 leading-relaxed">
                      {leader.background}
                    </p>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </div>

        {/* Global Production Stations 3D Card */}
        <Card3D maxTilt={5} perspective={1400} liftZ={14} className="mb-16">
          <div className="p-10 md:p-14 rounded-3xl bg-neutral-950/90 border border-white/[0.08] shadow-2xl backdrop-blur-md relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-[#C6FF3D]/5 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />
            <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-[#C6FF3D] mb-6">
              <Globe className="w-4 h-4" />
              <span>GLOBAL PRODUCTION STATIONS</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div>
                <div className="text-xl font-bold text-white mb-1">New York</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  SoHo Creative Suite & Strategy Hub<br />
                  Directing commercial narrative & brand identity
                </p>
              </div>
              <div>
                <div className="text-xl font-bold text-white mb-1">London</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Shoreditch Virtual Production Lab<br />
                  GPU compute clusters & generative VFX suites
                </p>
              </div>
              <div>
                <div className="text-xl font-bold text-white mb-1">Tokyo</div>
                <p className="text-xs text-neutral-400 leading-relaxed">
                  Minato-ku Sound & Edit Studios<br />
                  Spatial Atmos sound design & 4K finishing
                </p>
              </div>
            </div>
          </div>
        </Card3D>

        {/* CTA */}
        <div className="text-center py-8 relative z-10">
          <Link
            href="/start-a-project"
            className="inline-flex items-center gap-2 px-8 py-4 text-sm font-bold text-black bg-[#C6FF3D] hover:bg-[#b2eb2d] rounded-xl transition-all shadow-[0_0_30px_rgba(198,255,61,0.25)] active:scale-95 cursor-pointer"
          >
            <span>Work with BE SOOCIAL</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
