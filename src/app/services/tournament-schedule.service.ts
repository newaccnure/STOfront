import { Injectable } from '@angular/core';
import { Schedule } from '../models/Schedule';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class TournamentScheduleService {

  constructor(
    private authService: AuthService,
    private http: HttpClient) {
  }

  getTournamentSchedule(tournamentId: number): Observable<Schedule> {
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/getTournamentSchedule?tournamentId=" + tournamentId;

    return this.http.get<Schedule>(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }

  generateSchedule(tournamentId: number): Observable<boolean> {
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/AutoGenerateTournamentSchedule?tournamentId=" + tournamentId;

    let body = new HttpParams();

    return this.http.post<boolean>(requestUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }
}
