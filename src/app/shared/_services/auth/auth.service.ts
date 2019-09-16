import { Injectable } from '@angular/core';
import { UserService } from '../user/user.service';
import { AngularFireAuth } from '@angular/fire/auth';
import { ActivatedRoute, Router } from '@angular/router';
import { of as observableOf,  Observable } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { AppUser } from 'src/app/shared/_models/app-user';
import { auth } from 'firebase/app';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute,
    private router: Router
  ) { 
    this.user$ = afAuth.authState;
  }

  login() {
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);

    this.afAuth.auth
      .signInWithRedirect(
        new auth.GoogleAuthProvider())
        .then(
          () => this.router.navigateByUrl(returnUrl),
          err => console.error(err)
        );
  }

  logout() {
    this.afAuth.auth.signOut();
  }

  get appUser$(): Observable<AppUser> {
    return this.user$.pipe(
      switchMap( user => (user) ? this.userService.get(user.uid) : observableOf(null) )
    );
  }

}
