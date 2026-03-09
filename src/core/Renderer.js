import { sizes } from "./Sizes.js";
import { eventBus } from "./EventBus.js";
import * as THREE from 'three';

export class Renderer {
    constructor({ scene, camera, canvas }) {
        this.scene = scene;
        this.camera = camera;
        this.canvas = canvas;

        this.instance = new THREE.WebGLRenderer({
            canvas: this.canvas,
            antialias: true,
            alpha: true
        });
        this.instance.toneMapping = THREE.ACESFilmicToneMapping;
        this.instance.toneMappingExposure = 1.5;


        this.instance.setSize(sizes.width, sizes.height);
        this.instance.setPixelRatio(sizes.pixelRatio);

        eventBus.on('resize', this.onResize.bind(this));
    }

    onResize() {
        this.instance.setSize(sizes.width, sizes.height);
        this.instance.setPixelRatio(sizes.pixelRatio);
      }

    update() {
        this.instance.render(this.scene, this.camera);
    }
}