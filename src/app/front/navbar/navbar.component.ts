import { ActivatedRoute } from '@angular/router';
import { Component, OnInit, HostListener } from '@angular/core';
import { AppUser } from 'src/app/shared/_models/app-user';
import { ShoppingCart } from 'src/app/shared/_models/shopping-cart';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/shared/_services/auth/auth.service';
import { ShoppingCartService } from 'src/app/shared/_services/shopping-cart/shopping-cart.service';

@Component({
  selector: 'navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit {
  appUser: AppUser;
  collapse: boolean = true;
  cart$: Observable<ShoppingCart>;
  category: string;
  viewPortWidth: number = window.innerWidth;

  constructor(
    private auth: AuthService,
    private route: ActivatedRoute,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    this.cart$ = await this.shoppingCartService.getCart();
    this.auth.appUser$.subscribe(appUser => this.appUser = appUser);
    this.route.queryParams.subscribe(params => this.category = params['category'] );
  }

  @HostListener("window:resize", [])
  resize() {
    this.viewPortWidth = window.innerWidth;
  }

  logout() {
    this.auth.logout();
  }
}
