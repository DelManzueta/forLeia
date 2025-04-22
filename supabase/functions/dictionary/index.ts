const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

// List of common words for the word of the day
const words = [
  "serendipity", "ephemeral", "mellifluous", "ineffable", "surreptitious",
  "ethereal", "nebulous", "eloquent", "resilient", "luminous", "enigmatic",
  "resplendent", "euphoric", "sublime", "tenacious", "vivacious", "whimsical",
  "zealous", "sagacious", "pernicious", "ubiquitous", "voracious", "tenuous",
  "salient", "quixotic", "profound", "omniscient", "nefarious", "mercurial",
  "labyrinthine"
];

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    // Get today's word based on the date
    const today = new Date();
    const dayOfYear = Math.floor((today.getTime() - new Date(today.getFullYear(), 0, 0).getTime()) / 86400000);
    const wordIndex = dayOfYear % words.length;
    const wordOfDay = words[wordIndex];

    // Fetch definition from Free Dictionary API
    const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${wordOfDay}`);
    const data = await response.json();

    if (!response.ok) {
      throw new Error('Failed to fetch word definition');
    }

    // Format the response
    const wordData = {
      word: data[0].word,
      phonetic: data[0].phonetic,
      meanings: data[0].meanings.map((meaning: any) => ({
        partOfSpeech: meaning.partOfSpeech,
        definitions: meaning.definitions.map((def: any) => ({
          definition: def.definition,
          example: def.example,
          synonyms: def.synonyms,
        })),
      })),
    };

    return new Response(
      JSON.stringify(wordData),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 200,
      },
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        headers: {
          ...corsHeaders,
          'Content-Type': 'application/json',
        },
        status: 500,
      },
    );
  }
});