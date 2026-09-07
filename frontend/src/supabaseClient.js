import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error(
    '❌ Missing Supabase env vars!\n' +
    'Create frontend/.env.local and set:\n' +
    '  VITE_SUPABASE_URL=https://your-project-id.supabase.co\n' +
    '  VITE_SUPABASE_ANON_KEY=your-anon-key'
  );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    persistSession: true,
    autoRefreshToken: true,
    detectSessionInUrl: true,
  },
});
