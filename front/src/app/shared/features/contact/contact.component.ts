import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [CardModule, ButtonModule, InputTextModule, InputTextareaModule, FormsModule, ReactiveFormsModule ],
})
export class ContactComponent {
  public readonly pageTitle = "Contactez Nous";  

  public contactForm  = new FormGroup({
    email: new FormControl(''),
    message: new FormControl(''),
  });

  sendMessage() {
    console.log( this.contactForm.value )
  }
}


