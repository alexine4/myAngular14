import { Component, OnInit } from '@angular/core';
import { IProduct } from './models/products';
import { ProductsService } from './services/product.service';
import { Observable, tap } from 'rxjs';
import { ModalService } from './services/modal.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'Angular App'
  loading = false
  term = ''

  // products$: Observable<IProduct[]>

  constructor(
    public productsService: ProductsService,
    public modalService: ModalService
  ) { }

  ngOnInit(): void {
    this.loading = true
    /* this.products$ = this.productsService.getAll().pipe(
      tap(() => this.loading = false)
    ) */
    this.productsService.getAll().subscribe(
      () => {
        this.loading = false
      }
    )
  }

}
