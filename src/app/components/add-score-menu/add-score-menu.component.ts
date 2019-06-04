import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { GameManageService } from 'src/app/services/game-manage.service';
import { User } from 'src/app/models/User';
import { Game } from 'src/app/models/Game';

@Component({
  selector: 'app-add-score-menu',
  templateUrl: './add-score-menu.component.html',
  styleUrls: ['./add-score-menu.component.css']
})
export class AddScoreMenuComponent implements OnInit {

  participants: Array<User>

  constructor(
    public dialogRef: MatDialogRef<AddScoreMenuComponent>,
    @Inject(MAT_DIALOG_DATA) public gameInfo: Game,
    private gameManageService: GameManageService) {
      this.participants = [gameInfo.firstParticipant, gameInfo.secondParticipant]
      console.log(gameInfo)
    }

  ngOnInit() {
  }

  onNoClick(){
    this.gameInfo.winner.id = -1
    this.dialogRef.close();
  }

}
