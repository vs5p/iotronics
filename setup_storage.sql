-- Enable the storage extension if not already enabled (usually enabled by default)
-- CREATE EXTENSION IF NOT EXISTS "storage";

-- Create buckets
INSERT INTO storage.buckets (id, name, public)
VALUES 
  ('project-images', 'project-images', true),
  ('news-images', 'news-images', true),
  ('event-banners', 'event-banners', true)
ON CONFLICT (id) DO NOTHING;

-- Policy to allow public viewing of images
CREATE POLICY "Public Access Project Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'project-images' );

CREATE POLICY "Public Access News Images"
ON storage.objects FOR SELECT
USING ( bucket_id = 'news-images' );

CREATE POLICY "Public Access Event Banners"
ON storage.objects FOR SELECT
USING ( bucket_id = 'event-banners' );

-- Policy to allow uploads (Adjust "authenticated" to "anon" if you want to allow anyone to upload without login)
-- Ideally, only logged-in users (admins) should upload.
CREATE POLICY "Authenticated Upload Project Images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'project-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated Upload News Images"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'news-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Authenticated Upload Event Banners"
ON storage.objects FOR INSERT
WITH CHECK ( bucket_id = 'event-banners' AND auth.role() = 'authenticated' );

-- Policy to allow updating/deleting images (optional, for admin only)
CREATE POLICY "Admin Update Project Images"
ON storage.objects FOR UPDATE
USING ( bucket_id = 'project-images' AND auth.role() = 'authenticated' );

CREATE POLICY "Admin Delete Project Images"
ON storage.objects FOR DELETE
USING ( bucket_id = 'project-images' AND auth.role() = 'authenticated' );

-- Repeat update/delete for other buckets if needed, or make a generic one
CREATE POLICY "Admin Manage All Images"
ON storage.objects FOR ALL
USING ( auth.role() = 'authenticated' );
