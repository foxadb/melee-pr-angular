import { Component, OnInit, ViewChild } from '@angular/core';

import Player from '../models/player.model';
import Match from '../models/match.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-player-manager',
  templateUrl: './player-manager.component.html',
  styleUrls: ['./player-manager.component.scss']
})
export class PlayerManagerComponent implements OnInit {

  public player: Player;
  public matches: Array<Match> = [];
  public mains: Array<string>;

  public playerInput: any = {};

  public nbMatches: number;

  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

  public playerUpdateSuccess = '';
  public playerUpdateError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {
    // get the player id
    const playerId = this.route.snapshot.paramMap.get('id');

    this.playerService.getPlayer(playerId).subscribe(player => {
      this.player = player;
      this.mains = player.mains;

      this.player.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(
          match => {
            match.correctPlayerOrder(this.player);
            this.matches.push(match);
          },
          error => console.log('Error: ', error),
          () => {
            // Number of matches
            this.nbMatches = this.matches.length;
          }
        );
      });
    });
  }

  public ngOnInit(): void { }

  public receiveCharacterMessage(characters: Array<string>): void {
    this.playerInput.mains = characters;
  }

  public editPlayer(): void {
    // create the updated player for PUT request
    const player = {
      _id: this.player._id,
      name: this.playerInput.name,
      location: this.playerInput.location,
      score: this.playerInput.score,
      mains: this.playerInput.mains
    };

    // update the player
    this.playerService.updatePlayer(player)
      .subscribe(res => {
        // reset message boxes
        this.playerUpdateSuccess = '';
        this.playerUpdateError = '';

        if (res) {
          this.playerUpdateSuccess = 'Player updated!';

          // return to the manager panel
          setTimeout(() => this.goManager(), 1000);
        } else {
          this.playerUpdateError = 'Error when updating the player';
        }
      },
      // error: update denied by the server
      err => this.playerUpdateError = 'Player not updated'
      );
  }

  public deletePlayer(): void {
    this.confirmModal.open('Confirm you want to delete ' + this.player.name).then(
      () => {
        // delete the player from database
        this.playerService.deletePlayer(this.player._id)
          .subscribe(res => {
            // reset message boxes
            this.playerUpdateSuccess = '';
            this.playerUpdateError = '';

            if (res) {
              this.playerUpdateSuccess = 'Player deleted!';

              // return to the manager panel
              setTimeout(() => this.goManager(), 1000);
            } else {
              this.playerUpdateError = 'Error when deleting the match';
            }
          });

        // return to the manager panel
        setTimeout(() => this.goManager(), 1000);
      },
      // error: update denied by the server
      err => this.playerUpdateError = 'Player not deleted'
    );
  }

  // Navigate throw match edition
  public editMatch(match: Match): void {
    const link = ['manager/match', match._id];
    this.router.navigate(link);
  }

  // Go back to previous page
  public goBack(): void {
    this.location.back();
  }

  // Return to manager panel
  public goManager(): void {
    const link = ['manager'];
    this.router.navigate(link);
  }

}
