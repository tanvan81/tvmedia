-- NÂNG CẤP V2 cho project đã chạy supabase.sql bản trước.
-- Chạy toàn bộ file này MỘT LẦN trong Supabase SQL Editor.

alter table public.courses add column if not exists slug text;
alter table public.courses add column if not exists published boolean not null default true;
alter table public.news add column if not exists slug text;
alter table public.news add column if not exists published boolean not null default true;

create unique index if not exists courses_slug_unique on public.courses (slug) where slug is not null and slug <> '';
create unique index if not exists news_slug_unique on public.news (slug) where slug is not null and slug <> '';

-- Khách chỉ đọc nội dung đã xuất bản; user đã đăng nhập có thể đọc/quản lý tất cả.
drop policy if exists "Public can read courses" on public.courses;
drop policy if exists "Authenticated can manage courses" on public.courses;
create policy "Anon can read published courses" on public.courses for select to anon using (published = true);
create policy "Authenticated can read courses" on public.courses for select to authenticated using (true);
create policy "Authenticated can insert courses" on public.courses for insert to authenticated with check (true);
create policy "Authenticated can update courses" on public.courses for update to authenticated using (true) with check (true);
create policy "Authenticated can delete courses" on public.courses for delete to authenticated using (true);

drop policy if exists "Public can read news" on public.news;
drop policy if exists "Authenticated can manage news" on public.news;
create policy "Anon can read published news" on public.news for select to anon using (published = true);
create policy "Authenticated can read news" on public.news for select to authenticated using (true);
create policy "Authenticated can insert news" on public.news for insert to authenticated with check (true);
create policy "Authenticated can update news" on public.news for update to authenticated using (true) with check (true);
create policy "Authenticated can delete news" on public.news for delete to authenticated using (true);

-- Slide tắt cũng được ẩn với khách.
drop policy if exists "Public can read banners" on public.banners;
drop policy if exists "Authenticated can manage banners" on public.banners;
create policy "Anon can read active banners" on public.banners for select to anon using (active = true);
create policy "Authenticated can read banners" on public.banners for select to authenticated using (true);
create policy "Authenticated can insert banners" on public.banners for insert to authenticated with check (true);
create policy "Authenticated can update banners" on public.banners for update to authenticated using (true) with check (true);
create policy "Authenticated can delete banners" on public.banners for delete to authenticated using (true);

-- Storage: giữ public read, chỉ tài khoản đăng nhập mới upload/sửa/xóa.
insert into storage.buckets (id, name, public) values ('media','media',true)
on conflict (id) do update set public=true;
