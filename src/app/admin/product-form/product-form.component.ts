import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ProductService } from 'src/app/shared/_services/product/product.service';
import { CategoryService } from 'src/app/shared/_services/category/category.service';
import { Product } from 'src/app/shared/_models/product';
import { take } from 'rxjs/operators';


@Component({
  selector: 'app-product-form',
  templateUrl: './product-form.component.html',
  styleUrls: ['./product-form.component.css']
})
export class ProductFormComponent {
  categories$;
  product = { title: '', price: null, category: '', imageUrl: ''};
  id: string;

  constructor(
    categoryService: CategoryService,
    private router: Router,
    private route: ActivatedRoute,
    private productService: ProductService
  ) { 
    this.categories$ = categoryService.getAll();
    
    this.id = this.route.snapshot.params['id'];
    if (this.id) this.productService.get(this.id).pipe(take(1)).subscribe(p => this.product = p);
  }

  save(product: Product) {
    if (this.id) this.productService.update(this.id, product);
    else this.productService.create(product);

    this.router.navigate(['/admin/products']);
  }

  delete() {
    if (!confirm('Are you sure you want to delete this product?')) return;

    this.productService.delete(this.id);
    this.router.navigate(['/admin/products']);
  }
}