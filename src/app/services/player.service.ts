import Player from '../models/player.model';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Rx';
import { Injectable } from '@angular/core';

import 'rxjs/add/operator/map';

@Injectable()
export class PlayerService {

  api_url = 'http://localhost:3000';
  playerUrl = `${this.api_url}/api/player`;

  constructor(private http: HttpClient) { }

  getPlayers(): Observable<Player[]> {
    return this.http.get(this.playerUrl).map(res => {
      return res["data"].docs as Player[];
    });
  }

  // Error handling method
  private handleError(error: any): Promise<any> {
    console.error('An error occured', error);
    return Promise.reject(error.message || error);
  }
}
