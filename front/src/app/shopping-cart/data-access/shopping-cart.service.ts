import { computed, Injectable, signal } from "@angular/core";
import { ICartItem } from "./shopping-cart.model";

@Injectable({
    providedIn: "root"
}) export class ShoppingCartService {

    constructor() {
        let cartItems = this.getCartFromLocalStore()

        this._cartItems.set( cartItems )
    }
    
    private readonly _cartItems = signal<ICartItem[]>([]);

    public readonly cartItems = this._cartItems.asReadonly();

    private readonly SHOPPING_CART_STORE_NAME = 'shooping-cart'

    public add( productId: number ) {

        const productItem = { productId, count: 1, createdAt: new Date() }

        let cartItems: ICartItem[] = this._cartItems() 

        cartItems.push( productItem )
        
        this.setShoppingCart( cartItems )
    }

    public remove( productId: number ) {

        let cartItems: ICartItem[] = this._cartItems()

        let productToRemoveIndex = cartItems.findIndex( productItem => productItem.productId === productId )
        
        if ( productToRemoveIndex !== -1 ) {
            cartItems.splice( productToRemoveIndex, 1 )

            this.setShoppingCart( cartItems )
        }
    }

    public isProductInCart( productId: number ): boolean {
        return !!this._cartItems()?.some( productIem => productIem.productId === productId )
    }

    private getCartFromLocalStore(): ICartItem[] {
        let cartStore = localStorage.getItem( this.SHOPPING_CART_STORE_NAME )
        
        return cartStore === null ? [] : JSON.parse( cartStore )
    }

    private setShoppingCart( cartItems: ICartItem[] ) {
        localStorage.setItem( this.SHOPPING_CART_STORE_NAME, JSON.stringify( cartItems ) )

        this._cartItems.update( cartItems => [ ...cartItems ] )
    }
}