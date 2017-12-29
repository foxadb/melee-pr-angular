import Player from '../models/player.model';

import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

@Injectable()
export class PlayerService {

  private api_url = 'http://localhost:3000';
  private playerUrl = `${this.api_url}/api/player`;

  constructor(private http: HttpClient) { }

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

  // Error handling method
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}