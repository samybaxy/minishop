import { Component, Input } from '@angular/core';
import { Product } from 'src/app/shared/_models/product';
import { ShoppingCart } from 'src/app/shared/_models/shopping-cart';
import { ShoppingCartService } from 'src/app/shared/_services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.css']
})
export class ProductCardComponent {
  @Input('product') product: Product;
  @Input('show-actions') showActions = true;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }
}
