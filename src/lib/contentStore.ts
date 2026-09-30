import { BANNERS, COURSES, NEWS } from '../constants';
import { Banner, Course, News } from '../types';
import { isSupabaseConfigured, supabase } from './supabase';

const COURSE_KEY = 'tvm_courses_v1';
const NEWS_KEY = 'tvm_news_v1';
const BANNER_KEY = 'tvm_banners_v1';

function clone<T>(value: T): T { return JSON.parse(JSON.stringify(value)); }
function readLocal<T>(key: string, seed: T): T {
  const saved = localStorage.getItem(key);
  if (!saved) { localStorage.setItem(key, JSON.stringify(seed)); return clone(seed); }
  try { return JSON.parse(saved); } catch { return clone(seed); }
}
function writeLocal<T>(key: string, value: T) { localStorage.setItem(key, JSON.stringify(value)); }

export function slugify(value: string): string {
  return value
    .normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/đ/g, 'd').replace(/Đ/g, 'D')
    .toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/^-+|-+$/g, '');
}

export const contentMode = isSupabaseConfigured ? 'supabase' : 'local';

export async function getCourses(includeHidden = false): Promise<Course[]> {
  if (!supabase) {
    const items = readLocal<Course[]>(COURSE_KEY, COURSES).map(x => ({...x, slug:x.slug || slugify(x.title), published:x.published !== false}));
    return includeHidden ? items : items.filter(x => x.published !== false);
  }
  let query = supabase.from('courses').select('*').order('sort_order').order('id');
  if (!includeHidden) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.id, title: row.title, slug: row.slug || slugify(row.title), published: row.published ?? true,
    price: row.price, duration: row.duration, level: row.level, image: row.image, description: row.description,
    learningPoints: row.learning_points ?? [], curriculum: row.curriculum ?? [],
  }));
}

export async function getBanners(includeHidden = false): Promise<Banner[]> {
  if (!supabase) {
    const items = readLocal<Banner[]>(BANNER_KEY, BANNERS).sort((a,b)=>(a.sortOrder ?? 0)-(b.sortOrder ?? 0));
    return includeHidden ? items : items.filter(x => x.active !== false);
  }
  let query = supabase.from('banners').select('*').order('sort_order').order('id');
  if (!includeHidden) query = query.eq('active', true);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.id, title: row.title, description: row.description, image: row.image, link: row.link || '/',
    buttonText: row.button_text || 'Xem khóa học', sortOrder: row.sort_order ?? 0, active: row.active ?? true,
  }));
}

export async function getNews(includeHidden = false): Promise<News[]> {
  if (!supabase) {
    const items = readLocal<News[]>(NEWS_KEY, NEWS).map(x => ({...x, slug:x.slug || slugify(x.title), published:x.published !== false}));
    return includeHidden ? items : items.filter(x => x.published !== false);
  }
  let query = supabase.from('news').select('*').order('published_at', { ascending: false }).order('id', { ascending: false });
  if (!includeHidden) query = query.eq('published', true);
  const { data, error } = await query;
  if (error) throw error;
  return (data ?? []).map((row: any) => ({
    id: row.id, title: row.title, slug: row.slug || slugify(row.title), published: row.published ?? true,
    description: row.description, image: row.image, publishedAt: row.published_at || '', content: row.content ?? [],
  }));
}

export async function saveCourse(course: Course): Promise<void> {
  const normalized = {...course, slug: course.slug?.trim() || slugify(course.title), published: course.published !== false};
  if (!supabase) {
    const items = readLocal<Course[]>(COURSE_KEY, COURSES);
    const next = items.some(x => x.id === normalized.id) ? items.map(x => x.id === normalized.id ? normalized : x) : [...items, normalized];
    writeLocal(COURSE_KEY, next); return;
  }
  const payload = {
    id: normalized.id, title: normalized.title, slug: normalized.slug, published: normalized.published, price: normalized.price,
    duration: normalized.duration, level: normalized.level, image: normalized.image, description: normalized.description,
    learning_points: normalized.learningPoints, curriculum: normalized.curriculum,
  };
  const { error } = await supabase.from('courses').upsert(payload); if (error) throw error;
}
export async function deleteCourse(id: number): Promise<void> {
  if (!supabase) { writeLocal(COURSE_KEY, readLocal<Course[]>(COURSE_KEY, COURSES).filter(x => x.id !== id)); return; }
  const { error } = await supabase.from('courses').delete().eq('id', id); if (error) throw error;
}

export async function saveBanner(banner: Banner): Promise<void> {
  if (!supabase) {
    const items = readLocal<Banner[]>(BANNER_KEY, BANNERS);
    writeLocal(BANNER_KEY, items.some(x=>x.id===banner.id) ? items.map(x=>x.id===banner.id?banner:x) : [...items,banner]); return;
  }
  const payload = { id:banner.id,title:banner.title,description:banner.description,image:banner.image,link:banner.link,button_text:banner.buttonText||'Xem khóa học',sort_order:banner.sortOrder??0,active:banner.active??true };
  const { error } = await supabase.from('banners').upsert(payload); if (error) throw error;
}
export async function deleteBanner(id: number): Promise<void> {
  if (!supabase) { writeLocal(BANNER_KEY, readLocal<Banner[]>(BANNER_KEY, BANNERS).filter(x => x.id !== id)); return; }
  const { error } = await supabase.from('banners').delete().eq('id', id); if (error) throw error;
}

export async function saveNews(news: News): Promise<void> {
  const normalized = {...news, slug: news.slug?.trim() || slugify(news.title), published: news.published !== false};
  if (!supabase) {
    const items = readLocal<News[]>(NEWS_KEY, NEWS);
    writeLocal(NEWS_KEY, items.some(x=>x.id===normalized.id) ? items.map(x=>x.id===normalized.id?normalized:x) : [...items,normalized]); return;
  }
  const payload = { id:normalized.id,title:normalized.title,slug:normalized.slug,published:normalized.published,description:normalized.description,image:normalized.image,published_at:normalized.publishedAt||'',content:normalized.content??[] };
  const { error } = await supabase.from('news').upsert(payload); if (error) throw error;
}
export async function deleteNews(id: number): Promise<void> {
  if (!supabase) { writeLocal(NEWS_KEY, readLocal<News[]>(NEWS_KEY, NEWS).filter(x => x.id !== id)); return; }
  const { error } = await supabase.from('news').delete().eq('id', id); if (error) throw error;
}

export async function uploadImage(file: File, folder: 'courses' | 'news' | 'banners'): Promise<string> {
  if (!supabase) { return new Promise((resolve,reject)=>{ const r=new FileReader(); r.onload=()=>resolve(String(r.result)); r.onerror=reject; r.readAsDataURL(file); }); }
  if (!file.type.startsWith('image/')) throw new Error('Chỉ hỗ trợ file ảnh.');
  if (file.size > 8 * 1024 * 1024) throw new Error('Ảnh tối đa 8 MB.');
  const ext = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const path = `${folder}/${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`;
  const { error } = await supabase.storage.from('media').upload(path, file, { upsert:false, contentType:file.type, cacheControl:'3600' });
  if (error) throw error;
  return supabase.storage.from('media').getPublicUrl(path).data.publicUrl;
}

export function resetLocalContent() { localStorage.removeItem(COURSE_KEY); localStorage.removeItem(NEWS_KEY); localStorage.removeItem(BANNER_KEY); }
export async function seedSupabaseContent(): Promise<void> {
  if (!supabase) return;
  for (const course of COURSES) await saveCourse({...course, published:true, slug:slugify(course.title)});
  for (const item of NEWS) await saveNews({...item, published:true, slug:slugify(item.title)});
  for (const banner of BANNERS) await saveBanner(banner);
}
