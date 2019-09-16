import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/_services/auth/auth.service';
import { OrderService } from 'src/app/shared/_services/order/order.service';
import { OrderInterface } from 'src/app/shared/_models/order';
import { Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-my-orders',
  templateUrl: './my-orders.component.html',
  styleUrls: ['./my-orders.component.css']
})
export class MyOrdersComponent {
  orders$: Observable<OrderInterface[]>;
  constructor(
    private orderService: OrderService,
    private authService: AuthService
  ) {
    this.orders$ = authService.user$.pipe(
      switchMap(user => this.orderService.getOrdersByUser(user.uid))
    );
  }

}
