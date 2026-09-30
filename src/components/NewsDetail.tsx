import React from 'react';
import { ArrowLeft, CalendarDays } from 'lucide-react';
import { motion } from 'motion/react';
import { News } from '../types';

interface NewsDetailProps {
  news: News;
  onBack: () => void;
}

export default function NewsDetail({ news, onBack }: NewsDetailProps) {
  return (
    <motion.article initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="min-h-screen bg-white pt-32 pb-24">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <button onClick={onBack} className="flex items-center gap-2 text-slate-500 hover:text-indigo-600 mb-8 font-medium">
          <ArrowLeft className="w-5 h-5" /> Quay lại tin tức
        </button>

        {news.publishedAt && (
          <div className="flex items-center gap-2 text-sm text-slate-400 mb-4">
            <CalendarDays className="w-4 h-4" /> {news.publishedAt}
          </div>
        )}
        <h1 className="text-3xl md:text-5xl font-bold text-slate-900 leading-tight mb-6">{news.title}</h1>
        <p className="text-lg text-slate-600 leading-relaxed mb-10">{news.description}</p>

        <img src={news.image} alt={news.title} className="w-full aspect-[16/9] object-cover rounded-3xl mb-12" />

        <div className="space-y-6 text-slate-700 leading-8 text-lg">
          {(news.content?.length ? news.content : [news.description]).map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>
      </div>
    </motion.article>
  );
}
