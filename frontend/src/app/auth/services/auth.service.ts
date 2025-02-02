import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    API_URL = 'http://localhost:8000/login';
    constructor(private http: HttpClient) {

    }
}
