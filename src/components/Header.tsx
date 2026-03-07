/**
 * Componente Navigation Header
 */

'use client';

import React from 'react';
import Link from 'next/link';
import { Button } from './Button';
import { Container } from './Container';

export const Header = () => {
  return (
    <header className="fixed top-0 w-full bg-slate-950/80 backdrop-blur-md border-b border-slate-800 z-50">
      <Container>
        <nav className="flex items-center justify-between py-4">
          <Link href="/" className="text-2xl font-bold text-white hover:text-blue-400 transition-colors">
            ecomarket-ai
          </Link>
          
          <div className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="outline" size="sm">
                Iniciar sesión
              </Button>
            </Link>
            <Link href="/register">
              <Button size="sm">
                Crear cuenta
              </Button>
            </Link>
          </div>
        </nav>
      </Container>
    </header>
  );
};
