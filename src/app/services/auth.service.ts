import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }
  isAuthorized(): boolean {
    // if ('user' in localStorage) {
    //   let expirationTime = JSON.parse(localStorage.getItem('expirationTime'));
    //   let currentDate = new Date()
    //   return expirationTime > currentDate.toDateString();
    // }
    // return false;
    return false;
  }

  signup(email: string, password: string, repeatPassword: string, role: string, aboutMe: string): Observable<Object>{
    let requestUrl: string = environment.apiUrl + "/auth/addUser" + 
                              "?email=" + email + 
                              "&password=" + password + 
                              "&repeatPassword=" + repeatPassword + 
                              "&role=" + role + 
                              "&aboutMe=" + aboutMe;

    let body = new HttpParams();
    // body = body.set('email', email);
    // body = body.set('password', password);
    // body = body.set('repeatPassword', repeatPassword);
    // body = body.set('role', role);
    // body = body.set('aboutMe', aboutMe);

    return this.http.post(requestUrl, body);
  }
}
