import { Component, computed, inject, OnInit } from "@angular/core";
import { ShoppingCartService } from '../../data-access/shopping-cart.service'
import { ProductsService } from "../../../products/data-access/products.service";
import { TableModule } from "primeng/table";
import { CommonModule, DatePipe } from "@angular/common";
@Component({
  selector: "app-product-list",
  templateUrl: "./shopping-cart-products.component.html",
  styleUrls: ["./shopping-cart-products.component.scss"],
  standalone: true,
  imports: [ TableModule, CommonModule, DatePipe ]
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
                    return{ ...product, addedAt: this.datePipe.transform( cartItem.createdAt, 'dd-MM-YY HH:mm' ) }
            } )
    ) )

    public tableColumns = [
        { header: "Name", field: "name" },
        { header: "Catégorie", field: "category" },
        { header: "Déscription", field: "description" },
        { header: "Prix", field: "price" },
        { header: "Date d'ajout", field: "addedAt" },
    ]

    ngOnInit(): void {
        this.productService.get().subscribe()
    }
}
