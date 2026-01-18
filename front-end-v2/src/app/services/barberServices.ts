import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Barber {
    id: string;
    name: string;
    description: string;
    role: string;
    is_barber: boolean;
}

@Injectable({providedIn: 'root'})
export class BarberService {

    private readonly http = inject(HttpClient)
    private readonly baseUrl = 'http://localhost:8000';


    getBarbers = () => {
        return this.http.get<Barber[]>(`${this.baseUrl}/barbers/`);
    }
}
