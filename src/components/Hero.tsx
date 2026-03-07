/**
 * Componente Hero Section
 */

import React from 'react';
import { Button } from './Button';
import { Container } from './Container';

interface HeroProps {
  title: string;
  subtitle?: string;
  description?: string;
  badge?: string;
  ctaText?: string;
  ctaHref?: string;
}

export const Hero = ({
  title,
  subtitle,
  description,
  badge,
  ctaText = 'Get Started',
  ctaHref = '#waitlist',
}: HeroProps) => {
  return (
    <section className="bg-gradient-to-b from-slate-950 to-slate-900 py-20 sm:py-32">
      <Container>
        <div className="text-center space-y-6 animate-slideUp">
          {badge && (
            <div className="inline-block bg-blue-900/20 border border-blue-700/50 text-blue-300 px-4 py-2 rounded-full text-sm font-medium">
              {badge}
            </div>
          )}
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-white leading-tight">
            {title}
          </h1>
          
          {subtitle && (
            <p className="text-xl sm:text-2xl text-blue-400 font-semibold">{subtitle}</p>
          )}
          
          {description && (
            <p className="text-lg text-gray-400 max-w-2xl mx-auto leading-relaxed">
              {description}
            </p>
          )}
          
          {ctaText && (
            <div className="pt-4">
              <Button size="lg" className="text-base">
                {ctaText}
              </Button>
            </div>
          )}
        </div>
      </Container>
    </section>
  );
};
