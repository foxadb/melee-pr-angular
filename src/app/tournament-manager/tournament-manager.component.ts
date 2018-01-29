import { Component, OnInit, ViewChild } from '@angular/core';

import Tournament from '../models/tournament.model';
import Player from '../models/player.model';
import Match from '../models/match.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

import { TournamentService } from '../services/tournament.service';
import { MatchService } from '../services/match.service';
import { SearchPlayerComponent } from '../search-player/search-player.component';

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

  @ViewChild('searchPlayer1') searchPlayer1: SearchPlayerComponent;
  @ViewChild('searchPlayer2') searchPlayer2: SearchPlayerComponent;

  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

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
    const tournamentId = this.route.snapshot.paramMap.get('id');
    this.getTournament(tournamentId);
  }

  public ngOnInit(): void { }

  private getTournament(id: string) {
    this.tournamentService.getTournament(id).subscribe(tournament => {
      this.tournament = tournament;

      this.matches = [];

      this.tournament.matches.forEach(matchId => {
        this.matchService.getMatch(matchId).subscribe(
          match => {
            this.matches.push(match);
          },
          error => console.log('Error: ', error),
          () => {
            // Number of matches
            this.nbMatches = this.matches.length;
          }
        );
      });
    });
  }

  private editTournament(): void {
    // create the updated tournament for PUT request
    const tournament = {
      _id: this.tournament._id,
      name: this.tournamentInput.name,
      organiser: this.tournamentInput.organiser,
      date: this.tournamentInput.date,
      location: this.tournamentInput.location
    };

    // update the tournament
    this.tournamentService.updateTournament(tournament)
      .subscribe(res => {
        // reset message boxes
        this.tournamentUpdateSuccess = '';
        this.tournamentUpdateError = '';

        if (res) {
          this.tournamentUpdateSuccess = 'Tournament updated!';

          // return to the manager panel
          setTimeout(() => this.goManager(), 1000);
        } else {
          this.tournamentUpdateError = 'Error when updating the tournament';
        }
      });
  }

  private deleteTournament(): void {
    this.confirmModal.open('Confirm you want to delete ' + this.tournament.name).then(
      () => {
        // delete the player from database
        this.tournamentService.deleteTournament(this.tournament._id)
          .subscribe(res => {
            // reset message boxes
            this.tournamentUpdateSuccess = '';
            this.tournamentUpdateError = '';

            if (res) {
              this.tournamentUpdateSuccess = 'Tournament deleted!';

              // return to the general user panel
              setTimeout(() => this.goManager(), 1000);
            } else {
              this.tournamentUpdateError = 'Error when deleting the tournament';
            }
          });

        // return to the manager panel
        setTimeout(() => this.goManager(), 1000);
      },
      () => this.tournamentUpdateError = 'Tournament not deleted'
    );

  }

  private addMatch(): void {
    // reset status boxes
    this.matchCreationSuccess = '';
    this.matchCreationError = '';

    const player1 = this.searchPlayer1.searchPlayer();
    const player2 = this.searchPlayer2.searchPlayer();
    const score1 = (this.newMatchInput.score1 >= -1) ? this.newMatchInput.score1 : 0;
    const score2 = (this.newMatchInput.score2 >= -1) ? this.newMatchInput.score2 : 0;

    if (player1 && player2) {
      const newMatch = {
        player1: player1._id,
        player2: player2._id,
        score1: score1,
        score2: score2,
        tournament: this.tournament._id
      };

      this.matchService.createMatch(newMatch)
        .subscribe(res => {
          this.matchCreationSuccess = 'Match added';

          // update the tournament data display
          this.getTournament(this.tournament._id);
        },
        err => this.matchCreationError = 'Wrong parameters');
    } else {
      this.matchCreationError = 'Missing players';
    }
  }

  // Edit a Match
  private editMatch(match: Match): void {
    const link = ['manager/match', match._id];
    this.router.navigate(link);
  }


  // Go back to previous page
  public goBack(): void {
    this.location.back();
  }

  // Return to manager panel
  public goManager(): void {
    const link = ['manager'];
    this.router.navigate(link);
  }

}
