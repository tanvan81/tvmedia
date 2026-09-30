import { useMemo, useState } from 'react';
import { BookOpen, Newspaper, Images, Plus, Pencil, Trash2, LogOut, RotateCcw, Eye, EyeOff } from 'lucide-react';
import { Banner, Course, News } from '../../types';
import {
  contentMode,
  deleteBanner,
  deleteCourse,
  deleteNews,
  resetLocalContent,
  saveBanner,
  saveCourse,
  saveNews,
  seedSupabaseContent,
  uploadImage,
} from '../../lib/contentStore';
import { supabase } from '../../lib/supabase';

type Props = {
  courses: Course[];
  news: News[];
  banners: Banner[];
  onRefresh: () => Promise<void>;
  onLogout: () => void;
};

const emptyCourse = (id: number): Course => ({ id, title:'', slug:'', published:true, price:'', duration:'', level:'Cơ bản', image:'', description:'', learningPoints:[], curriculum:[] });
const emptyNews = (id: number): News => ({ id, title:'', slug:'', published:true, description:'', image:'', publishedAt:new Date().toLocaleDateString('vi-VN'), content:[] });
const emptyBanner = (id: number, order: number): Banner => ({ id, title:'', description:'', image:'', link:'/', buttonText:'Xem khóa học', sortOrder:order, active:true });

export default function AdminDashboard({ courses, news, banners, onRefresh, onLogout }: Props) {
  const [tab, setTab] = useState<'courses'|'news'|'banners'>('courses');
  const [courseEdit, setCourseEdit] = useState<Course|null>(null);
  const [newsEdit, setNewsEdit] = useState<News|null>(null);
  const [bannerEdit, setBannerEdit] = useState<Banner|null>(null);
  const [busy, setBusy] = useState(false);
  const nextCourseId = useMemo(() => Math.max(0, ...courses.map(x=>x.id))+1,[courses]);
  const nextNewsId = useMemo(() => Math.max(0, ...news.map(x=>x.id))+1,[news]);
  const nextBannerId = useMemo(() => Math.max(0, ...banners.map(x=>x.id))+1,[banners]);
  const nextBannerOrder = useMemo(() => Math.max(0, ...banners.map(x=>x.sortOrder ?? 0))+1,[banners]);

  const logout = async () => {
    if (supabase) await supabase.auth.signOut();
    onLogout();
  };

  const removeCourse = async (id:number) => { if (!confirm('Xóa khóa học này?')) return; await deleteCourse(id); await onRefresh(); };
  const removeNews = async (id:number) => { if (!confirm('Xóa bài viết này?')) return; await deleteNews(id); await onRefresh(); };
  const removeBanner = async (id:number) => { if (!confirm('Xóa slide này?')) return; await deleteBanner(id); await onRefresh(); };

  const resetOrSeed = async () => {
    if (contentMode === 'local') {
      if (!confirm('Khôi phục toàn bộ dữ liệu mẫu, gồm khóa học, tin tức và slide?')) return;
      resetLocalContent();
      await onRefresh();
      return;
    }
    if (!confirm('Khởi tạo dữ liệu mẫu lên Supabase?')) return;
    await seedSupabaseContent();
    await onRefresh();
  };

  return <div className="min-h-screen bg-slate-50 pt-24 pb-16">
    <div className="max-w-7xl mx-auto px-4 sm:px-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-7">
        <div><h1 className="text-3xl font-bold text-slate-900">Admin</h1><p className="text-slate-500 mt-1">Quản lý khóa học, tin tức và slide trang chủ · {contentMode === 'supabase' ? 'Supabase' : 'Local/demo'}</p></div>
        <div className="flex flex-wrap gap-2">
          {(contentMode==='local' || (contentMode==='supabase' && (courses.length===0 || news.length===0 || banners.length===0))) && <button onClick={resetOrSeed} className="px-4 py-2.5 rounded-xl bg-white border text-slate-700 flex items-center gap-2"><RotateCcw size={17}/> {contentMode==='local'?'Khôi phục mẫu':'Khởi tạo dữ liệu mẫu'}</button>}
          <button onClick={logout} className="px-4 py-2.5 rounded-xl bg-slate-900 text-white flex items-center gap-2"><LogOut size={17}/> Đăng xuất</button>
        </div>
      </div>

      <div className="bg-white border rounded-2xl p-2 inline-flex flex-wrap gap-2 mb-6">
        <TabButton active={tab==='courses'} onClick={()=>setTab('courses')}><BookOpen size={18}/> Khóa học ({courses.length})</TabButton>
        <TabButton active={tab==='news'} onClick={()=>setTab('news')}><Newspaper size={18}/> Tin tức ({news.length})</TabButton>
        <TabButton active={tab==='banners'} onClick={()=>setTab('banners')}><Images size={18}/> Slide trang chủ ({banners.length})</TabButton>
      </div>

      {tab==='courses' && <section className="bg-white border rounded-3xl overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center"><h2 className="font-bold text-xl">Danh sách khóa học</h2><button onClick={()=>setCourseEdit(emptyCourse(nextCourseId))} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2"><Plus size={18}/> Thêm khóa học</button></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-slate-500"><tr><th className="p-4">Ảnh</th><th className="p-4">Tên khóa học</th><th className="p-4">Giá</th><th className="p-4">Trình độ</th><th className="p-4">Trạng thái</th><th className="p-4 w-28">Thao tác</th></tr></thead><tbody>{courses.map(c=><tr key={c.id} className="border-t"><td className="p-4"><img src={c.image} className="w-20 h-12 object-cover rounded-lg"/></td><td className="p-4 font-semibold text-slate-800">{c.title}</td><td className="p-4">{c.price}</td><td className="p-4">{c.level}</td><td className="p-4">{c.published !== false ? <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Đã đăng</span> : <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">Bản nháp</span>}</td><td className="p-4"><ActionButtons onEdit={()=>setCourseEdit(c)} onDelete={()=>removeCourse(c.id)} /></td></tr>)}</tbody></table></div>
      </section>}

      {tab==='news' && <section className="bg-white border rounded-3xl overflow-hidden">
        <div className="p-5 border-b flex justify-between items-center"><h2 className="font-bold text-xl">Danh sách tin tức</h2><button onClick={()=>setNewsEdit(emptyNews(nextNewsId))} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2"><Plus size={18}/> Thêm tin tức</button></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-slate-500"><tr><th className="p-4">Ảnh</th><th className="p-4">Tiêu đề</th><th className="p-4">Ngày đăng</th><th className="p-4">Trạng thái</th><th className="p-4 w-28">Thao tác</th></tr></thead><tbody>{news.map(n=><tr key={n.id} className="border-t"><td className="p-4"><img src={n.image} className="w-20 h-12 object-cover rounded-lg"/></td><td className="p-4 font-semibold text-slate-800">{n.title}</td><td className="p-4">{n.publishedAt}</td><td className="p-4">{n.published !== false ? <span className="text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full">Đã đăng</span> : <span className="text-slate-600 bg-slate-100 px-2.5 py-1 rounded-full">Bản nháp</span>}</td><td className="p-4"><ActionButtons onEdit={()=>setNewsEdit(n)} onDelete={()=>removeNews(n.id)} /></td></tr>)}</tbody></table></div>
      </section>}

      {tab==='banners' && <section className="bg-white border rounded-3xl overflow-hidden">
        <div className="p-5 border-b flex flex-col sm:flex-row gap-3 sm:items-center justify-between"><div><h2 className="font-bold text-xl">Slide trang chủ</h2><p className="text-sm text-slate-500 mt-1">Sắp xếp bằng trường “Thứ tự”. Slide tắt sẽ không hiển thị ngoài trang chủ.</p></div><button onClick={()=>setBannerEdit(emptyBanner(nextBannerId,nextBannerOrder))} className="bg-indigo-600 text-white px-4 py-2.5 rounded-xl flex items-center gap-2 self-start"><Plus size={18}/> Thêm slide</button></div>
        <div className="overflow-x-auto"><table className="w-full text-sm"><thead className="bg-slate-50 text-left text-slate-500"><tr><th className="p-4">Ảnh</th><th className="p-4">Tiêu đề</th><th className="p-4">Nút / Link</th><th className="p-4">Thứ tự</th><th className="p-4">Trạng thái</th><th className="p-4 w-28">Thao tác</th></tr></thead><tbody>{[...banners].sort((a,b)=>(a.sortOrder??0)-(b.sortOrder??0)).map(b=><tr key={b.id} className="border-t"><td className="p-4"><img src={b.image} className="w-28 h-16 object-cover rounded-lg bg-slate-100"/></td><td className="p-4"><div className="font-semibold text-slate-800">{b.title}</div><div className="text-slate-500 max-w-md line-clamp-2 mt-1">{b.description}</div></td><td className="p-4"><div className="font-medium">{b.buttonText || 'Xem khóa học'}</div><div className="text-xs text-slate-500 mt-1">{b.link}</div></td><td className="p-4">{b.sortOrder ?? 0}</td><td className="p-4">{b.active !== false ? <span className="inline-flex items-center gap-1.5 text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full"><Eye size={14}/> Đang bật</span> : <span className="inline-flex items-center gap-1.5 text-slate-500 bg-slate-100 px-2.5 py-1 rounded-full"><EyeOff size={14}/> Đang tắt</span>}</td><td className="p-4"><ActionButtons onEdit={()=>setBannerEdit(b)} onDelete={()=>removeBanner(b.id)} /></td></tr>)}</tbody></table></div>
      </section>}
    </div>

    {courseEdit && <CourseModal value={courseEdit} busy={busy} onClose={()=>setCourseEdit(null)} onSave={async(c)=>{setBusy(true); try{await saveCourse(c); await onRefresh(); setCourseEdit(null);} finally{setBusy(false);}}}/>} 
    {newsEdit && <NewsModal value={newsEdit} busy={busy} onClose={()=>setNewsEdit(null)} onSave={async(n)=>{setBusy(true); try{await saveNews(n); await onRefresh(); setNewsEdit(null);} finally{setBusy(false);}}}/>} 
    {bannerEdit && <BannerModal value={bannerEdit} busy={busy} onClose={()=>setBannerEdit(null)} onSave={async(b)=>{setBusy(true); try{await saveBanner(b); await onRefresh(); setBannerEdit(null);} finally{setBusy(false);}}}/>} 
  </div>;
}

function TabButton({active,onClick,children}:{active:boolean;onClick:()=>void;children:any}){return <button onClick={onClick} className={`px-5 py-2.5 rounded-xl flex gap-2 items-center font-medium ${active?'bg-indigo-600 text-white':'text-slate-600'}`}>{children}</button>}
function ActionButtons({onEdit,onDelete}:{onEdit:()=>void;onDelete:()=>void}){return <div className="flex gap-2"><button onClick={onEdit} className="p-2 rounded-lg bg-blue-50 text-blue-700"><Pencil size={17}/></button><button onClick={onDelete} className="p-2 rounded-lg bg-red-50 text-red-700"><Trash2 size={17}/></button></div>}
function Field({label, children}:{label:string;children:any}){return <label className="block"><span className="block text-sm font-semibold text-slate-700 mb-1.5">{label}</span>{children}</label>}
const inputCls='w-full border border-slate-200 rounded-xl px-4 py-3 outline-none focus:ring-2 focus:ring-indigo-200 focus:border-indigo-400';

function CourseModal({value,onClose,onSave,busy}:{value:Course;onClose:()=>void;onSave:(v:Course)=>void;busy:boolean}){
  const [v,setV]=useState<Course>({...value}); const [points,setPoints]=useState(value.learningPoints.join('\n')); const [curr,setCurr]=useState(value.curriculum.map(x=>x.title).join('\n')); const [uploading,setUploading]=useState(false);
  return <Modal title={value.title?'Sửa khóa học':'Thêm khóa học'} onClose={onClose}><div className="grid md:grid-cols-2 gap-4"><Field label="Tên khóa học"><input className={inputCls} value={v.title} onChange={e=>setV({...v,title:e.target.value})}/></Field><Field label="Slug URL (để trống sẽ tự tạo)"><input className={inputCls} value={v.slug||''} onChange={e=>setV({...v,slug:e.target.value})} placeholder="master-prompt"/></Field><Field label="Giá"><input className={inputCls} value={v.price} onChange={e=>setV({...v,price:e.target.value})}/></Field><Field label="Thời lượng"><input className={inputCls} value={v.duration} onChange={e=>setV({...v,duration:e.target.value})}/></Field><Field label="Trình độ"><select className={inputCls} value={v.level} onChange={e=>setV({...v,level:e.target.value as Course['level']})}><option>Cơ bản</option><option>Trung cấp</option><option>Nâng cao</option></select></Field><Field label="Trạng thái"><select className={inputCls} value={v.published===false?'draft':'published'} onChange={e=>setV({...v,published:e.target.value==='published'})}><option value="published">Đã đăng</option><option value="draft">Bản nháp</option></select></Field></div><Field label="Ảnh / URL"><ImagePicker value={v.image} onChange={image=>setV({...v,image})} folder="courses" uploading={uploading} setUploading={setUploading}/></Field><Field label="Mô tả"><textarea rows={4} className={inputCls} value={v.description} onChange={e=>setV({...v,description:e.target.value})}/></Field><Field label="Nội dung học được (mỗi dòng 1 ý)"><textarea rows={5} className={inputCls} value={points} onChange={e=>setPoints(e.target.value)}/></Field><Field label="Chương trình học (mỗi dòng 1 mục)"><textarea rows={5} className={inputCls} value={curr} onChange={e=>setCurr(e.target.value)}/></Field><SaveButtons busy={busy||uploading} disabled={!v.title} onClose={onClose} onSave={()=>onSave({...v,learningPoints:points.split('\n').map(x=>x.trim()).filter(Boolean),curriculum:curr.split('\n').map(title=>({title:title.trim()})).filter(x=>x.title)})} label="Lưu khóa học"/></Modal>
}

function NewsModal({value,onClose,onSave,busy}:{value:News;onClose:()=>void;onSave:(v:News)=>void;busy:boolean}){
  const [v,setV]=useState<News>({...value}); const [body,setBody]=useState((value.content??[]).join('\n\n')); const [uploading,setUploading]=useState(false);
  return <Modal title={value.title?'Sửa tin tức':'Thêm tin tức'} onClose={onClose}><Field label="Tiêu đề"><input className={inputCls} value={v.title} onChange={e=>setV({...v,title:e.target.value})}/></Field><div className="grid md:grid-cols-2 gap-4"><Field label="Slug URL (để trống sẽ tự tạo)"><input className={inputCls} value={v.slug||''} onChange={e=>setV({...v,slug:e.target.value})} placeholder="ten-bai-viet"/></Field><Field label="Trạng thái"><select className={inputCls} value={v.published===false?'draft':'published'} onChange={e=>setV({...v,published:e.target.value==='published'})}><option value="published">Đã đăng</option><option value="draft">Bản nháp</option></select></Field><Field label="Ngày đăng"><input className={inputCls} value={v.publishedAt||''} onChange={e=>setV({...v,publishedAt:e.target.value})}/></Field><Field label="Ảnh / URL"><ImagePicker value={v.image} onChange={image=>setV({...v,image})} folder="news" uploading={uploading} setUploading={setUploading}/></Field></div><Field label="Mô tả ngắn"><textarea rows={3} className={inputCls} value={v.description} onChange={e=>setV({...v,description:e.target.value})}/></Field><Field label="Nội dung bài viết (cách đoạn bằng 1 dòng trống)"><textarea rows={10} className={inputCls} value={body} onChange={e=>setBody(e.target.value)}/></Field><SaveButtons busy={busy||uploading} disabled={!v.title} onClose={onClose} onSave={()=>onSave({...v,content:body.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean)})} label="Lưu tin tức"/></Modal>
}

function BannerModal({value,onClose,onSave,busy}:{value:Banner;onClose:()=>void;onSave:(v:Banner)=>void;busy:boolean}){
  const [v,setV]=useState<Banner>({...value}); const [uploading,setUploading]=useState(false);
  return <Modal title={value.title?'Sửa slide':'Thêm slide'} onClose={onClose}>
    <Field label="Tiêu đề lớn"><input className={inputCls} value={v.title} onChange={e=>setV({...v,title:e.target.value})}/></Field>
    <Field label="Mô tả"><textarea rows={3} className={inputCls} value={v.description} onChange={e=>setV({...v,description:e.target.value})}/></Field>
    <Field label="Ảnh nền"><ImagePicker value={v.image} onChange={image=>setV({...v,image})} folder="banners" uploading={uploading} setUploading={setUploading}/></Field>
    {v.image && <img src={v.image} className="w-full aspect-[16/5] object-cover rounded-2xl bg-slate-100"/>}
    <div className="grid md:grid-cols-2 gap-4">
      <Field label="Chữ trên nút"><input className={inputCls} value={v.buttonText||''} onChange={e=>setV({...v,buttonText:e.target.value})} placeholder="Xem khóa học"/></Field>
      <Field label="Link khi bấm nút"><input className={inputCls} value={v.link} onChange={e=>setV({...v,link:e.target.value})} placeholder="/course/3 hoặc https://..."/></Field>
      <Field label="Thứ tự hiển thị"><input type="number" className={inputCls} value={v.sortOrder??0} onChange={e=>setV({...v,sortOrder:Number(e.target.value)})}/></Field>
      <Field label="Trạng thái"><select className={inputCls} value={v.active===false?'off':'on'} onChange={e=>setV({...v,active:e.target.value==='on'})}><option value="on">Bật - hiển thị</option><option value="off">Tắt - ẩn slide</option></select></Field>
    </div>
    <SaveButtons busy={busy||uploading} disabled={!v.title || !v.image} onClose={onClose} onSave={()=>onSave({...v,buttonText:v.buttonText||'Xem khóa học',sortOrder:v.sortOrder??0,active:v.active!==false})} label="Lưu slide"/>
  </Modal>
}

function ImagePicker({value,onChange,folder,uploading,setUploading}:{value:string;onChange:(v:string)=>void;folder:'courses'|'news'|'banners';uploading:boolean;setUploading:(v:boolean)=>void}){
  const [error,setError]=useState('');
  return <div><div className="flex gap-2"><input className={inputCls} value={value} onChange={e=>onChange(e.target.value)}/><label className="shrink-0 px-4 py-3 rounded-xl bg-slate-100 cursor-pointer">{uploading?'Đang tải...':'Chọn ảnh'}<input type="file" accept="image/*" className="hidden" onChange={async e=>{const f=e.target.files?.[0];if(!f)return;setError('');setUploading(true);try{onChange(await uploadImage(f,folder));}catch(err:any){setError(err?.message||'Không thể tải ảnh.');}finally{setUploading(false);e.currentTarget.value='';}}}/></label></div>{error&&<p className="text-sm text-red-600 mt-1.5">{error}</p>}{value&&<img src={value} className="mt-3 w-40 h-24 object-cover rounded-xl border bg-slate-50"/>}</div>
}

function SaveButtons({busy,disabled,onClose,onSave,label}:{busy:boolean;disabled:boolean;onClose:()=>void;onSave:()=>void;label:string}){return <div className="flex justify-end gap-2 pt-2"><button onClick={onClose} className="px-5 py-3 rounded-xl border">Hủy</button><button disabled={busy||disabled} onClick={onSave} className="px-5 py-3 rounded-xl bg-indigo-600 text-white font-semibold disabled:opacity-50">{busy?'Đang lưu...':label}</button></div>}
function Modal({title,onClose,children}:{title:string;onClose:()=>void;children:any}){return <div className="fixed inset-0 z-[100] bg-slate-950/55 p-4 flex items-center justify-center" onMouseDown={onClose}><div onMouseDown={e=>e.stopPropagation()} className="bg-white w-full max-w-3xl max-h-[90vh] overflow-y-auto rounded-3xl shadow-2xl"><div className="sticky top-0 z-10 bg-white border-b p-5 flex justify-between items-center"><h3 className="text-xl font-bold">{title}</h3><button onClick={onClose} className="w-9 h-9 rounded-full bg-slate-100">×</button></div><div className="p-5 space-y-4">{children}</div></div></div>}
