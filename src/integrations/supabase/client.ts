// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://dwozaaxnwnpnyjyxqqca.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImR3b3phYXhud25wbnlqeXhxcWNhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDA3MzE1MjksImV4cCI6MjA1NjMwNzUyOX0.qHX7iqLywjrculjigkxW3M-uCW-WK8hIiMna05YZC1w";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);