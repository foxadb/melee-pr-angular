import { Component, OnInit } from '@angular/core';
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

  constructor(
    private router: Router,
    private playerService: PlayerService) {
    this.playerService.getPlayers().subscribe(players => {
      players.sort((a, b) => b.score - a.score);
      this.players = players;
    });
  }

  public ngOnInit(): void {}

  private receivePlayerMessage(player: Player): void {
    const link = ['player', player._id];
    this.router.navigate(link);
  }

  // Search player by id
  public searchPlayer(playerId: string): void {
    const link = ['player', playerId];
    this.router.navigate(link);
  }

}