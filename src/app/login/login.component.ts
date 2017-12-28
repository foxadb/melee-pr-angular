import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { AuthenticationService } from '../services/authentication.service';

@Component({
  selector: 'app-login',
  templateUrl: 'login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  private model: any = {};
  private loading = false;
  private error = '';

  constructor(private auth: AuthenticationService, private router: Router) { }

  public ngOnInit(): void {
    // reset login status
    this.auth.logout();
  }

  public login(): void {
    this.loading = true;
    this.auth.login(this.model.username, this.model.password)
      .subscribe(
      result => {
        // login successful
        if (result === true) {
          switch (this.auth.getRole()) {
            case 'user': {
              this.router.navigate(['user']);
              break;
            }

            case 'admin': {
              console.log("You are admin. Congratulations!");
              break;
            }
          }
        }
      },
      error => {
        // login failed
        if (error === 'Unauthorized') {
          this.error = "Wrong username or password";
          this.loading = false;
        }
      }
      );
  }
}