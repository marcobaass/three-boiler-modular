import { eventBus } from "../core/EventBus.js";

export class HeroText {
    constructor() {
        this.uniforms = {
            uTime: { value: 0 },
            uProgress: { value: 0 }
        }

        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true
        })

        this.mesh = new THREE.Mesh(this.geometry, this.material);

        eventBus.on('scroll', (progress) => {
            this.setProgress(progress);
        })
    }

    setProgress(value) {
        this.uniforms.uProgress.value = value;
    }

    update(delta) {
        this.uniforms.uTime.value += delta;
    }
}