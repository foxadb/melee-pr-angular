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
  selector: 'app-manager-panel',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.scss']
})
export class ManagerComponent implements OnInit {

  // Username and role logged in
  public username: string;
  public role: string;

  // Form attributes
  public matchInput: any = {};

  // Players list
  public players: Array<Player> = [];

  // Tournaments list
  public tournaments: Array<Tournament> = [];

  // Filtered players list for autocompletion
  public filteredPlayers: Observable<Player[]>;

  // Player research input controller
  public searchPlayerCtrl: FormControl = new FormControl();

  // Searched player in text input
  public searchedPlayerName: string;

  public loading = false;

  // True if the player searched is found, false otherwise
  public player: Player;
  public playerMatches: Array<Match>;

  public playerNotFoundError = '';
  public matchCreationSuccess = '';
  public matchCreationError = '';

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private playerService: PlayerService,
    private matchService: MatchService,
    private tournamentService: TournamentService
  ) {
    // get username and role
    this.username = this.auth.getUsername();
    this.role = this.auth.getRole();

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
    );
  }

  public receivePlayerMessage(player: Player): void {
    const link = ['manager/player', player._id];
    this.router.navigate(link);
  }

  public receiveTournamentMessage(tournament: Tournament): void {
    const link = ['manager/tournament', tournament._id];
    this.router.navigate(link);
  }

  public newMatch(): any {
    const player1 = this.player;
    const player2 = this.players.find(player => player.name === this.matchInput.opponent);
    const score1 = (this.matchInput.playerScore >= -1 && this.matchInput.playerScore < 10) ? this.matchInput.playerScore : 0;
    const score2 = (this.matchInput.opponentScore >= -1 && this.matchInput.playerScore < 10) ? this.matchInput.opponentScore : 0;
    const tournament = this.tournaments.find(t => t.name === this.matchInput.tournament);

    if (player1 && player2 && tournament) {
      const match = {
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
    const newMatch = this.newMatch();

    if (newMatch) {
      this.matchService.createMatch(newMatch)
        .subscribe(res => {
          this.matchCreationSuccess = '';
          this.matchCreationError = '';

          if (res) {
            this.matchCreationSuccess = 'Match created!';

            // refresh the match list
            this.onSearch(this.player.name);
          } else {
            this.matchCreationError = 'Error when creating match';
          }
        });
    } else {
      this.matchCreationError = 'Wrong match parameters';
    }
  }

  // Filtering the player list by name with the input
  public filter(val: string): Array<Player> {
    return this.players.filter(player =>
      player.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // Search player
  public onSearch(playerName: string): void {
    this.playerNotFoundError = '';
    this.loading = true;

    // reset player and matches
    this.player = undefined;
    this.playerMatches = [];

    // find the player in the list
    const player = this.players.find(p => p.name === playerName);

    if (player) {
      this.playerService.getPlayer(player._id).subscribe(p => {
        this.player = p;

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
      this.playerNotFoundError = 'Player not found';
      this.loading = false;
    }
  }

  public newPlayer(): void {
    this.router.navigate(['manager/player']);
  }

  public newTournament(): void {
    this.router.navigate(['manager/tournament']);
  }

  // Go to home (ranking)
  public goHome(): void {
    this.router.navigate(['']);
  }

  // Go to admin panel
  public goAdmin(): void {
    this.router.navigate(['admin']);
  }

  // Log out
  public logout(): void {
    // Sign out from the app
    this.auth.logout();

    // Go back to home
    this.goHome();
  }

}
