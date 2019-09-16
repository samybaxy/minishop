import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/_models/shopping-cart';

@Component({
  selector: 'shopping-cart-summary',
  templateUrl: './shopping-cart-summary.component.html',
  styleUrls: ['./shopping-cart-summary.component.scss']
})
export class ShoppingCartSummaryComponent {
  @Input('cart') cart: ShoppingCart;
}