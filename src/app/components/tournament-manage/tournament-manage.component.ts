import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { TournamentManageService } from 'src/app/services/tournament-manage.service';
import { Tournament } from 'src/app/models/Tournament';
import { CreateTournamentMenuComponent } from '../create-tournament-menu/create-tournament-menu.component';
import { MatDialog } from '@angular/material';
import { Schedule } from 'src/app/models/Schedule';
import { DateRange } from 'src/app/models/DateRange';
import { Router } from '@angular/router';

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
      console.log(data)
      this.ongoingTournaments = data
    })
  }
  getIncomingTournaments() {
    this.tournamentService.getIncomingTournaments().subscribe(data => {
      console.log(data)
      this.incomingTournaments = data
    })
  }
  getFinishedTournaments() {
    this.tournamentService.getFinishedTournaments().subscribe(data => {
      console.log(data)
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
      console.log(result)
      if (result != undefined){
        this.tournamentService.addTournament(result).subscribe(data => {
          console.log(data)
        })
      }
    });
  }

  goToTournamentScheduleView() {
    console.log("asdfg")
    this.router.navigate(['tournament-schedule-view']);
  }

  test() {
    console.log(123);
  }

}
