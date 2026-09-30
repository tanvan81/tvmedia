import { ArrowRight } from 'lucide-react';
import { News } from '../types';

export default function NewsList({ news, onSelectNews, onViewAll, showAll = false }: { news: News[]; onSelectNews: (news: News) => void; onViewAll?: () => void; showAll?: boolean }) {
  const items = showAll ? news : news.slice(0, 3);
  return <section id="news" className="py-20 bg-white">
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div className="flex items-end justify-between gap-5 mb-10"><div><h2 className="text-3xl md:text-4xl font-bold text-slate-900">{showAll ? 'Tin tức' : 'Tin tức mới'}</h2><p className="mt-3 text-slate-500">Cập nhật kiến thức, công cụ và kinh nghiệm mới nhất</p></div>{!showAll && onViewAll && <button onClick={onViewAll} className="hidden sm:flex items-center gap-2 font-semibold text-indigo-600">Xem tất cả <ArrowRight size={18}/></button>}</div>
      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">{items.map(item => <article key={item.id} onClick={()=>onSelectNews(item)} className="group cursor-pointer rounded-2xl overflow-hidden bg-white border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300"><div className="aspect-[16/9] overflow-hidden bg-slate-100"><img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"/></div><div className="p-6">{item.publishedAt && <div className="text-xs font-medium text-slate-400 mb-2">{item.publishedAt}</div>}<h3 className="text-xl font-bold text-slate-900 line-clamp-2 group-hover:text-indigo-600">{item.title}</h3><p className="mt-3 text-slate-500 leading-6 line-clamp-3">{item.description}</p><div className="mt-5 text-indigo-600 font-semibold flex items-center gap-2">Xem chi tiết <ArrowRight size={16}/></div></div></article>)}</div>
      {!showAll && onViewAll && <button onClick={onViewAll} className="sm:hidden mt-8 flex items-center gap-2 font-semibold text-indigo-600">Xem tất cả <ArrowRight size={18}/></button>}
    </div>
  </section>;
}
