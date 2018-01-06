import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.scss']
})
export class NewTournamentComponent implements OnInit {

  // User input
  private input: any = {};

  private creationSuccess = '';
  private creationError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private tournamentService: TournamentService
  ) { }

  public ngOnInit(): void {}

  // Collect user input to create the tournament body parameter for creation
  public newTournament(): any {
    var name = this.input.name;
    var organiser = this.input.organiser;
    var location = this.input.location;

    if (name && organiser && location) {
      var tournament = {
        name: name,
        organiser: organiser,
        location: location
      };

      return tournament;
    } else {
      return undefined;
    }
  }

  // Create the tournament
  public createTournament(): void {
    var newTournament = this.newTournament();
    if (newTournament) {
      this.tournamentService.createTournament(newTournament)
        .subscribe(res => {
          this.creationSuccess, this.creationError = '';
          if (res) {
            this.creationSuccess = "Tournament created!";

            // refresh the tournament list
            setTimeout(() => this.goBack(), 1000);
          } else {
            this.creationError = "Error when creating tournament";
          }
        });
    } else {
      this.creationError = "Wrong tournament parameters";
    }
  }

  // Return to manager panel
  public goBack(): void {
    this.location.back();
  }

}