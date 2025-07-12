import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
    providedIn: 'root'
})
export class AppointmentService {
    private apiUrl = 'http://127.0.0.1:8000/appointments/';

    constructor(private http: HttpClient) {}


    getAppointmentDetails(date: string | null, time: string): Observable<any> {
        return this.http.get(`${this.apiUrl}${date}/${time}`, { withCredentials: true });
    }

    createAppointment(data: any): Observable<any> {
        return this.http.post(this.apiUrl, data);
    }

    getReservedSlots(date: string | null): Observable<any> {
        return this.http.get(`${this.apiUrl}reserved/${date}/`);
    }
}
