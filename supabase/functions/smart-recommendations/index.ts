
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
    const { cropType, quantity, duration, location } = await req.json();

    // System message with context about storage recommendations
    const systemMessage = `
      You are a specialized AI for "Raithara Bhandara", a cold storage facility booking platform for farmers.
      Your task is to analyze the user's crop information and provide smart recommendations for 
      the most suitable storage options.
      
      When recommending storage facilities, consider:
      - The type of crop and its specific storage requirements
      - The quantity of the crop (in quintals)
      - The duration of storage needed
      - The preferred location
      - Special features needed for the crop type (temperature, humidity, etc.)
      
      Provide practical, actionable recommendations that will help farmers preserve their
      produce effectively. Format your response as JSON with the following structure:
      {
        "recommendations": [
          {
            "warehouseId": number,
            "name": string,
            "reason": string,
            "idealTemperature": string,
            "idealHumidity": string,
            "estimatedCost": string
          }
        ],
        "generalAdvice": string
      }
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

    const prompt = `
      I need recommendations for storing ${cropType} with the following details:
      - Quantity: ${quantity} quintals
      - Duration: ${duration} days
      - Preferred location: ${location || "Any"}
      
      Please recommend the best storage options for this crop, including specific temperature
      and humidity requirements, any special storage considerations, and estimated costs.
    `;

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
          { role: 'user', content: prompt }
        ],
        response_format: { type: "json_object" }
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
    
    // Parse the JSON response from OpenAI
    try {
      const responseContent = data.choices[0].message.content;
      const parsedRecommendations = JSON.parse(responseContent);
      
      return new Response(JSON.stringify(parsedRecommendations), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    } catch (parseError) {
      return new Response(JSON.stringify({ 
        error: "Failed to parse AI recommendation data",
        rawResponse: data.choices[0].message.content 
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error('Error in smart-recommendations function:', error);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    });
  }
});
