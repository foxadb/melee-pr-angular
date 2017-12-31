import { Component, OnInit } from '@angular/core';

import Tournament from '../models/tournament.model';
import Match from '../models/match.model';

import { Router, ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TournamentService } from '../services/tournament.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-tournament-manager',
  templateUrl: './tournament-manager.component.html',
  styleUrls: ['./tournament-manager.component.scss']
})
export class TournamentManagerComponent implements OnInit {

  private tournament: Tournament;
  private matches: Array<Match> = [];

  private tournamentInput: any = {};

  private nbMatches: number;
  
  private tournamentUpdateError = '';

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private location: Location,
    private tournamentService: TournamentService,
    private matchService: MatchService
  ) {
    // get the tournament id
    var tournamentId = this.route.snapshot.paramMap.get('id');

    this.tournamentService.getTournament(tournamentId).subscribe(tournament => {
      this.tournament = tournament;

      this.tournament.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(
          match => {
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
    // create the updated tournament for PUT request
    var tournament = {
      _id: this.tournament._id,
      name: this.tournamentInput.name,
      organiser: this.tournamentInput.organiser,
      location: this.tournamentInput.location
    };

    // update the match
    this.tournamentService.updateTournament(tournament)
      .subscribe(res => {
        if (!res) {
          this.tournamentUpdateError = "Error when updating the tournament";
        }
      });
  }

  public delete(): void {
    this.tournamentService.deleteTournament(this.tournament._id)
      .subscribe(res => {
        if (!res) {
          this.tournamentUpdateError = "Error when deleting the tournament";
        }
      });

    // return to the general user panel
    this.goback();
  }

  // Edit a Match
  public editMatch(match: Match): void {
    const link = ['manager/match', match._id];
    this.router.navigate(link);
  }

}