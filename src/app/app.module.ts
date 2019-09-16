import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SharedModule } from './shared/shared.module';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AngularFireModule } from '@angular/fire';
import { AngularFirestoreModule } from '@angular/fire/firestore';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';
import { CustomFormsModule } from 'ng2-validation';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';

import { environment } from '../environments/environment';
import { AppComponent } from './app.component';
import { HomeComponent } from './front/home/home.component';
import { NavbarComponent } from './front/navbar/navbar.component';
import { LoginComponent } from './front/login/login.component';
import { ProductsComponent } from './front/products/products.component';
import { ShoppingCartComponent } from './front/shopping-cart/shopping-cart.component';
import { CheckOutComponent } from './front/check-out/check-out.component';
import { OrderSuccessComponent } from './front/order-success/order-success.component';
import { MyOrdersComponent } from './front/my-orders/my-orders.component';
import { ProductFilterComponent } from './front/products/product-filter/product-filter.component';
import { AdminProductsComponent } from './admin/admin-products/admin-products.component';
import { AdminOrdersComponent } from './admin/admin-orders/admin-orders.component';
import { ProductFormComponent } from './admin/product-form/product-form.component';
import { ShoppingCartSummaryComponent } from './front/shopping-cart-summary/shopping-cart-summary.component';
import { ShippingFormComponent } from './front/shipping-form/shipping-form.component';
import { OrderDetailComponent } from './front/my-orders/order-detail/order-detail.component';
import { ServiceWorkerModule } from '@angular/service-worker';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    ProductsComponent,
    ShoppingCartComponent,
    CheckOutComponent,
    OrderSuccessComponent,
    MyOrdersComponent,
    ProductFilterComponent,
    AdminProductsComponent,
    AdminOrdersComponent,
    ProductFormComponent,
    ShoppingCartSummaryComponent,
    ShippingFormComponent,
    OrderDetailComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    SharedModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase), 
    AngularFirestoreModule,
    AngularFireAuthModule,
    NgbModule,
    FormsModule,
    CustomFormsModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production })
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
