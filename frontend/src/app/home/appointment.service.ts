import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private apiUrl = 'http://127.0.0.1:8000/appointments/';

    constructor(private http: HttpClient) {}

    getAppointments(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    createAppointment(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    getReservedSlots(date: string): Observable<any> {  // ✅ Fetch reserved slots for a day
        return this.http.get(`${this.apiUrl}reserved/${date}/`);
    }
}
