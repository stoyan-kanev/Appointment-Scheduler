import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from '@angular/common/http';

@Injectable({ providedIn: 'root' })
export class AppointmentService {
    private baseUrl = 'http://localhost:8000/appointments'; // или environment

    constructor(private http: HttpClient) {}

    getReservedSlots(date: string, barberName: string) {
        const params = new HttpParams()
            .set('date', date) // YYYY-MM-DD
            .set('barber_name', barberName);

        return this.http.get<{ reserved_slots: string[] }>(`${this.baseUrl}/reserved-slots/`, { params });
    }

    createAppointment(payload: {
        first_name: string;
        last_name: string;
        email: string;
        phone: string;
        service_type: string;
        barber_name: string;
        date_time: string; // "YYYY-MM-DD HH:MM"
    }) {
        return this.http.post(`${this.baseUrl}/`, payload);
    }
}
