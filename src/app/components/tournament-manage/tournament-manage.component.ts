import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TournamentManageService } from 'src/app/services/tournament-manage.service';
import { Tournament } from 'src/app/models/Tournament';
import { CreateTournamentMenuComponent } from '../create-tournament-menu/create-tournament-menu.component';
import { MatDialog, MatSnackBar } from '@angular/material';
import { Schedule } from 'src/app/models/Schedule';
import { DateRange } from 'src/app/models/DateRange';
import { Router, NavigationExtras } from '@angular/router';
import { EventFormat } from 'src/app/models/EventFormat';

@Component({
  selector: 'app-tournament-manage',
  templateUrl: './tournament-manage.component.html',
  styleUrls: ['./tournament-manage.component.css']
})
export class TournamentManageComponent implements OnInit {

  incomingTournaments: Array<Tournament>
  ongoingTournaments: Array<Tournament>
  finishedTournaments: Array<Tournament>
  displayedColumns: string[] = ['name', 'participants', 'eventFormat', 'sport', 'firstDay', 'lastDay', 'view'];

  newTournament: Tournament

  constructor(
    public snackBar: MatSnackBar,
    private authService: AuthService,
    private router: Router,
    private tournamentService: TournamentManageService,
    public dialog: MatDialog) { }

  ngOnInit() {
    this.getIncomingTournaments()
    this.getOngoingTournaments()
    this.getFinishedTournaments()
    this.newTournament = new Tournament()
    this.newTournament.schedule = new Schedule()
    this.newTournament.schedule.tournamentSchedule = new DateRange()
  }

  isAuthorized(role) {
    return this.authService.checkToken();
  }

  getOngoingTournaments() {
    this.tournamentService.getOngoingTournaments().subscribe(data => {
      this.ongoingTournaments = data
    })
  }

  getIncomingTournaments() {
    this.tournamentService.getIncomingTournaments().subscribe(data => {
      this.incomingTournaments = data
    })
  }

  getFinishedTournaments() {
    this.tournamentService.getFinishedTournaments().subscribe(data => {
      this.finishedTournaments = data
    })
  }

  openCreateTournamentMenu() {
    const dialogRef = this.dialog.open(CreateTournamentMenuComponent, {
      width: '450px',
      height: '600px',
      data: this.newTournament
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result != undefined && result.id != -1) {
        this.tournamentService.addTournament(result).subscribe(data => {
          if (data.id == 0) {
            this.snackBar.open("Something is wrong with your data.", "", {
              duration: 5000,
            });
          }
        })
      } 
    });
  }

  goToTournamentScheduleView(id: number, format: EventFormat) {
    let navigationExtras: NavigationExtras = {
      queryParams: {
        tournament: id,
        format: format.name
      }
    }
    this.router.navigate(['tournament-schedule-view'], navigationExtras);
  }

  deleteTournament(tournamentId: number) {
    this.tournamentService.deleteTournament(tournamentId).subscribe(result => {
      if (result) {
        this.incomingTournaments = this.incomingTournaments.filter(function (val, idx, arr) {
          return val.id != tournamentId
        })
        this.finishedTournaments = this.finishedTournaments.filter(function (val, idx, arr) {
          return val.id != tournamentId
        })
        this.ongoingTournaments = this.ongoingTournaments.filter(function (val, idx, arr) {
          return val.id != tournamentId
        })
      }
    })
  }
}
