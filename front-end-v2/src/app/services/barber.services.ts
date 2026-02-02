import {inject, Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

export interface Barber {
    id: string;
    name: string;
    description: string;
    role: string;
    is_barber: boolean;
}
export interface ListBarber {
    id: string;
    name: string;
    role: string;
    image:string
}

@Injectable({providedIn: 'root'})
export class BarberService {

    private readonly http = inject(HttpClient)
    private readonly baseUrl = 'http://localhost:8000';


    getBarbers = () => {
        return this.http.get<Barber[]>(`${this.baseUrl}/barbers`);
    }
    listBarbers = () => {
        return this.http.get<ListBarber[]>(`${this.baseUrl}/barbers/list`);
    }
}
