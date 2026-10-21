import React from 'react';
import Link from 'next/link';

export function Footer() {
  return (
    <footer className="w-full bg-[#080808] border-t border-white/[0.08] text-neutral-400 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          {/* Col 1: Wordmark & Statement */}
          <div className="md:col-span-1 space-y-4">
            <Link
              href="/"
              className="text-xl font-black text-white hover:text-[#C6FF3D] transition-colors uppercase tracking-tight"
            >
              BE SOOCIAL
            </Link>
            <p className="text-xs text-neutral-400 leading-relaxed max-w-xs">
              Creative media & production agency engineering cultural gravity for brands through cinematic video, AI filmmaking, and high-performance digital experiences.
            </p>
            <div className="pt-2 text-xs font-mono text-neutral-400">
              New York · London · Tokyo
            </div>
          </div>

          {/* Col 2: Capabilities / Services */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-200">
              Capabilities
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/services/brand-management" className="hover:text-white transition-colors">
                  Brand Management
                </Link>
              </li>
              <li>
                <Link href="/services/video-editing" className="hover:text-white transition-colors">
                  Video Editing
                </Link>
              </li>
              <li>
                <Link href="/services/ai-filmmaking" className="hover:text-white transition-colors">
                  AI Filmmaking
                </Link>
              </li>
              <li>
                <Link href="/services/website-development" className="hover:text-white transition-colors">
                  Website Development
                </Link>
              </li>
              <li>
                <Link href="/services/digital-marketing" className="hover:text-white transition-colors">
                  Digital Marketing
                </Link>
              </li>
              <li>
                <Link href="/services/ai-ugc-ads" className="hover:text-white transition-colors">
                  AI UGC Ads
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Navigation */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-200">
              Agency
            </h3>
            <ul className="space-y-2 text-xs">
              <li>
                <Link href="/work" className="hover:text-white transition-colors">
                  Selected Work
                </Link>
              </li>
              <li>
                <Link href="/ai-studio" className="hover:text-white transition-colors">
                  AI Studio Pipeline
                </Link>
              </li>
              <li>
                <Link href="/about" className="hover:text-white transition-colors">
                  Manifesto & Team
                </Link>
              </li>
              <li>
                <Link href="/contact" className="hover:text-white transition-colors">
                  Direct Inquiries
                </Link>
              </li>
              <li>
                <Link href="/start-a-project" className="text-[#C6FF3D] hover:underline transition-colors font-medium">
                  Start a Project
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Studio Direct Contact */}
          <div className="space-y-3">
            <h3 className="text-xs font-mono uppercase tracking-wider text-neutral-200">
              Direct Inquiries
            </h3>
            <p className="text-xs text-neutral-400">
              For commercial productions, brand retainers, and keynotes:
            </p>
            <div className="text-xs font-mono text-white">
              inquiries@besoocial.com
            </div>
            <div className="pt-2">
              <Link
                href="/admin"
                className="inline-block text-[11px] font-mono text-neutral-400 hover:text-neutral-200 transition-colors"
              >
                Access Admin Portal →
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/[0.08] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-neutral-400">
          <div>
            © {new Date().getFullYear()} BE SOOCIAL LLC. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <Link href="/privacy" className="hover:text-neutral-200 transition-colors">
              Privacy Policy
            </Link>
            <Link href="/terms" className="hover:text-neutral-200 transition-colors">
              Terms of Engagement
            </Link>
            <Link href="/admin" className="hover:text-neutral-200 transition-colors">
              Admin
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
