import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { Product } from 'src/app/shared/_models/product';
import { map } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ProductService {

  constructor(private firestore: AngularFirestore) { }

  create(product: Product) {
    return this.firestore.collection('products').add(product);
  }

  getAll(): Observable<any[]> {
    return this.firestore
      .collection('products')
      .snapshotChanges()
      .pipe(
        map( 
          data => data.map(ref => ({ $key: ref.payload.doc.id, ...ref.payload.doc.data() }))
        )
      );
  }

  get(productId: string): Observable<Product> {
    return this.firestore.collection('products').doc<Product>(productId).valueChanges();
  }

  update(productId: string, product: Product) {
    return this.firestore.collection('products').doc(productId).update(product)
  }

  delete(productId: string) {
    return this.firestore.collection('products').doc(productId).delete();
  }
}
