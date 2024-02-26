import { createClient } from '@supabase/supabase-js'

export const supabaseUrl = 'https://tdaruiigjhlpbqoxrzjg.supabase.co'
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRkYXJ1aWlnamhscGJxb3hyempnIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MDYzNjk1NzUsImV4cCI6MjAyMTk0NTU3NX0.oT828Lwpk1rW1ZEkB05dJttQdv1NVuyuMxLxzWsLeCw";
const supabase = createClient(supabaseUrl, supabaseKey)

export default supabase;
