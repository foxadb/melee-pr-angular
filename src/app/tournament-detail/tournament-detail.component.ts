import { Component, OnInit } from '@angular/core';

import Tournament from '../models/tournament.model';
import Player from '../models/player.model';
import Match from '../models/match.model';

import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { TournamentService } from '../services/tournament.service';
import { PlayerService } from '../services/player.service';
import { MatchService } from '../services/match.service';

@Component({
  selector: 'app-tournament-detail',
  templateUrl: './tournament-detail.component.html',
  styleUrls: ['./tournament-detail.component.scss']
})
export class TournamentDetailComponent implements OnInit {

  private tournament: Tournament;
  private matches: Array<Match> = [];

  private nbMatches = 0;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private tournamentService: TournamentService,
    private playerService: PlayerService,
    private matchService: MatchService
  ) {
    // get the tournament id
    const tournamentId = this.route.snapshot.paramMap.get('id');

    this.tournamentService.getTournament(tournamentId).subscribe(tournament => {
      this.tournament = tournament;

      this.tournament.matches.forEach(id => {
        this.matchService.getMatch(id).subscribe(
          match => {
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

}
