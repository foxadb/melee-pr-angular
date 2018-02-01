import Match from '../models/match.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

import { environment } from '../../environments/environment';

@Injectable()
export class MatchService {

  private matchUrl = `${environment.apiUrl}/match`;

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

  // Get Matches from API
  public getMatches(): Observable<Array<Match>> {
    return this.http.get(this.matchUrl)
      .map(res => {
        const matches: Array<Match> = [];
        res['data'].docs.forEach(match => {
          matches.push(new Match(match));
        });
        return matches;
      })
      .catch(err => this.handleError(err));
  }

  // Get a Match from API by ID
  public getMatch(id: string): Observable<Match> {
    return this.http.get(`${this.matchUrl}/${id}`)
      .map(res => {
        return new Match(res['data']);
      })
      .catch(err => this.handleError(err));
  }

  // Create a new Match to API
  public createMatch(match: any): Observable<boolean> {
    return this.http.post(this.matchUrl, match, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Update a Match to API
  public updateMatch(match: any): Observable<boolean> {
    return this.http.put(this.matchUrl, match, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Delete a Match from API
  public deleteMatch(id: any): Observable<boolean> {
    return this.http.delete(`${this.matchUrl}/${id}`, this.options())
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
