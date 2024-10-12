import {
  Component,
  computed,
  inject,
} from "@angular/core";
import { RouterModule } from "@angular/router";
import { SplitterModule } from 'primeng/splitter';
import { ToolbarModule } from 'primeng/toolbar';
import { PanelMenuComponent } from "./shared/ui/panel-menu/panel-menu.component";
import { BadgeModule } from 'primeng/badge';
import { ShoppingCartService } from "./shopping-cart/data-access/shopping-cart.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.scss"],
  standalone: true,
  imports: [RouterModule, SplitterModule, ToolbarModule, PanelMenuComponent, BadgeModule],
})
export class AppComponent {
  title = "ALTEN SHOP";

  private readonly shoppingCartService = inject( ShoppingCartService )

  public totalProductsInCart = computed( () => this.shoppingCartService.cartItems()?.length || 0 )
}
