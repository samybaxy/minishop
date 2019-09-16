import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ProductsComponent } from './front/products/products.component';
import { ShoppingCartComponent } from './front/shopping-cart/shopping-cart.component';
import { LoginComponent } from './front/login/login.component';
import { CheckOutComponent } from './front/check-out/check-out.component';
import { OrderSuccessComponent } from './front/order-success/order-success.component';
import { MyOrdersComponent } from './front/my-orders/my-orders.component';
import { OrderDetailComponent } from './front/my-orders/order-detail/order-detail.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';

import { AuthGuard } from 'src/app/shared/_guards/auth/auth.guard';
import { AdminAuthGuard } from 'src/app/shared/_guards/admin/admin-auth.guard';

const routes: Routes = [
  {
    path: '',
    component: ProductsComponent
  },
  {
    path: 'products',
    component: ProductsComponent
  },
  {
    path: 'shopping-cart',
    component: ShoppingCartComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },

  {
    path: 'check-out',
    component: CheckOutComponent,
    canActivate: [AuthGuard] 
  },
  {
    path: 'order-success/:id',
    component: OrderSuccessComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-orders',
    component: MyOrdersComponent,
    canActivate: [AuthGuard]
  },
  {
    path: 'my-orders/order-details/:id',
    component: OrderDetailComponent,
    canActivate: [AuthGuard]
  },

  {
    path: 'admin/products/new',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products/:id',
    component: ProductFormComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/products',
    component: AdminProductsComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  },
  {
    path: 'admin/orders',
    component: AdminOrdersComponent,
    canActivate: [AuthGuard, AdminAuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
