import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./pages/home/home.component').then(c => c.HomeComponent)
  },
  {
    path: 'products',
    loadComponent: () => import('./pages/products/products.component').then(c => c.ProductsComponent)
  },
  {
    path: 'products/:id',
    loadComponent: () => import('./pages/product-detail/product-detail.component').then(c => c.ProductDetailComponent)
  },
  {
    path: 'cart',
    loadComponent: () => import('./pages/cart/cart.component').then(c => c.CartComponent)
  },
  {
    path: 'checkout',
    loadComponent: () => import('./pages/checkout/checkout.component').then(c => c.CheckoutComponent)
  },
  {
    path: 'account',
    loadComponent: () => import('./pages/account/account.component').then(c => c.AccountComponent),
    children: [
      {
        path: 'profile',
        loadComponent: () => import('./pages/account/profile/profile.component').then(c => c.ProfileComponent)
      },
      {
        path: 'orders',
        loadComponent: () => import('./pages/account/orders/orders.component').then(c => c.OrdersComponent)
      }
    ]
  },
  {
    path: '**',
    loadComponent: () => import('./pages/not-found/not-found.component').then(c => c.NotFoundComponent)
  }
];
