import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface ContactPayload {
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
}

@Injectable({ providedIn: 'root' })
export class ContactService {
    // If you have environment.ts, move it there
    private readonly baseUrl = 'http://localhost:8000/contact-us/contacts/';

    constructor(private http: HttpClient) {}

    createContact(payload: ContactPayload): Observable<any> {
        return this.http.post(this.baseUrl, payload);
    }
}
