import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-orders',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './orders.component.html',
  styleUrls: ['./orders.component.scss']
})
export class OrdersComponent {
  orders = [
    {
      id: '12345',
      date: '2023-05-15',
      status: 'Delivered',
      total: 22.97,
      items: [
        { name: 'Casual Socks', quantity: 2, price: 9.99 },
        { name: 'Athletic Socks', quantity: 1, price: 12.99 }
      ]
    },
    {
      id: '12346',
      date: '2023-06-01',
      status: 'Processing',
      total: 54.95,
      items: [
        { name: 'Wool Socks', quantity: 3, price: 14.99 },
        { name: 'Ankle Socks', quantity: 2, price: 4.99 }
      ]
    }
  ];

  constructor() {}
}
