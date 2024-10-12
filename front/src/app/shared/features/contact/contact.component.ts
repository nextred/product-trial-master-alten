import { Component } from "@angular/core";
import { CardModule } from "primeng/card";

@Component({
  selector: "app-home",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [ CardModule ],
})
export class ContactComponent {
  public readonly pageTitle = "Contactez Nous";  
}


