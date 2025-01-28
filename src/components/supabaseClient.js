import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://eopapbtnhdfkrooeuqod.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVvcGFwYnRuaGRma3Jvb2V1cW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Mzc0NDA0NDIsImV4cCI6MjA1MzAxNjQ0Mn0.Siec5ZH_Vl4o5a4cC7Yqnno5iHB7cRdAjTjekvo-GoM';

export const supabase = createClient(SUPABASE_URL, SUPABASE_KEY);