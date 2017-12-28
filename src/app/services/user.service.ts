import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { Observable } from 'rxjs';

import 'rxjs/add/operator/map'

import { AuthenticationService } from './authentication.service';
import User from '../models/user.model';

@Injectable()
export class UserService {
  
  constructor(private http: Http, private auth: AuthenticationService) {}

  public getUsers(): Observable<Array<User>> {
    // add authorization header with json web token
    let headers = new Headers({ 'Authorization': 'Bearer ' + this.auth.getToken() });
    let options = new RequestOptions({ headers: headers });

    // get users from API
    return this.http.get('/api/user', options)
      .map((response: Response) => response.json());
  }
}