import { Component, OnInit, AfterViewInit, OnDestroy, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ParallaxService } from '../../services/parallax.service';
import { HeroComponent } from '../../components/hero/hero.component';
import { GalleryComponent } from '../../components/gallery/gallery.component';
import { CtaComponent } from '../../components/cta/cta.component';
import { ProductCardComponent, Product } from '../../components/product-card/product-card.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    RouterModule,
    HeroComponent,
    GalleryComponent,
    CtaComponent,
    ProductCardComponent
  ],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit, AfterViewInit, OnDestroy {
  trendingProducts: Product[] = [];
  private observer: IntersectionObserver | null = null;

  constructor(
    private elementRef: ElementRef,
    private parallaxService: ParallaxService
  ) { }

  ngOnInit(): void {
    // Initialize trending products data
    this.trendingProducts = [
      {
        id: '1',
        name: 'Urban Landscape Socks',
        category: 'Casual',
        imageUrl: 'assets/images/image1.jpg',
        price: 14.99,
        rating: 4.8,
        reviewCount: 124,
        badge: 'Bestseller',
        colors: [
          { name: 'Blue', code: '#1e3a8a' },
          { name: 'Green', code: '#166534' },
          { name: 'Black', code: '#171717' }
        ]
      },
      {
        id: '2',
        name: 'Geometric Pattern Crew',
        category: 'Statement',
        imageUrl: 'assets/images/image2.webp',
        price: 12.99,
        originalPrice: 16.99,
        rating: 4.6,
        reviewCount: 89,
        badge: 'Sale',
        colors: [
          { name: 'Purple', code: '#7e22ce' },
          { name: 'Red', code: '#b91c1c' },
          { name: 'Orange', code: '#c2410c' }
        ]
      },
      {
        id: '3',
        name: 'Athletic Pro Performance',
        category: 'Athletic',
        imageUrl: 'assets/images/image3.webp',
        price: 18.99,
        rating: 4.9,
        reviewCount: 203,
        colors: [
          { name: 'Black', code: '#171717' },
          { name: 'White', code: '#f5f5f5' },
          { name: 'Grey', code: '#737373' }
        ]
      },
      {
        id: '4',
        name: 'Neon Nights Collection',
        category: 'Statement',
        imageUrl: 'assets/images/image4.webp',
        price: 15.99,
        rating: 4.7,
        reviewCount: 76,
        badge: 'New',
        colors: [
          { name: 'Pink', code: '#db2777' },
          { name: 'Blue', code: '#2563eb' },
          { name: 'Yellow', code: '#ca8a04' }
        ]
      }
    ];
  }

  ngAfterViewInit(): void {
    // Initialize parallax effects
    this.parallaxService.initParallax(this.elementRef);

    // Initialize animation on scroll
    this.setupScrollAnimation();
  }

  ngOnDestroy(): void {
    // Clean up parallax effects
    this.parallaxService.removeParallax(this.elementRef);

    // Clean up intersection observer
    if (this.observer) {
      this.observer.disconnect();
      this.observer = null;
    }
  }

  /**
   * Set up animation on scroll using Intersection Observer
   */
  private setupScrollAnimation(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    this.observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          // Once the animation is triggered, we don't need to observe it anymore
          this.observer?.unobserve(entry.target);
        }
      });
    }, options);

    // Get all elements with animate-on-scroll class
    const animatedElements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    animatedElements.forEach((el: HTMLElement) => {
      this.observer?.observe(el);
    });
  }

  /**
   * Event handlers for product cards
   */
  openQuickView(product: Product): void {
    console.log('Quick view:', product);
    // Implement quick view modal logic here
  }

  addToCart(product: Product): void {
    console.log('Added to cart:', product);
    // Implement add to cart logic here

    // Show a success animation or notification
    this.showNotification(`${product.name} added to cart!`);
  }

  addToWishlist(product: Product): void {
    console.log('Added to wishlist:', product);
    // Implement add to wishlist logic here

    // Show a success animation or notification
    this.showNotification(`${product.name} added to wishlist!`);
  }

  /**
   * Show a temporary notification
   */
  private showNotification(message: string): void {
    // Create notification element
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    // Add to DOM
    document.body.appendChild(notification);

    // Trigger animation
    setTimeout(() => {
      notification.classList.add('show');
    }, 10);

    // Remove after animation completes
    setTimeout(() => {
      notification.classList.remove('show');
      setTimeout(() => {
        notification.remove();
      }, 300);
    }, 3000);
  }
}
