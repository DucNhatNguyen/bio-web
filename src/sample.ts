import type { SiteData } from "./types";

/** Dữ liệu mẫu — dùng khi chưa cấu hình Google Sheet (SHEET_ID rỗng). */
export const sampleData: SiteData = {
  config: {
    shop_name: "Min’s Shop — Deal Xinh Cho Nàng",
    avatar_url: "",
    bio: "Những món xinh xắn, chất lượng, giá tốt được tuyển chọn từ Shopee · TikTok Shop · Lazada. Chạm vào sản phẩm để mua trên sàn nhé!",
    eyebrow: "Tuyển chọn mỗi ngày",
  },
  categories: [
    { id: "thoi-trang", name: "Thời trang", order: 1 },
    { id: "cham-soc-da", name: "Chăm sóc da", order: 2 },
    { id: "gia-dung", name: "Đồ gia dụng", order: 3 },
    { id: "cong-nghe", name: "Phụ kiện công nghệ", order: 4 },
  ],
  products: [
    { name: "Áo thun cotton form rộng unisex", image_url: "", buy_url: "#", platform: "shopee", category: "thoi-trang", order: 1 },
    { name: "Chân váy xếp ly dáng dài nữ", image_url: "", buy_url: "#", platform: "tiktok", category: "thoi-trang", order: 2 },
    { name: "Túi tote canvas đi học đi làm", image_url: "", buy_url: "#", platform: "lazada", category: "thoi-trang", order: 3 },
    { name: "Nón bucket phối màu cá tính", image_url: "", buy_url: "#", platform: "shopee", category: "thoi-trang", order: 4 },

    { name: "Serum Vitamin C dưỡng sáng da", image_url: "", buy_url: "#", platform: "tiktok", category: "cham-soc-da", order: 1 },
    { name: "Kem chống nắng SPF50+ kiềm dầu", image_url: "", buy_url: "#", platform: "shopee", category: "cham-soc-da", order: 2 },
    { name: "Sữa rửa mặt dịu nhẹ cho da nhạy cảm", image_url: "", buy_url: "#", platform: "lazada", category: "cham-soc-da", order: 3 },
    { name: "Mặt nạ giấy cấp ẩm (hộp 10 miếng)", image_url: "", buy_url: "#", platform: "shopee", category: "cham-soc-da", order: 4 },

    { name: "Máy xay sinh tố mini cầm tay", image_url: "", buy_url: "#", platform: "lazada", category: "gia-dung", order: 1 },
    { name: "Đèn LED để bàn chống cận", image_url: "", buy_url: "#", platform: "shopee", category: "gia-dung", order: 2 },
    { name: "Bộ hộp đựng thực phẩm 5 món", image_url: "", buy_url: "#", platform: "tiktok", category: "gia-dung", order: 3 },
    { name: "Nến thơm thư giãn hương hoa", image_url: "", buy_url: "#", platform: "lazada", category: "gia-dung", order: 4 },

    { name: "Tai nghe bluetooth chống ồn", image_url: "", buy_url: "#", platform: "tiktok", category: "cong-nghe", order: 1 },
    { name: "Sạc dự phòng 20.000mAh sạc nhanh", image_url: "", buy_url: "#", platform: "shopee", category: "cong-nghe", order: 2 },
    { name: "Giá đỡ điện thoại để bàn nhôm", image_url: "", buy_url: "#", platform: "lazada", category: "cong-nghe", order: 3 },
    { name: "Cáp sạc Type-C bọc dù 2m", image_url: "", buy_url: "#", platform: "shopee", category: "cong-nghe", order: 4 },
  ],
};
