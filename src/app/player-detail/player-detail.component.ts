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

  public player: Player;
  public matches: Array<Match> = [];

  public nbMatches = 0;
  public ratio: any = 0;

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
    const playerId = this.route.snapshot.paramMap.get('id');

    this.playerService.getPlayer(playerId).subscribe(player => {
      this.player = player;

      this.player.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(
          match => {
            match.correctPlayerOrder(player);
            this.matches.push(match);
          },
          error => console.log('Error: ', error),
          () => {
            // Sort match by tournament date
            this.matches.sort((a, b) =>
              new Date(b.tournament.date).getTime() - new Date(a.tournament.date).getTime());

            // Number of matches
            this.nbMatches = this.matches.length;

            // Compute the wins loss ratio and rounding
            this.ratio = this.computeRatio();
          }
        );
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
    if (loss === 0) {
      return 'inf';
    } else {
      return Math.round(wins / loss * 100) / 100;
    }
  }

}
