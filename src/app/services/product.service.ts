import { HttpClient, HttpErrorResponse, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { catchError, Observable, tap, throwError } from "rxjs";
import { IProduct } from "../models/products";
import { ErrorService } from "./error.service";

@Injectable({
	providedIn: 'root'
})
export class ProductsService {

	constructor(
		private http: HttpClient,
		private errorService: ErrorService
	) { }

	products: IProduct[] = []

	getAll(): Observable<IProduct[]> {
		return this.http.get<IProduct[]>('https://fakestoreapi.com/products', {
			params: new HttpParams({
				fromObject: {
					limit: 5
				}
			})
		}).pipe(
			tap(products => this.products = products),
			catchError(this.errorHendler.bind(this))
		)
	}

	create(product: IProduct): Observable<IProduct> {
		return this.http.post<IProduct>('https://fakestoreapi.com/products', product)
			.pipe(
				tap(product => this.products.push(product))
			)
	}

	private errorHendler(error: HttpErrorResponse) {
		this.errorService.handle(error.message)
		return throwError(() => error.message)
	}
}