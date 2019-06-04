import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Token } from '../models/Token';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }

  signup(email: string, password: string, repeatPassword: string, role: string, aboutMe: string): Observable<Token>{
    let requestUrl: string = environment.apiUrl + "/auth/addUser" + 
                              "?email=" + email + 
                              "&password=" + password + 
                              "&repeatPassword=" + repeatPassword + 
                              "&role=" + role + 
                              "&aboutMe=" + aboutMe;

    let body = new HttpParams();

    return this.http.post<Token>(requestUrl, body);
  }

  login(email:string, password:string): Observable<Token>{
    let requestUrl: string = environment.apiUrl + "/auth/login" + 
                              "?email=" + email + 
                              "&password=" + password;

    let body = new HttpParams();

    return this.http.post<Token>(requestUrl, body);
  }

  logOut(){
    localStorage.removeItem('user')
  }

  saveToken(token: Token){
    let key = 'user';
    localStorage.setItem(key, JSON.stringify({
      expirationTime: token.expirationTime,
      token: token.token
    }));
  }

  checkToken(){
    if ('user' in localStorage) {
      let expirationTime = JSON.parse(localStorage.getItem('user')).expirationTime;
      let currentDate = new Date()
      return expirationTime > currentDate.getTime() / 1000;
    }
    return false;
  }
  
  getToken(){
    return JSON.parse(localStorage.getItem('user')).token;
  }

  // IsInRole(role):Observable<Object>{
  //   let requestUrl: string = environment.apiUrl + "/user/IsInRole" + "?role=" + role;

  //   let body = new HttpParams();

  //   return this.http.post(requestUrl, body);
  // }
  
  // isAuthorized(role): Observable<Object> {
  //   if ('user' in localStorage) {
  //     let expirationTime = JSON.parse(localStorage.getItem('user')).expirationTime;
  //     let currentDate = new Date()
  //     if (expirationTime > currentDate.getTime() / 1000){
  //       return this.IsInRole(role);
  //     }
  //     return new Observable<boolean>();
  //   }
  //   return new Observable<boolean>();

  // }
}
