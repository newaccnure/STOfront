import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { environment } from 'src/environments/environment';
import { HttpParams, HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Tournament } from '../models/Tournament';
import { Sport } from '../models/Sport';
import { EventFormat } from '../models/EventFormat';

@Injectable({
  providedIn: 'root'
})
export class TournamentManageService {

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  getOngoingTournaments(): Observable<Array<Tournament>> {
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/getOngoingTournaments";
    let body = new HttpParams();

    return this.http.get<Array<Tournament>>(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }
  getIncomingTournaments(): Observable<Array<Tournament>> {

    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/getIncomingTournaments";
    let body = new HttpParams();

    return this.http.get<Array<Tournament>>(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }
  getFinishedTournaments(): Observable<Array<Tournament>> {
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/getFinishedTournaments";
    let body = new HttpParams();

    return this.http.get<Array<Tournament>>(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }
  getSports(): Observable<Array<Sport>> {
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/getSports";
    let body = new HttpParams();

    return this.http.get<Array<Tournament>>(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }

  getEventFormats(): Observable<Array<EventFormat>> {
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/getEventFormats";
    let body = new HttpParams();

    return this.http.get<Array<Tournament>>(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }

  addTournament(tournament: Tournament): Observable<Tournament>{
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/addTournament";

    return this.http.post<Tournament>(requestUrl, tournament, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }
  deleteTournament(tournamentId: number): Observable<boolean> {
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/deleteTournament?tournamentId=" + tournamentId;

    return this.http.delete<boolean>(requestUrl,  {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }
}
