# Hướng dẫn Google Sheet cho trang Bio

Trang bio đọc dữ liệu trực tiếp từ **một** Google Sheet có **3 tab**: `Config`, `Categories`, `Products`.
Sửa Sheet → refresh trang là thấy (Google cache khoảng ~5 phút).

## 0. Thiết lập chia sẻ (làm 1 lần)

1. Tạo Google Sheet mới.
2. Bấm **Chia sẻ** → **Bất kỳ ai có đường liên kết** → quyền **Người xem**.
3. Lấy `SHEET_ID` từ URL và dán vào `src/config.ts`:
   ```
   https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
   ```

> ⚠️ Tên 3 tab phải trùng với `TABS` trong `src/config.ts` (mặc định: Config, Categories, Products).
> Tên cột (dòng đầu mỗi tab) phải viết **đúng như bên dưới** (không dấu, chữ thường).

---

## 1. Tab `Config` (1 dòng dữ liệu)

| shop_name | avatar_url | bio | eyebrow | facebook | instagram | tiktok | youtube | zalo | shopee |
|-----------|-----------|-----|---------|----------|-----------|--------|---------|------|--------|
| Min’s Shop — Deal Xinh Cho Nàng | https://.../avatar.jpg | Những món xinh xắn... | Tuyển chọn mỗi ngày | https://facebook.com/... | https://instagram.com/... | https://tiktok.com/@... | | | https://shopee.vn/shop/... |

- `avatar_url` để trống → hiện avatar gradient với chữ cái đầu.
- `bio`, `eyebrow` để trống được.
- **Mạng xã hội** (`facebook`, `instagram`, `tiktok`, `youtube`, `zalo`, `shopee`): dán link trang của bạn.
  Cột nào **để trống thì icon đó tự ẩn** — chỉ hiện những kênh bạn điền, theo thứ tự trên.

## 2. Tab `Categories`

| id | name | order |
|----|------|-------|
| thoi-trang | Thời trang | 1 |
| cham-soc-da | Chăm sóc da | 2 |
| gia-dung | Đồ gia dụng | 3 |

- `id`: viết liền, không dấu, không khoảng trắng (dùng để gán sản phẩm).
- `order`: số nhỏ hiện trước. Danh mục không có sản phẩm sẽ tự ẩn.

## 3. Tab `Products`

| name | image_url | buy_url | platform | category | order |
|------|-----------|---------|----------|----------|-------|
| Áo thun cotton form rộng | https://cf.shopee.vn/.../a.jpg | https://shopee.vn/... | shopee | thoi-trang | 1 |
| Serum Vitamin C | https://.../b.jpg | https://vt.tiktok.com/... | tiktok | cham-soc-da | 1 |

- `platform`: chỉ nhận `shopee`, `tiktok`, `lazada` (chữ thường) → quyết định màu badge.
- `category`: điền **đúng `id`** của một danh mục ở tab Categories.
  → **Mẹo:** bôi đen cột `category`, vào **Dữ liệu → Xác thực dữ liệu → Danh sách từ một dải ô** trỏ tới cột `id` của tab Categories để có **dropdown** chọn sẵn, khỏi gõ sai.
- `image_url`: dán link ảnh có sẵn từ sàn. Để trống hoặc ảnh lỗi → hiện ô gradient pastel thay thế.
- Sản phẩm thiếu `name` / `buy_url`, hoặc `category` không khớp danh mục nào → tự bị bỏ qua.

---

## Lấy link ảnh & link mua từ sàn

- **Ảnh:** mở sản phẩm trên web → chuột phải vào ảnh → **Sao chép địa chỉ hình ảnh**.
- **Link mua:** dùng link tiếp thị liên kết (affiliate) của bạn cho `buy_url`.
