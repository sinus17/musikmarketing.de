-- Blog Posts Table for musikmarketing.de
create table if not exists posts (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  slug text unique not null,
  content text not null,
  excerpt text,
  cover_image text,
  status text not null default 'draft' check (status in ('draft', 'published')),
  published_date timestamp with time zone,
  author text not null default 'Musikmarketing.de',
  tags text[] default '{}',
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);

-- Enable Row Level Security
alter table posts enable row level security;

-- Policy: Anyone can read published posts
create policy "Published posts are viewable by everyone"
  on posts for select
  using (status = 'published');

-- Policy: Authenticated users can do everything
create policy "Authenticated users can manage posts"
  on posts for all
  using (auth.role() = 'authenticated');

-- Create index for faster queries
create index posts_slug_idx on posts(slug);
create index posts_status_idx on posts(status);
create index posts_published_date_idx on posts(published_date desc);

-- Function to auto-update updated_at
create or replace function update_updated_at_column()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

-- Trigger to auto-update updated_at
create trigger update_posts_updated_at
  before update on posts
  for each row
  execute function update_updated_at_column();

-- Storage bucket for blog images
insert into storage.buckets (id, name, public)
values ('blog-images', 'blog-images', true)
on conflict (id) do nothing;

-- Storage policy: Anyone can view images
create policy "Blog images are publicly accessible"
  on storage.objects for select
  using (bucket_id = 'blog-images');

-- Storage policy: Authenticated users can upload
create policy "Authenticated users can upload blog images"
  on storage.objects for insert
  with check (bucket_id = 'blog-images' and auth.role() = 'authenticated');

-- Storage policy: Authenticated users can update
create policy "Authenticated users can update blog images"
  on storage.objects for update
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');

-- Storage policy: Authenticated users can delete
create policy "Authenticated users can delete blog images"
  on storage.objects for delete
  using (bucket_id = 'blog-images' and auth.role() = 'authenticated');
