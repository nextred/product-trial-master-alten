import { inject } from "@angular/core";
import { ActivatedRouteSnapshot, Routes } from "@angular/router";
import { ShoppingCartProductsComponent } from "./features/shopping-cart-products/shopping-cart-products.component";

export const SHOOPING_CART_ROUTES: Routes = [
	{
		path: "products",
		component: ShoppingCartProductsComponent,
	},
	{ path: "**", redirectTo: "products" },
];