import React, { useMemo } from 'react';
import { Course } from '../types';
import CourseCard from './CourseCard';

interface CourseListProps {
  courses: Course[];
  onSelectCourse: (course: Course) => void;
}

const CourseList: React.FC<CourseListProps> = ({
  courses,
  onSelectCourse,
}) => {
  const shuffledCourses = useMemo(() => {
    return [...courses]
      .sort(() => Math.random() - 0.5)
      .slice(0, 6);
  }, [courses]);

  return (
    <section id="courses" className="py-16 bg-slate-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-10">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
            Chuyên đề nổi bật
          </h2>

          <p className="mt-3 text-slate-500 text-lg">
            Nội dung thực tế giúp bạn nâng cao kỹ năng và ứng dụng hiệu quả.
          </p>
        </div>

        {shuffledCourses.length > 0 ? (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-7">
            {shuffledCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                onSelect={onSelectCourse}
              />
            ))}
          </div>
        ) : (
          <div className="py-16 text-center text-slate-500">
            Chưa có nội dung nào để hiển thị.
          </div>
        )}
      </div>
    </section>
  );
};

export default CourseList;
