import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/shared/_services/auth/auth.service';
import { OrderService } from 'src/app/shared/_services/order/order.service';
import { Order, OrderInterface } from 'src/app/shared/_models/order';
import { ShoppingCart } from 'src/app/shared/_models/shopping-cart';

@Component({
  selector: 'shipping-form',
  templateUrl: './shipping-form.component.html',
  styleUrls: ['./shipping-form.component.scss']
})
export class ShippingFormComponent implements OnInit, OnDestroy {
  @Input('cart') cart: ShoppingCart;
  shipping = {
    name: '',
    addressLine1: '',
    addressLine2: '',
    city: ''
  };
  
  userId: string;
  userSubscription: Subscription;

  constructor(
    private router: Router,
    private authService: AuthService,
    private orderService: OrderService
  ) { }

  ngOnInit() {
    this.userSubscription = this.authService.user$.subscribe(user => this.userId = user.uid);
  }

  async placeOrder() {
    let orderInstance = new Order(this.userId, this.shipping, this.cart);
    let order = this.orderObject(orderInstance);

    let result = await this.orderService.placeOrder(order);
    this.router.navigate(['/order-success', result.id])
  }

  orderObject(order: OrderInterface) {
    return {
      datePlaced: order.datePlaced,
      userId: order.userId,
      items: order.items,
      shipping: order.shipping,
      totalPrice: order.totalPrice
    }
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }

}
