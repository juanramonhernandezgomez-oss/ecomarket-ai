/**
 * Hook para obtener datos de Supabase
 */

'use client';

import { useEffect, useState } from 'react';
import { supabase } from '@/lib/supabase';

export function useSupabase<T>(
  table: string,
  query?: (q: any) => any
) {
  const [data, setData] = useState<T[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        let q = supabase.from(table).select();
        
        if (query) {
          q = query(q);
        }

        const { data, error } = await q;
        
        if (error) throw error;
        setData(data);
      } catch (err) {
        setError(err as Error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [table, query]);

  return { data, loading, error };
}
