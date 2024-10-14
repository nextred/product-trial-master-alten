import { Component, computed, inject, signal } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TagModule } from "primeng/tag";
import { PaginatorModule } from 'primeng/paginator';
import { SkeletonModule } from 'primeng/skeleton';
import { ProductsService } from "app/products/data-access/products.service";
import { Product } from "app/products/data-access/product.model";
import { ShoppingCartService } from "app/shopping-cart/data-access/shopping-cart.service";
import { CommonModule } from "@angular/common";

interface PageEvent {
  first?: number | undefined;
  rows?: number | undefined;
  page?: number | undefined;
  pageCount?: number | undefined;
}

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CommonModule, CardModule, RouterLink, ButtonModule, TagModule, PaginatorModule, SkeletonModule],
})
export class HomeComponent {
  public readonly appTitle = "ALTEN SHOP";

  private readonly productsService = inject(ProductsService);

  public readonly products = this.productsService.products;

  private readonly shoppingCartService = inject( ShoppingCartService )

  public readonly INVENTORY_STATUS_SEVERTY_MAP = {
    INSTOCK: 'success' as const,
    LOWSTOCK: 'warning' as const,
    OUTOFSTOCK: 'danger' as const,
  }

  isProductInCart( product: Product ): boolean {
    return this.shoppingCartService.isProductInCart( product.id )
  }

  addProductToCart( product: Product ) {
    this.shoppingCartService.add( product.id )
  }

  removeProductFromCart( product: Product ) {
    this.shoppingCartService.remove( product.id )
  }

  /***** pagination section ******/

  // products per page
  rows: number = 8;
  
  // index of current page first item
  public first = signal<number>(0);

  // page number ( start from 0)
  public page = signal<number>(0);

  productsPerPage = computed( () => this.productsService.productsPerPage()[this.page()] )

  totalRecords = this.productsService.productsTotal

  onPageChange(event: PageEvent) {
    if ( event.first !== undefined )
      this.first.set(event.first);

    if ( event.page !== undefined )
      this.page.set(event.page)

    if ( !this.productsPerPage() )
      this.productsService.getByPage( { limit: this.rows, offset: this.first(), page: this.page() }).subscribe()
  }
  
  ngOnInit() {
    this.productsService.getByPage( { limit: this.rows, offset: this.first(), page: this.page() }).subscribe();
  } 
}


