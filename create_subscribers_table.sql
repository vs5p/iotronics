-- Create subscribers table
create table if not exists subscribers (
  id uuid default gen_random_uuid() primary key,
  email text not null unique,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table subscribers enable row level security;

-- Policy to allow anyone to insert valid emails (Subscribe)
create policy "Allow public insert to subscribers"
  on subscribers for insert
  with check (true);

-- Policy to allow public to view subscribers (Required for the client-side Admin panel)
-- Note: In a production app with real auth, this should be restricted to authenticated admins only.
create policy "Allow public select subscribers"
  on subscribers for select
  using (true);

-- Policy to allow public to delete subscribers (Required for admin to remove them)
create policy "Allow public delete subscribers"
  on subscribers for delete
  using (true);
