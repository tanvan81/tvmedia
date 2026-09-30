import { Course, Banner, News } from './types';

export const COURSES: Course[] = [
  {
    id: 3,
    title: "Master Prompt: Phân tích, xây dựng DNA cho kênh",
    price: "3.000.000 đ",
    reviews: 30,
    duration: "6 giờ",
    level: "Cơ bản",
    image: "/Image/master-prompt.jpg",
    description: "Là khóa học giúp bạn phân tích kênh đối thủ một cách sâu sắc nhất. Từ bản phân tích đó, hướng đến xây dựng BOT mang dấu ấn cá nhân của mỗi chúng ta. Bên cạnh đó, khóa học cũng mag đến cho bạn toàn bộ quy trình từ khâu sản xuất nội dung đến khi có video hoàn chỉnh",
    learningPoints: [
      "Tìm hiểu về NoteboolLM, cách khai khác công cụ",
      "Xây dựng DNA cho kênh mình",
      "Xây dựng Master Prompt hoàn chỉnh dựa trên DNA vừa hoàn thiện",
      "Xây dựng BOT sản xuất nội dung, theo phong cách cá nhân",
      "Tối ưu hóa BOT để viết nội dung",
      "Sử dụng công cụ sao chép voice cục bộ",
      "Sử dụng ứng dụng khớp voice, hình",
      "Quy trình tối ưu, khép kín sản xuất video"
    ],
    curriculum: [
      { title: "2 Prompt được tối ưu để sử dụng NotebookLM" },
      { title: "Quy trình huấn luyện để tạo Master prompt"},
      { title: "Quy trình tối ưu BOT" },
      { title: "Công cụ clone voice, ứng dụng tạo voice hàng loạt" },
      { title: "Ứng dụng phân tách nội dung kịch bản" },
      { title: "Ứng dụng đọc nội dung kịch bản, tạo prompt minh họa" },
      { title: "Phần mềm ghép voice, ảnh, khớp voice hình" },
      { title: "Quy trình 10 bước để xây dựng kênh" },
      { title: "Nhóm chung để trao đổi, hỗ trợ" },
      { title: "Các buổi zoom để cập nhật kiến thức" }


    ]
  },
 {
    id: 6,
    title: "Share key, cam kết bkt trong 45 ngày",
    price: "0 đ",
    reviews: 50,
    duration: "14 giờ",
    level: "Nâng cao",
    image: "/Image/cam-ket-bkt.jpg",
    description: "Khóa học cầm tay chỉ việc, chia sẻ key, cam kết bật kiếm tiền trong 45 ngày. Bạn sẽ được đồng hành trong suốt quá trình làm việc. Tất cả theo lộ trình rõ ràng, cùng nhau cam kết đi đến thành công ",
    learningPoints: [
      "Định hướng tư duy, xây dựng lộ trình phát triển",
      "Xây dựng nội dung kịch bản, đào tạo BOT phục vụ cho công việc sáng tạo nội dung",
      "Xây dựng nguồn tài nguyên đề dựng video bao gồm âm thanh, hình ảnh, hiệu ứng",
      "Phối hợp các công cụ để dựng video chuyên nghiệp",
      "Quy trình sáng tạo thumb, yếu tố quyết định sự thành công",
      "Kỹ thuật upload video, tối ưu hóa hệ thống để đạt kết quả",
      "Tư duy nhân bản kênh, gia tăng thu nhập",
      "Tư duy sản xuất video, xây kênh đúng luật Youtube",
    ],
    curriculum: [
      { title: "3 Prompt đã được tối ưu hóa để sáng tạo nội dung" },
      { title: "Công cụ sao chép âm thanh, tối ưu hóa chi phí" },
      { title: "Công cụ download video, xử lý hình ành" },
      { title: "Ứng dụng tạo hàng loạt hình ảnh, tối ưu hóa hiệu suất công việc" },
      { title: "Công cụ download video, xử lý hình ành" },
    ]
  },
  {
    id: 1,
    title: "Ngách Học tiếng anh",
    price: "2.000.000 đ",
    level: "Cơ bản",
    reviews: 34,
    duration: "4 giờ",
    image: "/Image/key-tieng-anh.jpg",
    description: "Khóa học giúp bạn xây dựng 1 kênh dạy học tiếng anh thông qua các chủ đề như lịch sử, tôn giáo, câu chuyện yêu thương. Hoàn tất khóa học, bạn sẽ có khả năng xây dựng kênh, ngoài ra có thể nhân bản, dạy theo nhiều chủ đề, hoặc theo các ngôn ngữ khác nhau",
    learningPoints: [
      "Xác định nội dung chủ đề cần phát triển",
      "Xây dựng nội dung, theo từng giai đoạn",
      "Quy trình xử lý nội dung từ tạo âm thanh đến hình ảnh",
      "Sử dụng công cụ tạo video nhanh chóng, hiệu suất",
      "Đa dạng hóa nội dung thể hiện: cơ bản, nâng cao",
      "Nhân bản kênh, mở rộng hệ thống"
    ],
    curriculum: [
      { title: "Ứng dụng xử lý lỗi chính tả, chuẩn hóa nội dung" },
      { title: "Ứng dụng bóc tách nội dung, xuất excel" },
      { title: "Template video" },
      { title: "Công cụ tạo âm thanh miễn phí", lessons: 5 },
      { title: "Công cụ tạo video miễn phí", lessons: 3 }
    ]
  },
  {
    id: 2,
    title: "Ngách tôn giáo",
    price: "2.500.000 đ",
    level: "Trung cấp",
    reviews: "0",
    duration: "4 giờ",
    image: "/Image/bible-study.jpg",
    description: "Khóa học chuyên sâu giúp bạn làm chủ Adobe Premiere Pro từ con số 0. Bạn sẽ học được quy trình dựng phim chuyên nghiệp, cách xử lý hình ảnh, âm thanh và tư duy kể chuyện bằng hình ảnh để tạo ra những video ấn tượng cho YouTube, TikTok hay các dự án truyền thông.",
    learningPoints: [
      "Làm chủ giao diện và các công cụ cắt ghép trong Premiere Pro",
      "Kỹ thuật chỉnh màu (Color Correction & Grading) chuyên nghiệp",
      "Xử lý âm thanh, lọc tạp âm và chèn nhạc nền hiệu quả",
      "Tạo hiệu ứng chuyển cảnh và kỹ thuật Keyframe nâng cao",
      "Quy trình xuất video chuẩn 4K cho YouTube, Facebook, TikTok",
      "Tư duy kể chuyện qua video (Storytelling)"
    ],
    curriculum: [
      { title: "Chương 1: Làm quen với giao diện và Import dữ liệu", lessons: 4 },
      { title: "Chương 2: Kỹ thuật cắt ghép cơ bản và quản lý Timeline", lessons: 6 },
      { title: "Chương 3: Hiệu ứng hình ảnh và Chuyển cảnh", lessons: 8 },
      { title: "Chương 4: Chỉnh màu và Xử lý âm thanh", lessons: 5 },
      { title: "Chương 5: Xuất bản và Tối ưu hóa video", lessons: 3 }
    ]
  },
  {
    id: 4,
    title: "Ngách Tài Chính",
    price: "2.500.000 đ",
    reviews: "0",
    duration: "6 giờ",
    level: "Trung cấp",
    image: "/Image/finance.jpg",
    description: "Khóa học chuyên sâu giúp bạn làm chủ Adobe Premiere Pro từ con số 0. Bạn sẽ học được quy trình dựng phim chuyên nghiệp, cách xử lý hình ảnh, âm thanh và tư duy kể chuyện bằng hình ảnh để tạo ra những video ấn tượng cho YouTube, TikTok hay các dự án truyền thông.",
    learningPoints: [
      "Làm chủ giao diện và các công cụ cắt ghép trong Premiere Pro",
      "Kỹ thuật chỉnh màu (Color Correction & Grading) chuyên nghiệp",
      "Xử lý âm thanh, lọc tạp âm và chèn nhạc nền hiệu quả",
      "Tạo hiệu ứng chuyển cảnh và kỹ thuật Keyframe nâng cao",
      "Quy trình xuất video chuẩn 4K cho YouTube, Facebook, TikTok",
      "Tư duy kể chuyện qua video (Storytelling)"
    ],
    curriculum: [
      { title: "Chương 1: Làm quen với giao diện và Import dữ liệu", lessons: 4 },
      { title: "Chương 2: Kỹ thuật cắt ghép cơ bản và quản lý Timeline", lessons: 6 },
      { title: "Chương 3: Hiệu ứng hình ảnh và Chuyển cảnh", lessons: 8 },
      { title: "Chương 4: Chỉnh màu và Xử lý âm thanh", lessons: 5 },
      { title: "Chương 5: Xuất bản và Tối ưu hóa video", lessons: 3 }
    ]
  },
  {
    id: 5,
    title: "Ngách Truyền Động Lực",
    instructor: "Lưu Văn Tân",
    price: "2.500.000 đ",
    reviews: "0",
    duration: "6 giờ",
    level: "Trung cấp",
    image: "/Image/finance.jpg",
    description: "Khóa học chuyên sâu giúp bạn làm chủ Adobe Premiere Pro từ con số 0. Bạn sẽ học được quy trình dựng phim chuyên nghiệp, cách xử lý hình ảnh, âm thanh và tư duy kể chuyện bằng hình ảnh để tạo ra những video ấn tượng cho YouTube, TikTok hay các dự án truyền thông.",
    learningPoints: [
      "Làm chủ giao diện và các công cụ cắt ghép trong Premiere Pro",
      "Kỹ thuật chỉnh màu (Color Correction & Grading) chuyên nghiệp",
      "Xử lý âm thanh, lọc tạp âm và chèn nhạc nền hiệu quả",
      "Tạo hiệu ứng chuyển cảnh và kỹ thuật Keyframe nâng cao",
      "Quy trình xuất video chuẩn 4K cho YouTube, Facebook, TikTok",
      "Tư duy kể chuyện qua video (Storytelling)"
    ],
    curriculum: [
      { title: "Chương 1: Làm quen với giao diện và Import dữ liệu", lessons: 4 },
      { title: "Chương 2: Kỹ thuật cắt ghép cơ bản và quản lý Timeline", lessons: 6 },
      { title: "Chương 3: Hiệu ứng hình ảnh và Chuyển cảnh", lessons: 8 },
      { title: "Chương 4: Chỉnh màu và Xử lý âm thanh", lessons: 5 },
      { title: "Chương 5: Xuất bản và Tối ưu hóa video", lessons: 3 }
    ]
  }
];

export const BANNERS: Banner[] = [
  {
    id: 1,
    title: "Master Prompt",
    description: "Khai thác sức mạnh NotebookLM. Phân tích, xây dựng DNA cho kênh.",
    image: "/Image/master-prompt.jpg",
    link: "/course/3",
    buttonText: "Xem khóa học",
    sortOrder: 1,
    active: true
  },
  {
    id: 2,
    title: "Share key, xây kênh BKT",
    description: "Đồng hành cùng bạn xây kênh, bkt trong 45 ngày.",
    image: "/Image/cam-ket-bkt.jpg",
    link: "/course/6",
    buttonText: "Xem khóa học",
    sortOrder: 2,
    active: true
  },
  {
    id: 3,
    title: "Chủ đề xanh: Dạy học tiếng Anh",
    description: "Giúp khán giả học tiếng anh qua các chủ đề lịch sử, drama, truyền động lực",
    image: "/Image/key-tieng-anh.jpg",
    link: "/course/1",
    buttonText: "Xem khóa học",
    sortOrder: 3,
    active: true
  }
];

export const NEWS: News[] = [
  {
    id: 1,
    title: "Cách xây dựng quy trình làm YouTube bằng AI hiệu quả",
    description: "Gợi ý cách tổ chức quy trình từ nghiên cứu chủ đề, viết kịch bản, tạo hình ảnh đến dựng video để tiết kiệm thời gian mà vẫn giữ chất lượng nội dung.",
    image: "/Image/master-prompt.jpg",
    publishedAt: "29/09/2026",
    content: [
      "AI có thể rút ngắn đáng kể thời gian sản xuất nội dung nếu quy trình được thiết kế rõ ràng ngay từ đầu.",
      "Điểm quan trọng là tách từng công đoạn thành các bước có đầu vào và đầu ra cụ thể, sau đó mới tự động hóa những phần lặp lại nhiều nhất."
    ]
  },
  {
    id: 2,
    title: "5 lỗi thường gặp khi bắt đầu xây dựng kênh nội dung",
    description: "Tổng hợp những lỗi phổ biến về lựa chọn chủ đề, cấu trúc nội dung, thumbnail và quy trình sản xuất khiến kênh khó tăng trưởng ổn định.",
    image: "/Image/finance.jpg",
    publishedAt: "27/09/2026",
    content: [
      "Nhiều kênh thất bại không phải vì thiếu công cụ mà vì thiếu một hệ thống nội dung nhất quán.",
      "Việc kiểm tra chủ đề, tiêu đề, thumbnail và khả năng giữ chân người xem nên được thực hiện trước khi tăng tốc sản xuất."
    ]
  },
  {
    id: 3,
    title: "Từ ý tưởng đến video hoàn chỉnh: cách tối ưu từng công đoạn",
    description: "Một workflow thực tế giúp liên kết kịch bản, hình ảnh, voice và dựng video thành một dây chuyền sản xuất dễ kiểm soát và dễ mở rộng.",
    image: "/Image/key-tieng-anh.jpg",
    publishedAt: "25/09/2026",
    content: [
      "Một quy trình tốt giúp giảm thời gian sửa đi sửa lại giữa các công đoạn.",
      "Khi mỗi bước đều có tiêu chuẩn đầu ra rõ ràng, bạn có thể dễ dàng thay đổi công cụ mà không làm vỡ toàn bộ hệ thống."
    ]
  }
];
