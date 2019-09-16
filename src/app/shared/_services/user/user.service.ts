import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { AppUser } from 'src/app/shared/_models/app-user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }
    save(user: firebase.User) {
      this.firestore
        .collection('users')
        .doc(user.uid)
        .set({
          name: user.displayName,
          email: user.email,
          isAdmin: false
        })
    }

  get(uid: string) {
    return this.firestore
      .collection('users')
      .doc<AppUser>(uid)
      .valueChanges();
  }

}
