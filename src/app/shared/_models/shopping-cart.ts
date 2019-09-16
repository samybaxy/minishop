import { ShoppingCartItem } from './shopping-cart-item';
import { Product } from './product';

export class ShoppingCart {
  items: ShoppingCartItem[] = [];

  constructor(private itemsMap: { [productId: string]: ShoppingCartItem }) {
    this.itemsMap = itemsMap || {};

    for (let productId in itemsMap) {
      if(!productId.includes('date') && itemsMap[productId].quantity) {
        let item = itemsMap[productId];
        this.items.push(new ShoppingCartItem({ $key: productId, ...item }));
      }
    }
  }

  getQuantity(product: Product) {
    let item = this.itemsMap[product.$key];
    return item ? item.quantity : 0;
  }

  get totalPrice() {
    let sum = 0;
    for (let productId in this.items)
      if(!productId.includes('date'))
        sum += this.items[productId].totalPrice;

      return sum;
  }

  get totalItemsCount() {
    let count = 0;
    for (let productId in this.itemsMap)
      if(!productId.includes('date'))
        count += this.itemsMap[productId].quantity;

    return count;
  }
}