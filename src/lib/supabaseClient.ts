import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

/**
 * Supabase client for DB and Auth operations.
 */
export const supabase = createClient(supabaseUrl, supabaseAnonKey);
