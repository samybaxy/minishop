import { ShoppingCart } from './shopping-cart';

export class Order {
  datePlaced: number;
  items: any[];
  totalPrice: number;

  constructor(public userId: string, public shipping: any, shoppingCart: ShoppingCart) {
    this.datePlaced = new Date().getTime();
    this.totalPrice = shoppingCart.totalPrice;

    this.items = shoppingCart.items.map(i => {
      return {
        product: {
          title: i.title,
          imageUrl: i.imageUrl,
          price: i.price
        },
        quantity: i.quantity,
        totalPrice: i.totalPrice
      }
    })
  }
}

export interface OrderInterface {
  $key? : string;
  datePlaced: number;
  userId: string;
  items: item[];
  shipping: {
    addressLine1: string;
    addressLine2: string;
    city: string;
    name: string;
  },
  totalPrice: number;
}

interface item {
  quantity: number;
  totalPrice: number;
  product: {
    title: string;
    price: number;
    imageUrl: string;
  }
}