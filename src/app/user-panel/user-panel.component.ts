import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormControl } from '@angular/forms';
import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import User from '../models/user.model';
import Player from '../models/player.model';
import Match from '../models/match.model';
import Tournament from '../models/tournament.model';

import { AuthenticationService } from '../services/authentication.service';
import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';
import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-user-panel',
  templateUrl: './user-panel.component.html',
  styleUrls: ['./user-panel.component.scss']
})
export class UserPanelComponent implements OnInit {

  // Username logged in
  private username: string;

  // Form attributes
  private matchInput: any = {};

  // Players list
  private players: Array<Player> = [];

  // Tournaments list
  private tournaments: Array<Tournament> = [];

  // Filtered players list for autocompletion
  private filteredPlayers: Observable<Player[]>;

  // Player research input controller
  private searchPlayerCtrl: FormControl = new FormControl();

  // Searched player in text input
  private searchedPlayerName: string;

  private loading = false;

  // True if the player searched is found, false otherwise
  private player: Player;
  private playerMatches: Array<Match>;

  private playerNotFoundError = '';
  private matchCreationSuccess = '';
  private matchCreationError = '';

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private playerService: PlayerService,
    private matchService: MatchService,
    private tournamentService: TournamentService
  ) {
    // set username
    this.username = this.auth.getUsername();

    // get players from database
    this.playerService.getPlayers()
      .subscribe(players => {
        this.players = players;
      });

    // get tournaments from database
    this.tournamentService.getTournaments()
      .subscribe(tournaments => {
        this.tournaments = tournaments;
      });
  }

  public ngOnInit(): void {
    this.filteredPlayers = this.searchPlayerCtrl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    )
  }

  public newMatch(): any {
    var player1 = this.player;
    var player2 = this.players.find(player => player.name == this.matchInput.opponent);
    var score1 = (this.matchInput.playerScore && this.matchInput.playerScore >= -1) ? this.matchInput.playerScore : undefined;
    var score2 = (this.matchInput.opponentScore && this.matchInput.opponentScore >= -1) ? this.matchInput.opponentScore : undefined;
    var tournament = this.tournaments.find(tournament => tournament.name == this.matchInput.tournament);

    if (player1 && player2 && tournament) {
      var match = {
        player1: player1._id,
        player2: player2._id,
        score1: score1,
        score2: score2,
        tournament: tournament._id
      };

      return match;
    } else {
      return undefined;
    }
  }

  public createMatch(): void {
    var newMatch = this.newMatch();
    if (newMatch) {
      this.matchService.createMatch(newMatch)
        .subscribe(res => {
          this.matchCreationSuccess, this.matchCreationError = '';
          if (res) {
            this.matchCreationSuccess = "Match created successfully";

            // refresh the match list
            this.onSearch();
          } else {
            this.matchCreationError= "Error when creating match";
          }
        });
    } else {
      this.matchCreationError = "Wrong match parameters";
    }
  }

  // Filtering the player list by name with the input
  public filter(val: string): Array<Player> {
    return this.players.filter(player =>
      player.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // Search player
  public onSearch(): void {
    this.playerNotFoundError = '';
    this.loading = true;

    // reset player and matches
    this.player = undefined;
    this.playerMatches = [];

    // find the player in the list
    var player = this.players.find(player => player.name == this.searchedPlayerName);

    if (player) {
      this.playerService.getPlayer(player._id).subscribe(player => {
        this.player = player;

        this.player.matches.forEach(id => {
          this.matchService.getMatch(id).subscribe(match => {
            match.correctPlayerOrder(player);
            this.playerMatches.push(match);
          });
        });
      });

      // loading finished
      this.loading = false;
    } else {
      // player not found
      this.playerNotFoundError = "Player not found";
      this.loading = false;
    }
  }

  // Edit a Match
  public editMatch(matchId: string): void {
      this.router.navigateByUrl(`/user/match/${matchId}`);
  }

}