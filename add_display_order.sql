-- Add display_order column to projects table
ALTER TABLE projects ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Add display_order column to news table
ALTER TABLE news ADD COLUMN IF NOT EXISTS display_order INTEGER;

-- Set initial display_order values based on created_at (older items get higher numbers)
UPDATE projects 
SET display_order = row_number 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY created_at DESC) as row_number 
  FROM projects
) AS numbered
WHERE projects.id = numbered.id AND projects.display_order IS NULL;

UPDATE news 
SET display_order = row_number 
FROM (
  SELECT id, ROW_NUMBER() OVER (ORDER BY date DESC, created_at DESC) as row_number 
  FROM news
) AS numbered
WHERE news.id = numbered.id AND news.display_order IS NULL;
