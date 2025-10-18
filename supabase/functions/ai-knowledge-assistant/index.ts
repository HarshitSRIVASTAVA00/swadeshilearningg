import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { messages, type = "chat" } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    let systemPrompt = "";
    
    if (type === "semantic-search") {
      systemPrompt = `You are a knowledgeable assistant specializing in ancient Indian scriptures, philosophy, science, and literature. 
      
When users ask questions:
1. Search through the knowledge base of Vedas, Upanishads, Bhagavad Gita, Ramayana, Mahabharata, Arthashastra, and other ancient texts
2. Provide relevant quotes and references with citations
3. Explain concepts clearly and connect them to modern understanding
4. Be respectful of the spiritual and cultural significance

Available texts include:
- Vedas (Rig, Sama, Yajur, Atharva)
- Upanishads
- Bhagavad Gita
- Ramayana & Mahabharata
- Arthashastra (politics & economics)
- Scientific texts (Aryabhatiya, Sushruta Samhita, Charaka Samhita)
- Literature (Gitanjali, works of Vivekananda, Tagore, etc.)

Provide accurate, contextual answers with references.`;
    } else {
      systemPrompt = `You are an expert companion for the Bhartiya Gyan Kosh (Indian Knowledge Repository). 
      
You help users explore ancient Indian wisdom, including:
- Vedic philosophy and cosmology
- Ayurvedic medicine and its connection to modern science
- Ancient mathematics and astronomy
- Classical literature and poetry
- Political philosophy (Arthashastra)
- Spiritual teachings from various traditions

Engage in thoughtful conversations, provide context, draw connections between ancient and modern knowledge, and encourage deeper exploration of topics.`;
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          ...messages,
        ],
        stream: true,
      }),
    });

    if (!response.ok) {
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          {
            status: 429,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "AI credits exhausted. Please add more credits." }),
          {
            status: 402,
            headers: { ...corsHeaders, "Content-Type": "application/json" },
          }
        );
      }
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "AI service error" }),
        {
          status: 500,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    return new Response(response.body, {
      headers: { ...corsHeaders, "Content-Type": "text/event-stream" },
    });
  } catch (e) {
    console.error("AI assistant error:", e);
    return new Response(
      JSON.stringify({ error: e instanceof Error ? e.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});