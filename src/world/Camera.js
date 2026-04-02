import { sizes } from '../core/Sizes.js';
import { eventBus } from '../core/EventBus.js';
import * as THREE from 'three';

export class Camera {
  constructor() {
    this.sizes = sizes;
    this.eventBus = eventBus;

    this.onResize = this.onResize.bind(this);
    this.eventBus.on('resize', this.onResize);

    this.camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);

    this.camera.position.set(0, 0, 6);
    this.camera.lookAt(0, 0, 0);
  }

  onResize({ width, height, pixelRatio }) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    this.camera.updateMatrixWorld();
  }

  destroy() {
    this.eventBus.off('resize', this.onResize);
  }
}
