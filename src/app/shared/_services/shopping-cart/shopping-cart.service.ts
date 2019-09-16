import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCartItem } from 'src/app/shared/_models/shopping-cart-item';
import { Product } from 'src/app/shared/_models/product';
import { ShoppingCart } from 'src/app/shared/_models/shopping-cart';
import { Observable } from 'rxjs';
import { take, map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ShoppingCartService {

  constructor(private firestore: AngularFirestore) { }

  async getCart(): Promise<Observable<ShoppingCart>> {
    let cartId = await this.getOrCreateCartId();
    return this.firestore.doc(`shopping-cart/${cartId}`)
      .valueChanges()
      .pipe(map((items: any) => new ShoppingCart(items)))
  }

  addToCart(product: Product) {
    if (!this.getCartId) this.getCart();

    this.updateItem(product, 1);
  }

  removeFromCart(product: Product) {
    this.updateItem(product, -1);
  }

  async clearCart() {
    const cartId = this.getCartId();
    this.firestore.doc(`shopping-cart/${cartId}`).delete();
    localStorage.removeItem('cartId');
  }

  private createCart() {
    return this.firestore
      .collection('shopping-cart')
      .add({ dateCreated: new Date().getTime() })
  }

  private getCartId() {
    return localStorage.getItem('cartId');
  }

  private async getOrCreateCartId(): Promise<string> {
    let cartId = this.getCartId();
    if (cartId) return cartId;

    let result = await this.createCart();
    localStorage.setItem('cartId', result.id);
    return result.id;
  }

  private async updateItem(product: Product, change: number) {
    const cartId = await this.getOrCreateCartId();
    let item$ = this.firestore.doc<ShoppingCartItem>(`shopping-cart/${cartId}`);

    item$.valueChanges().pipe(take(1)).subscribe(
      item => {
        const quantity = ( item && item[product.$key] ) ? item[product.$key].quantity + change : 1;
        if (quantity === 0) item$.update({ [product.$key]: { quantity } })
        else item$.update({ 
            [product.$key] : { 
              title: product.title,
              price: product.price,
              imageUrl: product.imageUrl,
              quantity 
            }
        });
      }),
      err => console.error(err);  
    
    // items.snapshotChanges()
    //   .pipe(take(1))
    //   .subscribe(
    //     item => {
    //       if (item.payload.exists) {
    //         const payload = item.payload.data();
    //         const quantity = ( payload.quantity ) ? payload.quantity + change : 1;
    //         items.update({ product, quantity, key: product.key });
    //       }
    //       else this.createDocumentAndUpdate(cartId, product, change);
    //     },
    //     err => console.error("Error: ", err)
    //   );
  }

  // private async createDocumentAndUpdate(cartId: string, product: Product, change: number) {
  //   await this.firestore.collection(`shopping-cart/${cartId}/items`).add({ [product.key]: null });
  //   this.updateItem(cartId, product, change);
  // }
}