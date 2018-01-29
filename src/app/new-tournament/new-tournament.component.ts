import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Location } from '@angular/common';

import { TournamentService } from '../services/tournament.service';

@Component({
  selector: 'app-new-tournament',
  templateUrl: './new-tournament.component.html',
  styleUrls: ['./new-tournament.component.scss']
})
export class NewTournamentComponent implements OnInit {

  // User input
  public input: any = {};

  public creationSuccess = '';
  public creationError = '';

  constructor(
    private router: Router,
    private location: Location,
    private tournamentService: TournamentService
  ) { }

  public ngOnInit(): void { }

  // Collect user input to create the tournament body parameter for creation
  public newTournament(): any {
    const name = this.input.name;
    const date = this.input.date;
    const organiser = this.input.organiser;
    const location = this.input.location;

    if (name && organiser && location) {
      const tournament = {
        name: name,
        date: date,
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
    const newTournament = this.newTournament();
    if (newTournament) {
      this.tournamentService.createTournament(newTournament)
        .subscribe(res => {
          this.creationSuccess = 'Tournament created!';
          this.creationError = '';

          // refresh the tournament list
          setTimeout(() => this.goManager(), 1000);
        },
        err => this.creationError = 'Wrong tournament parameters'
        );
    } else {
      this.creationError = 'Wrong tournament parameters';
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
