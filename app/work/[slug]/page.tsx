import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { notFound } from 'next/navigation';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Card3D } from '@/components/ui/Card3D';
import { getProjectBySlug, getProjects } from '@/lib/data/repository';
import { ArrowLeft, ArrowUpRight, Sparkles } from 'lucide-react';

interface ProjectDetailPageProps {
  params: Promise<{ slug: string }>;
}
export async function generateStaticParams() {
  const projects = await getProjects();
  return projects.map((p) => ({ slug: p.slug }));
}

export default async function ProjectDetailPage({ params }: ProjectDetailPageProps) {
  const { slug } = await params;
  const project = await getProjectBySlug(slug);

  if (!project) {
    notFound();
  }

  const allProjects = await getProjects();
  const nextProject = allProjects.find((p) => p.id !== project.id) || allProjects[0];

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-12 md:py-20 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Subtle Ambient Radial Aura */}
        <div
          className="absolute top-10 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C6FF3D]/5 rounded-full blur-[130px] pointer-events-none"
          aria-hidden="true"
        />

        {/* Navigation Breadcrumb */}
        <Link
          href="/work"
          className="inline-flex items-center gap-2 text-xs font-mono text-neutral-400 hover:text-[#C6FF3D] transition-colors mb-8 relative z-10"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          Back to Work Archive
        </Link>

        {/* Header Block */}
        <div className="mb-12 relative z-10">
          <div className="flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3">
            <span>{project.client}</span>
            <span aria-hidden="true">·</span>
            <span className="text-[#C6FF3D] font-semibold">{project.categoryLabel}</span>
            {project.publishedAt && (
              <>
                <span aria-hidden="true">·</span>
                <span>{project.publishedAt}</span>
              </>
            )}
          </div>

          <h1
            className="text-3xl sm:text-5xl md:text-6xl font-black text-white tracking-tight uppercase max-w-4xl mb-8 leading-tight"
            style={{ textWrap: 'balance' }}
          >
            {project.title}
          </h1>

          {/* Key Metrics Strip with 3D Depth */}
          <Card3D maxTilt={5} perspective={1000} liftZ={10}>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-6 p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] backdrop-blur-md shadow-xl">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="flex flex-col">
                  <span className="text-xl sm:text-2xl font-bold text-white font-mono tabular-nums">
                    {m.value}
                  </span>
                  <span className="text-[11px] font-mono text-neutral-400 uppercase mt-1">
                    {m.label}
                  </span>
                </div>
              ))}
            </div>
          </Card3D>
        </div>

        {/* Master Media Player Showcase with Native Aspect Ratio Frame */}
        <div className="w-full flex justify-center mb-16">
          <Card3D maxTilt={4} perspective={1200} liftZ={12} className="w-full flex justify-center">
            <div
              className={`relative rounded-3xl overflow-hidden bg-neutral-950 border border-white/10 shadow-[0_25px_80px_rgba(0,0,0,0.85)] flex items-center justify-center transition-all duration-500 mx-auto ${
                project.aspectRatio === '1/1'
                  ? 'aspect-square w-full max-w-xl'
                  : project.aspectRatio === '9/16'
                  ? 'aspect-[9/16] w-full max-w-[380px] max-h-[75vh]'
                  : 'aspect-[16/9] w-full'
              }`}
              style={{
                aspectRatio:
                  project.aspectRatio === '1/1'
                    ? '1 / 1'
                    : project.aspectRatio === '9/16'
                    ? '9 / 16'
                    : '16 / 9',
              }}
            >
              {/* Ambient Blurred Aura */}
              <Image
                src={project.coverUrl}
                alt=""
                fill
                className="object-cover blur-3xl opacity-35 scale-110 pointer-events-none"
                aria-hidden="true"
              />

              {project.videoUrl ? (
                <video
                  src={project.videoUrl}
                  poster={project.coverUrl}
                  controls
                  playsInline
                  className="w-full h-full object-contain relative z-10"
                />
              ) : (
                <Image
                  src={project.coverUrl}
                  alt={project.title}
                  fill
                  priority
                  className="object-contain relative z-10"
                  referrerPolicy="no-referrer"
                />
              )}
            </div>
          </Card3D>
        </div>

        {/* Deep Dive Case Study Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 mb-20 relative z-10">
          <div className="lg:col-span-8 space-y-12">
            {/* The Brief */}
            <div>
              <h3 className="text-xs font-mono uppercase tracking-wider text-[#C6FF3D] mb-3">
                01. The Brief
              </h3>
              <p className="text-base text-neutral-200 leading-relaxed">{project.brief}</p>
            </div>

            {/* The Challenge */}
            {project.challenge && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#C6FF3D] mb-3">
                  02. The Challenge
                </h3>
                <p className="text-base text-neutral-300 leading-relaxed">{project.challenge}</p>
              </div>
            )}

            {/* The Solution */}
            {project.solution && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#C6FF3D] mb-3">
                  03. Directorial & Technical Solution
                </h3>
                <p className="text-base text-neutral-300 leading-relaxed">{project.solution}</p>
              </div>
            )}

            {/* The Outcome */}
            {project.outcome && (
              <div>
                <h3 className="text-xs font-mono uppercase tracking-wider text-[#C6FF3D] mb-3">
                  04. Measurable Outcome
                </h3>
                <p className="text-base text-neutral-300 leading-relaxed">{project.outcome}</p>
              </div>
            )}
          </div>

          {/* Sidebar: Creative Credits & Metadata */}
          <div className="lg:col-span-4 space-y-8">
            <Card3D maxTilt={6} perspective={1000} liftZ={12}>
              <div className="p-6 rounded-2xl bg-neutral-900/60 border border-white/[0.08] backdrop-blur-md shadow-xl">
                <h4 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-4 pb-3 border-b border-white/[0.08]">
                  Production Credits
                </h4>
                <dl className="space-y-3 text-xs">
                  {Object.entries(project.credits).map(([role, person]) => (
                    <div key={role} className="flex justify-between items-baseline gap-2">
                      <dt className="text-neutral-400 font-mono">{role}</dt>
                      <dd className="text-white font-medium text-right">{person}</dd>
                    </div>
                  ))}
                </dl>
              </div>
            </Card3D>

            <Card3D maxTilt={6} perspective={1000} liftZ={12}>
              <div className="p-6 rounded-2xl bg-gradient-to-br from-neutral-900 via-neutral-950 to-black border border-[#C6FF3D]/30 text-center shadow-xl">
                <div className="w-8 h-8 rounded-full bg-[#C6FF3D]/10 text-[#C6FF3D] flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-4 h-4" />
                </div>
                <h4 className="text-sm font-bold text-white mb-2">Have a Similar Vision?</h4>
                <p className="text-xs text-neutral-400 mb-6">
                  Scope your campaign with our directorial team today.
                </p>
                <Link
                  href="/start-a-project"
                  className="inline-flex items-center justify-center gap-2 w-full py-3 px-4 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-all shadow-md active:scale-95"
                >
                  <span>Inquire on this Discipline</span>
                  <ArrowUpRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card3D>
          </div>
        </div>

        {/* Gallery Visual Assets with 3D Tilt */}
        {project.gallery && project.gallery.length > 0 && (
          <div className="mb-20 relative z-10">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-400 mb-6">
              Production Gallery
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {project.gallery.map((item) => (
                <Card3D key={item.id} maxTilt={6} perspective={1000} liftZ={10}>
                  <div className="relative aspect-[16/10] rounded-2xl overflow-hidden bg-neutral-900 border border-white/10 shadow-xl">
                    <Image
                      src={item.url}
                      alt={item.altText}
                      fill
                      className="object-cover"
                      referrerPolicy="no-referrer"
                    />
                  </div>
                </Card3D>
              ))}
            </div>
          </div>
        )}

        {/* Next Project Footer Link */}
        {nextProject && (
          <div className="pt-12 border-t border-white/[0.08] flex items-center justify-between relative z-10">
            <span className="text-xs font-mono text-neutral-400 uppercase">Next Production</span>
            <Link
              href={`/work/${nextProject.slug}`}
              className="text-lg md:text-xl font-bold text-white hover:text-[#C6FF3D] flex items-center gap-2 transition-colors"
            >
              {nextProject.title}
              <ArrowUpRight className="w-5 h-5 text-[#C6FF3D]" />
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
