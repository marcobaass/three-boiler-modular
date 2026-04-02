import { App } from './core/App.js';
import { eventBus } from './core/EventBus.js';
import { AssetManager } from './systems/AssetManager.js';

const assetManager = new AssetManager({ eventBus, manifest: [] });
const assets = await assetManager.loadAll();

const app = new App({ eventBus, assets });
app.init();

export { app };
