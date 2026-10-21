'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, X } from 'lucide-react';

const NAV_LINKS = [
  { href: '/work', label: 'Work' },
  { href: '/services', label: 'Services' },
  { href: '/ai-studio', label: 'AI Studio' },
  { href: '/about', label: 'About' },
  { href: '/contact', label: 'Contact' },
];

export function Header() {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full bg-[#0A0A0A]/90 backdrop-blur-md border-b border-white/[0.08]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between gap-8">
        {/* Zone 1: Brand Wordmark (Single text element) */}
        <Link
          href="/"
          className="text-xl md:text-2xl font-black tracking-tight text-white hover:text-[#C6FF3D] transition-colors whitespace-nowrap shrink-0 uppercase"
        >
          BE SOOCIAL
        </Link>

        {/* Zone 2: 4–5 Single-Line Nav Links */}
        <nav
          aria-label="Main Navigation"
          className="hidden md:flex items-center gap-8 text-sm font-medium text-neutral-300"
        >
          {NAV_LINKS.map((link) => {
            const isActive = pathname === link.href || pathname.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`transition-colors whitespace-nowrap shrink-0 hover:text-white py-1 relative ${
                  isActive ? 'text-[#C6FF3D]' : 'text-neutral-400'
                }`}
              >
                {link.label}
                {isActive && (
                  <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C6FF3D]" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* Zone 3: 1 Primary Action (Single-line control) */}
        <div className="hidden md:flex items-center gap-4 shrink-0">
          <Link
            href="/start-a-project"
            className="px-4 py-2 text-xs md:text-sm font-semibold text-black bg-[#C6FF3D] hover:bg-[#b2eb2d] active:scale-[0.98] rounded-lg transition-all shadow-[0_0_20px_rgba(198,255,61,0.2)] whitespace-nowrap shrink-0"
          >
            Start a Project
          </Link>
        </div>

        {/* Mobile Hamburger Toggle */}
        <div className="flex md:hidden items-center gap-3">
          <Link
            href="/start-a-project"
            className="px-3 py-1.5 text-xs font-semibold text-black bg-[#C6FF3D] rounded-md whitespace-nowrap shrink-0"
          >
            Start
          </Link>
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-neutral-300 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#C6FF3D] rounded-lg"
            aria-label="Toggle Menu"
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Accessible Mobile Navigation Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-neutral-800 bg-neutral-950 px-6 py-6 space-y-4 animate-in slide-in-from-top duration-200">
          <nav className="flex flex-col space-y-3">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`text-base font-medium py-2 transition-colors ${
                  pathname === link.href ? 'text-[#C6FF3D]' : 'text-neutral-300 hover:text-white'
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>
          <div className="pt-4 border-t border-neutral-800 flex flex-col gap-3">
            <Link
              href="/start-a-project"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-3 text-sm font-semibold text-black bg-[#C6FF3D] rounded-lg shadow-lg"
            >
              Start a Project
            </Link>
            <Link
              href="/admin"
              onClick={() => setMobileMenuOpen(false)}
              className="w-full text-center py-2 text-xs text-neutral-400 hover:text-neutral-200"
            >
              Admin Portal
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
