import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TournamentScheduleService } from 'src/app/services/tournament-schedule.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Game } from 'src/app/models/Game';
import { User } from 'src/app/models/User';
import { Group } from 'src/app/models/Group';
import { GroupedObservable } from 'rxjs';
import { Participant } from 'src/app/models/Participant';
import { MatSnackBar } from '@angular/material';

declare var Treant: any;

@Component({
  selector: 'app-tournament-schedule-view',
  encapsulation: ViewEncapsulation.None,
  styleUrls: ['./tournament-schedule-view.component.css'],
  templateUrl: './tournament-schedule-view.component.html'
})

export class TournamentScheduleViewComponent implements OnInit {

  private tree_structure: any = {
    chart: {
      container: "#OrganiseChart-simple",
      levelSeparation: 20,
      siblingSeparation: 15,
      subTeeSeparation: 15,
      rootOrientation: "EAST",

      node: {
        HTMLclass: "tournament-bracket",
        drawLineThrough: true
      },
      connectors: {
        type: "straight",
        style: {
          "stroke-width": 2,
          "stroke": "#ccc"
        }
      }
    },

    nodeStructure: {}
  };

  tournamentId: number
  tournamentFormat: string
  indexTree: any
  games: Array<Game>
  groupNumbers = new Array<number>()
  groups = {}
  participants = []

  noSchedule:boolean

  displayedColumns: string[] = ['name', 'wins', 'losses'];

  constructor(
    private router: Router,
    private tournamentScheduleService: TournamentScheduleService,
    public snackBar: MatSnackBar,
    private route: ActivatedRoute) {

    this.route.queryParams.subscribe(params => {
      this.tournamentId = params.tournament;
      this.tournamentFormat = params.format
    });
  }

  ngOnInit() {
    this.getTournamentSchedule()
  }

  buildIndexesTree(numberOfRounds: number) {
    var indexTree = []
    for (var i = numberOfRounds; i > 0; i--) {
      indexTree.push([])
    }
    for (var i = 0; i < numberOfRounds; i++) {
      indexTree[i] = []
      for (var j = 0; j < Math.pow(2, numberOfRounds - i - 1); j++) {
        if (i != 0) {
          indexTree[i].push(j + indexTree[i - 1][indexTree[i - 1].length - 1] + 1)
        } else {
          indexTree[i].push(j)
        }
      }
    }
    return indexTree
  }

  buildScheduleTree(numberOfRounds: number, currentRound: number, currentRoundIndex: number) {
    var result = { text: {}, children: [{}, {}] };
    var gameIndex = this.indexTree[currentRound - 1][currentRoundIndex]
    if (currentRound == numberOfRounds) {
      result.text = {
        name: "Championship winner: " + this.games[gameIndex].winner.email,
        desc: this.games[gameIndex].score.firstParticipantScore + " : " + this.games[gameIndex].score.secondParticipantScore + " Starts:" + new Date(this.games[gameIndex].gameSchedule.start).toLocaleDateString() + " at " + new Date(this.games[gameIndex].gameSchedule.start).toTimeString().substr(0, 8)
      }
    } else if (currentRound == 1) {
      return {
        text: {
          name: this.games[gameIndex].winner.email,
          desc: this.games[gameIndex].score.firstParticipantScore + " : " + this.games[gameIndex].score.secondParticipantScore + " Starts:" + new Date(this.games[gameIndex].gameSchedule.start).toLocaleDateString() + " at " + new Date(this.games[gameIndex].gameSchedule.start).toTimeString().substr(0, 8)
        },
        children: [
          {
            text: {
              name: this.games[gameIndex].firstParticipant.email,
              title: "Contender№" + (gameIndex * 2 + 1)
            },
          },
          {
            text: {
              name: this.games[gameIndex].secondParticipant.email,
              title: "Contender№" + (gameIndex * 2 + 2)
            },
          }
        ]
      }
    } else {
      result.text = {
        name: this.games[gameIndex].winner.email,
        desc: this.games[gameIndex].score.firstParticipantScore + " : " + this.games[gameIndex].score.secondParticipantScore + " Starts:" + new Date(this.games[gameIndex].gameSchedule.start).toLocaleDateString() + " at " + new Date(this.games[gameIndex].gameSchedule.start).toTimeString().substr(0, 8)
      }
    }
    result.children[0] = this.buildScheduleTree(numberOfRounds, currentRound - 1, currentRoundIndex * 2)
    result.children[1] = this.buildScheduleTree(numberOfRounds, currentRound - 1, currentRoundIndex * 2 + 1)
    return result
  }

  getNumberOfFirstRoundGames(n: number) {
    return (n + 1) / 2
  }

  getNumberOfRounds(n: number) {
    n = n + 1;
    var count = 0
    while (n > 1) {
      n /= 2
      count++
    }
    return count
  }

  getTournamentSchedule(){
    this.tournamentScheduleService.getTournamentSchedule(this.tournamentId).subscribe(result => {
      this.games = result.games.sort(function (a, b) {
        var timeA = new Date(a.gameSchedule.start).getTime()
        var timeB = new Date(b.gameSchedule.start).getTime()
        return timeA - timeB
      })
      
      if (this.games.length !=0 ){
        this.noSchedule = false
        if (this.tournamentFormat == "Single elimination") {
          var numberOfRounds = this.getNumberOfRounds(this.games.length);
          this.indexTree = this.buildIndexesTree(numberOfRounds);
          this.tree_structure.nodeStructure = this.buildScheduleTree(numberOfRounds, numberOfRounds, 0);
          (() => { Treant(this.tree_structure) })();
        } else if (this.tournamentFormat == "Group stage") {
          for (var i = 0; i < this.games.length; i++) {
            if (!this.groupNumbers.includes(this.games[i].groupNumber))
              this.groupNumbers.push(this.games[i].groupNumber)
          }
  
          for (var groupNumber of this.groupNumbers) {
            var group = new Group()
            group.participants = new Array<Participant>()
            var groupParticipants = new Array<Participant>()
            var participantsIds = []
            for (var game of this.games) {
  
              if (game.groupNumber == groupNumber) {
                if (!participantsIds.includes(game.firstParticipant.id)) {
                  var participant = new Participant()
                  participant.id = game.firstParticipant.id
                  participant.name = game.firstParticipant.email
                  groupParticipants.push(participant)
                  participantsIds.push(participant.id)
                }
                if (!participantsIds.includes(game.secondParticipant.id)) {
                  var participant = new Participant()
                  participant.id = game.secondParticipant.id
                  participant.name = game.secondParticipant.email
                  groupParticipants.push(participant)
                  participantsIds.push(participant.id)
                }
              }
              group.participants = groupParticipants
            }
            this.groups[groupNumber] = group
          }
  
          for (var game of this.games) {
            if (game.winner.email != "TBD") {
              for (var groupNumber of this.groupNumbers) {
                var groupParticipants = this.groups[groupNumber]
                for (var participant of groupParticipants) {
                  if (participant.id == game.firstParticipant.id || participant.id == game.secondParticipant.id) {
                    if (participant.id == game.winner.id) {
                      participant.wins++
                    } else {
                      participant.losses++
                    }
                  }
                }
              }
            }
          }
  
        } else if (this.tournamentFormat == "Round-robin") {
  
          var participants = new Array<Participant>()
          var participantsIds = []
          for (var game of this.games) {
            if (!participantsIds.includes(game.firstParticipant.id)) {
              var participant = new Participant()
              participant.id = game.firstParticipant.id
              participant.name = game.firstParticipant.email
              participants.push(participant)
              participantsIds.push(participant.id)
            }
            if (!participantsIds.includes(game.secondParticipant.id)) {
              var participant = new Participant()
              participant.id = game.secondParticipant.id
              participant.name = game.secondParticipant.email
              participants.push(participant)
              participantsIds.push(participant.id)
            }
          }
  
          for (var game of this.games) {
            if (game.winner.email != "TBD") {
              for (var participant of participants) {
                if (participant.id == game.firstParticipant.id || participant.id == game.secondParticipant.id) {
                  if (participant.id == game.winner.id) {
                    participant.wins++
                  } else {
                    participant.losses++
                  }
                }
              }
            }
          }
          this.participants = participants
        }
      } else {
        this.noSchedule=true
      }
    });
  }

  generateSchedule(){
    this.tournamentScheduleService.generateSchedule(this.tournamentId).subscribe(result => {
      if (result){
        this.noSchedule = false
        this.getTournamentSchedule();
      } else {
        this.snackBar.open("Something went wrong!", "", {
          duration: 5000,
        });
      }
    })
  }
}

