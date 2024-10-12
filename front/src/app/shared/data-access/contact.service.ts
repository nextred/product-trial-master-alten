import { Injectable, inject } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { catchError, Observable, of } from "rxjs";
import { IContact } from "./contact.model";

@Injectable({
    providedIn: "root"
}) export class ContactService {

    private readonly http = inject(HttpClient);
    private readonly path = "/api/contact";

    public send(contact: IContact): Observable<boolean> {
        return this.http.post<boolean>(this.path, contact).pipe(
            catchError(() => {
                return of(true);
            })
        )
    }
}