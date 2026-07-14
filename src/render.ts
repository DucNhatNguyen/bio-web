import type { Platform, Product, SiteData } from "./types";

const PLATFORM_META: Record<Platform, { label: string; glyph: string }> = {
  shopee: { label: "Shopee", glyph: "🛍" },
  tiktok: { label: "TikTok", glyph: "♪" },
  lazada: { label: "Lazada", glyph: "◆" },
};

// Gradient pastel cho placeholder khi sản phẩm chưa có ảnh / ảnh lỗi.
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
       aria-label="${esc(p.name)} — mua trên ${meta.label}">
      <div class="thumb ${p.image_url ? "" : "thumb--fallback"}" style="--ph:${gradient}">
        <span class="badge badge--${p.platform}"><span class="badge-glyph">${meta.glyph}</span>${meta.label}</span>
        ${media}
      </div>
      <div class="card-body">
        <p class="pname">${esc(p.name)}</p>
        <span class="buy">Mua trên ${meta.label} →</span>
      </div>
    </a>`;
}

export function renderApp(app: HTMLElement, data: SiteData): void {
  const { config, categories, products } = data;
  const byCat = (id: string) => products.filter((p) => p.category === id);
  const visibleCats = categories.filter((c) => byCat(c.id).length > 0);

  const avatarImg = config.avatar_url
    ? `<img class="avatar-img" src="${esc(config.avatar_url)}" alt="${esc(config.shop_name)}"
         onerror="this.remove()" />`
    : "";

  let gi = 0;
  const sections = visibleCats
    .map((c) => {
      const items = byCat(c.id);
      const cards = items.map((p) => productCard(p, gi++)).join("");
      return `
        <section class="cat" id="${esc(c.id)}">
          <div class="cat-head">
            <h2>${esc(c.name)}</h2>
            <span class="count">${items.length} sản phẩm</span>
            <span class="rule"></span>
          </div>
          <div class="grid">${cards}</div>
        </section>`;
    })
    .join("");

  const pills = visibleCats
    .map(
      (c, i) =>
        `<a class="pill${i === 0 ? " active" : ""}" href="#${esc(c.id)}" data-id="${esc(c.id)}">${esc(c.name)}</a>`,
    )
    .join("");

  const body = visibleCats.length
    ? `<main class="wrap" id="main">${sections}</main>`
    : `<main class="wrap"><div class="state">
         <div class="state-emoji">🌸</div>
         <p class="state-title">Sắp có sản phẩm</p>
         <p class="state-sub">Shop đang tuyển chọn những món xinh. Ghé lại sau nhé!</p>
       </div></main>`;

  app.innerHTML = `
    <div class="topbar">
      <div class="topbar-inner">
        <a class="brandmini" href="#top"><span class="dot">${initials(config.shop_name)}</span>${esc(config.shop_name.split("—")[0].trim() || "Shop")}</a>
        <nav class="pills" id="pills" aria-label="Danh mục">${pills}</nav>
      </div>
    </div>

    <a id="top"></a>
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
    </div>

    ${body}

    <footer>
      <div>© ${new Date().getFullYear()} ${esc(config.shop_name.split("—")[0].trim() || "Shop")} · Trang tiếp thị liên kết</div>
    </footer>`;

  setupScrollSpy();
}

/** Highlight pill danh mục đang xem khi cuộn trang. */
function setupScrollSpy(): void {
  const sections = [...document.querySelectorAll<HTMLElement>("section.cat")];
  const pills = [...document.querySelectorAll<HTMLElement>(".pill")];
  if (!sections.length || !pills.length) return;

  const io = new IntersectionObserver(
    (entries) => {
      for (const e of entries) {
        if (e.isIntersecting) {
          const id = e.target.id;
          pills.forEach((p) => p.classList.toggle("active", p.dataset.id === id));
        }
      }
    },
    { rootMargin: "-45% 0px -50% 0px" },
  );
  sections.forEach((s) => io.observe(s));
}

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
