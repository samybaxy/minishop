import { Component, OnInit, HostListener } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/_services/product/product.service';
import { ShoppingCartService } from 'src/app/shared/_services/shopping-cart/shopping-cart.service';
import { Product } from 'src/app/shared/_models/product';
import { ShoppingCart } from 'src/app/shared/_models/shopping-cart';
import { switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-products',
  templateUrl: './products.component.html',
  styleUrls: ['./products.component.css']
})
export class ProductsComponent implements OnInit {
  products: Product[] = [];
  filteredProducts: Product[] = [];
  category: string;
  cart$: Observable<ShoppingCart>;
  viewPortWidth: number = window.innerWidth;

  constructor(
    private route: ActivatedRoute,
    private productService: ProductService,
    private shoppingCartService: ShoppingCartService
  ) { }

  async ngOnInit() {
    // A hack which should be fixed when redux is used
    // for more efficient management of state
    this.cart$ = this.shoppingCartService.getCartObservable();
    this.populateProducts();
  }

  @HostListener("window:resize", [])
  resize() {
    this.viewPortWidth = window.innerWidth;
  }

  private populateProducts() {
    this.productService.getAll()
      .pipe(
        switchMap(
          products => {
            this.products = products;
            return this.route.queryParams;
        }))
        .subscribe(params => {
          this.category = params['category'];
          this.applyFilter();
        });
  }

  private applyFilter() {
    this.filteredProducts = (this.category) ?
      this.products.filter( p => p.category === this.category ) :
      this.products;
  }
}
