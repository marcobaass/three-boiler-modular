import * as THREE from 'three';

export class Lights {
  constructor(scene, sceneConfig) {
    this.scene = scene;
    this.sceneConfig = sceneConfig;

    this.setup();
  }

  setup() {
    if (this.sceneConfig.lights) {
      this.ambientLight = new THREE.AmbientLight(0xffffff, 1);
      this.scene.add(this.ambientLight);

      this.directionalLight = new THREE.DirectionalLight(0xffffff, 1);
      this.directionalLight.position.set(10, 10, 10);
      this.scene.add(this.directionalLight);
    }
  }

  destroy() {
    if (this.sceneConfig.lights) {
      if (this.ambientLight) this.scene.remove(this.ambientLight);
      if (this.directionalLight) this.scene.remove(this.directionalLight);
    }
  }
}
