export class World {
    constructor() {
        this.scene = new THREE.Scene();
        this.camera = new THREE.Camera();
        this.hero = new HeroText();
        this.particles = new ParticleSystem();

        this.scene.add(this.hero.mesh);
        this.scene.add(this.particles.mesh);
    }

    update(delta) {
        this.hero.update(delta);
        this.particles.update(delta);
    }
}