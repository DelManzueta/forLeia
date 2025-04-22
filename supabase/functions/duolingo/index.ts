import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
};

interface DuolingoData {
  streak: number;
  totalXp: number;
  knownWords: string[];
  completedSkills: string[];
}

const mockDuolingoData: DuolingoData = {
  streak: 7,
  totalXp: 1250,
  knownWords: ['perro', 'gato', 'casa', 'agua', 'libro'],
  completedSkills: ['Basics 1', 'Greetings', 'Animals']
};

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // In a real implementation, we would fetch this data from Duolingo's API
    // For now, we'll use mock data
    return new Response(
      JSON.stringify(mockDuolingoData),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        status: 500,
      },
    );
  }
});