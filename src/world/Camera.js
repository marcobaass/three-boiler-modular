import { sizes } from '../core/Sizes.js';
import { eventBus } from '../core/EventBus.js';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

export class Camera {
  constructor(canvas, cameraConfig) {
    this.canvas = canvas;
    this.sizes = sizes;
    this.eventBus = eventBus;

    this.onResize = this.onResize.bind(this);
    this.eventBus.on('resize', this.onResize);

    this.camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);

    this.camera.position.set(0, 0, 6);
    this.camera.lookAt(0, 0, 0);

    if (cameraConfig.orbitControls) {
      this.controls = new OrbitControls(this.camera, this.canvas);
      this.controls.enableDamping = true;
      this.controls.dampingFactor = 0.05;
    } else {
      this.controls = null;
    }
  }

  onResize({ width, height, pixelRatio }) {
    this.camera.aspect = width / height;
    this.camera.updateProjectionMatrix();
  }

  update() {
    if (this.controls) {
      this.controls.update();
    }
    this.camera.updateMatrixWorld();
  }

  destroy() {
    this.eventBus.off('resize', this.onResize);
    if (this.controls) {
      this.controls.dispose();
    }
  }
}
