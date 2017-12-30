import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Router } from '@angular/router';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/debounceTime';
import 'rxjs/add/operator/distinctUntilChanged';

import Tournament from '../models/tournament.model';
import Match from '../models/match.model';

import { TournamentService } from '../services/tournament.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-search-tournament',
  templateUrl: './search-tournament.component.html',
  styleUrls: ['./search-tournament.component.scss']
})
export class SearchTournamentComponent implements OnInit {

  // Tournament list
  private tournaments: Array<Tournament>;

  // Tournament User Input
  private tournament: any;

  // Send the tournament id to parent component
  @Output() tournamentMessageEvent = new EventEmitter<Tournament>();

  // Loading animation
  private loading = false;

  // Error message box
  private error = '';

  search = (text: Observable<string>) =>
    text
      .debounceTime(200)
      .distinctUntilChanged()
      .map(term => term.length < 2 ? [] :
        this.tournaments.filter(tournament =>
          tournament.name.toLowerCase().indexOf(term.toLowerCase()) > -1
        )
          // only 10 results
          .slice(0, 10));

  formatter = (x: { name: string }) => x.name;

  constructor(
    private router: Router,
    private tournamentService: TournamentService,
    private matchService: MatchService
  ) {
    // get tournaments from database
    this.tournamentService.getTournaments()
      .subscribe(tournaments => {
        this.tournaments = tournaments;
      });
  }

  public ngOnInit(): void { }

  public searchTournament(): void {
    // reset error box
    this.error = '';

    // loading animation
    this.loading = true;

    // find the tournament
    var tournament = this.tournaments.find(tournament =>
      tournament.name == this.tournament.name ||
      // if autocompletion is not used
      tournament.name == this.tournament
    );

    if (tournament) {
      // send the tournament to the parent component
      this.tournamentMessageEvent.emit(tournament);
    } else {
      // tournament not found
      this.error = "Tournament not found";
    }
    // stop loading animation
    this.loading = false;
  }

}