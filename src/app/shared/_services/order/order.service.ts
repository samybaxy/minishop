import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { ShoppingCartService } from '../shopping-cart/shopping-cart.service';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { OrderInterface } from 'src/app/shared/_models/order';

@Injectable({
  providedIn: 'root'
})
export class OrderService {

  constructor(
    private firestore: AngularFirestore, 
    private shoppingCartService: ShoppingCartService
  ) { }

  async placeOrder(order: OrderInterface) {
    let result = await this.firestore.collection('orders').add(order);
    this.shoppingCartService.clearCart();
    return result;
  }

  getOrder(id: string): Observable<OrderInterface> {
    return this.firestore.doc<OrderInterface>(`orders/${id}`).valueChanges();
  }

  getOrders() {
    return this.firestore.collection('orders').valueChanges();
  }

  getOrdersByUser(userId: string):Observable<OrderInterface[]> {
    return this.firestore
      .collection<OrderInterface>('orders', ref => ref.where("userId", "==", userId ))
      .snapshotChanges()
      .pipe(
        map(data => data.map(ref => ({ $key: ref.payload.doc.id, ...ref.payload.doc.data() })))
      )
  }
}
