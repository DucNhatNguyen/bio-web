import Papa from "papaparse";
import { TABS, csvUrl, USE_SAMPLE } from "./config";
import { sampleData } from "./sample";
import type { Category, Platform, Product, SiteConfig, SiteData } from "./types";

const PLATFORMS: Platform[] = ["shopee", "tiktok", "lazada"];

/** Tải & parse một tab CSV thành mảng object (key = tên cột, đã trim). */
async function fetchTab(tabName: string): Promise<Record<string, string>[]> {
  const res = await fetch(csvUrl(tabName), { cache: "no-store" });
  if (!res.ok) throw new Error(`Không tải được tab "${tabName}" (HTTP ${res.status})`);
  const text = await res.text();
  const parsed = Papa.parse<Record<string, string>>(text, {
    header: true,
    skipEmptyLines: true,
    transformHeader: (h) => h.trim().toLowerCase(),
  });
  return parsed.data.map((row) => {
    const clean: Record<string, string> = {};
    for (const [k, v] of Object.entries(row)) clean[k] = (v ?? "").toString().trim();
    return clean;
  });
}

function toNumber(v: string, fallback = 9999): number {
  const n = Number(v);
  return Number.isFinite(n) && v !== "" ? n : fallback;
}

function parseConfig(rows: Record<string, string>[]): SiteConfig {
  const r = rows[0] ?? {};
  return {
    shop_name: r.shop_name || sampleData.config.shop_name,
    avatar_url: r.avatar_url || "",
    bio: r.bio || "",
    eyebrow: r.eyebrow || "",
  };
}

function parseCategories(rows: Record<string, string>[]): Category[] {
  return rows
    .filter((r) => r.id && r.name)
    .map((r) => ({ id: r.id, name: r.name, order: toNumber(r.order) }))
    .sort((a, b) => a.order - b.order);
}

function parseProducts(rows: Record<string, string>[], validCategoryIds: Set<string>): Product[] {
  return rows
    .filter((r) => r.name && r.buy_url && validCategoryIds.has(r.category))
    .map((r) => {
      const platform = (r.platform || "").toLowerCase();
      return {
        name: r.name,
        image_url: r.image_url || "",
        buy_url: r.buy_url,
        platform: (PLATFORMS.includes(platform as Platform) ? platform : "shopee") as Platform,
        category: r.category,
        order: toNumber(r.order),
      };
    })
    .sort((a, b) => a.order - b.order);
}

/** Nguồn dữ liệu chính: đọc từ Google Sheet, hoặc trả về dữ liệu mẫu. */
export async function loadSiteData(): Promise<SiteData> {
  if (USE_SAMPLE) return sampleData;

  const [configRows, categoryRows, productRows] = await Promise.all([
    fetchTab(TABS.config).catch(() => [] as Record<string, string>[]),
    fetchTab(TABS.categories),
    fetchTab(TABS.products),
  ]);

  const categories = parseCategories(categoryRows);
  const validIds = new Set(categories.map((c) => c.id));
  const products = parseProducts(productRows, validIds);
  const config = parseConfig(configRows);

  return { config, categories, products };
}
