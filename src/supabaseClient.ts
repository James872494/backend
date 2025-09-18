// backend/src/supabaseClient.ts
import { createClient, SupabaseClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error(
    'Missing SUPABASE_URL or SUPABASE_KEY in environment variables',
  );
}

// Now we tell TypeScript the type explicitly using `SupabaseClient` generics
const supabase: SupabaseClient = createClient(supabaseUrl, supabaseKey);

export { supabase };
