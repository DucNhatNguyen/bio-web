# Thiết kế: Trang Bio tiếp thị link sản phẩm (Hướng B — Google Sheet)

- **Ngày:** 2026-07-13
- **Trạng thái:** Đã duyệt thiết kế, chuẩn bị lập kế hoạch triển khai
- **Tác giả:** nhatnguyen.dev99@gmail.com

## 1. Mục tiêu

Xây một **trang bio** (giống Linktree) để tổng hợp và tiếp thị link sản phẩm affiliate
từ Shopee, TikTok Shop, Lazada. Người xem mở trang, xem sản phẩm theo danh mục, bấm vào
là chuyển sang sàn để mua.

Yêu cầu chính:
- Trang bio **responsive** cho mọi thiết bị.
- Quản lý **danh mục** và **sản phẩm**, gán sản phẩm vào danh mục.
- Tech stack **nhanh gọn**, **hosting free**.

## 2. Quyết định đã chốt

| Vấn đề | Quyết định |
|--------|-----------|
| Hướng triển khai | **Hướng B**: web tĩnh + Google Sheet làm nguồn dữ liệu |
| Quản lý dữ liệu (admin) | Sửa **trực tiếp trên Google Sheet** (không có giao diện admin web riêng) |
| Nội dung mỗi sản phẩm | Ảnh + badge sàn (Shopee/TikTok/Lazada) + link mua. **Không** giá, **không** mô tả |
| Nguồn ảnh | **Dán link ảnh** có sẵn từ sàn (không upload, không cần image storage) |
| Analytics | **Chưa làm** (để sau) |
| Tên miền | Subdomain free |
| Framework | **Vite + vanilla JS/TS** (không dùng React) |
| CSS | **Tailwind CSS** |
| Parse CSV | **PapaParse** |
| Hosting | **Cloudflare Pages** |

> Ghi chú: Hướng A (Next.js + Supabase, có giao diện admin web + login + analytics) được
> để dành cân nhắc sau. Thiết kế dữ liệu dưới đây cố gắng dễ chuyển đổi sang hướng A về sau.

## 3. Kiến trúc tổng thể

```
┌─────────────────┐    Publish to web (CSV)   ┌──────────────────────┐
│  Google Sheet   │ ────────────────────────► │  Trang bio (static)  │
│  (chủ shop sửa) │   trang fetch CSV lúc      │  Vite + Tailwind     │
│  - Categories   │   người xem mở trang       │  PapaParse           │
│  - Products     │                            │  Cloudflare Pages    │
│  - Config       │                            │  (subdomain free)    │
└─────────────────┘                            └──────────────────────┘
```

- **Không backend, không server, không database.** Toàn bộ là web tĩnh.
- Dữ liệu được tải **phía client** (trình duyệt người xem) trực tiếp từ CSV công khai của
  Google Sheet, rồi dựng DOM.
- Sửa Sheet → không cần deploy lại. Thay đổi hiện sau khoảng vài phút (do Google cache CSV).

## 4. Mô hình dữ liệu (Google Sheet)

Một Google Sheet gồm 3 tab. Mỗi tab được "Publish to web" dưới dạng CSV; trang bio biết
URL CSV của từng tab (cấu hình sẵn trong code qua Sheet ID + gid, hoặc biến môi trường build).

### Tab `Categories`
| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `id` | text | Có | Khóa định danh, không dấu, không khoảng trắng (vd `skincare`) |
| `name` | text | Có | Tên hiển thị (vd `Chăm sóc da`) |
| `order` | số | Không | Thứ tự hiển thị (nhỏ → trước). Trống = xếp cuối |

### Tab `Products`
| Cột | Kiểu | Bắt buộc | Mô tả |
|-----|------|----------|-------|
| `name` | text | Có | Tên sản phẩm |
| `image_url` | url | Có | Link ảnh (dán từ sàn) |
| `buy_url` | url | Có | Link mua trên sàn |
| `platform` | enum | Có | `shopee` \| `tiktok` \| `lazada` (viết thường) |
| `category` | text | Có | Bằng `id` của một danh mục ở tab Categories. Set **data validation dropdown** trỏ tới cột `Categories!id` để tránh gõ sai |
| `order` | số | Không | Thứ tự trong danh mục |

### Tab `Config` (tùy chọn, 1 dòng key/value hoặc cột cố định)
| Cột | Mô tả |
|-----|-------|
| `shop_name` | Tên shop hiển thị đầu trang |
| `avatar_url` | Link ảnh đại diện |
| `bio` | Một dòng mô tả ngắn |

**Gán sản phẩm vào danh mục** = điền cột `category` trong tab Products bằng `id` danh mục.

## 5. Trang bio — giao diện & hành vi

### Bố cục
1. **Header:** avatar (`avatar_url`) + `shop_name` + `bio` (từ tab Config).
2. **Thân trang:** lặp qua từng danh mục theo `order`:
   - Tiêu đề danh mục (`name`).
   - Lưới các sản phẩm thuộc danh mục đó (lọc theo `category`, sắp theo `order`).
3. **Footer:** ghi chú nhỏ (tùy chọn).

### Card sản phẩm
- Ảnh vuông (`object-fit: cover`), `loading="lazy"`.
- **Badge sàn** ở góc ảnh, màu theo sàn:
  - `shopee` → cam (#EE4D2D)
  - `tiktok` → đen (#000000)
  - `lazada` → xanh/tím (#0F146D / #F0148E)
- Toàn card là link: bấm → mở `buy_url` ở tab mới (`target="_blank"`, `rel="noopener noreferrer"`).
- Tên sản phẩm hiển thị dưới ảnh (1–2 dòng, cắt bớt nếu dài).

### Responsive (Tailwind)
- Điện thoại: lưới **2 cột**.
- Tablet: **3 cột**.
- Desktop: **4 cột**.
- Container `max-w` giới hạn bề ngang, canh giữa.

## 6. Luồng xử lý phía client

1. Trang load → hiển thị **skeleton/loading**.
2. Fetch song song 3 CSV: `Config`, `Categories`, `Products`.
3. PapaParse → mảng object; chuẩn hóa (trim, ép kiểu `order`).
4. **Validate & lọc:**
   - Bỏ dòng thiếu trường bắt buộc.
   - Bỏ sản phẩm có `category` không khớp danh mục nào (hoặc gom vào nhóm "Khác" — chốt: **bỏ qua** để tránh rác).
   - `platform` không hợp lệ → badge mặc định trung tính, vẫn hiển thị.
5. Dựng DOM theo bố cục ở mục 5.

### Xử lý lỗi
- **Fetch CSV lỗi / mất mạng:** hiện thông báo thân thiện "Không tải được dữ liệu, thử lại sau" + nút thử lại.
- **Sheet rỗng / chưa có sản phẩm:** hiện trạng thái trống ("Sắp có sản phẩm").
- **Ảnh lỗi (`onerror`):** thay bằng ảnh placeholder để không vỡ layout.

## 7. Cấu hình & bảo mật

- Sheet ID và gid của từng tab lưu trong file cấu hình/biến môi trường build (không nhạy cảm vì
  dữ liệu vốn công khai).
- Trang chỉ **đọc**; không ai ghi được vào Sheet qua trang. Quyền sửa Sheet thuộc về tài khoản
  Google của chủ shop.

## 8. Hosting & triển khai

- **Cloudflare Pages**, kết nối repo Git → mỗi lần push `main` tự build (`vite build`) và deploy.
- Nhận subdomain free `*.pages.dev`.
- Build output là thư mục tĩnh (`dist/`).

## 9. Trade-off đã chấp nhận

- **Trễ cập nhật ~5 phút** do Google cache CSV publish.
- **Dữ liệu công khai** qua link CSV — chấp nhận vì trang bio vốn public.
- **Không login, không analytics, không giao diện admin web** — theo đúng thống nhất; nếu cần
  sẽ nâng cấp sang Hướng A.

## 10. Ngoài phạm vi (YAGNI, để sau)

- Đếm lượt click / analytics.
- Giao diện admin web + đăng nhập.
- Upload ảnh / image storage.
- Nhiều tài khoản quản lý, phân quyền.
- Tên miền riêng (hiện dùng subdomain free).

## 11. Tiêu chí hoàn thành (Definition of Done)

- [ ] Trang bio hiển thị đúng danh mục + sản phẩm từ Google Sheet mẫu.
- [ ] Responsive đẹp ở 2/3/4 cột theo kích thước màn hình.
- [ ] Badge sàn đúng màu cho shopee/tiktok/lazada.
- [ ] Bấm sản phẩm mở đúng `buy_url` ở tab mới.
- [ ] Có trạng thái loading, lỗi, và rỗng.
- [ ] Deploy chạy được trên Cloudflare Pages với subdomain free.
- [ ] Có tài liệu hướng dẫn chủ shop cách thêm/sửa danh mục & sản phẩm trên Sheet.
