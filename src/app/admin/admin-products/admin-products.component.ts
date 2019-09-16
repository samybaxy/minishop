import { Component, OnDestroy, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Product } from 'src/app/shared/_models/product';
import { ProductService } from 'src/app/shared/_services/product/product.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-admin-products',
  templateUrl: './admin-products.component.html',
  styleUrls: ['./admin-products.component.css']
})
export class AdminProductsComponent implements OnDestroy {
  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  products: Product[];
  subscription: Subscription;
  displayedColumns = ['position','title', 'price', 'key'];
  dataSource;

  constructor(private productService: ProductService) {
    this.subscription = this.productService.getAll()
      .subscribe(products => {
         this.products = products.map((x, i) => {
           x.no = ++i;
           return x;
         });

         this.dataSource = new MatTableDataSource(this.products);
         this.dataSource.paginator = this.paginator;
         this.dataSource.sort = this.sort;
      });
  }

  filter(query: string) {
    query = query.trim();
    query = query.toLowerCase();

    this.dataSource.filter = query;
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
