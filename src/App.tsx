import { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import Header from './components/Header';
import HeroSlider from './components/HeroSlider';
import CourseList from './components/CourseList';
import CourseDetail from './components/CourseDetail';
import NewsList from './components/NewsList';
import NewsDetail from './components/NewsDetail';
import Footer from './components/Footer';
import AdminLogin from './components/admin/AdminLogin';
import AdminDashboard from './components/admin/AdminDashboard';
import { Banner, Course, News } from './types';
import { getBanners, getCourses, getNews } from './lib/contentStore';
import { isSupabaseConfigured, supabase } from './lib/supabase';

export default function App() {
  const navigate = useNavigate();
  const location = useLocation();
  const [courses, setCourses] = useState<Course[]>([]);
  const [news, setNews] = useState<News[]>([]);
  const [banners, setBanners] = useState<Banner[]>([]);
  const [loading, setLoading] = useState(true);
  const [adminAuthed, setAdminAuthed] = useState(false);

  const refresh = async (includeHidden = location.pathname.startsWith('/admin')) => {
    setLoading(true);
    try {
      const [c, n, b] = await Promise.all([getCourses(includeHidden), getNews(includeHidden), getBanners(includeHidden)]);
      setCourses(c);
      setNews(n);
      setBanners(b);
    } finally { setLoading(false); }
  };

  useEffect(() => { refresh(location.pathname.startsWith('/admin')); }, [location.pathname]);
  useEffect(() => {
    if (!location.pathname.startsWith('/admin')) return;
    if (!isSupabaseConfigured || !supabase) {
      setAdminAuthed(false);
      return;
    }
    supabase.auth.getSession().then(async ({ data }) => {
      const ok = Boolean(data.session);
      setAdminAuthed(ok);
      if (ok) await refresh(true);
    });
  }, [location.pathname]);

  const handleHomeClick = () => { navigate('/'); window.scrollTo({ top: 0, behavior: 'smooth' }); };
  const handleSelectCourse = (course: Course) => navigate(`/khoa-hoc/${course.slug || course.id}`);
  const handleSelectNews = (item: News) => navigate(`/tin-tuc/${item.slug || item.id}`);
  const handleNewsMenuClick = () => { navigate('/tin-tuc'); window.scrollTo({ top: 0, behavior: 'smooth' }); };

  useEffect(() => { window.scrollTo({ top: 0, behavior: 'smooth' }); }, [location.pathname]);

  const isAdmin = location.pathname.startsWith('/admin');
  const isInnerPage = location.pathname !== '/';

  return (
    <div className="min-h-screen bg-white font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {!isAdmin && <Header onHomeClick={handleHomeClick} onNewsClick={handleNewsMenuClick} isSolid={isInnerPage} />}
      <main>
        <Routes>
          <Route path="/" element={<>{loading ? <Loading /> : <><HeroSlider banners={banners} /><CourseList courses={courses} onSelectCourse={handleSelectCourse} /><NewsList news={news} onSelectNews={handleSelectNews} onViewAll={handleNewsMenuClick} /></>}</>} />
          <Route path="/khoa-hoc/:key" element={<CourseDetailWrapper courses={courses} onBack={handleHomeClick} />} />
          <Route path="/course/:key" element={<CourseDetailWrapper courses={courses} onBack={handleHomeClick} />} />
          <Route path="/tin-tuc" element={<div className="pt-20"><NewsList news={news} onSelectNews={handleSelectNews} showAll /></div>} />
          <Route path="/news" element={<div className="pt-20"><NewsList news={news} onSelectNews={handleSelectNews} showAll /></div>} />
          <Route path="/tin-tuc/:key" element={<NewsDetailWrapper news={news} onBack={() => navigate('/tin-tuc')} />} />
          <Route path="/news/:key" element={<NewsDetailWrapper news={news} onBack={() => navigate('/tin-tuc')} />} />
          <Route path="/admin" element={adminAuthed ? <AdminDashboard courses={courses} news={news} banners={banners} onRefresh={()=>refresh(true)} onLogout={()=>setAdminAuthed(false)} /> : <AdminLogin onSuccess={async()=>{setAdminAuthed(true); await refresh(true);}} />} />
        </Routes>
      </main>
      {!isAdmin && <Footer />}
    </div>
  );
}

function Loading(){return <div className="min-h-[70vh] flex items-center justify-center text-slate-500">Đang tải nội dung...</div>}
function CourseDetailWrapper({ courses, onBack }: { courses: Course[]; onBack: () => void }) { const { key } = useParams(); const course = courses.find((item) => item.slug === key || String(item.id) === key); if (!course) return <div className="pt-32 min-h-[60vh] text-center">Không tìm thấy khóa học</div>; return <CourseDetail course={course} onBack={onBack} />; }
function NewsDetailWrapper({ news, onBack }: { news: News[]; onBack: () => void }) { const { key } = useParams(); const item = news.find((x) => x.slug === key || String(x.id) === key); if (!item) return <div className="pt-32 min-h-[60vh] text-center">Không tìm thấy bài viết</div>; return <NewsDetail news={item} onBack={onBack} />; }
