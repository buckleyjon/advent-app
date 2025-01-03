/*
  # Fix RLS policies for calendar tables
  
  1. Changes
    - Update RLS policies for calendar_settings to allow proper management
    - Update RLS policies for calendar_windows to allow proper management
    
  2. Security
    - Allow public read access to all calendar data
    - Allow authenticated users to manage all calendar data
*/

-- Drop existing policies
DROP POLICY IF EXISTS "Anyone can view settings" ON calendar_settings;
DROP POLICY IF EXISTS "Only authenticated users can manage settings" ON calendar_settings;
DROP POLICY IF EXISTS "Anyone can view windows" ON calendar_windows;
DROP POLICY IF EXISTS "Only authenticated users can manage windows" ON calendar_windows;

-- New policies for calendar_settings
CREATE POLICY "Public read access for settings"
  ON calendar_settings
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage settings"
  ON calendar_settings
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- New policies for calendar_windows
CREATE POLICY "Public read access for windows"
  ON calendar_windows
  FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can manage windows"
  ON calendar_windows
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');