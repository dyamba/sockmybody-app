import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-products',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.scss']
})
export class ProductsComponent {
  products = [
    // Sample product data - replace with actual data service
    { id: 1, name: 'Casual Socks', price: 9.99, imageUrl: 'assets/products/sock1.jpg' },
    { id: 2, name: 'Athletic Socks', price: 12.99, imageUrl: 'assets/products/sock2.jpg' }
  ];

  constructor() {}
}
