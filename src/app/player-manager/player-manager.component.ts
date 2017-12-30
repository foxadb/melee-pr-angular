import { Component, OnInit } from '@angular/core';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-player-manager',
  templateUrl: './player-manager.component.html',
  styleUrls: ['./player-manager.component.scss']
})
export class PlayerManagerComponent implements OnInit {

  private player: Player;
  private matches: Array<Match> = [];

  private playerInput: any = {};

  private nbMatches: number;
  
  private playerUpdateError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {
    // get the player id
    var playerId = this.route.snapshot.paramMap.get('id');

    this.playerService.getPlayer(playerId).subscribe(player => {
      this.player = player;

      this.player.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(
          match => {
            match.correctPlayerOrder(this.player);
            this.matches.push(match);
          },
          error => console.log("Error: ", error),
          () => {
            // Number of matches
            this.nbMatches = this.matches.length;
          }
        )
      });
    });
  }

  public ngOnInit(): void { }

  public goback(): void {
    // return to the general user panel
    this.router.navigate(['manager']);
  }

  public edit(): void {
    // create the updated player for PUT request
    var player = {
      _id: this.player._id,
      name: this.playerInput.name,
      location: this.playerInput.location,
      score: this.playerInput.score
    };

    // update the match
    this.playerService.updatePlayer(player)
      .subscribe(res => {
        if (!res) {
          this.playerUpdateError = "Error when updating the match";
        }
      });
  }

  public delete(): void {
    console.log("NO DELETION FOR THE MOMENT !!");
    /*
    // delete the match
    this.playerService.deleteMatch(this.player._id)
      .subscribe(res => {
        if (!res) {
          this.playerUpdateError = "Error when deleting the match";
        }
      });

    // return to the general user panel
    this.goback();
    */
  }

  // Edit a Match
  public editMatch(match: Match): void {
    const link = ['manager/match', match._id];
    this.router.navigate(link);
  }

}