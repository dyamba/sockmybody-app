import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

interface GalleryItem {
  id: number;
  title: string;
  category: string;
  image: string;
  size: 'small' | 'medium' | 'large';
}

interface FilterOption {
  label: string;
  value: string;
}

@Component({
  selector: 'app-gallery',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './gallery.component.html',
  styleUrls: ['./gallery.component.scss']
})
export class GalleryComponent implements OnInit, AfterViewInit {
  items: GalleryItem[] = [];
  filteredItems: GalleryItem[] = [];
  filters: FilterOption[] = [];
  currentFilter = 'all';

  constructor(private readonly elementRef: ElementRef) {}

  ngOnInit(): void {
    // Initialize filters
    this.filters = [
      { label: 'All', value: 'all' },
      { label: 'Casual', value: 'casual' },
      { label: 'Athletic', value: 'athletic' },
      { label: 'Statement', value: 'statement' },
      { label: 'Limited', value: 'limited' }
    ];

    // Initialize gallery items
    this.items = [
      {
        id: 1,
        title: 'Urban Landscape',
        category: 'casual',
        image: 'assets/images/image1.jpg',
        size: 'medium'
      },
      {
        id: 2,
        title: 'Geometric Pattern',
        category: 'statement',
        image: 'assets/images/image2.webp',
        size: 'medium'
      },
      {
        id: 3,
        title: 'Athletic Pro',
        category: 'athletic',
        image: 'assets/images/image3.webp',
        size: 'small'
      },
      {
        id: 4,
        title: 'Neon Nights',
        category: 'statement',
        image: 'assets/images/image4.webp',
        size: 'small'
      },
      {
        id: 5,
        title: 'Limited Edition',
        category: 'limited',
        image: 'assets/images/image5.jpg',
        size: 'small'
      },
      {
        id: 6,
        title: 'Pastel Dreams',
        category: 'casual',
        image: 'assets/images/image6.jpg',
        size: 'small'
      },
      {
        id: 7,
        title: 'Sport Comfort',
        category: 'athletic',
        image: 'assets/images/image7.webp',
        size: 'small'
      }
    ];

    this.filteredItems = [...this.items];
  }

  ngAfterViewInit(): void {
    this.setupScrollAnimation();
  }

  setFilter(filter: string): void {
    this.currentFilter = filter;

    if (filter === 'all') {
      this.filteredItems = [...this.items];
    } else {
      this.filteredItems = this.items.filter(item => item.category === filter);
    }
  }

  private setupScrollAnimation(): void {
    const options = {
      root: null,
      rootMargin: '0px',
      threshold: 0.2
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, options);

    const elements = this.elementRef.nativeElement.querySelectorAll('.animate-on-scroll');
    elements.forEach((el: HTMLElement) => {
      observer.observe(el);
    });
  }
}
