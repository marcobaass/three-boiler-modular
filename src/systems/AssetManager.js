export class AssetManager {
  constructor({ eventBus, manifest = [] } = {}) {
    this.eventBus = eventBus;
    this.manifest = manifest;
    this.items = {};
  }

  async loadAll() {
    // later: load textures/fonts/models and emit progress
    return this.items;
  }

  get(name) {
    return this.items[name];
  }
  destroy() {}
}
