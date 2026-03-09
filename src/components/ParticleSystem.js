import * as THREE from 'three';
import vertexShader from '../shaders/particles/vertex.glsl';
import fragmentShader from '../shaders/particles/fragment.glsl';

export class ParticleSystem {
    constructor(eventBus, scene) {
        this.eventBus = eventBus;
        this.scene = scene;

        this.uniforms = {
            uTime: { value: 0 },
            uScroll: { value: 0 },
            uMouse: { value: new THREE.Vector2(0, 0) },
        }

        this.init();
        this.addListeners();       
        
        this.targetScroll = 0;
    }

    init() {
        this.createGeometry();
        this.createMaterial();
        this.createPoints();
        this.scene.add(this.points);
    }

    addListeners() {
        this.eventBus.on('scroll:progress', this.onScroll);
        this.eventBus.on('mouse:move', this.onMouseMove);
        this.eventBus.on('section:enter', this.onSectionEnter);
        this.eventBus.on('resize', this.onResize);
    }

    update(delta) {
        this.uniforms.uTime.value += delta;
        // smoothly animate the scroll progress
        this.uniforms.uScroll.value += (this.targetScroll - this.uniforms.uScroll.value);
    }

    destroy() {
        this.scene.remove(this.points);
        this.geometry.dispose();
        this.material.dispose();
        this.eventBus.off('scroll:progress', this.onScroll);
        this.eventBus.off('mouse:move', this.onMouseMove);
        this.eventBus.off('section:enter', this.onSectionEnter);
        this.eventBus.off('resize', this.onResize);
    }

    createGeometry() {
        const count = 2000;
        const positions = new Float32Array(count * 3);

        for (let i = 0; i < count; i++) {
            positions[i * 3 + 0] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 1] = (Math.random() - 0.5) * 10;
            positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        this.geometry = new THREE.BufferGeometry();
        this.geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    }

    createMaterial() {
        this.material = new THREE.ShaderMaterial({
            uniforms: this.uniforms,
            vertexShader: vertexShader,
            fragmentShader: fragmentShader,
            transparent: true,
            blending: THREE.AdditiveBlending,
            depthWrite: false
        })
    }

    createPoints() {
        this.points = new THREE.Points(this.geometry, this.material);
    }

    onScroll = (progress) => {
        this.targetScroll = progress;
    }

    onMouseMove = (mouse) => {
        // Normalizing the mouse position to the range of -1 to 1
        const x = (mouse.x / window.innerWidth) * 2 - 1;
        const y = -(mouse.y / window.innerHeight) * 2 + 1;
        this.uniforms.uMouse.value.set(mouse.x, mouse.y);
    }

    onSectionEnter = () => {
        this.uniforms.uTime.value = 0;
    }
}