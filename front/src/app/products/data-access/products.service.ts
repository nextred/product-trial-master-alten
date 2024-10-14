import { Injectable, inject, signal } from "@angular/core";
import { Product } from "./product.model";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of, tap } from "rxjs";

@Injectable({
    providedIn: "root"
}) export class ProductsService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/products";
    
    private readonly _products = signal<Product[]>([]);

    public readonly products = this._products.asReadonly();

    private readonly _productsPerPage = signal<{ [key: number]: Product[]}>({});

    public readonly productsPerPage = this._productsPerPage.asReadonly();

    private readonly _productsTotal = signal<number>(0);

    public readonly productsTotal = this._productsTotal.asReadonly();

    public get(): Observable<Product[]> {
        return this.http.get<Product[]>(this.path).pipe(
            catchError((error) => {
                return this.http.get<Product[]>("assets/products.json");
            }),
            tap((products) => this._products.set(products)),
        );
    }

    public getByPage( params: { limit: number, offset: number, page: number } ) {

        let path = `${this.path}?limit=${params.limit}&offset=${params.offset}`

        return this.http.get<{ products: Product[], total: number }>(path).pipe(
            catchError(( error ) => {
                return new Observable<{ products: Product[], total: number }> ((subscriber) => {
                    this.http.get<Product[]>("assets/products.json").subscribe( (items) => {
                        let total    = items.length
                        let products = items.splice( params.offset, params.limit )

                        setTimeout( () => {
                            subscriber.next({ products, total })
                            subscriber.complete()
                        }, 1000)   

                    })
                })
            }),

            tap( ( item: { products: Product[], total: number } ) => {
                this._productsTotal.set(item.total)
                this._productsPerPage.update(products => ( { ...products, [params.page]: item.products } ))
            })
        );
    }

    public create(product: Product): Observable<boolean> {
        return this.http.post<boolean>(this.path, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => [product, ...products])),
        );
    }

    public update(product: Product): Observable<boolean> {
        return this.http.patch<boolean>(`${this.path}/${product.id}`, product).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => {
                return products.map(p => p.id === product.id ? product : p)
            })),
        );
    }

    public delete(productId: number): Observable<boolean> {
        return this.http.delete<boolean>(`${this.path}/${productId}`).pipe(
            catchError(() => {
                return of(true);
            }),
            tap(() => this._products.update(products => products.filter(product => product.id !== productId))),
        );
    }
}