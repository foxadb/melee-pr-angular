import { Component, OnInit } from '@angular/core';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-manager-match',
  templateUrl: './match-manager.component.html',
  styleUrls: ['./match-manager.component.scss']
})
export class MatchManagerComponent implements OnInit {

  private match: Match;

  private matchInput: any = {};

  private matchUpdateError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private matchService: MatchService
  ) {
    // get the match id
    var matchId = this.route.snapshot.paramMap.get('id');

    // retrieve the match from database
    this.matchService.getMatch(matchId).subscribe(match => {
      this.match = match;
    });
  }

  public ngOnInit(): void {}

  public goback(): void {
    // return to the general user panel
    this.location.back();
  }

  public edit(): void {
    // create the updated match for PUT request
    var match = {
      _id: this.match._id,
      score1: (this.matchInput.score1 >= -1) ? this.matchInput.score1 : 0,
      score2: (this.matchInput.score2 >= -1) ? this.matchInput.score2 : 0,
    };

    // update the match
    this.matchService.updateMatch(match)
      .subscribe(res => {
        if (!res) {
          this.matchUpdateError = "Error when updating the match";
        }
      });

    // return to the general user panel
    this.goback();
  }

  public delete(): void {
    // delete the match
    this.matchService.deleteMatch(this.match._id)
      .subscribe(res => {
        if (!res) {
          this.matchUpdateError = "Error when deleting the match";
        }
      });

    // return to the general user panel
    this.goback();
  }

}