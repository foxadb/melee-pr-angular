import Player from '../models/player.model';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlayerService {

  private api_url = 'http://localhost:3000';
  private playerUrl = `${this.api_url}/api/player`;

  constructor(private http: HttpClient, private auth: AuthenticationService) { }

  public options(): any {
    var headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    headers = headers.set('Content-Type', 'application/json');

    var options = {
      headers: headers
    };

    return options;
  }

  // Get Players from API
  public getPlayers(): Observable<Array<Player>> {
    return this.http.get(this.playerUrl)
      .map(res => {
        var players: Array<Player> = [];
        res["data"].docs.forEach(player => {
          players.push(new Player(player));
        });
        return players;
      })
      .catch(err => this.handleError(err));
  }

  // Get a Player from API by ID
  public getPlayer(id: string): Observable<Player> {
    return this.http.get(`${this.playerUrl}/${id}`)
      .map(res => {
        return new Player(res["data"]);
      })
      .catch(err => this.handleError(err));
  }

  // Create a new Patch to API
  public createPlayer(player: any): Observable<boolean> {
    return this.http.post(this.playerUrl, player, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Update a Player to API
  public updatePlayer(player: any): Observable<boolean> {
    return this.http.put(this.playerUrl, player, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Delete a Player from API
  public deletePlayer(id: any): Observable<boolean> {
    return this.http.delete(`${this.playerUrl}/${id}`, this.options())
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