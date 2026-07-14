// ---------------------------------------------------------------------------
// Cấu hình nguồn dữ liệu Google Sheet
// ---------------------------------------------------------------------------
// Cách lấy SHEET_ID:
//   1. Mở Google Sheet của bạn.
//   2. Chia sẻ: "Bất kỳ ai có đường liên kết" → quyền "Người xem".
//   3. Copy phần ID trong URL:
//      https://docs.google.com/spreadsheets/d/<SHEET_ID>/edit
//
// Đổi 3 tên tab bên dưới cho khớp với tên các tab trong Sheet của bạn.
// Xem hướng dẫn chi tiết + cấu trúc cột tại docs/sheet-template.md
//
// Để trống SHEET_ID (giữ nguyên "") → trang chạy bằng dữ liệu mẫu để xem thử.
// ---------------------------------------------------------------------------

export const SHEET_ID = "1548P8r4elJBzWBcCIHYcPEtwtFEQCrvj";

export const TABS = {
  config: "Config",
  categories: "Categories",
  products: "Products",
} as const;

/** Dựng URL xuất CSV của một tab qua Google Visualization API (gviz). */
export function csvUrl(tabName: string): string {
  return (
    `https://docs.google.com/spreadsheets/d/${SHEET_ID}/gviz/tq` +
    `?tqx=out:csv&sheet=${encodeURIComponent(tabName)}`
  );
}

export const USE_SAMPLE = SHEET_ID.trim() === "";
