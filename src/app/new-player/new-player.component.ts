import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { PlayerService } from '../services/player.service';

@Component({
  selector: 'app-new-player',
  templateUrl: './new-player.component.html',
  styleUrls: ['./new-player.component.scss']
})
export class NewPlayerComponent implements OnInit {

  // User input
  private input: any = {};

  private creationSuccess = '';
  private creationError = '';

  constructor(
    private router: Router,
    private location: Location,
    private playerService: PlayerService
  ) { }

  public ngOnInit(): void { }

  private receiveCharacterMessage(characters: Array<string>): void {
    this.input.mains = characters;
  }

  // Collect user input to create the player body parameter for creation
  private newPlayer(): any {
    const name = this.input.name;
    const location = this.input.location;
    const score = (this.input.score != null) ? this.input.score : 1500;
    const mains = this.input.mains;

    if (name && location && score && mains) {
      const player = {
        name: name,
        location: location,
        score: score,
        mains: mains
      };

      return player;
    } else {
      return undefined;
    }
  }

  // Create the player
  private createPlayer(): void {
    const newPlayer = this.newPlayer();
    if (newPlayer) {
      this.playerService.createPlayer(newPlayer)
        .subscribe(res => {
          this.creationSuccess = 'Player created!';
          this.creationError = '';

          // go back
          setTimeout(() => this.goManager(), 1000);
        },
        err => this.creationError = 'Wrong player parameters'
        );
    } else {
      this.creationError = 'Wrong player parameters';
    }
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
