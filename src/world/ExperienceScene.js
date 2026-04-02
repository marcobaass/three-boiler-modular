import * as THREE from 'three';
import { HeroText } from '../components/HeroText.js';
import { ParticleSystem } from '../components/ParticleSystem.js';

export class ExperienceScene {
  constructor({ eventBus, assets }) {
    this.eventBus = eventBus;
    this.assets = assets;

    this.scene = new THREE.Scene();
    this.components = [];

    this.setup();
  }

  setup() {
    const atlas = this.assets?.heroFontAtlas ?? null;
    const fontData = this.assets?.heroFontData ?? null;

    this.heroText = new HeroText({ atlas, fontData });
    this.particleSystem = new ParticleSystem(this.eventBus, this.scene);

    this.components.push(this.heroText, this.particleSystem);

    if (this.heroText.mesh) this.scene.add(this.heroText.mesh);
    // ParticleSystem currently adds itself to scene in init();
  }

  update(delta) {
    for (const component of this.components) {
      component?.update?.(delta);
    }
  }

  destroy() {
    for (const component of this.components) {
      if (component?.destroy) component.destroy();
    }
  }
}
