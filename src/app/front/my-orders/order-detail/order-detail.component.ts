import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { OrderInterface } from 'src/app/shared/_models/order';
import { OrderService } from 'src/app/shared/_services/order/order.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-order-detail',
  templateUrl: './order-detail.component.html',
  styleUrls: ['./order-detail.component.scss']
})
export class OrderDetailComponent implements OnInit {
  order$: Observable<OrderInterface>;
  
  constructor(
    private route: ActivatedRoute,
    private orderService: OrderService) { }

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.order$ = this.orderService.getOrder(id);
  }

}
