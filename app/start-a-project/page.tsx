'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import confetti from 'canvas-confetti';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Card3D } from '@/components/ui/Card3D';
import { SpatialConstellationScene } from '@/components/three/SpatialConstellationScene';
import {
  Check,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  Loader2,
  Sparkles,
  Layers,
  Film,
  Code2,
  TrendingUp,
  Smartphone,
} from 'lucide-react';

const AVAILABLE_SERVICES = [
  {
    id: 'ai-filmmaking',
    title: 'AI Filmmaking',
    description: 'Generative worldbuilding, 4K commercials, neural avatars',
    icon: Sparkles,
  },
  {
    id: 'video-editing',
    title: 'High-Impact Video Editing',
    description: 'Short-form pacing, commercials, 35mm film color grading',
    icon: Film,
  },
  {
    id: 'brand-management',
    title: 'Brand Management',
    description: 'Identity systems, positioning, tone of voice, guidelines',
    icon: Layers,
  },
  {
    id: 'website-development',
    title: 'Website Development',
    description: 'Headless Next.js, Three.js 3D WebGL, 98+ Lighthouse',
    icon: Code2,
  },
  {
    id: 'digital-marketing',
    title: 'Digital Marketing & Growth',
    description: 'Paid media engines, Meta/TikTok performance, funnel CRO',
    icon: TrendingUp,
  },
  {
    id: 'ai-ugc-ads',
    title: 'AI UGC Ads',
    description: 'High-velocity 9:16 ad hooks, creator avatars, ad testing',
    icon: Smartphone,
  },
];

const BUDGET_OPTIONS = [
  '$15,000 - $25,000',
  '$25,000 - $50,000',
  '$50,000 - $100,000',
  '$100,000+',
];

const TIMELINE_OPTIONS = [
  'Urgent (Under 2 Weeks)',
  '4 - 6 Weeks',
  '2 - 3 Months',
  'Quarterly or Ongoing Retainer',
];

export default function StartAProjectPage() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    services: ['ai-filmmaking'],
    brief: '',
    budgetRange: '$25,000 - $50,000',
    timeline: '4 - 6 Weeks',
    name: '',
    email: '',
    company: '',
    source: 'start-a-project' as const,
    _hp_verify: '',
  });

  const [loading, setLoading] = useState(false);
  const [serverConfirmed, setServerConfirmed] = useState(false);
  const [inquiryId, setInquiryId] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const toggleService = (id: string) => {
    setFormData((prev) => {
      const exists = prev.services.includes(id);
      if (exists) {
        if (prev.services.length === 1) return prev; // Keep at least one
        return { ...prev, services: prev.services.filter((s) => s !== id) };
      }
      return { ...prev, services: [...prev.services, id] };
    });
  };

  const nextStep = () => {
    if (step === 1 && formData.services.length === 0) {
      setErrorMsg('Please select at least one discipline.');
      return;
    }
    if (step === 2 && !formData.brief.trim()) {
      setErrorMsg('Please provide a brief outline of your project objectives.');
      return;
    }
    setErrorMsg('');
    setStep((prev) => Math.min(prev + 1, 4));
  };

  const prevStep = () => {
    setErrorMsg('');
    setStep((prev) => Math.max(prev - 1, 1));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErrorMsg('');

    // Pre-flight check
    if (!formData.name.trim() || !formData.email.trim()) {
      setErrorMsg('Please provide your name and work email.');
      setLoading(false);
      return;
    }

    try {
      const res = await fetch('/api/inquiries', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || 'Server rejected brief registration');
      }

      // Server confirmed
      try {
        const bc = new BroadcastChannel('besoocial_realtime');
        bc.postMessage({ type: 'INQUIRY_CREATED', timestamp: Date.now() });
        bc.close();
      } catch {}
      setServerConfirmed(true);
      setInquiryId(data.inquiryId || 'INQ-' + Date.now().toString().slice(-6));

      // Celebration confetti
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#C6FF3D', '#FFFFFF', '#141414'],
        });
      } catch {
        // Safe if canvas unsupported
      }
    } catch (err: unknown) {
      if (err instanceof Error) {
        setErrorMsg(err.message);
      } else {
        setErrorMsg('Failed to record inquiry. Please check your connection.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0A0A0A] text-neutral-100 flex flex-col selection:bg-[#C6FF3D] selection:text-black">
      <Header />

      <main className="flex-1 py-16 md:py-24 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 w-full relative">
        {/* Subtle Ambient Spatial Constellation */}
        <SpatialConstellationScene className="opacity-30" />

        <div className="relative z-10">
          <SectionHeading
            number="WIZARD"
            tagline="Project Scoping"
            title="Commission a BE SOOCIAL Production"
            description="Tell us about your objectives, timeline, and scope. We will generate a structured proposal within one business day."
            align="center"
          />

          {/* Progress Tracker (4 Steps) */}
          {!serverConfirmed && (
            <div className="flex items-center justify-between mb-12 max-w-xl mx-auto">
              {[1, 2, 3, 4].map((s) => {
                const isActive = step === s;
                const isDone = step > s;
                return (
                  <div key={s} className="flex items-center gap-2">
                    <div
                      className={`w-9 h-9 rounded-full flex items-center justify-center text-xs font-mono font-bold transition-all ${
                        isActive
                          ? 'bg-[#C6FF3D] text-black shadow-[0_0_20px_rgba(198,255,61,0.4)] ring-4 ring-[#C6FF3D]/20 scale-105'
                          : isDone
                          ? 'bg-neutral-800 text-[#C6FF3D] border border-[#C6FF3D]/40'
                          : 'bg-neutral-900 text-neutral-500 border border-neutral-800'
                      }`}
                    >
                      {isDone ? <Check className="w-4 h-4 stroke-[2.5]" /> : s}
                    </div>
                    <span className="hidden sm:inline text-xs font-mono text-neutral-400">
                      {s === 1 ? 'Disciplines' : s === 2 ? 'Brief' : s === 3 ? 'Scope' : 'Contact'}
                    </span>
                    {s < 4 && <div className="w-8 sm:w-12 h-[1px] bg-neutral-800 mx-1" />}
                  </div>
                );
              })}
            </div>
          )}

          {/* Error Notification */}
          {errorMsg && (
            <div className="mb-8 p-4 rounded-xl bg-red-950/40 border border-red-500/30 flex items-center gap-3 text-xs text-red-300">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-400" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* Wizard Container with 3D Styling */}
          <div className="p-8 md:p-12 rounded-3xl bg-neutral-900/60 border border-white/[0.08] shadow-[0_20px_60px_rgba(0,0,0,0.8)] backdrop-blur-md relative overflow-hidden">
            <div
              className="absolute top-0 right-0 w-64 h-64 bg-[#C6FF3D]/5 rounded-full blur-3xl pointer-events-none"
              aria-hidden="true"
            />

            {serverConfirmed ? (
              /* Confirmation View (Server Confirmed) */
              <div className="py-12 text-center space-y-6 relative z-10">
                <div className="w-16 h-16 rounded-full bg-[#C6FF3D]/20 border border-[#C6FF3D] text-[#C6FF3D] flex items-center justify-center mx-auto shadow-[0_0_35px_rgba(198,255,61,0.35)]">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-3xl font-black text-white uppercase tracking-tight">
                  Project Brief Confirmed
                </h3>
                <p className="text-sm text-neutral-300 max-w-lg mx-auto leading-relaxed">
                  Your brief has been logged in our internal production queue. An executive producer will review your parameters and email you a tailored scope breakdown.
                </p>

                <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 max-w-md mx-auto text-xs font-mono text-neutral-400 flex justify-between items-center shadow-inner">
                  <span>QUEUE REFERENCE:</span>
                  <span className="text-[#C6FF3D] font-bold">{inquiryId}</span>
                </div>

                <div className="pt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
                  <Link
                    href="/work"
                    className="px-6 py-3 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-white transition-colors"
                  >
                    Browse Portfolio While You Wait
                  </Link>
                  <Link
                    href="/"
                    className="px-6 py-3 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-colors"
                  >
                    Return to Homepage
                  </Link>
                </div>
              </div>
            ) : (
              <div className="relative z-10">
                {/* STEP 1: Select Disciplines */}
                {step === 1 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Which disciplines does your project require?
                      </h3>
                      <p className="text-xs text-neutral-400">
                        Select one or multiple areas of collaboration.
                      </p>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {AVAILABLE_SERVICES.map((srv) => {
                        const isSelected = formData.services.includes(srv.id);
                        const Icon = srv.icon;
                        return (
                          <Card3D
                            key={srv.id}
                            maxTilt={6}
                            perspective={1000}
                            liftZ={8}
                            className="h-full"
                          >
                            <button
                              type="button"
                              onClick={() => toggleService(srv.id)}
                              className={`w-full h-full p-5 rounded-2xl border text-left transition-all cursor-pointer flex flex-col justify-between backdrop-blur-sm ${
                                isSelected
                                  ? 'bg-neutral-900 border-[#C6FF3D] shadow-[0_0_20px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/30'
                                  : 'bg-neutral-950/70 border-neutral-800 hover:border-neutral-700'
                              }`}
                            >
                              <div className="flex items-center justify-between mb-3 w-full">
                                <div className="w-8 h-8 rounded-lg bg-neutral-800 flex items-center justify-center">
                                  <Icon
                                    className={`w-4 h-4 ${
                                      isSelected ? 'text-[#C6FF3D]' : 'text-neutral-400'
                                    }`}
                                  />
                                </div>
                                <div
                                  className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                                    isSelected
                                      ? 'bg-[#C6FF3D] border-[#C6FF3D] text-black'
                                      : 'border-neutral-700 bg-neutral-900'
                                  }`}
                                >
                                  {isSelected && <Check className="w-3 h-3 stroke-[3]" />}
                                </div>
                              </div>
                              <div>
                                <div className="text-sm font-bold text-white mb-1">{srv.title}</div>
                                <div className="text-[11px] text-neutral-400 leading-snug">
                                  {srv.description}
                                </div>
                              </div>
                            </button>
                          </Card3D>
                        );
                      })}
                    </div>

                    <div className="pt-6 flex justify-end">
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3.5 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(198,255,61,0.25)] active:scale-95"
                      >
                        <span>Continue to Brief</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 2: Project Brief & Vision */}
                {step === 2 && (
                  <div className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Tell us about your campaign & vision
                      </h3>
                      <p className="text-xs text-neutral-400">
                        What problem are we solving? What is the intended feeling and audience?
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Project Description *
                      </label>
                      <textarea
                        rows={6}
                        value={formData.brief}
                        onChange={(e) => setFormData({ ...formData, brief: e.target.value })}
                        placeholder="Outline key deliverables, reference aesthetic styles, target launch date, and key metrics for success..."
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] transition-colors resize-none"
                      />
                    </div>

                    <div className="pt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3.5 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(198,255,61,0.25)] active:scale-95"
                      >
                        <span>Continue to Scope</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 3: Investment & Timeline */}
                {step === 3 && (
                  <div className="space-y-8">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">Investment & Timeline</h3>
                      <p className="text-xs text-neutral-400">
                        Calibrating budget and schedule allows us to allocate direct studio resources.
                      </p>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-3">
                        Estimated Production Budget
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {BUDGET_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, budgetRange: opt })}
                            className={`p-4 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                              formData.budgetRange === opt
                                ? 'bg-neutral-900 border-[#C6FF3D] text-[#C6FF3D] font-bold shadow-[0_0_15px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/30'
                                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-3">
                        Desired Timeline
                      </label>
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {TIMELINE_OPTIONS.map((opt) => (
                          <button
                            key={opt}
                            type="button"
                            onClick={() => setFormData({ ...formData, timeline: opt })}
                            className={`p-4 rounded-xl border text-left text-xs font-mono transition-all cursor-pointer ${
                              formData.timeline === opt
                                ? 'bg-neutral-900 border-[#C6FF3D] text-[#C6FF3D] font-bold shadow-[0_0_15px_rgba(198,255,61,0.15)] ring-1 ring-[#C6FF3D]/30'
                                : 'bg-neutral-950/60 border-neutral-800 text-neutral-400 hover:border-neutral-700'
                            }`}
                          >
                            {opt}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="button"
                        onClick={nextStep}
                        className="px-6 py-3.5 rounded-xl bg-[#C6FF3D] text-black font-bold text-xs hover:bg-[#b2eb2d] transition-all flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(198,255,61,0.25)] active:scale-95"
                      >
                        <span>Continue to Details</span>
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  </div>
                )}

                {/* STEP 4: Contact & Submission */}
                {step === 4 && (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <h3 className="text-xl font-bold text-white mb-1">
                        Where should we send your proposal?
                      </h3>
                      <p className="text-xs text-neutral-400">
                        All communications are strictly confidential under studio NDA.
                      </p>
                    </div>

                    {/* Honeypot field for bot mitigation */}
                    <div className="hidden" aria-hidden="true">
                      <input
                        type="text"
                        name="_hp_verify"
                        tabIndex={-1}
                        autoComplete="off"
                        value={formData._hp_verify}
                        onChange={(e) => setFormData({ ...formData, _hp_verify: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                          Your Full Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.name}
                          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                          placeholder="Jordan Miller"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                          Work Email *
                        </label>
                        <input
                          type="email"
                          required
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          placeholder="jordan@company.com"
                          className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] transition-colors"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-mono text-neutral-400 uppercase mb-2">
                        Company Name or Brand
                      </label>
                      <input
                        type="text"
                        value={formData.company}
                        onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                        placeholder="Apex Ventures"
                        className="w-full px-4 py-3 rounded-xl bg-neutral-950 border border-neutral-800 text-sm text-white placeholder-neutral-600 focus:outline-none focus:border-[#C6FF3D] transition-colors"
                      />
                    </div>

                    {/* Summary of selections */}
                    <div className="p-4 rounded-xl bg-neutral-950 border border-neutral-800 text-xs font-mono text-neutral-400 space-y-1">
                      <div>
                        <strong className="text-white">Disciplines:</strong>{' '}
                        {formData.services.join(', ')}
                      </div>
                      <div>
                        <strong className="text-white">Budget:</strong> {formData.budgetRange} ·{' '}
                        <strong className="text-white">Timeline:</strong> {formData.timeline}
                      </div>
                    </div>

                    <div className="pt-6 flex justify-between items-center">
                      <button
                        type="button"
                        onClick={prevStep}
                        className="px-5 py-2.5 rounded-xl bg-neutral-800 hover:bg-neutral-700 text-xs font-mono text-neutral-300 transition-colors flex items-center gap-2 cursor-pointer"
                      >
                        <ArrowLeft className="w-4 h-4" />
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={loading}
                        className="px-8 py-3.5 rounded-xl bg-[#C6FF3D] text-black font-bold text-sm hover:bg-[#b2eb2d] transition-all disabled:opacity-50 flex items-center gap-2 shadow-[0_0_24px_rgba(198,255,61,0.3)] cursor-pointer active:scale-95"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="w-4 h-4 animate-spin" />
                            <span>Verifying with Server...</span>
                          </>
                        ) : (
                          <span>Submit Project Brief</span>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            )}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
