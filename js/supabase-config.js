const _supabase = supabase.createClient(ENV.SUPABASE_URL, ENV.SUPABASE_KEY);

window.supabaseClient = _supabase;