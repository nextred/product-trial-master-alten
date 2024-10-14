import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from "@angular/forms";
import { IContact } from "app/shared/data-access/contact.model";
import { ContactService } from "app/shared/data-access/contact.service";
import { Message } from "primeng/api";
import { ButtonModule } from "primeng/button";
import { CardModule } from "primeng/card";
import { InputTextModule } from "primeng/inputtext";
import { MessagesModule } from 'primeng/messages';
import { InputTextareaModule } from "primeng/inputtextarea";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.scss"],
  standalone: true,
  imports: [ CommonModule, CardModule, ButtonModule, InputTextModule, InputTextareaModule, FormsModule, ReactiveFormsModule, MessagesModule ],
})
export class ContactComponent {
  public readonly contactService = inject( ContactService ) 

  public messages = signal<Message[]>([])

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
      this.contactService.send( this.contactForm.value as IContact ).subscribe(
        () => {
          this.messages.update( value => [ ...value, {
            closable: true,
            severity: 'success',
            summary: 'Demande de contact envoyée avec succès',
            life: 2000
          } ])

          this.contactForm.reset()
        },

        () => this.messages.update( value => [ ...value, {
          closable: true,
          severity: 'error',
          summary: 'Demande de contact a échouée',
          life: 2000
        } ]),
      )
    }
  }
}


