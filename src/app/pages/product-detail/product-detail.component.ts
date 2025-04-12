import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.scss']
})
export class ProductDetailComponent implements OnInit {
  productId!: number;
  product: any = {};

  constructor(private route: ActivatedRoute) {}

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.productId = +params['id'];
      // In a real app, you would fetch product details from a service
      this.loadProductDetails();
    });
  }

  loadProductDetails(): void {
    // Mock data - replace with actual service call
    this.product = {
      id: this.productId,
      name: `Product ${this.productId}`,
      price: 9.99 + this.productId,
      description: 'Comfortable socks for everyday wear',
      imageUrl: 'assets/products/sock1.jpg'
    };
  }
}
