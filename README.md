# Tân Vân Media — Website khóa học + Tin tức + Admin

## 1. Chạy local
Yêu cầu Node.js 20+.

```bash
npm install
npm run dev
```

Website: `http://localhost:5173/`
Admin: `http://localhost:5173/admin`

Nếu chưa cấu hình Supabase, dự án chạy ở chế độ local/demo. Mật khẩu mặc định: `(đã bỏ - chỉ dùng Supabase Auth)`.
Có thể đổi bằng file `.env`:

```env
VITE_ADMIN_PASSWORD=mat-khau-cua-ban
```

> Chế độ local chỉ lưu dữ liệu trong trình duyệt đang dùng. Phù hợp để test giao diện, không dùng để quản trị website production.

## 2. Kết nối Supabase để cập nhật thật trên website
1. Tạo project Supabase.
2. Mở SQL Editor và chạy toàn bộ file `supabase.sql`. Nếu project đã cấu hình từ bản trước, hãy chạy thêm phần `banners` ở cuối file để tạo bảng slide trang chủ.
3. Trong Authentication > Users, tạo 1 tài khoản admin email/password.
4. Copy `.env.example` thành `.env` và nhập:

```env
VITE_SUPABASE_URL=https://xxxx.supabase.co
VITE_SUPABASE_ANON_KEY=xxxx
```

5. Chạy lại `npm run dev`.
6. Vào `/admin`, đăng nhập bằng tài khoản Supabase vừa tạo.
7. Nếu database đang trống, bấm `Khởi tạo dữ liệu mẫu` một lần.

Sau đó mọi thao tác thêm/sửa/xóa khóa học, tin tức, slide trang chủ và ảnh đều cập nhật vào Supabase và hiển thị cho tất cả người truy cập.

## 3. Admin hiện có
- Danh sách khóa học.
- Thêm / sửa / xóa khóa học.
- Chỉnh tên, giá, thời lượng, trình độ, thumbnail, mô tả, nội dung học được, chương trình học.
- Danh sách tin tức.
- Thêm / sửa / xóa tin tức.
- Chỉnh tiêu đề, ngày đăng, thumbnail, mô tả ngắn, nội dung bài viết.
- Quản lý slide trang chủ: tiêu đề, mô tả, ảnh nền, chữ nút, link, thứ tự và bật/tắt.
- Upload ảnh. Với Supabase, ảnh lưu trong Storage bucket `media`.

## 4. Build production
```bash
npm run build
```

Kết quả nằm trong thư mục `dist/`.

Với Vercel/Netlify cần thêm 2 biến môi trường Supabase tương tự file `.env` rồi deploy lại.

## Admin V2

Nếu database đã chạy SQL bản trước, hãy chạy `supabase_upgrade_v2.sql` thay vì chạy lại toàn bộ SQL. Xem `SETUP_V2.md` để tạo Supabase Auth admin, test upload Storage, draft/publish và slug.
