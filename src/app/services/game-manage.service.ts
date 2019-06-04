import { Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import { HttpClient, HttpParams, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Game } from '../models/Game';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GameManageService {

  constructor(
    private authService: AuthService,
    private http: HttpClient) { }

  getIncomingGames(): Observable<Array<Game>>{
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/getIncomingGames";
    let body = new HttpParams();

    return this.http.get<Array<Game>>(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }

  getGamesWithNoScore(): Observable<Array<Game>>{
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + "/organizer/GetFinishedGamesWithNoScore";
    let body = new HttpParams();

    return this.http.get<Array<Game>>(requestUrl, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }

  addScore(tournamentId: number, gameId: number, winnerId: number, firstParticipantScore: number, secondParticipantScore: number): Observable<boolean>{
    var token = this.authService.getToken();
    let requestUrl: string = environment.apiUrl + 
                                  "/organizer/AddScore?tournamentId=" + tournamentId+
                                  "&gameId=" + gameId +
                                  "&winnerId=" + winnerId +
                                  "&firstParticipantScore=" + firstParticipantScore + 
                                  "&secondParticipantScore=" + secondParticipantScore;
    let body = new HttpParams();

    return this.http.post<boolean>(requestUrl, body, {
      headers: new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': 'Bearer ' + this.authService.getToken()
      })
    });
  }
}
