/**
 * Componente Features Grid
 */

import React from 'react';
import { Container } from './Container';
import { FeatureCard } from './FeatureCard';

interface Feature {
  icon: string;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: Feature[];
  title?: string;
}

export const Features = ({ features, title }: FeaturesProps) => {
  return (
    <section className="py-20 bg-slate-950">
      <Container>
        {title && (
          <h2 className="text-4xl font-bold text-center text-white mb-16">{title}</h2>
        )}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, idx) => (
            <FeatureCard key={idx} {...feature} />
          ))}
        </div>
      </Container>
    </section>
  );
};
