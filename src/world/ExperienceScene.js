import * as THREE from 'three';
import { HeroText } from '../components/HeroText.js';
import { ParticleSystem } from '../components/ParticleSystem.js';
import { Lights } from './Lights.js';

export class ExperienceScene {
  constructor({ eventBus, assets, sceneConfig }) {
    this.eventBus = eventBus;
    this.assets = assets;
    this.sceneConfig = sceneConfig;

    this.scene = new THREE.Scene();
    this.components = [];

    this.setup();
  }

  setup() {
    if (this.sceneConfig.cube) {
      // Starter mesh
      this.testGeometry = new THREE.BoxGeometry(1, 1, 1);
      this.testMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
      this.testMesh = new THREE.Mesh(this.testGeometry, this.testMaterial);
      this.scene.add(this.testMesh);
    }

    if (this.sceneConfig.lights) {
      this.lights = new Lights(this.scene, this.sceneConfig);
      this.components.push(this.lights);
    }

    const atlas = this.assets?.heroFontAtlas ?? null;
    const fontData = this.assets?.heroFontData ?? null;

    if (this.sceneConfig.heroText) {
      this.heroText = new HeroText({ atlas, fontData });
      this.components.push(this.heroText);
    }

    if (this.sceneConfig.particles) {
      this.particleSystem = new ParticleSystem(this.eventBus, this.scene);
      this.components.push(this.particleSystem);
    }

    if (this.heroText) this.scene.add(this.heroText.mesh);
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
