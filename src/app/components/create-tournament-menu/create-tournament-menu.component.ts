import { Component, OnInit, Inject } from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Tournament } from 'src/app/models/Tournament';
import { TournamentManageService } from 'src/app/services/tournament-manage.service';
import { EventFormat } from 'src/app/models/EventFormat';
import { Sport } from 'src/app/models/Sport';

@Component({
  selector: 'app-create-tournament-menu',
  templateUrl: './create-tournament-menu.component.html',
  styleUrls: ['./create-tournament-menu.component.css']
})
export class CreateTournamentMenuComponent implements OnInit {

  eventFormats: Array<EventFormat>
  sports: Array<Sport>
  selectedEventFormat: EventFormat

  constructor(
    public dialogRef: MatDialogRef<CreateTournamentMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public tournament: Tournament,
    private tournamentService: TournamentManageService) {
  }

  ngOnInit() {
    this.tournamentService.getEventFormats().subscribe(result => {
      this.eventFormats = result
    })
    this.tournamentService.getSports().subscribe(result => {
      this.sports = result
    })
  }

  onNoClick(): void {
    this.tournament = null
    this.dialogRef.close();
  }
}
