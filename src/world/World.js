import { ExperienceScene } from './ExperienceScene.js';
import { Camera } from './Camera.js';

export class World {
  constructor({ eventBus, assets = null, canvas, sceneConfig }) {
    this.eventBus = eventBus;
    this.assets = assets;

    this.experienceScene = new ExperienceScene({
      eventBus: this.eventBus,
      assets: this.assets,
      sceneConfig: sceneConfig.scene,
    });

    this.scene = this.experienceScene.scene;
    this.camera = new Camera(canvas, sceneConfig.camera);
  }

  update(delta) {
    this.camera.update(delta);
    this.experienceScene.update(delta);
  }

  destroy() {
    this.camera.destroy();
    this.experienceScene.destroy();
  }
}
