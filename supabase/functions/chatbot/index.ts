
import "https://deno.land/x/xhr@0.1.0/mod.ts";
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const openAIApiKey = Deno.env.get('OPENAI_API_KEY');

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { prompt, userContext } = await req.json();

    // System message with context about the storage booking platform
    const systemMessage = `
      You are an AI assistant for "Raithara Bhandara", a cold storage facility booking platform for farmers.
      Your job is to help users with their storage needs, answer questions about the platform,
      provide recommendations for storage based on their crops, and assist with booking-related inquiries.
      
      Key facts about the platform:
      - Helps farmers find cold storage facilities for their agricultural produce
      - Storage is priced per quintal per day
      - Various storage facilities have different features (temperature control, humidity control, etc.)
      - Users can book storage online after creating an account
      - Some facilities offer discounts for longer storage periods
      
      Be helpful, concise, and provide accurate information to farmers seeking storage solutions.
    `;

    // Only proceed if OpenAI API key is available
    if (!openAIApiKey) {
      return new Response(JSON.stringify({ 
        error: "OpenAI API key not configured. Please set it in the Supabase secrets." 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }

    // Make request to OpenAI API
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${openAIApiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        messages: [
          { role: 'system', content: systemMessage },
          ...(userContext ? userContext.map((msg: any) => ({ role: msg.role, content: msg.content })) : []),
          { role: 'user', content: prompt }
        ],
      }),
    });

    const data = await response.json();
    
    // Error handling for OpenAI response
    if (data.error) {
      return new Response(JSON.stringify({ error: data.error.message }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
    
    const reply = data.choices[0].message.content;

    return new Response(JSON.stringify({ reply }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  } catch (error) {
    console.error('Error in chatbot function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
