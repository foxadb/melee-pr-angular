import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';
import { NgbTypeaheadModule, NgbTypeaheadConfig } from '@ng-bootstrap/ng-bootstrap';

import { AppComponent } from './app.component';
import { RankingComponent } from './ranking/ranking.component';
import { PlayerDetailComponent } from './player-detail/player-detail.component';
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component';
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { ContactComponent } from './contact/contact.component';

import { AuthGuard } from './guards/auth.guard';
import { AuthenticationService } from './services/authentication.service';
import { UserService } from './services/user.service';
import { PlayerService } from './services/player.service';
import { MatchService } from './services/match.service';
import { TournamentService } from './services/tournament.service';

import { AppRoutingModule } from './app-routing.module';
import { HttpInterceptorHandler } from '@angular/common/http/src/interceptor';
import { SearchPlayerComponent } from './search-player/search-player.component';
import { SearchTournamentComponent } from './search-tournament/search-tournament.component';
import { PlayerManagerComponent } from './player-manager/player-manager.component';
import { MatchManagerComponent } from './match-manager/match-manager.component';
import { TournamentManagerComponent } from './tournament-manager/tournament-manager.component';
import { NewPlayerComponent } from './new-player/new-player.component';
import { NewTournamentComponent } from './new-tournament/new-tournament.component';
import { CharacterRosterComponent } from './character-roster/character-roster.component';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    PlayerDetailComponent,
    LoginComponent,
    ContactComponent,
    ManagerComponent,
    MatchManagerComponent,
    SearchPlayerComponent,
    SearchTournamentComponent,
    TournamentDetailComponent,
    PlayerManagerComponent,
    TournamentManagerComponent,
    NewPlayerComponent,
    NewTournamentComponent,
    CharacterRosterComponent
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
    NgbTypeaheadModule,
    AppRoutingModule
  ],
  providers: [
    AuthGuard,
    AuthenticationService,
    UserService,
    PlayerService,
    MatchService,
    TournamentService,
    NgbTypeaheadConfig
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}