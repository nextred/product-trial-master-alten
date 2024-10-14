import { Component, computed, inject, OnInit } from "@angular/core";
import { ShoppingCartService } from '../../data-access/shopping-cart.service'
import { ProductsService } from "../../../products/data-access/products.service";
import { TableModule } from "primeng/table";
import { CommonModule, DatePipe } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { InputNumberModule } from "primeng/inputnumber";
@Component({
  selector: "app-shopping-cart",
  templateUrl: "./shopping-cart-products.component.html",
  styleUrls: ["./shopping-cart-products.component.scss"],
  standalone: true,
  imports: [ TableModule, CommonModule, DatePipe, FormsModule, InputNumberModule ]
})
export class ShoppingCartProductsComponent implements OnInit {
    
    private readonly productService = inject( ProductsService )

    private readonly shoppingCartService = inject( ShoppingCartService )

    private readonly products = this.productService.products

    public datePipe = new DatePipe( navigator.language )

    public readonly cartProducts = computed( () => (
        this.shoppingCartService
            .cartItems()
            ?.map( cartItem => {
                let product = this.products().find( product => cartItem.productId === product.id ) 

                if ( product )
                    return{ ...product, addedAt: this.datePipe.transform( cartItem.createdAt, 'dd-MM-YY HH:mm' ), count: cartItem.count }
            } )
            .filter( item => item !== undefined )
    ) )

    public tableColumns = [
        { header: "Name", field: "name" },
        { header: "Catégorie", field: "category" },
        { header: "Déscription", field: "description" },
        { header: "Quantité", field: 'count', editable: true, type: 'number' },
        { header: "Prix", field: "price" },
        { header: "Date d'ajout", field: "addedAt" },
        { header: "Quantité disponible", field: "quantity" },
    ]

    updateShoppingCart() {
        this.shoppingCartService.update( this.cartProducts().map(
            item => ( {
                productId: item?.id as number,
                count: item?.count as number,
                createdAt: new Date( item?.addedAt as string ) 
            } ) )
        )
    }

    ngOnInit(): void {
        this.productService.get().subscribe()
    }
}
