import { Component, OnInit } from '@angular/core';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  player: Player;
  matches: Array<Match> = [];

  constructor(private playerService: PlayerService,
    private matchService: MatchService) {
    this.playerService.getPlayer('5a40da89081df6354a706b91').subscribe(player => {
      this.player = player;

      player.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(match => {
          match.correctPlayerOrder(player);
          this.matches.push(match);
        })
      });
    });
  }

  ngOnInit(): void { }

}
