import { Component, OnInit } from '@angular/core';

import Tournament from '../models/tournament.model';
import Player from '../models/player.model';
import Match from '../models/match.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TournamentService } from '../services/tournament.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-tournament-manager',
  templateUrl: './tournament-manager.component.html',
  styleUrls: ['./tournament-manager.component.scss']
})
export class TournamentManagerComponent implements OnInit {

  private tournament: Tournament;
  private matches: Array<Match> = [];
  private nbMatches: number;

  // Editing the Tournament
  private tournamentInput: any = {};

  // Adding a New Match
  private newMatchInput: any = {};
  private player1: Player;
  private player2: Player;

  private tournamentUpdateSuccess = '';
  private tournamentUpdateError = '';

  private matchCreationSuccess = '';
  private matchCreationError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private tournamentService: TournamentService,
    private matchService: MatchService
  ) {
    // get the tournament
    var tournamentId = this.route.snapshot.paramMap.get('id');
    this.getTournament(tournamentId);
    /*this.tournamentService.getTournament(tournamentId).subscribe(tournament => {
      this.tournament = tournament;

      this.tournament.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(
          match => {
            this.matches.push(match);
          },
          error => console.log("Error: ", error),
          () => {
            // Number of matches
            this.nbMatches = this.matches.length;
          }
        )
      });
    });*/
  }

  public ngOnInit(): void { }

  private getTournament(id: string) {
    this.tournamentService.getTournament(id).subscribe(tournament => {
      this.tournament = tournament;

      this.matches = [];

      this.tournament.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(
          match => {
            this.matches.push(match);
          },
          error => console.log("Error: ", error),
          () => {
            // Number of matches
            this.nbMatches = this.matches.length;
          }
        )
      });
    });
  }

  private goBack(): void {
    // return to the general user panel
    this.router.navigate(['manager']);
  }

  private editTournament(): void {
    // create the updated tournament for PUT request
    var tournament = {
      _id: this.tournament._id,
      name: this.tournamentInput.name,
      organiser: this.tournamentInput.organiser,
      location: this.tournamentInput.location
    };

    // update the match
    this.tournamentService.updateTournament(tournament)
      .subscribe(res => {
        if (!res) {
          this.tournamentUpdateError = "Error when updating the tournament";
        }
      });
  }

  private deleteTournament(): void {
    this.tournamentService.deleteTournament(this.tournament._id)
      .subscribe(res => {
        if (!res) {
          this.tournamentUpdateError = "Error when deleting the tournament";
        }
      });

    // return to the general user panel
    setTimeout(() => this.goBack(), 1000);
  }

  private receivePlayer1Message(player: Player): void {
    this.player1 = player;
  }

  private receivePlayer2Message(player: Player): void {
    this.player2 = player;
  }

  private addMatch(): void {
    // reset status boxes
    this.matchCreationSuccess, this.matchCreationError = '';

    var player1 = this.player1;
    var player2 = this.player2;
    var score1 = (this.newMatchInput.score1 >= -1) ? this.newMatchInput.score1 : 0;
    var score2 = (this.newMatchInput.score2 >= -1) ? this.newMatchInput.score2 : 0;

    if (player1 && player2) {
      var newMatch = {
        player1: player1,
        player2: player2,
        score1: score1,
        score2: score2,
        tournament: this.tournament._id
      };

      this.matchService.createMatch(newMatch)
        .subscribe(res => {
                    if (res) {
            this.matchCreationSuccess = "Match added";

            // update the tournament data display
            this.getTournament(this.tournament._id);
          } else {
            this.matchCreationError = "Error when creating match";
          }
        });
    } else {
      this.matchCreationError = "Wrong parameters";
    }
  }

  // Edit a Match
  private editMatch(match: Match): void {
    const link = ['manager/match', match._id];
    this.router.navigate(link);
  }

}