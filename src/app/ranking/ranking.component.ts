import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';

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

  players: Player[] = [];
  filteredPlayers: Observable<Player[]>;
  playersCtrl: FormControl = new FormControl();

  constructor(private playerService: PlayerService) {
    this.playerService.getPlayers().subscribe(players => {
      players.sort((a, b) => b.score - a.score);
      this.players = players;
    });
  }

  ngOnInit(): void {
    this.filteredPlayers = this.playersCtrl.valueChanges.pipe(
      startWith(''),
      map(val => this.filter(val))
    );
  }

  filter(val: string): Player[] {
    return this.players.filter(player =>
      player.name.toLowerCase().indexOf(val.toLowerCase()) === 0);
  }

}
