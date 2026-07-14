import type { Platform, Product, SiteData } from "./types";

const PLATFORM_META: Record<Platform, { label: string; glyph: string }> = {
  shopee: { label: "Shopee", glyph: "🛍" },
  tiktok: { label: "TikTok", glyph: "♪" },
  lazada: { label: "Lazada", glyph: "◆" },
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
    if (route.view === "category") {
      const cat = visibleCats.find((c) => c.id === route.id);
      inner = cat ? categoryView(cat.name, byCat(cat.id)) : notFoundView();
      isCategory = !!cat;
    } else {
      inner = homeView(data, visibleCats, byCat);
    }

    // Footer chỉ hiển thị ở trang chủ, không hiển thị ở màn danh sách sản phẩm.
    app.innerHTML = `
      ${topbar(data)}
      <a id="top"></a>
      <div class="view">${inner}</div>
      ${route.view === "home" ? footer(data) : ""}`;

    window.scrollTo({ top: 0, behavior: "auto" });
    if (isCategory) wireProductSearch();
  };

  window.addEventListener("hashchange", draw);
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
    <div class="wrap">
      <header class="hero">
        <div class="avatar" aria-hidden="true">
          <span class="avatar-initials">${initials(config.shop_name)}</span>
          ${avatarImg}
        </div>
        ${config.eyebrow ? `<span class="eyebrow">${esc(config.eyebrow)}</span>` : ""}
        <h1 class="shop">${esc(config.shop_name)}</h1>
        ${config.bio ? `<p class="bio">${esc(config.bio)}</p>` : ""}
        <div class="divider"></div>
      </header>
    </div>`;

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
    <a class="cat-card" href="#/c/${encodeURIComponent(id)}" aria-label="Xem danh mục ${esc(name)}">
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
  const cards = items.map((p, i) => productCard(p, i)).join("");
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
        <div class="grid" id="prod-grid">${cards}</div>
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

  input.addEventListener("input", () => {
    const q = normalize(input.value.trim());
    let shown = 0;
    for (const c of cards) {
      const match = q === "" || (c.dataset.name ?? "").includes(q);
      c.style.display = match ? "" : "none";
      if (match) shown++;
    }
    if (empty) empty.hidden = shown > 0;
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

function productCard(p: Product, gradientIdx: number): string {
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
