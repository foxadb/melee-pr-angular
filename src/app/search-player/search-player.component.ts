import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { PlayerService } from '../services/player.service';
import { forEach } from '@angular/router/src/utils/collection';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})
export class SearchPlayerComponent implements OnInit {

  public player: any = {};

  private players: Array<any>;

  private playerMatches: Array<Match>;

  private loading = false;

  private error = '';

  search = (text: Observable<string>) =>
    text
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? [] :
        this.players.filter(player =>
          player.name.toLowerCase().indexOf(term.toLowerCase()) > -1
        )
          // only 10 results
          .slice(0, 10));

  formatter = (x: { name: string }) => x.name;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {
    // get players from database
    this.playerService.getPlayers()
      .subscribe(players => {
        // initialization
        this.players = [];

        // push the result
        players.forEach(player => {
          let newPlayer = {
            _id: player._id,
            name: player.name,
            main: player.mains[0]
          };

          this.players.push(newPlayer);
        });
      });
  }

  public ngOnInit(): void { }

  public searchPlayer(): void {
    // loading animation
    this.loading = true;

    // find the player
    var player = this.players.find(player =>
      player.name == this.player ||
      player.name == this.player.name
    );

    if (player) {
      // current route url
      const url = this.router.url;

      // home (ranking page)
      if (url == '/') {
        const link = ['player', player._id];
        this.router.navigate(link);
      }

      // manager panel
      if (url == '/manager') {
        this.searchPlayerMatches(player);
      }

    } else {
      // player not found
      this.error = "Player not found";
    }
    // stop loading animation
    this.loading = false;

  }

  public searchPlayerMatches(player: any): void {
    this.playerService.getPlayer(player._id).subscribe(player => {
      this.player = player;

      this.player.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(match => {
          match.correctPlayerOrder(player);
          this.playerMatches.push(match);
        });
      });
    });
  }

}