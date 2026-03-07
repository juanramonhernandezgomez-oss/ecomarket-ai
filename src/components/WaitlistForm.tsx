/**
 * Componente WaitlistForm
 */

'use client';

import React, { useState } from 'react';
import { Button } from './Button';
import { supabase } from '@/lib/supabase';
import { isValidEmail } from '@/lib/utils';

export const WaitlistForm = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (!isValidEmail(email)) {
      setError('Por favor, introduce un email válido');
      return;
    }

    setLoading(true);

    try {
      const { error: supabaseError } = await supabase
        .from('waitlist')
        .insert([
          {
            email,
            source: 'landing_page',
            user_agent: navigator.userAgent,
            status: 'pending',
            created_at: new Date().toISOString(),
          },
        ]);

      if (supabaseError) throw supabaseError;

      setSuccess(true);
      setEmail('');

      // Analytics
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('event', 'waitlist_signup', {
          event_category: 'conversion',
          event_label: 'landing_page',
          value: 1,
        });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al registrar. Intenta más tarde.');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="bg-green-900/20 border border-green-700/50 rounded-lg p-6 text-center">
        <p className="text-green-400 font-semibold">✅ ¡Bienvenido a bordo!</p>
        <p className="text-green-300 mt-2">Te hemos añadido a la lista de espera. Te avisaremos antes que nadie del lanzamiento.</p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="flex gap-2">
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={loading}
          className="flex-1 px-4 py-3 rounded-md bg-slate-800 border border-slate-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        />
        <Button type="submit" size="md" loading={loading}>
          Acceso anticipado
        </Button>
      </div>
      
      {error && <p className="text-red-400 text-sm">{error}</p>}
      
      <p className="text-gray-400 text-sm">🔒 Sin spam. Solo actualidades importantes. Cancela cuando quieras.</p>
    </form>
  );
};
