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
  players: Array<Player> = [];

  // Filtered players list for autocompletion
  filteredPlayers: Observable<Player[]>;

  // Player research input controller
  searchPlayerCtrl: FormControl = new FormControl();

  // Searched player in text input
  searchedPlayer: string;

  constructor(
    private router: Router,
    private playerService: PlayerService) {
    this.playerService.getPlayers().subscribe(players => {
      players.sort((a, b) => b.score - a.score);
      this.players = players;
    });
  }

  ngOnInit(): void {
    this.filteredPlayers = this.searchPlayerCtrl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    )
  }

  // Filtering the player list by name with the input
  filter(val: string): Array<Player> {
    return this.players.filter(player =>
      player.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

  // Search player
  onSearch(): void {
    var player = this.players.find(player => player.name == this.searchedPlayer);
    if (player) {
      this.router.navigateByUrl(`/player/${player._id}`);
    } else {
      console.log('Player not found');
    }
  }

  // Search player by id
  searchPlayer(playerid: string): void {
      this.router.navigateByUrl(`/player/${playerid}`);
  }

}