import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-search-player',
  templateUrl: './search-player.component.html',
  styleUrls: ['./search-player.component.scss']
})
export class SearchPlayerComponent implements OnInit {

  // Player list
  private players: Array<Player>;

  // Player User Input
  private player: any;

  // Send the player id to parent component
  @Output() playerMessageEvent = new EventEmitter<Player>();

  // Loading animation
  private loading = false;

  // Error message box
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
          .slice(0, 10))

  formatter = (x: { name: string }) => x.name;

  constructor(
    private router: Router,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {
    // get players from database
    this.playerService.getPlayers()
      .subscribe(players => {
        this.players = players;
      });
  }

  public ngOnInit(): void { }

  public searchPlayer(): Player {
    // reset error box
    this.error = '';

    // loading animation
    this.loading = true;

    // find the player
    const player = this.players.find(p =>
      p.name === this.player.name ||
      // if autocompletion is not used
      p.name === this.player
    );

    if (player) {
      // send the player to the parent component
      this.playerMessageEvent.emit(player);
    } else {
      // player not found
      this.error = 'Player not found';
    }

    // stop loading animation
    this.loading = false;

    // return the player
    return player;
  }

}
