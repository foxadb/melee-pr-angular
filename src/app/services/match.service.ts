import Match from '../models/match.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class MatchService {

  private api_url = 'http://localhost:3000';
  private matchUrl = `${this.api_url}/api/match`;

  constructor(private http: HttpClient) { }

  // GET Matches from API
  public getMatches(): Observable<Array<Match>> {
    return this.http.get(this.matchUrl)
    .map(res => {
      var matches: Array<Match> = [];
      res["data"].docs.forEach(match => {
        matches.push(new Match(match));
      });
      return matches;
    })
    .catch(err => this.handleError(err));
  }

  // GET a Match from API by ID
  public getMatch(id: string): Observable<Match> {
    return this.http.get(`${this.matchUrl}/${id}`)
    .map(res => {
      return new Match(res["data"]);
    })
    .catch(err => this.handleError(err));
  }

  // Error handling method
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}