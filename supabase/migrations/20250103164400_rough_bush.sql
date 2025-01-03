-- Enable the storage extension
CREATE EXTENSION IF NOT EXISTS "storage";

-- Create a new storage bucket for calendar images
INSERT INTO storage.buckets (id, name)
VALUES ('calendar-images', 'calendar-images')
ON CONFLICT (id) DO NOTHING;

-- Allow public access to the calendar-images bucket
CREATE POLICY "Public Access"
ON storage.objects FOR SELECT
TO public
USING (bucket_id = 'calendar-images');

-- Allow authenticated users to upload images
CREATE POLICY "Authenticated users can upload images"
ON storage.objects FOR INSERT
TO authenticated
WITH CHECK (bucket_id = 'calendar-images');

-- Allow authenticated users to update and delete their own images
CREATE POLICY "Authenticated users can update their own images"
ON storage.objects FOR UPDATE
TO authenticated
USING (bucket_id = 'calendar-images' AND auth.uid() = owner);

CREATE POLICY "Authenticated users can delete their own images"
ON storage.objects FOR DELETE
TO authenticated
USING (bucket_id = 'calendar-images' AND auth.uid() = owner);