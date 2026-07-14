# Bio-Web — Trang bio tiếp thị link sản phẩm

Trang bio (kiểu Linktree) tổng hợp sản phẩm affiliate từ **Shopee · TikTok Shop · Lazada**,
sắp xếp theo danh mục. Giao diện sáng, dịu dàng nữ tính, responsive mọi thiết bị.

- **Frontend:** Vite + TypeScript + Tailwind CSS v4
- **Dữ liệu:** Google Sheet (đọc CSV qua gviz) — không cần backend
- **Ảnh sản phẩm:** dán link ảnh từ sàn
- **Hosting:** web tĩnh, hợp Cloudflare Pages (free)

## Chạy tại máy

```bash
npm install
npm run dev       # mở http://localhost:5173
```

Khi `SHEET_ID` trong `src/config.ts` còn để trống, trang chạy bằng **dữ liệu mẫu** để xem thử ngay.

## Kết nối Google Sheet

1. Tạo Google Sheet 3 tab theo hướng dẫn: [`docs/sheet-template.md`](docs/sheet-template.md).
2. Chia sẻ Sheet: **Bất kỳ ai có đường liên kết → Người xem**.
3. Dán `SHEET_ID` vào `src/config.ts`.
4. `npm run dev` để kiểm tra, rồi deploy.

## Build

```bash
npm run build     # xuất ra thư mục dist/
npm run preview   # xem thử bản build
```

## Deploy lên Cloudflare Pages (free)

1. Đẩy dự án lên GitHub.
2. Cloudflare Dashboard → **Workers & Pages → Create → Pages → Connect to Git**.
3. Cấu hình build:
   - **Build command:** `npm run build`
   - **Build output directory:** `dist`
4. Deploy → nhận subdomain miễn phí `*.pages.dev`.

> Sửa dữ liệu trên Google Sheet **không cần** deploy lại — trang tự đọc mới khi người xem mở
> (Google cache CSV ~5 phút).

## Cấu trúc

```
src/
  config.ts   Cấu hình SHEET_ID và tên tab
  types.ts    Kiểu dữ liệu Category / Product / Config
  data.ts     Tải & parse CSV (PapaParse), lọc hợp lệ
  sample.ts   Dữ liệu mẫu khi chưa có Sheet
  render.ts   Dựng giao diện + trạng thái loading/lỗi/rỗng
  style.css   Design tokens + component styles
  main.ts     Điểm khởi động
docs/
  sheet-template.md   Hướng dẫn cấu trúc Google Sheet
```
