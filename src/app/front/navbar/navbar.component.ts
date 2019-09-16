import { Component } from '@angular/core';
import { AuthService } from 'src/app/shared/_services/auth/auth.service';
import { ShoppingCartService } from 'src/app/shared/_services/shopping-cart/shopping-cart.service';
import { AppUser } from 'src/app/shared/_models/app-user';
import { ShoppingCart } from 'src/app/shared/_models/shopping-cart';
import { Observable } from 'rxjs';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  appUser: AppUser;
  collapse: boolean = true;
  cart$: Observable<ShoppingCart>;

  constructor(
    private auth: AuthService,
    shoppingCartService: ShoppingCartService
  ) {
    shoppingCartService.getCart().then(cart => this.cart$ = cart);
    auth.appUser$.subscribe(appUser => this.appUser = appUser);
  }

  logout() {
    this.auth.logout();
  }
}
