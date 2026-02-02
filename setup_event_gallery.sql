-- Event Gallery Feature - Database Migration
-- Run this in your Supabase SQL Editor

-- Add gallery_images column to events table
-- This stores an array of image URLs (up to 5 images per event)
ALTER TABLE events ADD COLUMN IF NOT EXISTS gallery_images TEXT[] DEFAULT '{}';

-- Add detailed_description column for past events
-- This allows a longer, more detailed description for the gallery page
ALTER TABLE events ADD COLUMN IF NOT EXISTS detailed_description TEXT;

-- Verify the columns were added
SELECT column_name, data_type, column_default
FROM information_schema.columns
WHERE table_name = 'events'
AND column_name IN ('gallery_images', 'detailed_description');
