import { Component, OnInit } from '@angular/core';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-player-detail',
  templateUrl: './player-detail.component.html',
  styleUrls: ['./player-detail.component.scss']
})
export class PlayerDetailComponent implements OnInit {

  private player: Player;
  private matches: Array<Match> = [];

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {
      // get the player id
      var playerId = this.route.snapshot.paramMap.get('id');

      this.playerService.getPlayer(playerId).subscribe(player => {
      this.player = player;

      player.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(match => {
          match.correctPlayerOrder(player);
          this.matches.push(match);
        })
      });
    });
  }

  public ngOnInit(): void { }

}