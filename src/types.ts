export type Platform = "shopee" | "tiktok" | "lazada";

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
}

export interface SiteData {
  config: SiteConfig;
  categories: Category[];
  products: Product[];
}
