import { createBrowserClient } from '@supabase/ssr';

export const supabase = createBrowserClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://huvnjjarkycddhxkwsna.supabase.co',
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imh1dm5qamFya3ljZGRoeGt3c25hIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzI4MzEwNjYsImV4cCI6MjA4ODQwNzA2Nn0.LyTXYZgQ254aiQFaO5u1RnAqHkhrpI6Qjso0bH3rn8w'
);
