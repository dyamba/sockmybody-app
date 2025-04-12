import { Injectable, ElementRef, OnDestroy } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ParallaxService implements OnDestroy {
  private scrollListeners: Map<Element, () => void> = new Map();

  constructor() { }

  /**
   * Initialize parallax effect for elements
   * @param container Container ElementRef that contains parallax elements
   * @param config Configuration options
   */
  initParallax(
    container: ElementRef,
    config: {
      selectors: { slow: string; medium: string; fast: string };
      factors: { slow: number; medium: number; fast: number };
    } = {
      selectors: { slow: '.parallax-element-slow', medium: '.parallax-element-medium', fast: '.parallax-element-fast' },
      factors: { slow: 0.2, medium: 0.4, fast: 0.6 }
    }
  ): void {
    if (!container || !container.nativeElement) {
      return;
    }

    const containerEl = container.nativeElement as Element;
    const slowElements = containerEl.querySelectorAll(config.selectors.slow);
    const mediumElements = containerEl.querySelectorAll(config.selectors.medium);
    const fastElements = containerEl.querySelectorAll(config.selectors.fast);

    // Throttle scroll function to improve performance
    const throttledScrollHandler = this.throttle(() => {
      this.updateParallaxElements(slowElements, config.factors.slow);
      this.updateParallaxElements(mediumElements, config.factors.medium);
      this.updateParallaxElements(fastElements, config.factors.fast);
    }, 10);

    // Add scroll event listener
    const scrollHandler = () => throttledScrollHandler();
    window.addEventListener('scroll', scrollHandler);

    // Store the listener so it can be removed later
    this.scrollListeners.set(containerEl, scrollHandler);

    // Initial positioning
    throttledScrollHandler();
  }

  /**
   * Remove parallax effect from container
   * @param container Container ElementRef to remove parallax from
   */
  removeParallax(container: ElementRef): void {
    if (!container || !container.nativeElement) {
      return;
    }

    const containerEl = container.nativeElement as Element;
    const scrollHandler = this.scrollListeners.get(containerEl);

    if (scrollHandler) {
      window.removeEventListener('scroll', scrollHandler);
      this.scrollListeners.delete(containerEl);
    }
  }

  /**
   * Clean up all event listeners
   */
  ngOnDestroy(): void {
    this.scrollListeners.forEach((handler, _) => {
      window.removeEventListener('scroll', handler);
    });
    this.scrollListeners.clear();
  }

  /**
   * Update parallax elements based on scroll position
   * @param elements NodeList of elements to update
   * @param factor Parallax factor
   */
  private updateParallaxElements(elements: NodeListOf<Element>, factor: number): void {
    const scrollPosition = window.pageYOffset;

    elements.forEach(element => {
      const htmlElement = element as HTMLElement;
      const rect = htmlElement.getBoundingClientRect();
      const elementOffset = rect.top + scrollPosition;
      const windowHeight = window.innerHeight;

      // Calculate the distance from the middle of the viewport to the middle of the element
      const distanceFromCenter = (elementOffset - scrollPosition + rect.height / 2) - windowHeight / 2;

      // Apply the transform with the parallax factor
      const translateY = distanceFromCenter * factor;

      // Only apply parallax if element is in view (with some buffer)
      if (rect.top < windowHeight + 100 && rect.bottom > -100) {
        htmlElement.style.transform = `translateY(${translateY}px)`;
      }
    });
  }

  /**
   * Throttle function for better performance
   * @param func Function to throttle
   * @param delay Delay in milliseconds
   * @returns Throttled function
   */
  private throttle(func: Function, delay: number): () => void {
    let lastCall = 0;
    return function() {
      const now = Date.now();
      if (now - lastCall > delay) {
        lastCall = now;
        func();
      }
    };
  }
}
