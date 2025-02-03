import {Injectable} from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {loginInfo} from '../types/login.interface';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    API_URL = 'http://localhost:8000/users/';

    constructor(private http: HttpClient) {

    }

    login(loginData: loginInfo): Observable<any> {
        return this.http.post(this.API_URL + 'login', loginData, {withCredentials: true});
    }

}
