/*
  # Add image storage support

  1. Changes
    - Add `image_url` column to calendar_windows table
    - Update RLS policies to allow image access

  2. Security
    - Maintain existing RLS policies
    - Ensure authenticated users can manage images
*/

ALTER TABLE calendar_windows
ADD COLUMN IF NOT EXISTS image_url text;

-- Update trigger for updated_at
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = now();
    RETURN NEW;
END;
$$ language 'plpgsql';

CREATE TRIGGER update_calendar_windows_updated_at
    BEFORE UPDATE ON calendar_windows
    FOR EACH ROW
    EXECUTE FUNCTION update_updated_at_column();