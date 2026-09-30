import { useEffect, useMemo, useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Banner } from '../types';

export default function HeroSlider({ banners }: { banners: Banner[] }) {
  const activeBanners = useMemo(
    () => banners.filter((b) => b.active !== false).sort((a, b) => (a.sortOrder ?? 0) - (b.sortOrder ?? 0)),
    [banners]
  );
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (currentIndex >= activeBanners.length) setCurrentIndex(0);
  }, [activeBanners.length, currentIndex]);

  const nextSlide = () => {
    if (!activeBanners.length) return;
    setCurrentIndex((prev) => (prev === activeBanners.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    if (!activeBanners.length) return;
    setCurrentIndex((prev) => (prev === 0 ? activeBanners.length - 1 : prev - 1));
  };

  useEffect(() => {
    if (activeBanners.length <= 1) return;
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, [activeBanners.length]);

  if (!activeBanners.length) return null;
  const banner = activeBanners[currentIndex];

  return (
    <section className="relative h-[600px] w-full overflow-hidden bg-slate-900">
      <AnimatePresence mode="wait">
        <motion.div key={banner.id} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute inset-0">
          <div className="absolute inset-0">
            <img
              src={banner.image}
              alt={banner.title}
              className="w-full h-full object-cover"
              referrerPolicy="no-referrer"
              onError={(e) => { (e.target as HTMLImageElement).src = `https://picsum.photos/seed/banner${banner.id}/1920/1080`; }}
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/40 to-transparent"></div>
          </div>
          <div className="relative h-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col justify-center">
            <motion.div initial={{ x: -50, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.3, duration: 0.6 }} className="max-w-2xl">
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">{banner.title}</h1>
              <p className="text-lg md:text-xl text-white/80 mb-8 leading-relaxed">{banner.description}</p>
              {banner.link && <a href={banner.link} className="inline-flex items-center justify-center px-8 py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-xl transition-all transform hover:scale-105 shadow-xl">{banner.buttonText || 'Xem chi tiết'}</a>}
            </motion.div>
          </div>
        </motion.div>
      </AnimatePresence>

      {activeBanners.length > 1 && <>
        <div className="absolute inset-y-0 left-4 flex items-center"><button onClick={prevSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors cursor-pointer"><ChevronLeft className="w-6 h-6" /></button></div>
        <div className="absolute inset-y-0 right-4 flex items-center"><button onClick={nextSlide} className="p-2 rounded-full bg-white/10 hover:bg-white/20 text-white backdrop-blur-sm transition-colors cursor-pointer"><ChevronRight className="w-6 h-6" /></button></div>
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex gap-3">{activeBanners.map((item, index) => <button aria-label={`Slide ${index + 1}`} key={item.id} onClick={() => setCurrentIndex(index)} className={`h-2 rounded-full transition-all duration-300 cursor-pointer ${index === currentIndex ? 'w-8 bg-white' : 'w-2 bg-white/40'}`} />)}</div>
      </>}
    </section>
  );
}
