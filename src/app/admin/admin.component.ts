import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

import User from '../models/user.model';

@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.scss']
})
export class AdminComponent implements OnInit {

  private username: string;

  private users: Array<User> = [];

  private input: any = {};

  private successMessageBox: string;
  private errorMessageBox: string;

  constructor(
    private router: Router,
    private auth: AuthenticationService,
    private userService: UserService
  ) {
    // set username
    this.username = this.auth.getUsername();

    // get users
    this.getUsers();
  }
    
  public ngOnInit(): void { }

  private getUsers(): void {
    this.userService.getUsers().subscribe(users => {
      this.users = users;
    });
  }

// Collect user input to create the user body parameter for creation
  public newUser(): any {
    var username = this.input.username;
    var password = this.input.password;
    var role = this.input.role;

    if (username && password && role) {
      var user = {
        username: username,
        password: password,
        role: role
      };

      return user;
    } else {
      return undefined;
    }
  }

  // Create the user
  public createUser(): void {
    var newUser = this.newUser();
    if (newUser) {
      this.userService.createUser(newUser)
        .subscribe(res => {
          this.successMessageBox, this.errorMessageBox = '';
          if (res) {
            this.successMessageBox = "User created!";
            // refresh the user list
            this.getUsers();
          } else {
            this.errorMessageBox = "Error when creating user";
          }
        });
    } else {
      this.errorMessageBox = "Wrong user parameters";
    }
  }

  // Delete the user
  private deleteUser(id: string): void {
    this.userService.deleteUser(id).subscribe(
      res => {
        if (res) {
          this.successMessageBox = "User deleted";
        } else {
          this.errorMessageBox = "Error when deleting user";
        }
        // update the user list
        this.getUsers();
      });
  }

  // Go to home (ranking)
  private goHome(): void {
    this.router.navigate(['']);
  }

  // Go to Manager Panel
  private goManager(): void {
    this.router.navigate(['manager']);
  }

  // Log out
  private logout(): void {
    // Sign out from the app
    this.auth.logout();

    // Go back to home
    this.goHome();
  }

}