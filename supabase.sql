-- Cài mới hoàn chỉnh cho Tan Van Media CMS.
create table if not exists public.courses (
  id bigint primary key,
  title text not null,
  slug text,
  published boolean not null default true,
  price text not null default '',
  duration text not null default '',
  level text not null default 'Cơ bản',
  image text not null default '',
  description text not null default '',
  learning_points jsonb not null default '[]'::jsonb,
  curriculum jsonb not null default '[]'::jsonb,
  sort_order integer not null default 0,
  updated_at timestamptz not null default now()
);
create unique index if not exists courses_slug_unique on public.courses (slug) where slug is not null and slug <> '';

create table if not exists public.news (
  id bigint primary key,
  title text not null,
  slug text,
  published boolean not null default true,
  description text not null default '',
  image text not null default '',
  published_at text not null default '',
  content jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now()
);
create unique index if not exists news_slug_unique on public.news (slug) where slug is not null and slug <> '';

create table if not exists public.banners (
  id bigint primary key,
  title text not null,
  description text not null default '',
  image text not null default '',
  link text not null default '/',
  button_text text not null default 'Xem khóa học',
  sort_order integer not null default 0,
  active boolean not null default true,
  updated_at timestamptz not null default now()
);

alter table public.courses enable row level security;
alter table public.news enable row level security;
alter table public.banners enable row level security;

create policy "Anon can read published courses" on public.courses for select to anon using (published = true);
create policy "Authenticated can read courses" on public.courses for select to authenticated using (true);
create policy "Authenticated can insert courses" on public.courses for insert to authenticated with check (true);
create policy "Authenticated can update courses" on public.courses for update to authenticated using (true) with check (true);
create policy "Authenticated can delete courses" on public.courses for delete to authenticated using (true);

create policy "Anon can read published news" on public.news for select to anon using (published = true);
create policy "Authenticated can read news" on public.news for select to authenticated using (true);
create policy "Authenticated can insert news" on public.news for insert to authenticated with check (true);
create policy "Authenticated can update news" on public.news for update to authenticated using (true) with check (true);
create policy "Authenticated can delete news" on public.news for delete to authenticated using (true);

create policy "Anon can read active banners" on public.banners for select to anon using (active = true);
create policy "Authenticated can read banners" on public.banners for select to authenticated using (true);
create policy "Authenticated can insert banners" on public.banners for insert to authenticated with check (true);
create policy "Authenticated can update banners" on public.banners for update to authenticated using (true) with check (true);
create policy "Authenticated can delete banners" on public.banners for delete to authenticated using (true);

insert into storage.buckets (id, name, public) values ('media','media',true) on conflict (id) do update set public=true;
create policy "Public can view media" on storage.objects for select using (bucket_id='media');
create policy "Authenticated can upload media" on storage.objects for insert to authenticated with check (bucket_id='media');
create policy "Authenticated can update media" on storage.objects for update to authenticated using (bucket_id='media') with check (bucket_id='media');
create policy "Authenticated can delete media" on storage.objects for delete to authenticated using (bucket_id='media');
