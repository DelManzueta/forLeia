import React, { useState } from 'react';
import { Book, Volume2, ExternalLink } from 'lucide-react';

// Mock data for English Word of the Day
const mockWordData = {
  word: "serendipity",
  phonetic: "/ˌserənˈdipəti/",
  meanings: [
    {
      partOfSpeech: "noun",
      definitions: [
        {
          definition: "The occurrence and development of events by chance in a happy or beneficial way.",
          example: "A fortunate stroke of serendipity",
          synonyms: ["chance", "fate", "destiny", "luck"]
        }
      ]
    }
  ]
};

function EnglishWordOfDay() {
  const [wordData] = useState(mockWordData);

  return (
    <div className="bg-gradient-to-r from-blue-400 to-indigo-500 rounded-3xl p-6 text-white shadow-lg">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <Book className="w-6 h-6" />
          <h2 className="text-xl font-bold">Word of the Day</h2>
        </div>
        <a
          href={`https://www.merriam-webster.com/dictionary/${wordData.word}`}
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 hover:bg-white/20 rounded-lg transition-colors"
        >
          <ExternalLink className="w-5 h-5" />
        </a>
      </div>
      
      <div className="space-y-3">
        <div>
          <p className="text-2xl font-bold">{wordData.word}</p>
          {wordData.phonetic && (
            <div className="flex items-center gap-2 mt-1">
              <span className="text-sm opacity-90">{wordData.phonetic}</span>
              <button className="p-1.5 rounded-full bg-white/20 hover:bg-white/30 transition-colors">
                <Volume2 className="w-4 h-4" />
              </button>
            </div>
          )}
        </div>

        <div className="space-y-2">
          {wordData.meanings.map((meaning, index) => (
            <div key={index} className="bg-white/10 rounded-xl p-4">
              <span className="text-sm font-medium text-blue-200">
                {meaning.partOfSpeech}
              </span>
              <p className="mt-1">{meaning.definitions[0].definition}</p>
              {meaning.definitions[0].example && (
                <p className="mt-2 text-sm italic text-blue-100">
                  "{meaning.definitions[0].example}"
                </p>
              )}
              {meaning.definitions[0].synonyms?.length > 0 && (
                <div className="mt-2 flex flex-wrap gap-2">
                  {meaning.definitions[0].synonyms.slice(0, 3).map((synonym) => (
                    <span
                      key={synonym}
                      className="px-2 py-1 bg-white/20 rounded-full text-xs"
                    >
                      {synonym}
                    </span>
                  ))}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default EnglishWordOfDay;