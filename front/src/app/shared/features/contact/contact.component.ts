import { CommonModule } from "@angular/common";
import { Component } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { InputTextareaModule } from "primeng/inputtextarea";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [ CommonModule, CardModule, ButtonModule, InputTextModule, InputTextareaModule, FormsModule, ReactiveFormsModule ],
})
export class ContactComponent {
  public readonly pageTitle = "Contactez Nous";  

  public email = new FormControl('', [
    Validators.required,
    Validators.email,
  ])

  public message = new FormControl('', [
    Validators.required,
    Validators.maxLength( 300 )
  ])

  public contactForm  = new FormGroup({
    email: this.email,
    message: this.message
  });

  sendMessage() {
    if ( this.email.valid && this.message.valid ) {
      console.log( this.contactForm.value )
    }
  }
}


