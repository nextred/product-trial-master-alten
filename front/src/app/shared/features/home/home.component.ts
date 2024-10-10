import { Component, inject } from "@angular/core";
import { RouterLink } from "@angular/router";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { TagModule } from "primeng/tag";
import { ProductsService } from "app/products/data-access/products.service";

@Component({
  selector: "app-home",
  templateUrl: "./home.component.html",
  styleUrls: ["./home.component.scss"],
  standalone: true,
  imports: [CardModule, RouterLink, ButtonModule, TagModule],
})
export class HomeComponent {
  public readonly appTitle = "ALTEN SHOP";

  private readonly productsService = inject(ProductsService);

  public readonly products = this.productsService.products;

  public readonly INVENTORY_STATUS_SEVERTY_MAP = {
    INSTOCK: 'success' as const,
    LOWSTOCK: 'warning' as const,
    OUTOFSTOCK: 'danger' as const,
  }

  ngOnInit() {
    this.productsService.get().subscribe();
  } 
}


