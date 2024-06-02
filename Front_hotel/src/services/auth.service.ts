import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) { }

    signup(username: string, password: string, email:string): Observable<any> {
        const signupUrl = `${this.apiUrl}/signup`;
        return this.http.post(signupUrl, { username, password,email });
    }

    login(email: string, password: string): Observable<any> {
        const loginUrl = `${this.apiUrl}/login`;
        return this.http.post(loginUrl, { email, password });
    }
}
