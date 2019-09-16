import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(private firestore: AngularFirestore) { }

  getAll() {
    return this.firestore.collection('categories', ref => ref.orderBy('name'))
      .snapshotChanges()
      .pipe(map(data => data.map(
        ref => ({ key: ref.payload.doc.id, ...ref.payload.doc.data()})
      )))
  }

}
