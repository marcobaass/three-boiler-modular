export class InteractionManager {
  constructor({ eventBus } = {}) {
    this.eventBus = eventBus;

    this.onScroll = this.onScroll.bind(this);
    window.addEventListener('scroll', this.onScroll, { passive: true });

    this.onScroll();

    this.onMouseMove = this.onMouseMove.bind(this);
    window.addEventListener('pointermove', this.onMouseMove, { passive: true });
    this.eventBus.emit('mouse:move', { x: 0, y: 0 });
  }

  onScroll() {
    const progress = window.scrollY / window.innerHeight;
    this.eventBus.emit('scroll:progress', progress);
  }

  onMouseMove(event) {
    const x = (event.clientX / window.innerWidth) * 2 - 1;
    const y = -(event.clientY / window.innerHeight) * 2 + 1;
    this.eventBus.emit('mouse:move', { x, y });
  }

  update(delta) {
    // later: handle mouse/touch events and emit events to eventBus
  }

  destroy() {
    window.removeEventListener('scroll', this.onScroll, { passive: true });
    window.removeEventListener('pointermove', this.onMouseMove, { passive: true });
  }
}
