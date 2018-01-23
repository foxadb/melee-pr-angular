import Tournament from '../models/tournament.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class TournamentService {

  private api_url = 'http://localhost:3000';
  private tournamentUrl = `${this.api_url}/api/tournament`;

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  public options(): any {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    headers = headers.set('Content-Type', 'application/json');

    const options = {
      headers: headers
    };

    return options;
  }

  // Get Tournamentes from API
  public getTournaments(): Observable<Array<Tournament>> {
    return this.http.get(this.tournamentUrl)
      .map(res => {
        const tournaments: Array<Tournament> = [];
        res['data'].docs.forEach(tournament => {
          tournaments.push(new Tournament(tournament));
        });
        return tournaments;
      })
      .catch(err => this.handleError(err));
  }

  // Get a Tournament from API by ID
  public getTournament(id: string): Observable<Tournament> {
    return this.http.get(`${this.tournamentUrl}/${id}`)
      .map(res => {
        return new Tournament(res['data']);
      })
      .catch(err => this.handleError(err));
  }

  // Create a new Tournament to API
  public createTournament(tournament: any): Observable<boolean> {
    return this.http.post(this.tournamentUrl, tournament, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Update a Tournament to API
  public updateTournament(tournament: any): Observable<boolean> {
    return this.http.put(this.tournamentUrl, tournament, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Delete a Tournament from API
  public deleteTournament(id: any): Observable<boolean> {
    return this.http.delete(`${this.tournamentUrl}/${id}`, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Error handling method
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }

}
