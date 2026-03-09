🧠 Scenario

Client wants:

Interactive 3D hero section
MSDF typography
Particle dissolve
Scroll-driven transitions
Mobile fallback
Clean performance

Studio constraint:

Must be modular

Must be reusable

Must allow designer iteration

Must scale to multiple pages

🏗 Folder Structure (Realistic Studio Setup)
src/
  core/
    App.js
    Renderer.js
    Time.js
    Sizes.js
    EventBus.js

  world/
    World.js
    Camera.js
    Lights.js
    ExperienceScene.js

  systems/
    AnimationManager.js
    AssetManager.js
    InteractionManager.js

  components/
    HeroText.js
    ParticleSystem.js
    ScrollController.js

  shaders/
    heroText/
      vertex.glsl
      fragment.glsl
    particles/
      vertex.glsl
      fragment.glsl

  utils/
    math.js
    easing.js
    constants.js

  main.js

Notice something:

No chaos.
No 800-line main.js.
Everything has responsibility.

🧩 Core Layer (Foundation)
App.js

Entry brain of the system.

Responsibilities:

create renderer

create world

connect systems

start update loop

export class App {
  constructor() {
    this.renderer = new Renderer()
    this.world = new World()
    this.animationManager = new AnimationManager()
  }

  update(delta) {
    this.animationManager.update(delta)
    this.world.update(delta)
    this.renderer.render(this.world.scene, this.world.camera)
  }
}

This file is small.
That’s intentional.

🎥 World Layer (Scene Composition)
World.js

Responsible for assembling the scene.

export class World {
  constructor() {
    this.scene = new THREE.Scene()
    this.camera = new Camera()
    this.hero = new HeroText()
    this.particles = new ParticleSystem()

    this.scene.add(this.hero.mesh)
    this.scene.add(this.particles.mesh)
  }

  update(delta) {
    this.hero.update(delta)
    this.particles.update(delta)
  }
}

World = composition, not logic dumping.

🧱 Component Layer (Feature Units)
HeroText.js

This is where MSDF logic lives.

Responsibilities:

build geometry

create shader material

expose uniforms

update dissolve progress

export class HeroText {
  constructor() {
    this.uniforms = {
      uTime: { value: 0 },
      uProgress: { value: 0 }
    }

    this.material = new THREE.ShaderMaterial({
      uniforms: this.uniforms,
      vertexShader,
      fragmentShader,
      transparent: true
    })

    this.mesh = new THREE.Mesh(geometry, this.material)
  }

  setProgress(value) {
    this.uniforms.uProgress.value = value
  }

  update(delta) {
    this.uniforms.uTime.value += delta
  }
}

Notice:

No global references

No hard-coded scroll logic

It’s isolated

Studios LOVE isolation.

🖱 Interaction System

Instead of putting scroll inside HeroText:

You build:

ScrollController.js
export class ScrollController {
  constructor(heroText) {
    this.heroText = heroText

    window.addEventListener('scroll', () => {
      const progress = window.scrollY / window.innerHeight
      this.heroText.setProgress(progress)
    })
  }
}

Now:

Scroll logic ≠ text logic.

Separation = maintainability.

⏱ Time Management (Important)

Studios never rely on random delta calculations.

They build:

Time.js
export class Time {
  constructor() {
    this.clock = new THREE.Clock()
  }

  update() {
    this.delta = this.clock.getDelta()
    this.elapsed = this.clock.getElapsedTime()
  }
}

Then App uses it consistently.

📦 Asset Manager

All fonts, textures, GLTFs go through:

AssetManager.

Never loaded randomly inside components.

Why?

Because:

You need loading states

You need progress indicators

You need preloading for transitions