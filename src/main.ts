import "./style.css";
import { loadSiteData } from "./data";
import { renderApp, renderError, renderLoading } from "./render";

const app = document.getElementById("app")!;

async function boot(): Promise<void> {
  renderLoading(app);
  try {
    const data = await loadSiteData();
    renderApp(app, data);
  } catch (err) {
    console.error(err);
    renderError(app, () => void boot());
  }
}

void boot();
