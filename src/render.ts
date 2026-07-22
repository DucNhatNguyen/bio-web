import type { Platform, Product, SiteData, SocialLink, SocialPlatform } from "./types";

const PLATFORM_META: Record<Platform, { label: string; glyph: string }> = {
  shopee: { label: "Shopee", glyph: "🛍" },
  tiktok: { label: "TikTok", glyph: "♪" },
  lazada: { label: "Lazada", glyph: "◆" },
};

// Nhãn + icon SVG (viewBox 24×24) cho từng mạng xã hội. Màu nền đặt trong CSS.
const SOCIAL_META: Record<SocialPlatform, { label: string; svg: string }> = {
  facebook: {
    label: "Facebook",
    svg: `<path d="M24 12.07C24 5.4 18.63 0 12 0S0 5.4 0 12.07C0 18.1 4.39 23.1 10.13 24v-8.44H7.08v-3.49h3.05V9.41c0-3.02 1.79-4.69 4.53-4.69 1.31 0 2.68.24 2.68.24v2.97h-1.51c-1.49 0-1.96.93-1.96 1.89v2.25h3.33l-.53 3.49h-2.8V24C19.61 23.1 24 18.1 24 12.07z"/>`,
  },
  instagram: {
    label: "Instagram",
    svg: `<path d="M12 2.16c3.2 0 3.58.01 4.85.07 1.17.05 1.8.25 2.23.41.56.22.96.48 1.38.9.42.42.68.82.9 1.38.16.42.36 1.06.41 2.23.06 1.27.07 1.65.07 4.85s-.01 3.58-.07 4.85c-.05 1.17-.25 1.8-.41 2.23-.22.56-.48.96-.9 1.38-.42.42-.82.68-1.38.9-.42.16-1.06.36-2.23.41-1.27.06-1.65.07-4.85.07s-3.58-.01-4.85-.07c-1.17-.05-1.8-.25-2.23-.41a3.7 3.7 0 01-1.38-.9 3.7 3.7 0 01-.9-1.38c-.16-.42-.36-1.06-.41-2.23C2.17 15.58 2.16 15.2 2.16 12s.01-3.58.07-4.85c.05-1.17.25-1.8.41-2.23.22-.56.48-.96.9-1.38.42-.42.82-.68 1.38-.9.42-.16 1.06-.36 2.23-.41C8.42 2.17 8.8 2.16 12 2.16zm0 3.68a6.16 6.16 0 100 12.32 6.16 6.16 0 000-12.32zm0 10.16a4 4 0 110-8 4 4 0 010 8zm7.85-10.4a1.44 1.44 0 11-2.88 0 1.44 1.44 0 012.88 0z"/>`,
  },
  tiktok: {
    label: "TikTok",
    svg: `<path d="M16.6 5.82a4.28 4.28 0 01-1.06-2.82h-3.3v13.1a2.59 2.59 0 01-2.59 2.5 2.59 2.59 0 01-2.58-2.59A2.59 2.59 0 019.66 13.4c.27 0 .53.04.77.12v-3.35a5.9 5.9 0 00-.77-.05A5.94 5.94 0 003.7 16a5.94 5.94 0 005.96 5.88 5.94 5.94 0 005.96-5.88V9.4a7.55 7.55 0 004.4 1.4V7.5a4.28 4.28 0 01-3.42-1.68z"/>`,
  },
  youtube: {
    label: "YouTube",
    svg: `<path d="M23.5 6.19a3.02 3.02 0 00-2.12-2.14C19.5 3.55 12 3.55 12 3.55s-7.5 0-9.38.5A3.02 3.02 0 00.5 6.19C0 8.08 0 12 0 12s0 3.92.5 5.81a3.02 3.02 0 002.12 2.14c1.88.5 9.38.5 9.38.5s7.5 0 9.38-.5a3.02 3.02 0 002.12-2.14C24 15.92 24 12 24 12s0-3.92-.5-5.81zM9.6 15.6V8.4l6.24 3.6-6.24 3.6z"/>`,
  },
  zalo: {
    label: "Zalo",
    svg: `<path d="M12 2C6.2 2 1.5 5.94 1.5 10.8c0 2.66 1.42 5.04 3.66 6.66-.13 1.06-.6 2.4-1.34 3.36-.2.25.02.62.34.55 1.9-.44 3.3-1.13 4.24-1.72 1.15.36 2.38.55 3.6.55 5.8 0 10.5-3.94 10.5-8.8S17.8 2 12 2zM7.3 13.1H4.55c-.3 0-.5-.24-.5-.5 0-.12.04-.23.12-.32l2.9-3.62H4.7a.5.5 0 010-1h2.6c.3 0 .5.24.5.5 0 .12-.04.23-.12.32L4.78 12.1H7.3a.5.5 0 010 1zm2.2-.02a.5.5 0 01-1 0V8.1a.5.5 0 011 0v4.98zm4.3-.02a.48.48 0 01-.36.16.5.5 0 01-.34-.13 2.06 2.06 0 01-1.06.29 1.9 1.9 0 01-1.9-1.9 1.9 1.9 0 011.9-1.9c.38 0 .74.1 1.06.3a.5.5 0 01.86.35v2.4c0 .13-.05.25-.16.33zm5.02-2.05a1.9 1.9 0 01-1.9 1.9 1.9 1.9 0 01-1.9-1.9 1.9 1.9 0 011.9-1.9 1.9 1.9 0 011.9 1.9z"/>`,
  },
  shopee: {
    label: "Shopee",
    svg: `<path d="M12 1.5c-2.7 0-4.9 2.06-4.9 4.6v.4H3.86a1 1 0 00-1 1.08l.86 13.1a1.6 1.6 0 001.6 1.5h13.36a1.6 1.6 0 001.6-1.5l.86-13.1a1 1 0 00-1-1.08h-3.24v-.4c0-2.54-2.2-4.6-4.9-4.6zm0 1.6c1.8 0 3.3 1.34 3.3 3v.4h-6.6v-.4c0-1.66 1.5-3 3.3-3zm.05 6.1c1.9 0 3.1.9 3.1 2.3 0 .3-.24.55-.55.55-.3 0-.55-.25-.55-.55 0-.7-.66-1.2-2-1.2-1.15 0-1.9.5-1.9 1.15 0 .7.7 1 2.06 1.35 1.7.42 2.94.95 2.94 2.45 0 1.5-1.34 2.4-3.2 2.4-2.1 0-3.4-1-3.4-2.5 0-.3.25-.55.55-.55.3 0 .55.25.55.55 0 .8.85 1.4 2.3 1.4 1.25 0 2.05-.5 2.05-1.25 0-.75-.7-1.05-2.16-1.42-1.6-.4-2.84-.92-2.84-2.38 0-1.42 1.3-2.3 3.04-2.3z"/>`,
  },
};

// Gradient pastel cho placeholder khi chưa có ảnh / ảnh lỗi.
const GRADIENTS = [
  "linear-gradient(135deg,#FDE7F0,#F9CBDE)",
  "linear-gradient(135deg,#F1E8FC,#DEC9F3)",
  "linear-gradient(135deg,#FDEBE0,#F8D2C0)",
  "linear-gradient(135deg,#E9F4EF,#CDE7DA)",
  "linear-gradient(135deg,#FAE6F2,#F2CBE4)",
  "linear-gradient(135deg,#FDF3E1,#F8E3BD)",
  "linear-gradient(135deg,#E7F0FB,#CFDFF5)",
  "linear-gradient(135deg,#F6ECE5,#E7D3C6)",
];

function esc(s: string): string {
  const d = document.createElement("div");
  d.textContent = s;
  return d.innerHTML;
}

function initials(name: string): string {
  const parts = name.replace(/[^\p{L}\s]/gu, " ").trim().split(/\s+/);
  return (parts[0]?.[0] ?? "S").toUpperCase();
}

function shopShort(name: string): string {
  return name.split("—")[0].trim() || "Shop";
}

/** Bỏ dấu tiếng Việt + thường hoá để tìm kiếm không phân biệt dấu. */
function normalize(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .replace(/đ/g, "d");
}

/* ============================ Analytics (GTM dataLayer) ============================ */

type DataLayer = Record<string, unknown>[];

/** dataLayer do GTM tạo (index.html). Tạo trước nếu GTM chưa kịp nạp. */
function dataLayer(): DataLayer {
  const w = window as unknown as { dataLayer?: DataLayer };
  return (w.dataLayer = w.dataLayer ?? []);
}

/** Đẩy 1 sự kiện hành vi vào dataLayer để GTM/GA4 bắt. */
function pushEvent(event: string, params: Record<string, unknown> = {}): void {
  dataLayer().push({ event, ...params });
}

/** Gửi 1 lượt xem trang cho route hiện tại (SPA hash-routing). */
function trackPageView(title: string): void {
  pushEvent("page_view", {
    page_title: title,
    page_location: location.href,
    page_path: location.pathname + location.hash,
  });
}

/* ============================ Router ============================ */

type Route = { view: "home" } | { view: "category"; id: string };

function currentRoute(): Route {
  const raw = location.hash.replace(/^#\/?/, "");
  const m = raw.match(/^c\/(.+)$/);
  if (m) return { view: "category", id: decodeURIComponent(m[1]) };
  return { view: "home" };
}

/** Điểm vào: dựng khung + gắn router. */
export function renderApp(app: HTMLElement, data: SiteData): void {
  const draw = () => {
    const route = currentRoute();
    const byCat = (id: string) => data.products.filter((p) => p.category === id);
    const visibleCats = data.categories.filter((c) => byCat(c.id).length > 0);

    let inner: string;
    let isCategory = false;
    let title = data.config.shop_name;
    if (route.view === "category") {
      const cat = visibleCats.find((c) => c.id === route.id);
      inner = cat ? categoryView(cat.name, byCat(cat.id)) : notFoundView();
      isCategory = !!cat;
      title = cat ? `${cat.name} · ${data.config.shop_name}` : `Không tìm thấy · ${data.config.shop_name}`;
    } else {
      inner = homeView(data, visibleCats, byCat);
    }
    document.title = title;

    // Footer chỉ hiển thị ở trang chủ, không hiển thị ở màn danh sách sản phẩm.
    app.innerHTML = `
      ${topbar(data)}
      <a id="top"></a>
      <div class="view">${inner}</div>
      ${route.view === "home" ? footer(data) : ""}`;

    window.scrollTo({ top: 0, behavior: "auto" });
    if (isCategory) wireProductSearch();
    trackPageView(title);
  };

  window.addEventListener("hashchange", draw);

  // Bắt click bằng event delegation (dùng lại được sau mỗi lần render lại).
  app.addEventListener("click", (e) => {
    const el = e.target as HTMLElement;

    const cat = el.closest<HTMLElement>(".cat-card");
    if (cat) {
      pushEvent("select_category", { category_name: cat.dataset.cat ?? "" });
      return;
    }

    const card = el.closest<HTMLAnchorElement>(".card");
    if (card) {
      pushEvent("select_product", {
        item_name: card.dataset.pname ?? "",
        item_category: card.dataset.cat ?? "",
        platform: card.dataset.platform ?? "",
        link_url: card.href,
      });
    }
  });

  draw();
}

/* ============================ Chrome ============================ */

function topbar(data: SiteData): string {
  const short = shopShort(data.config.shop_name);
  return `
    <div class="topbar">
      <div class="topbar-inner">
        <a class="brandmini" href="#/">
          <span class="dot">${initials(data.config.shop_name)}</span>${esc(short)}
        </a>
      </div>
    </div>`;
}

function footer(data: SiteData): string {
  return `
    <footer>
      <div>© ${new Date().getFullYear()} ${esc(shopShort(data.config.shop_name))} · Trang tiếp thị liên kết</div>
    </footer>`;
}

/* ============================ Home ============================ */

/** Hàng icon mạng xã hội tròn nhiều màu. Rỗng → không hiển thị gì. */
function socialRow(socials: SocialLink[]): string {
  if (!socials.length) return "";
  const items = socials
    .map((s) => {
      const meta = SOCIAL_META[s.platform];
      return `
        <a class="social social--${s.platform}" href="${esc(s.url)}"
           target="_blank" rel="noopener noreferrer"
           aria-label="${meta.label}" title="${meta.label}">
          <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">${meta.svg}</svg>
        </a>`;
    })
    .join("");
  return `<nav class="socials" aria-label="Mạng xã hội">${items}</nav>`;
}

function homeView(
  data: SiteData,
  visibleCats: SiteData["categories"],
  byCat: (id: string) => Product[],
): string {
  const { config } = data;

  const avatarImg = config.avatar_url
    ? `<img class="avatar-img" src="${esc(config.avatar_url)}" alt="${esc(config.shop_name)}" onerror="this.remove()" />`
    : "";

  const hero = `
    <header class="hero">
      <div class="hero-banner" aria-hidden="true">
        <svg class="hero-wave" viewBox="0 0 1440 220" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path fill="rgba(255,255,255,0.55)" d="M0,96C240,150,480,40,720,64C960,88,1200,190,1440,150L1440,220L0,220Z"/>
          <path fill="rgba(255,255,255,0.85)" d="M0,150C260,80,520,180,780,170C1040,160,1220,90,1440,120L1440,220L0,220Z"/>
        </svg>
      </div>
      <div class="wrap hero-inner">
        <div class="avatar" aria-hidden="true">
          <span class="avatar-initials">${initials(config.shop_name)}</span>
          ${avatarImg}
        </div>
        ${config.eyebrow ? `<span class="eyebrow">${esc(config.eyebrow)}</span>` : ""}
        <h1 class="shop">${esc(config.shop_name)}</h1>
        ${config.bio ? `<p class="bio">${esc(config.bio)}</p>` : ""}
        ${socialRow(config.socials)}
        <div class="divider"></div>
      </div>
    </header>`;

  if (!visibleCats.length) {
    return `${hero}
      <main class="wrap">
        <div class="state">
          <div class="state-emoji">🌸</div>
          <p class="state-title">Sắp có sản phẩm</p>
          <p class="state-sub">Shop đang tuyển chọn những món xinh. Ghé lại sau nhé!</p>
        </div>
      </main>`;
  }

  const cards = visibleCats
    .map((c, i) => categoryCard(c.id, c.name, byCat(c.id), i))
    .join("");

  return `${hero}
    <main class="wrap">
      <section class="cats fade">
        <div class="cats-head">
          <h2>Danh mục</h2>
          <span class="rule"></span>
        </div>
        <div class="cat-grid">${cards}</div>
      </section>
    </main>`;
}

function categoryCard(id: string, name: string, items: Product[], idx: number): string {
  const gradient = GRADIENTS[idx % GRADIENTS.length];
  const cover = items.find((p) => p.image_url)?.image_url ?? "";
  const coverImg = cover
    ? `<img class="cat-cover-img" src="${esc(cover)}" alt="" loading="lazy"
         onerror="this.remove();this.parentElement.classList.add('cat-cover--empty')" />`
    : "";

  return `
    <a class="cat-card" href="#/c/${encodeURIComponent(id)}" data-cat="${esc(name)}" aria-label="Xem danh mục ${esc(name)}">
      <div class="cat-cover ${cover ? "" : "cat-cover--empty"}" style="--ph:${gradient}">
        ${coverImg}
        <span class="cat-count">${items.length} món</span>
      </div>
      <div class="cat-card-body">
        <h3 class="cat-name">${esc(name)}</h3>
        <span class="cat-go">Xem danh mục →</span>
      </div>
    </a>`;
}

/* ============================ Category detail ============================ */

function categoryView(name: string, items: Product[]): string {
  const cards = items.map((p, i) => productCard(p, i, name)).join("");
  return `
    <main class="wrap fade">
      <a class="backlink" href="#/">← Tất cả danh mục</a>
      <section class="cat">
        <div class="cat-head">
          <h2>${esc(name)}</h2>
          <div class="search">
            <span class="search-ico" aria-hidden="true">🔍</span>
            <input id="prod-search" type="search" autocomplete="off"
              placeholder="Tìm sản phẩm…" aria-label="Tìm sản phẩm trong ${esc(name)}" />
          </div>
        </div>
        <div class="grid" id="prod-grid" data-cat="${esc(name)}">${cards}</div>
        <div class="state" id="search-empty" hidden>
          <div class="state-emoji">🔍</div>
          <p class="state-sub">Không có sản phẩm nào khớp từ khoá.</p>
        </div>
      </section>
    </main>`;
}

/** Lọc thẻ sản phẩm theo tên khi gõ vào ô tìm kiếm. */
function wireProductSearch(): void {
  const input = document.getElementById("prod-search") as HTMLInputElement | null;
  const grid = document.getElementById("prod-grid");
  const empty = document.getElementById("search-empty");
  if (!input || !grid) return;
  const cards = [...grid.querySelectorAll<HTMLElement>(".card")];
  const catName = grid.dataset.cat ?? "";
  let searchTimer: number | undefined;

  input.addEventListener("input", () => {
    const term = input.value.trim();
    const q = normalize(term);
    let shown = 0;
    for (const c of cards) {
      const match = q === "" || (c.dataset.name ?? "").includes(q);
      c.style.display = match ? "" : "none";
      if (match) shown++;
    }
    if (empty) empty.hidden = shown > 0;

    // Chỉ gửi sự kiện search khi người dùng ngừng gõ ~700ms và có từ khoá.
    window.clearTimeout(searchTimer);
    if (term) {
      searchTimer = window.setTimeout(
        () => pushEvent("search", { search_term: term, item_category: catName, results: shown }),
        700,
      );
    }
  });
}

function notFoundView(): string {
  return `
    <main class="wrap">
      <div class="state state--full">
        <div class="state-emoji">🌷</div>
        <p class="state-title">Không tìm thấy danh mục</p>
        <p class="state-sub">Danh mục này không tồn tại hoặc chưa có sản phẩm.</p>
        <a class="retry" href="#/">Về trang chủ</a>
      </div>
    </main>`;
}

/* ============================ Product card ============================ */

function productCard(p: Product, gradientIdx: number, catName: string): string {
  const meta = PLATFORM_META[p.platform];
  const gradient = GRADIENTS[gradientIdx % GRADIENTS.length];
  const media = p.image_url
    ? `<img class="thumb-img" src="${esc(p.image_url)}" alt="${esc(p.name)}" loading="lazy"
         onerror="this.remove();this.parentElement.classList.add('thumb--fallback')" />
       <span class="thumb-glyph" aria-hidden="true">🛍</span>`
    : `<span class="thumb-glyph" aria-hidden="true">🛍</span>`;

  return `
    <a class="card" href="${esc(p.buy_url)}" target="_blank" rel="noopener noreferrer"
       data-name="${esc(normalize(p.name))}"
       data-pname="${esc(p.name)}" data-platform="${p.platform}" data-cat="${esc(catName)}"
       aria-label="${esc(p.name)} — mua ngay trên ${meta.label}">
      <div class="thumb ${p.image_url ? "" : "thumb--fallback"}" style="--ph:${gradient}">
        <span class="badge badge--${p.platform}"><span class="badge-glyph">${meta.glyph}</span>${meta.label}</span>
        ${media}
      </div>
      <div class="card-body">
        <p class="pname">${esc(p.name)}</p>
        <span class="buy">Mua ngay →</span>
      </div>
    </a>`;
}

/* ============================ States ============================ */

export function renderLoading(app: HTMLElement): void {
  app.innerHTML = `
    <div class="state state--full">
      <div class="spinner" aria-hidden="true"></div>
      <p class="state-sub">Đang tải sản phẩm…</p>
    </div>`;
}

export function renderError(app: HTMLElement, onRetry: () => void): void {
  app.innerHTML = `
    <div class="state state--full">
      <div class="state-emoji">🌷</div>
      <p class="state-title">Không tải được dữ liệu</p>
      <p class="state-sub">Kiểm tra kết nối mạng rồi thử lại nhé.</p>
      <button class="retry" id="retry">Thử lại</button>
    </div>`;
  document.getElementById("retry")?.addEventListener("click", onRetry);
}
