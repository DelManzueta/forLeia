/*
  # Language Lab Schema

  1. New Tables
    - `vocabulary_words`
      - `id` (uuid, primary key)
      - `spanish` (text, word in Spanish)
      - `english` (text, English translation)
      - `category` (text, word category)
      - `image_url` (text, illustration URL)
      - `created_at` (timestamp)
    
    - `user_progress`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `word_id` (uuid, references vocabulary_words)
      - `status` (text, either 'known' or 'learning')
      - `last_reviewed` (timestamp)
      - `created_at` (timestamp)
    
    - `achievements`
      - `id` (uuid, primary key)
      - `user_id` (uuid, references auth.users)
      - `badge_name` (text, name of the achievement)
      - `earned_at` (timestamp)
      - `created_at` (timestamp)

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to:
      - Read vocabulary words
      - Read/write their own progress
      - Read/write their own achievements
*/

-- Create vocabulary_words table
CREATE TABLE vocabulary_words (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  spanish text NOT NULL,
  english text NOT NULL,
  category text NOT NULL,
  image_url text,
  created_at timestamptz DEFAULT now()
);

-- Create user_progress table
CREATE TABLE user_progress (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  word_id uuid REFERENCES vocabulary_words NOT NULL,
  status text NOT NULL CHECK (status IN ('known', 'learning')),
  last_reviewed timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Create achievements table
CREATE TABLE achievements (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid REFERENCES auth.users NOT NULL,
  badge_name text NOT NULL,
  earned_at timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE vocabulary_words ENABLE ROW LEVEL SECURITY;
ALTER TABLE user_progress ENABLE ROW LEVEL SECURITY;
ALTER TABLE achievements ENABLE ROW LEVEL SECURITY;

-- Create policies
CREATE POLICY "Anyone can read vocabulary words"
  ON vocabulary_words
  FOR SELECT
  TO authenticated
  USING (true);

CREATE POLICY "Users can read their own progress"
  ON user_progress
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can update their own progress"
  ON user_progress
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

CREATE POLICY "Users can read their achievements"
  ON achievements
  FOR SELECT
  TO authenticated
  USING (auth.uid() = user_id);

CREATE POLICY "Users can earn new achievements"
  ON achievements
  FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = user_id);

-- Insert initial vocabulary
INSERT INTO vocabulary_words (spanish, english, category, image_url) VALUES
  ('perro', 'dog', 'animals', 'https://images.unsplash.com/photo-1517849845537-4d257902454a?auto=format&fit=crop&w=300&h=300'),
  ('gato', 'cat', 'animals', 'https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?auto=format&fit=crop&w=300&h=300'),
  ('rojo', 'red', 'colors', 'https://images.unsplash.com/photo-1579546929518-9e396f3cc809?auto=format&fit=crop&w=300&h=300'),
  ('azul', 'blue', 'colors', 'https://images.unsplash.com/photo-1576086213369-97a306d36557?auto=format&fit=crop&w=300&h=300'),
  ('uno', 'one', 'numbers', 'https://images.unsplash.com/photo-1516383740770-fbcc5ccbece0?auto=format&fit=crop&w=300&h=300'),
  ('dos', 'two', 'numbers', 'https://images.unsplash.com/photo-1516534775068-ba3e7458af70?auto=format&fit=crop&w=300&h=300'),
  ('manzana', 'apple', 'food', 'https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=300&h=300'),
  ('plátano', 'banana', 'food', 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?auto=format&fit=crop&w=300&h=300'),
  ('feliz', 'happy', 'emotions', 'https://images.unsplash.com/photo-1520365795218-bc5b41d0f791?auto=format&fit=crop&w=300&h=300'),
  ('triste', 'sad', 'emotions', 'https://images.unsplash.com/photo-1517677129300-07b130802f46?auto=format&fit=crop&w=300&h=300');