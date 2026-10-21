'use client';

import React, { useRef, useState, useEffect, ReactNode, CSSProperties } from 'react';

interface Card3DProps {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // Maximum rotation in degrees (default: 12)
  perspective?: number; // Perspective distance in px (default: 1000)
  glare?: boolean; // Enable specular light reflection (default: true)
  glareOpacity?: number; // Max glare opacity (default: 0.15)
  scaleOnHover?: number; // Card scale on hover (default: 1.02)
  liftZ?: number; // Card translation on Z axis on hover in px (default: 15)
  style?: CSSProperties;
  onClick?: () => void;
}

export function Card3D({
  children,
  className = '',
  maxTilt = 10,
  perspective = 1000,
  glare = true,
  glareOpacity = 0.18,
  scaleOnHover = 1.02,
  liftZ = 12,
  style = {},
  onClick,
}: Card3DProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [glarePos, setGlarePos] = useState({ x: 50, y: 50, opacity: 0 });
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const media = window.matchMedia('(prefers-reduced-motion: reduce)');
      setReducedMotion(media.matches);
      const listener = () => setReducedMotion(media.matches);
      media.addEventListener('change', listener);
      return () => media.removeEventListener('change', listener);
    }
  }, []);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current) return;

    const rect = cardRef.current.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const normX = (x / rect.width) * 2 - 1; // -1 to 1
    const normY = (y / rect.height) * 2 - 1; // -1 to 1

    const rY = Number((normX * maxTilt).toFixed(2));
    const rX = Number((-normY * maxTilt).toFixed(2));

    setRotateX(rX);
    setRotateY(rY);

    if (glare) {
      setGlarePos({
        x: Math.round((x / rect.width) * 100),
        y: Math.round((y / rect.height) * 100),
        opacity: glareOpacity,
      });
    }
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
    setGlarePos((prev) => ({ ...prev, opacity: 0 }));
  };

  // Touch support for mobile: subtle tilt on touch move
  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (reducedMotion || !cardRef.current || e.touches.length === 0) return;
    const touch = e.touches[0];
    const rect = cardRef.current.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (x >= 0 && x <= rect.width && y >= 0 && y <= rect.height) {
      const normX = (x / rect.width) * 2 - 1;
      const normY = (y / rect.height) * 2 - 1;
      setRotateX(Number((-normY * (maxTilt * 0.5)).toFixed(2)));
      setRotateY(Number((normX * (maxTilt * 0.5)).toFixed(2)));
      setIsHovered(true);
    }
  };

  const handleTouchEnd = () => {
    setIsHovered(false);
    setRotateX(0);
    setRotateY(0);
  };

  const transformStyle: CSSProperties = reducedMotion
    ? { ...style }
    : {
        transform: `perspective(${perspective}px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(${
          isHovered ? scaleOnHover : 1
        }, ${isHovered ? scaleOnHover : 1}, 1) translateZ(${isHovered ? liftZ : 0}px)`,
        transition: isHovered
          ? 'transform 0.12s cubic-bezier(0.2, 0, 0, 1)'
          : 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)',
        transformStyle: 'preserve-3d',
        willChange: 'transform',
        ...style,
      };

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
      onClick={onClick}
      style={transformStyle}
      className={`relative ${className}`}
    >
      {children}

      {/* Dynamic Specular Glare Layer */}
      {glare && !reducedMotion && (
        <div
          className="pointer-events-none absolute inset-0 rounded-[inherit] overflow-hidden transition-opacity duration-300"
          style={{ opacity: glarePos.opacity }}
          aria-hidden="true"
        >
          <div
            className="absolute inset-0 w-full h-full"
            style={{
              background: `radial-gradient(circle 350px at ${glarePos.x}% ${glarePos.y}%, rgba(255, 255, 255, 0.22), rgba(198, 255, 61, 0.12) 40%, transparent 80%)`,
            }}
          />
        </div>
      )}
    </div>
  );
}
