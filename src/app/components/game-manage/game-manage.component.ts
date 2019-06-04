import { Component, OnInit, ViewChild, AfterViewInit, OnChanges, ViewChildren, QueryList } from '@angular/core';
import { GameManageService } from 'src/app/services/game-manage.service';
import { Game } from 'src/app/models/Game';
import { MatPaginator, MatTableDataSource, MatDialog, MatSnackBar } from '@angular/material';
import { AddScoreMenuComponent } from '../add-score-menu/add-score-menu.component';
import { User } from 'src/app/models/User';
import { Score } from 'src/app/models/Score';

@Component({
  selector: 'app-game-manage',
  templateUrl: './game-manage.component.html',
  styleUrls: ['./game-manage.component.css']
})
export class GameManageComponent implements AfterViewInit {

  games: Array<Game>
  firstTableDisplayedColumns: string[] = ['name', 'firstParticipant', 'secondParticipant', 'startTime'];
  secondTableDisplayedColumns: string[] = ['name', 'firstParticipant', 'secondParticipant', 'endTime', 'addScore'];

  dataSource = new MatTableDataSource<Game>(this.games);
  dataSource2 = new MatTableDataSource<Game>(this.games);

  gameWithNoScore: Game

  @ViewChildren(MatPaginator) paginator = new QueryList<MatPaginator>();

  constructor(
    private gameManageService: GameManageService,
    public snackBar: MatSnackBar,
    public dialog: MatDialog) {
    gameManageService.getIncomingGames().subscribe(result => {
      console.log(result)
      this.dataSource.data = result;
    })
    gameManageService.getGamesWithNoScore().subscribe(result => {
      console.log(result)
      this.dataSource2.data = result;
    })
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator.toArray()[0];
    this.dataSource2.paginator = this.paginator.toArray()[1];
  }

  openAddScoreMenu(game: Game) {
    this.gameWithNoScore = game
    const dialogRef = this.dialog.open(AddScoreMenuComponent, {
      width: '450px',
      height: '600px',
      data: this.gameWithNoScore
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(result)
      if (result != undefined && result.winnerId != -1) {
        console.log(   
          result.schedule.tournament.id,
          result.id,
          result.winner.id,
          result.score.firstParticipantScore,
          result.score.secondParticipantScore)
       
        this.gameManageService.addScore(
          result.schedule.tournament.id,
          result.id,
          result.winner.id,
          result.score.firstParticipantScore,
          result.score.secondParticipantScore).subscribe(data => {
            if (data == false) {
              this.snackBar.open("Something is wrong with your data.", "", {
                duration: 5000,
              });
            } else {
              this.snackBar.open("Successfully added score to this match.", "", {
                duration: 5000,
              });
            }
          })
      }
    });
  }
}
