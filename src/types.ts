export interface Course {
  id: number;
  title: string;
  slug?: string;
  published?: boolean;
  price: string;
  duration: string;
  level: 'Cơ bản' | 'Trung cấp' | 'Nâng cao';
  image: string;
  description: string;
  learningPoints: string[];
  curriculum: { title: string; lessons?: number }[];
  instructor?: string;
  reviews?: number | string;
}

export interface Banner {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
  buttonText?: string;
  sortOrder?: number;
  active?: boolean;
}

export interface News {
  id: number;
  title: string;
  slug?: string;
  published?: boolean;
  description: string;
  image: string;
  publishedAt?: string;
  content?: string[];
}
