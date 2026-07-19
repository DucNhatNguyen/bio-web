export type Platform = "shopee" | "tiktok" | "lazada";

/** Các nền tảng mạng xã hội hỗ trợ hiển thị icon ở phần hồ sơ. */
export type SocialPlatform =
  | "facebook"
  | "instagram"
  | "tiktok"
  | "youtube"
  | "zalo"
  | "shopee";

export interface SocialLink {
  platform: SocialPlatform;
  url: string;
}

export interface Category {
  id: string;
  name: string;
  order: number;
}

export interface Product {
  name: string;
  image_url: string;
  buy_url: string;
  platform: Platform;
  category: string; // = Category.id
  order: number;
}

export interface SiteConfig {
  shop_name: string;
  avatar_url: string;
  bio: string;
  eyebrow: string;
  socials: SocialLink[];
}

export interface SiteData {
  config: SiteConfig;
  categories: Category[];
  products: Product[];
}
