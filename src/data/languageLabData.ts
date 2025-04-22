import { Globe, BookOpen, Star } from 'lucide-react';

export interface DailyWord {
  word: string;
  translation: string;
  image: string;
  audio: string;
  example: string;
  category: string;
}

export interface VocabularyWord {
  word: string;
  translation: string;
  image: string;
  audio: string;
  example: string;
}

export interface Category {
  name: string;
  id: string;
  words: VocabularyWord[];
}

export interface Quiz {
  type: 'match' | 'fill-in-the-blank';
  title: string;
  questions: Array<{
    question?: string;
    sentence?: string;
    choices: string[];
    answer: string;
  }>;
}

export interface SentenceBuilder {
  title: string;
  prompt: string;
  correct_sentence: string[];
  word_bank: string[];
}

export interface Badge {
  name: string;
  condition: string;
  icon: string;
}

export const languageLabData = {
  daily_word: {
    word: "perro",
    translation: "dog",
    image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300",
    audio: "perro.mp3",
    example: "El perro corre rápido.",
    category: "animals"
  },
  categories: [
    {
      name: "Animals",
      id: "animals",
      words: [
        {
          word: "gato",
          translation: "cat",
          image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300",
          audio: "gato.mp3",
          example: "El gato duerme mucho."
        },
        {
          word: "caballo",
          translation: "horse",
          image: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=300&h=300",
          audio: "caballo.mp3",
          example: "El caballo es grande."
        },
        {
          word: "pájaro",
          translation: "bird",
          image: "https://images.unsplash.com/photo-1444464666168-49d633b86797?auto=format&fit=crop&w=300&h=300",
          audio: "pajaro.mp3",
          example: "El pájaro canta."
        }
      ]
    },
    {
      name: "Food",
      id: "food",
      words: [
        {
          word: "manzana",
          translation: "apple",
          image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&h=300",
          audio: "manzana.mp3",
          example: "La manzana es roja."
        },
        {
          word: "pan",
          translation: "bread",
          image: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?auto=format&fit=crop&w=300&h=300",
          audio: "pan.mp3",
          example: "Me gusta el pan."
        },
        {
          word: "leche",
          translation: "milk",
          image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=300&h=300",
          audio: "leche.mp3",
          example: "La leche está fría."
        }
      ]
    },
    {
      name: "Colors",
      id: "colors",
      words: [
        {
          word: "rojo",
          translation: "red",
          image: "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=300&h=300",
          audio: "rojo.mp3",
          example: "Mi carro es rojo."
        },
        {
          word: "azul",
          translation: "blue",
          image: "https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=300&h=300",
          audio: "azul.mp3",
          example: "El cielo es azul."
        },
        {
          word: "verde",
          translation: "green",
          image: "https://images.unsplash.com/photo-1564419320461-6870880221ad?auto=format&fit=crop&w=300&h=300",
          audio: "verde.mp3",
          example: "La hoja es verde."
        }
      ]
    }
  ],
  quizzes: [
    {
      type: "match",
      title: "Animal Match",
      questions: [
        {
          question: "gato",
          choices: ["cat", "dog", "bird", "horse"],
          answer: "cat"
        },
        {
          question: "pájaro",
          choices: ["bird", "fish", "horse", "apple"],
          answer: "bird"
        },
        {
          question: "caballo",
          choices: ["dog", "horse", "cheese", "green"],
          answer: "horse"
        }
      ]
    },
    {
      type: "fill-in-the-blank",
      title: "Fill in the Food",
      questions: [
        {
          sentence: "La _____ es roja.",
          choices: ["manzana", "pan", "leche", "perro"],
          answer: "manzana"
        },
        {
          sentence: "Me gusta el _____.",
          choices: ["pan", "verde", "caballo", "pájaro"],
          answer: "pan"
        }
      ]
    }
  ],
  badges: [
    {
      name: "Animal Expert",
      condition: "Learn all animal words",
      icon: Globe
    },
    {
      name: "Word Collector",
      condition: "Learn 10 words",
      icon: BookOpen
    },
    {
      name: "Quiz Master",
      condition: "Complete all quizzes",
      icon: Star
    }
  ]
};