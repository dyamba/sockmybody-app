import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';

interface Feature {
  icon: string;
  title: string;
  description: string;
  animationDelay: number;
}

@Component({
  selector: 'app-features',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './features.component.html',
  styleUrl: './features.component.scss'
})
export class FeaturesComponent implements OnInit, AfterViewInit {
  features: Feature[] = [];
  isVisible: boolean = false;

  constructor(private readonly elementRef: ElementRef) {}

  ngOnInit(): void {
    this.features = [
      {
        icon: '✨',
        title: 'Luxury Feel',
        description: 'Ultra-soft fabric that embraces your body like a gentle hug.',
        animationDelay: 0
      },
      {
        icon: '🔥',
        title: 'Bold Style',
        description: 'Express yourself from subtle chic to head-turning statement.',
        animationDelay: 100
      },
      {
        icon: '💫',
        title: 'Endless Possibilities',
        description: 'Versatile designs for any mood, any occasion, any fantasy.',
        animationDelay: 200
      },
      {
        icon: '🌈',
        title: 'Playful Energy',
        description: 'Because fashion should be fun, freeing, and fantastically you.',
        animationDelay: 300
      }
    ];
  }

  ngAfterViewInit(): void {
    this.setupScrollObserver();
  }

  private setupScrollObserver(): void {
    // Create an intersection observer for fade-in animations
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.3
    };

    const observer = new IntersectionObserver(this.handleIntersection.bind(this), options);

    // Start observing the features section
    observer.observe(this.elementRef.nativeElement.querySelector('.features'));
  }

  private handleIntersection(entries: IntersectionObserverEntry[]): void {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        this.isVisible = true;
        this.animateFeatureItems();

        // Once animated, unobserve
        const observer = entry.target;
        observer.parentElement?.removeAttribute('data-observed');
      }
    });
  }

  private animateFeatureItems(): void {
    const featureItems = this.elementRef.nativeElement.querySelectorAll('.feature-item');
    this.addAnimationToElements(featureItems);
  }

  private addAnimationToElements(elements: NodeListOf<Element>): void {
    elements.forEach((item: Element, index: number) => {
      setTimeout(() => {
        (item as HTMLElement).classList.add('animate-in');
      }, index * 150);
    });
  }
}
