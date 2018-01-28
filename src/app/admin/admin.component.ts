import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';
import { UserService } from '../services/user.service';

import { ConfirmModalComponent } from '../confirm-modal/confirm-modal.component';

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

  @ViewChild(ConfirmModalComponent) confirmModal: ConfirmModalComponent;

  private confirm = false;

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
    const username = this.input.username;
    const password = this.input.password;
    const role = this.input.role;

    if (username && password && role) {
      const user = {
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
    // Reset the message box
    this.successMessageBox = '';
    this.errorMessageBox = '';

    const newUser = this.newUser();
    if (newUser) {
      this.userService.createUser(newUser)
        .subscribe(
        res => {
          this.successMessageBox = 'User created!';

          // refresh the user list
          this.getUsers();
        },
        err => {
          this.errorMessageBox = 'Error when creating user';
        }
        );
    } else {
      this.errorMessageBox = 'Wrong user parameters';
    }
  }

  // Delete the user
  private deleteUser(id: string): void {
    // Reset the message box
    this.successMessageBox = '';
    this.errorMessageBox = '';

    this.confirmModal.open('Confirm you want to delete this user').then(
      () => {
        this.userService.deleteUser(id).subscribe(
          res => {
            this.successMessageBox = 'User deleted';

            // update the user list
            this.getUsers();
          },
          err => {
            this.errorMessageBox = 'Error when deleting user';
          }
        );
      },
      () => this.errorMessageBox = 'User not deleted'
    );
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
