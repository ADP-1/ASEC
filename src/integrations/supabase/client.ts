// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://xofbersdqcubplwptbbz.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhvZmJlcnNkcWN1YnBsd3B0YmJ6Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMwNzU2NjcsImV4cCI6MjA1ODY1MTY2N30.pC_8yEFdUrVhTuf_hpZ2o97ftKnK9Cjs0FQvGDm2HPE";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);