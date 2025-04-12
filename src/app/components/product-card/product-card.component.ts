import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

export interface ProductColor {
  name: string;
  code: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  imageUrl: string;
  price: number;
  originalPrice?: number;
  rating?: number;
  reviewCount?: number;
  badge?: string;
  colors?: ProductColor[];
}

@Component({
  selector: 'app-product-card',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss']
})
export class ProductCardComponent implements OnInit {
  @Input() product!: Product;
  @Input() animateOnScroll = true;
  @Output() quickView = new EventEmitter<Product>();
  @Output() cartAdd = new EventEmitter<Product>();
  @Output() wishlistAdd = new EventEmitter<Product>();

  stars: number[] = [];

  constructor() { }

  ngOnInit(): void {
    // Generate stars array based on product rating
    if (this.product.rating) {
      this.stars = Array(Math.round(this.product.rating)).fill(0);
    }
  }

  openQuickView(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    this.quickView.emit(this.product);
  }

  addToCart(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // Add animated effect to button
    const button = event.target as HTMLElement;
    this.addClickAnimation(button);
    this.cartAdd.emit(this.product);
  }

  addToWishlist(event: Event): void {
    event.preventDefault();
    event.stopPropagation();
    // Add animated effect to button
    const button = event.target as HTMLElement;
    this.addClickAnimation(button);
    this.wishlistAdd.emit(this.product);
  }

  /**
   * Add ripple animation effect to button element
   */
  private addClickAnimation(element: HTMLElement): void {
    // Find the actual button if we clicked on a child element
    const button = element.closest('button') || element;

    // Create ripple element
    const ripple = document.createElement('span');
    ripple.classList.add('ripple');
    button.appendChild(ripple);

    // Set ripple position
    const rect = button.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = `${size}px`;

    // Clean up animation
    setTimeout(() => {
      ripple.remove();
    }, 600);
  }
}
