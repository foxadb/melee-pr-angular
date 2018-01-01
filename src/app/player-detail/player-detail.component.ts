import { Component, OnInit } from '@angular/core';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { Router, ActivatedRoute } from '@angular/router';
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

  private nbMatches: number = 0;
  private ratio: any = 0;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {
    // override the route reuse strategy
    this.router.routeReuseStrategy.shouldReuseRoute = function () {
      return false;
    };

    // get the player id
    var playerId = this.route.snapshot.paramMap.get('id');

    this.playerService.getPlayer(playerId).subscribe(player => {
      this.player = player;

      this.player.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(
          match => {
            match.correctPlayerOrder(player);
            this.matches.push(match);
          },
          error => console.log("Error: ", error),
          () => {
            // Number of matches
            this.nbMatches = this.matches.length;

            // Compute the wins loss ratio and rounding
            this.ratio = Math.round(this.computeRatio() * 100) / 100;
          }
        )
      });
    });
  }

  public ngOnInit(): void { }

  public searchPlayer(id: string) {
    const link = ['player', id];
    this.router.navigate(link);
  }

  public searchTournament(id: string) {
    const link = ['tournament', id];
    this.router.navigate(link);
  }

  public computeRatio(): any {
    let wins = 0;
    let loss = 0;

    this.matches.forEach(match => {
      // Increment the match wins counter
      if (this.player.hasWon(match)) {
        wins++;
      } else {
        loss++;
      }
    });

    // Compute the wins loss ratio
    if (loss == 0) {
      return 'inf';
    } else {
      return wins / loss;
    }
  }

}