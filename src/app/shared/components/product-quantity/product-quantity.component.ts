import { Component, Input } from '@angular/core';
import { ShoppingCart } from 'src/app/shared/_models/shopping-cart';
import { Product } from 'src/app/shared/_models/product';
import { ShoppingCartService } from 'src/app/shared/_services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'product-quantity',
  templateUrl: './product-quantity.component.html',
  styleUrls: ['./product-quantity.component.scss']
})
export class ProductQuantityComponent {
  @Input('product') product: Product;
  @Input('shopping-cart') shoppingCart: ShoppingCart;

  constructor(private cartService: ShoppingCartService) { }

  addToCart() {
    this.cartService.addToCart(this.product);
  }

  removeFromCart() {
    this.cartService.removeFromCart(this.product);
  }
}
