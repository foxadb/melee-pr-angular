import Match from '../models/match.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class MatchService {

  api_url = 'http://localhost:3000';
  matchUrl = `${this.api_url}/api/match`;

  constructor(private http: HttpClient) { }

  // GET Matches from API
  getMatches(): Observable<Array<Match>> {
    return this.http.get(this.matchUrl).map(res => {
      return res["data"].docs as Array<Match>;
    });
  }

  // GET a Match from API by ID
  getMatch(id: string): Observable<Match> {
    return this.http.get(`${this.matchUrl}/${id}`).map(res => {
      return res["data"] as Match;
    });
  }

  // Error handling method
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}