import React, { useEffect, useState } from 'react';
import { Menu, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';

interface HeaderProps {
  onHomeClick: () => void;
  onNewsClick?: () => void;
  isSolid?: boolean;
}

export default function Header({ onHomeClick, onNewsClick, isSolid = false }: HeaderProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const showSolid = isScrolled || isSolid;

  const goToCourses = () => {
    onHomeClick();
    setIsMobileMenuOpen(false);
    setTimeout(() => document.getElementById('courses')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const goToAbout = () => {
    onHomeClick();
    setIsMobileMenuOpen(false);
    setTimeout(() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' }), 100);
  };

  const goToNews = () => {
    setIsMobileMenuOpen(false);
    onNewsClick?.();
  };

  const linkClass = `text-sm font-medium transition-colors ${
    showSolid ? 'text-slate-600 hover:text-indigo-600' : 'text-white/80 hover:text-white'
  }`;

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        showSolid ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center">
          <div className="flex items-center cursor-pointer group" onClick={onHomeClick}>
            <div className="h-12 md:h-16 relative flex items-center justify-center group-hover:scale-105 transition-transform">
              <img
                src="/Image/logo.png"
                alt="Tấn Văn Media"
                className="h-full w-auto object-contain"
                referrerPolicy="no-referrer"
                onError={(e) => {
                  (e.target as HTMLImageElement).src = 'https://picsum.photos/seed/logo/200/200';
                }}
              />
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8">
            <a href="#courses" onClick={(e) => { e.preventDefault(); goToCourses(); }} className={linkClass}>
              Chuyên đề
            </a>
            <a href="/news" onClick={(e) => { e.preventDefault(); goToNews(); }} className={linkClass}>
              Tin tức
            </a>
            <a href="#about" onClick={(e) => { e.preventDefault(); goToAbout(); }} className={linkClass}>
              Về tôi
            </a>
          </nav>

          <div className="md:hidden">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className={`p-2 rounded-lg ${showSolid ? 'text-slate-700' : 'text-white'}`}
              aria-label="Mở menu"
            >
              {isMobileMenuOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="absolute top-full left-0 right-0 bg-white shadow-xl border-t border-slate-100 md:hidden"
          >
            <div className="flex flex-col p-4 gap-4">
              <a href="#courses" onClick={(e) => { e.preventDefault(); goToCourses(); }} className="text-slate-700 font-medium py-2 border-b border-slate-50">
                Khóa học
              </a>
              <a href="/news" onClick={(e) => { e.preventDefault(); goToNews(); }} className="text-slate-700 font-medium py-2 border-b border-slate-50">
                Tin tức
              </a>
              <a href="#about" onClick={(e) => { e.preventDefault(); goToAbout(); }} className="text-slate-700 font-medium py-2">
                Về tôi
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
