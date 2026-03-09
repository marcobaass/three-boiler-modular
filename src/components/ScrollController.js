import { eventBus } from "../core/EventBus.js";

export class ScrollController {
    constructor() {
        window.addEventListener('scroll', () => {
            requestAnimationFrame(() => {
                eventBus.emit('scroll', this.getScrollProgress());
            })            
        });
    }

    getScrollProgress() {
        return window.scrollY / window.innerHeight;
    }
}