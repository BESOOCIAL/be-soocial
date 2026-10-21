import React from 'react';
import Link from 'next/link';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { InteractiveServiceCard3D } from '@/components/services/InteractiveServiceCard3D';
import { CinematicProjectCard3D } from '@/components/work/CinematicProjectCard3D';
import { InteractiveProcessTimeline3D } from '@/components/process/InteractiveProcessTimeline3D';
import { AgencyManifesto3D } from '@/components/about/AgencyManifesto3D';
import { ClosingCta3D } from '@/components/cta/ClosingCta3D';
import { Card3D } from '@/components/ui/Card3D';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { FrontPageCinematicHeroExperience } from '@/components/home/FrontPageCinematicHeroExperience';
import { getFeaturedProjects, getServices, getTestimonials, getFAQs } from '@/lib/data/repository';
import { Quote } from 'lucide-react';

export default async function HomePage() {
  const [featuredProjects, services, testimonials, faqs] = await Promise.all([
    getFeaturedProjects(),
    getServices(),
    getTestimonials(),
    getFAQs(null),
  ]);

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black relative">
      <Header />

      <main className="flex-1">
        {/* =========================================================================
            1. HERO SECTION WITH APPLE-CHOREOGRAPHED ELEMENT-BY-ELEMENT ALIGNMENT
           ========================================================================= */}
        <FrontPageCinematicHeroExperience />

        {/* =========================================================================
            2. CAPABILITIES & SERVICES 3D INTERACTIVE BENTO
           ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
          <SectionHeading
            number="01"
            tagline="Core Capabilities"
            title="Six Specialized Disciplines. One Unified Agency."
            description="We eliminate agency fragmentation by integrating brand strategy, post-production, AI filmmaking, and engineering under a singular standard."
          />

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <InteractiveServiceCard3D
                key={service.id}
                service={service}
                index={index}
                isMarquee={index === 0 || index === 2}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            3. SELECTED WORK & CASE STUDIES 3D CINEMATIC SHOWCASE
           ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <SectionHeading
              number="02"
              tagline="Portfolio"
              title="Proof of Impact Across Global Campaigns"
              description="Real productions, real client metrics, and cultural gravity engineered without compromise."
              className="mb-0"
            />
            <Link
              href="/work"
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C6FF3D] hover:underline whitespace-nowrap self-start md:self-end"
            >
              View Full Work Archive ({featuredProjects.length}+) →
            </Link>
          </div>

          <div className="space-y-12">
            {featuredProjects.map((project, idx) => (
              <CinematicProjectCard3D
                key={project.id}
                project={project}
                featuredLayout={idx === 0}
              />
            ))}
          </div>
        </section>

        {/* =========================================================================
            4. CREATIVE PRODUCTION METHODOLOGY (3D TIMELINE)
           ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
          <SectionHeading
            number="03"
            tagline="Production Framework"
            title="How We Deliver at 4x Traditional Velocity"
            description="Our end-to-end framework bridges directorial taste with neural workflows to eliminate bloated production timelines."
            align="center"
          />

          <InteractiveProcessTimeline3D />
        </section>

        {/* =========================================================================
            5. AGENCY INTRODUCTION & MANIFESTO 3D PREVIEW
           ========================================================================= */}
        <AgencyManifesto3D />

        {/* =========================================================================
            6. AUTHENTIC CLIENT TESTIMONIALS (3D PERSPECTIVE CARDS)
           ========================================================================= */}
        <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
          <SectionHeading
            number="04"
            tagline="Client Voices"
            title="Attributable Impact, Verified by Partners"
            description="We pride ourselves on transparent relationships with leaders across luxury, technology, and consumer brands."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((t) => (
              <Card3D
                key={t.id}
                maxTilt={8}
                perspective={1000}
                liftZ={15}
                className="h-full"
              >
                <div
                  className="h-full p-8 rounded-2xl bg-neutral-900/50 border border-white/[0.08] hover:border-[#C6FF3D]/40 transition-colors duration-300 flex flex-col justify-between backdrop-blur-sm shadow-xl"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div style={{ transform: 'translateZ(20px)' }}>
                    <div className="w-8 h-8 rounded-lg bg-neutral-800/80 flex items-center justify-center text-[#C6FF3D] mb-4">
                      <Quote className="w-4 h-4" />
                    </div>
                    <blockquote className="text-sm md:text-base text-neutral-200 leading-relaxed mb-6 italic">
                      “{t.quote}”
                    </blockquote>
                  </div>

                  <div
                    className="pt-4 border-t border-white/[0.08] flex items-center gap-3"
                    style={{ transform: 'translateZ(30px)' }}
                  >
                    <div className="w-10 h-10 rounded-full bg-neutral-800 border border-neutral-700 flex items-center justify-center font-bold text-xs text-[#C6FF3D] shadow-md">
                      {t.authorName.charAt(0)}
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white">{t.authorName}</div>
                      <div className="text-xs text-neutral-400">
                        {t.role} · {t.company}
                      </div>
                    </div>
                  </div>
                </div>
              </Card3D>
            ))}
          </div>
        </section>

        {/* =========================================================================
            7. FREQUENTLY ASKED QUESTIONS
           ========================================================================= */}
        <section className="py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 border-b border-white/[0.08]">
          <SectionHeading
            number="05"
            tagline="Clarifications"
            title="Frequently Addressed Questions"
            align="center"
          />

          <div className="space-y-4">
            {faqs.map((faq) => (
              <details
                key={faq.id}
                className="group p-6 rounded-2xl bg-neutral-900/30 border border-white/[0.08] open:border-[#C6FF3D]/40 transition-all backdrop-blur-sm"
              >
                <summary className="text-base font-semibold text-white cursor-pointer list-none flex items-center justify-between gap-4">
                  <span>{faq.question}</span>
                  <span className="text-[#C6FF3D] font-mono text-lg transition-transform group-open:rotate-45">
                    +
                  </span>
                </summary>
                <p className="mt-4 text-sm text-neutral-400 leading-relaxed">
                  {faq.answer}
                </p>
              </details>
            ))}
          </div>
        </section>

        {/* =========================================================================
            8. CLOSING CONTACT CTA WITH SPATIAL CONSTELLATION BACKDROP
           ========================================================================= */}
        <ClosingCta3D />
      </main>

      <Footer />
    </div>
  );
}
