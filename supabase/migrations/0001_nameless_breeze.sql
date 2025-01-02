/*
  # Advent Calendar Schema Setup

  1. New Tables
    - `calendar_settings`
      - `id` (uuid, primary key)
      - `start_date` (date) - When the calendar starts
      - `end_date` (date) - When the calendar ends
      - `created_at` (timestamp)
      - `updated_at` (timestamp)
    
    - `calendar_windows`
      - `id` (uuid, primary key)
      - `date` (date) - The date this window represents
      - `content` (text) - Content revealed when window is opened
      - `created_at` (timestamp)
      - `updated_at` (timestamp)

  2. Security
    - Enable RLS on both tables
    - Add policies for authenticated admin users to manage data
    - Add policies for anonymous users to view data
*/

-- Settings table
CREATE TABLE calendar_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  start_date date NOT NULL,
  end_date date NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Windows table
CREATE TABLE calendar_windows (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  date date NOT NULL UNIQUE,
  content text NOT NULL,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE calendar_settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE calendar_windows ENABLE ROW LEVEL SECURITY;

-- Policies for calendar_settings
CREATE POLICY "Anyone can view settings"
  ON calendar_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can manage settings"
  ON calendar_settings
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);

-- Policies for calendar_windows
CREATE POLICY "Anyone can view windows"
  ON calendar_windows
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Only authenticated users can manage windows"
  ON calendar_windows
  FOR ALL
  TO authenticated
  USING (true)
  WITH CHECK (true);