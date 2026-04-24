import { World } from '../world/World.js';
import { AnimationManager } from '../systems/AnimationManager.js';
import { Time } from './Time.js';
import { Renderer } from './Renderer.js';
import { InteractionManager } from '../systems/InteractionManager.js';

export class App {
  constructor({ eventBus, assets, sceneConfig }) {
    const canvas = document.querySelector('.webgl');

    this.world = new World({ eventBus, assets, canvas, sceneConfig });
    this.animationManager = new AnimationManager();
    this.interactionManager = new InteractionManager({ eventBus });
    this.time = new Time();
    this.renderer = new Renderer({
      scene: this.world.scene,
      camera: this.world.camera.camera,
      canvas: canvas,
    });
    this.isDestroyed = false;
  }

  update(delta) {
    this.animationManager.update(delta);
    this.interactionManager.update(delta);
    this.world.update(delta);
    this.renderer.update(delta);
  }

  destroy() {
    this.isDestroyed = true;
    if (this.rafId) cancelAnimationFrame(this.rafId);

    this.animationManager.destroy();
    this.interactionManager.destroy();
    this.world.destroy();
    this.renderer.destroy();
  }

  init() {
    const loop = () => {
      if (this.isDestroyed) return;

      this.time.update();
      const delta = this.time.delta;
      this.update(delta);

      this.rafId = requestAnimationFrame(loop);
    };
    loop();
  }
}
