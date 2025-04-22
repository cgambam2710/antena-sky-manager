
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://yskkwlvcugfcyrmsadzi.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlza2t3bHZjdWdmY3lybXNhZHppIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDUzMzA3MjEsImV4cCI6MjA2MDkwNjcyMX0.0p7omHnfgZ_YnNcJ0PJe31SHt5Tflyfy_wzBkiiwdk4';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
