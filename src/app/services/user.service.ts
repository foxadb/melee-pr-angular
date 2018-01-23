import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

import { AuthenticationService } from './authentication.service';
import User from '../models/user.model';

@Injectable()
export class UserService {

  private api_url = 'http://localhost:3000';
  private userUrl = `${this.api_url}/api/user`;

  constructor(private http: HttpClient, private auth: AuthenticationService) {}

  public options(): any {
    let headers = new HttpHeaders();
    headers = headers.set('Authorization', 'Bearer ' + this.auth.getToken());
    headers = headers.set('Content-Type', 'application/json');

    const options = {
      headers: headers
    };

    return options;
  }

  // Get Users from API
  public getUsers(): Observable<Array<User>> {
    return this.http.get(this.userUrl, this.options())
      .map(res => {
        const users: Array<User> = [];
        res['data'].forEach(user => {
          users.push(new User(user));
        });
        return users;
      })
      .catch(err => this.handleError(err));
  }


  // Create a new User to API
  public createUser(user: any): Observable<boolean> {
    return this.http.post(`${this.userUrl}/register`, user, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Update a User to API
  public updateUser(user: any): Observable<boolean> {
    return this.http.put(this.userUrl, user, this.options())
      .map(res => {
        return true;
      })
      .catch(err => this.handleError(err));
  }

  // Delete a User from API
  public deleteUser(id: any): Observable<boolean> {
    return this.http.delete(`${this.userUrl}/${id}`, this.options())
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
