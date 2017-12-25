import { Component, OnInit } from '@angular/core';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  player: Player = new Player();
  matches: Array<Match> = [];

  constructor(private playerService: PlayerService,
    private matchService: MatchService) {
    this.playerService.getPlayer('5a3e8542bbe03c0523485249').subscribe(player => {
      this.player = player;

      player.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(match => {
          this.matches.push(match);
        })
      });
    });
  }

  ngOnInit(): void {
  }

}
