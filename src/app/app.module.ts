import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { AuthGuard } from './guards/auth.guard';
import { RankingComponent } from './ranking/ranking.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { LoginComponent } from './login/login.component';
import { ContactComponent } from './contact/contact.component';

import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { PlayerService } from './services/player.service';
import { MatchService } from './services/match.service';

import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    PlayerDetailComponent,
    LoginComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    PlayerService,
    MatchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}