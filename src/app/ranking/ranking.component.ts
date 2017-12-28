import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

import { Router } from '@angular/router';

import { Observable } from 'rxjs/Observable';
import { startWith } from 'rxjs/operators/startWith';
import { map } from 'rxjs/operators/map';

import Player from '../models/player.model';
import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-ranking',
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss']
})
export class RankingComponent implements OnInit {

  // Players list
  private players: Array<Player> = [];

  // Filtered players list for autocompletion
  private filteredPlayers: Observable<Player[]>;

  // Player research input controller
  private searchPlayerCtrl: FormControl = new FormControl();

  // Searched player in text input
  private searchedPlayer: string;

  private loading = false;
  private error = '';

  constructor(
    private router: Router,
    private playerService: PlayerService) {
    this.playerService.getPlayers().subscribe(players => {
      players.sort((a, b) => b.score - a.score);
      this.players = players;
    });
  }

  public ngOnInit(): void {
    this.filteredPlayers = this.searchPlayerCtrl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    )
  }

  // Filtering the player list by name with the input
  public filter(val: string): Array<Player> {
    return this.players.filter(player =>
      player.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // Search player
  public onSearch(): void {
    this.loading = true;
    var player = this.players.find(player => player.name == this.searchedPlayer);
    if (player) {
      this.router.navigateByUrl(`/player/${player._id}`);
    } else {
      // player not found
      this.error = "Player not found";
      this.loading = false;
    }
  }

  // Search player by id
  public searchPlayer(playerid: string): void {
      this.router.navigateByUrl(`/player/${playerid}`);
  }

}