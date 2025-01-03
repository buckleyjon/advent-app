/*
  # Add title to calendar settings

  1. Changes
    - Add `title` column to `calendar_settings` table with default value 'Advent Calendar'
*/

ALTER TABLE calendar_settings
ADD COLUMN IF NOT EXISTS title text NOT NULL DEFAULT 'Advent Calendar';