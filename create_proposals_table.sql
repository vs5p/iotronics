-- Create proposals table
create table if not exists proposals (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null,
  title text not null,
  idea text not null,
  status text default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- Enable Row Level Security (RLS)
alter table proposals enable row level security;

-- Policy to allow anyone to insert proposals (Submit)
create policy "Allow public insert to proposals"
  on proposals for insert
  with check (true);

-- Policy to allow public to view proposals (For Admin dashboard)
create policy "Allow public select proposals"
  on proposals for select
  using (true);

-- Policy to allow public to update proposals (For Admin to mark status)
create policy "Allow public update proposals"
  on proposals for update
  using (true);

-- Policy to allow public to delete proposals
create policy "Allow public delete proposals"
  on proposals for delete
  using (true);
