import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-cart',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.scss']
})
export class CartComponent {
  cartItems = [
    // Sample cart data - replace with actual cart service
    { id: 1, name: 'Casual Socks', price: 9.99, quantity: 2, imageUrl: 'assets/products/sock1.jpg' },
    { id: 2, name: 'Athletic Socks', price: 12.99, quantity: 1, imageUrl: 'assets/products/sock2.jpg' }
  ];

  get cartTotal(): number {
    return this.cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  }
}
