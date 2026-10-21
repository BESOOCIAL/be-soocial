import React from 'react';

interface SectionHeadingProps {
  number?: string;
  tagline?: string;
  title: string;
  description?: string;
  align?: 'left' | 'center';
  className?: string;
}

export function SectionHeading({
  number,
  tagline,
  title,
  description,
  align = 'left',
  className = '',
}: SectionHeadingProps) {
  const isCenter = align === 'center';

  return (
    <div
      className={`mb-12 md:mb-16 ${
        isCenter ? 'text-center mx-auto max-w-3xl' : 'max-w-2xl'
      } ${className}`}
    >
      <div
        className={`flex items-center gap-2 text-xs font-mono text-neutral-400 mb-3 tracking-wider uppercase ${
          isCenter ? 'justify-center' : 'justify-start'
        }`}
      >
        {number && <span className="text-[#C6FF3D] font-semibold">{number}</span>}
        {number && tagline && <span aria-hidden="true">·</span>}
        {tagline && <span>{tagline}</span>}
      </div>

      <h2
        className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-white mb-4 leading-tight"
        style={{ textWrap: 'balance' }}
      >
        {title}
      </h2>

      {description && (
        <p className="text-sm md:text-base text-neutral-400 leading-relaxed max-w-xl">
          {description}
        </p>
      )}
    </div>
  );
}
