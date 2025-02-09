import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class ReservationService {
    private apiUrl = 'http://127.0.0.1:8000/api/appointments/'; // Update with your Django API URL

    constructor(private http: HttpClient) {}

    // Fetch all appointments
    getAppointments(): Observable<any> {
        return this.http.get(this.apiUrl);
    }

    // Create a new appointment
    reserveSlot(date: string, time: string, userId: string): Observable<any> {
        const payload = { date, time, user_id: userId };
        return this.http.post(this.apiUrl, payload);
    }
}
