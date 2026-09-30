import React from 'react';
import { Clock } from 'lucide-react';
import { Course } from '../types';

interface CourseCardProps {
  course: Course;
  onSelect: (course: Course) => void;
}

export default function CourseCard({ course, onSelect }: CourseCardProps) {
  return (
    <div
      onClick={() => onSelect(course)}
      className="group bg-white rounded-2xl overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col h-full cursor-pointer"
    >
      <div className="relative aspect-video overflow-hidden">
        <img
          src={course.image}
          alt={course.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
          referrerPolicy="no-referrer"
          onError={(e) => {
            (e.target as HTMLImageElement).src = `https://picsum.photos/seed/${course.id}/800/600`;
          }}
        />
        <div className="absolute top-4 right-4">
          
        </div>
        <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-lg text-white text-xs">
          <Clock className="w-3 h-3" />
          <span>{course.duration}</span>
        </div>
      </div>

      <div className="p-6 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-slate-900 mb-3 line-clamp-2 group-hover:text-indigo-600 transition-colors">
          {course.title}
        </h3>
        <p className="text-sm text-slate-500 line-clamp-2 mb-6">{course.description}</p>
        <div className="mt-auto pt-4 border-t border-slate-50">
          <span className="text-xl font-bold text-indigo-600">{course.price}</span>
        </div>
      </div>
    </div>
  );
}
