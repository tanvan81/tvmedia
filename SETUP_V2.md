# Nâng cấp Admin V2 — Supabase Auth + Storage + Draft/Publish + Slug

Project này đã hỗ trợ:

- Đăng nhập `/admin` bằng **Supabase Auth**.
- Upload ảnh khóa học / tin tức / slide trực tiếp lên bucket `media` của **Supabase Storage**.
- Trạng thái **Đã đăng / Bản nháp** cho khóa học và tin tức.
- Slide có trạng thái **Bật / Tắt**.
- URL đẹp bằng `slug`, ví dụ `/khoa-hoc/master-prompt` và `/tin-tuc/ten-bai-viet`.
- Xác nhận trước khi xóa.
- RLS: khách chỉ đọc nội dung đã đăng/bật; tài khoản authenticated mới được thêm/sửa/xóa.

## Vì project Supabase của bạn đã chạy SQL bản cũ

Không chạy lại `supabase.sql`.

Vào **Supabase → SQL Editor** và chạy file:

`supabase_upgrade_v2.sql`

File này chỉ nâng cấp database hiện tại, không xóa dữ liệu đang có.

## Tạo tài khoản Admin

Trong Supabase:

1. **Authentication → Users**.
2. Chọn **Add user / Create new user**.
3. Nhập email và mật khẩu quản trị.
4. Mở `http://localhost:5173/admin` và đăng nhập bằng tài khoản đó.

Không cần dùng `(đã bỏ - chỉ dùng Supabase Auth)` khi Supabase đã được cấu hình.

## Kiểm tra Upload ảnh

Trong Admin → sửa một khóa học → **Chọn ảnh**.

Nếu upload thành công, ảnh sẽ xuất hiện trong:

`Storage → media → courses/`

Tin tức nằm trong `news/`, slide nằm trong `banners/`.

## Test Draft

1. Sửa một bài tin → Trạng thái = `Bản nháp`.
2. Lưu.
3. Trong Admin vẫn thấy bài đó.
4. Mở trang web ở cửa sổ ẩn danh: bài đó không được hiển thị.

## Build production

```bash
npm install
npm run build
```

Thư mục deploy là `dist/`.
