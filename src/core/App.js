import { World } from "../world/World.js";
import { AnimationManager } from "../systems/AnimationManager.js";
import { Time } from "./Time.js";
import { Renderer } from "./Renderer.js";
import { Camera } from "../world/Camera.js";

export class App {
    constructor() {
        const canvas = document.querySelector('.webgl');

        this.world = new World();
        this.camera = new Camera();
        this.animationManager = new AnimationManager();
        this.time = new Time();
        this.renderer = new Renderer({
            scene: this.world.scene,
            camera: this.camera.camera,
            canvas: canvas,
        });
    }

    update(delta) {
        this.animationManager.update(delta);
        this.world.update(delta);
        this.renderer.update(delta);
    }

    init() {
        const loop = () => {
            this.time.update();
            const delta = this.time.delta;
            this.update(delta);
            requestAnimationFrame(loop);
        };
        loop();
    }  
    
}
