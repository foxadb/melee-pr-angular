import { Component, OnInit, ViewChild } from '@angular/core';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-manager-match',
  templateUrl: './match-manager.component.html',
  styleUrls: ['./match-manager.component.scss']
})
export class MatchManagerComponent implements OnInit {

  public match: Match;

  public matchInput: any = {};

  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

  public matchUpdateError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private matchService: MatchService
  ) {
    // get the match id
    const matchId = this.route.snapshot.paramMap.get('id');

    // retrieve the match from database
    this.matchService.getMatch(matchId).subscribe(match => {
      this.match = match;
    });
  }

  public ngOnInit(): void { }

  public goback(): void {
    // return to the general user panel
    this.location.back();
  }

  public edit(): void {
    // create the updated match for PUT request
    const match = {
      _id: this.match._id,
      score1: this.matchInput.score1,
      score2: this.matchInput.score2
    };

    // update the match
    this.matchService.updateMatch(match)
      .subscribe(res => {
        if (!res) {
          this.matchUpdateError = 'Error when updating the match';
        }
      });

    // return to the general user panel
    this.goback();
  }

  public delete(): void {
    this.confirmModal.open('Confirm you want to delete this match').then(
      () => {
        // delete the match
        this.matchService.deleteMatch(this.match._id)
          .subscribe(res => {
            if (!res) {
              this.matchUpdateError = 'Error when deleting the match';
            }
          });

        // return to the general user panel
        this.goback();
      },
      () => this.matchUpdateError = 'Match not deleted'
    );
  }

}
