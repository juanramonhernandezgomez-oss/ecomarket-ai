/**
 * Landing Page Home
 */

'use client';

import React from 'react';
import { Hero } from '@/components/Hero';
import { Features } from '@/components/Features';
import { Container } from '@/components/Container';
import { WaitlistForm } from '@/components/WaitlistForm';
import { Card } from '@/components/Card';

export default function Home() {
  const features = [
    {
      icon: '🧠',
      title: 'Perfil Cognitivo IA',
      description:
        'Descubre tus sesgos financieros ocultos y recibe alertas personalizadas para tomar mejores decisiones, no impulsivas.',
    },
    {
      icon: '🔗',
      title: 'Correlaciones Ocultas',
      description:
        'Conexiones entre activos, noticias y macroeconomía que nadie te muestra. Detecta patrones antes que el mercado.',
    },
    {
      icon: '🎮',
      title: 'Simulador What-If',
      description:
        'Prueba escenarios sin arriesgar un euro: "¿Qué pasa si la inflación sube al 5%?" o "¿Y si hay crisis geopolítica?"',
    },
    {
      icon: '📊',
      title: 'Alertas Inteligentes',
      description:
        'No solo te dice QUÉ pasa, sino POR QUÉ pasa y cómo afecta a TU cartera específicamente.',
    },
    {
      icon: '🛡️',
      title: 'Protección Conductual',
      description:
        'La IA detecta cuando vas a operar por emoción y te avisa: "Espera 24h. Tu historial muestra que así pierdes menos."',
    },
    {
      icon: '📈',
      title: 'Sin Ejecución Automática',
      description:
        'Tú mantienes el control. Solo análisis, educación y autoconocimiento. Sin consejo financiero regulado.',
    },
  ];

  const roadmapItems = [
    { quarter: 'Q2 2026', title: 'Lanzamiento MVP', status: 'completed' },
    { quarter: 'Q3 2026', title: 'Perfil Cognitivo IA', status: 'in-progress' },
    { quarter: 'Q4 2026', title: 'Simulador What-If', status: 'pending' },
    { quarter: 'Q1 2027', title: 'Alertas Inteligentes', status: 'pending' },
  ];

  return (
    <div>
      {/* Hero Section */}
      <Hero
        badge="🚀 Lanzamiento Q2 2026"
        title="Entiende el mercado. Entiéndete a ti mismo."
        subtitle="Tu Radar Financiero Cognitivo"
        description="IA que combina análisis de mercados con psicología del inversor. Descubre qué está pasando, por qué está pasando, y cómo encaja con tu forma única de decidir."
      />

      {/* Waitlist Section */}
      <section id="waitlist" className="py-16 bg-gradient-to-b from-slate-900 to-slate-950 border-b border-slate-800">
        <Container>
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-white mb-4">🎯 Sé de los primeros</h2>
            <p className="text-center text-gray-400 mb-8">
              Únete a la lista de espera y recibe acceso anticipado + 50% de descuento
            </p>
            <WaitlistForm />
          </div>
        </Container>
      </section>

      {/* Features Section */}
      <Features features={features} title="🎯 Características Principales" />

      {/* Roadmap Section */}
      <section className="py-20 bg-slate-950">
        <Container>
          <h2 className="text-4xl font-bold text-center text-white mb-16">🗓️ Roadmap de Lanzamiento</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {roadmapItems.map((item, idx) => (
              <Card key={idx} className="relative">
                <div className="text-3xl mb-2">{item.status === 'completed' ? '✅' : item.status === 'in-progress' ? '⚙️' : '⏭️'}</div>
                <p className="text-sm text-gray-400 mb-2">{item.quarter}</p>
                <h3 className="text-lg font-semibold text-white">{item.title}</h3>
              </Card>
            ))}
          </div>
        </Container>
      </section>

      {/* CTA Footer */}
      <section className="py-16 bg-gradient-to-b from-slate-950 to-blue-950/20 border-t border-slate-800">
        <Container>
          <div className="text-center space-y-6">
            <h2 className="text-3xl font-bold text-white">¿Listo para cambiar el juego?</h2>
            <p className="text-gray-400 text-lg max-w-xl mx-auto">
              Únete a la lista de espera y sé de los primeros en explorar cómo la IA puede transformar tu forma de invertir.
            </p>
            <div className="pt-4">
              <WaitlistForm />
            </div>
          </div>
        </Container>
      </section>
    </div>
  );
}
