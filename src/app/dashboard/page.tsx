/**
 * Dashboard Page - Página protegida para usuarios autenticados
 */

'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { Command } from 'lucide-react';
import { Button } from '@/components/Button';
import { Container } from '@/components/Container';
import { Card } from '@/components/Card';
import { useAuth } from '@/hooks/useAuth';

export default function DashboardPage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 flex items-center justify-center">
        <Container>
          <div className="text-center space-y-4">
            <div className="inline-block animate-spin">
              <Command className="w-12 h-12 text-blue-400" />
            </div>
            <p className="text-gray-400">Cargando...</p>
          </div>
        </Container>
      </section>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <section className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900 py-12">
      <Container>
        <div className="space-y-8">
          {/* Welcome Section */}
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-4xl font-bold text-white mb-2">
                ¡Bienvenido, {user.email}! 👋
              </h1>
              <p className="text-gray-400">Aquí comienza tu viaje hacia mejores decisiones financieras</p>
            </div>
            <Button variant="outline" onClick={logout}>
              Cerrar sesión
            </Button>
          </div>

          {/* Dashboard Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Perfil Cognitivo Card */}
            <Card className="group cursor-pointer hover:border-blue-500/50">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🧠
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Perfil Cognitivo</h3>
              <p className="text-gray-400 text-sm mb-4">
                Descubre tus sesgos financieros y recibe recomendaciones personalizadas
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Iniciar cuestionario
              </Button>
            </Card>

            {/* Cartera Card */}
            <Card className="group cursor-pointer hover:border-blue-500/50">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                📊
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Mi Cartera</h3>
              <p className="text-gray-400 text-sm mb-4">
                Conecta tu cartera y obtén análisis inteligentes en tiempo real
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Conectar cartera
              </Button>
            </Card>

            {/* Simulador Card */}
            <Card className="group cursor-pointer hover:border-blue-500/50">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🎮
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Simulador What-If</h3>
              <p className="text-gray-400 text-sm mb-4">
                Prueba escenarios sin arriesgar dinero real
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Abrir simulador
              </Button>
            </Card>

            {/* Alertas Card */}
            <Card className="group cursor-pointer hover:border-blue-500/50">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                🔔
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Alertas Inteligentes</h3>
              <p className="text-gray-400 text-sm mb-4">
                Notificaciones personalizadas basadas en tu perfil
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Configurar alertas
              </Button>
            </Card>

            {/* Educación Card */}
            <Card className="group cursor-pointer hover:border-blue-500/50">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                📚
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Centro de Educación</h3>
              <p className="text-gray-400 text-sm mb-4">
                Aprende sobre inversión, psicología y estrategias
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Explorar cursos
              </Button>
            </Card>

            {/* Comunidad Card */}
            <Card className="group cursor-pointer hover:border-blue-500/50">
              <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                👥
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Comunidad</h3>
              <p className="text-gray-400 text-sm mb-4">
                Conecta con otros inversores y comparte experiencias
              </p>
              <Button size="sm" variant="outline" className="w-full">
                Ir a comunidad
              </Button>
            </Card>
          </div>

          {/* Quick Stats */}
          <Card className="bg-gradient-to-r from-blue-900/20 to-purple-900/20 border-blue-700/30">
            <h3 className="text-xl font-semibold text-white mb-4">📈 Estado General</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div>
                <p className="text-gray-400 text-sm">Cuestionarios completados</p>
                <p className="text-2xl font-bold text-blue-400 mt-1">0</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Portafolio conectado</p>
                <p className="text-2xl font-bold text-green-400 mt-1">No</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Alertas activas</p>
                <p className="text-2xl font-bold text-yellow-400 mt-1">0</p>
              </div>
              <div>
                <p className="text-gray-400 text-sm">Simulaciones realizadas</p>
                <p className="text-2xl font-bold text-purple-400 mt-1">0</p>
              </div>
            </div>
          </Card>
        </div>
      </Container>
    </section>
  );
}
