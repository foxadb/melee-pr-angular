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
import { ManagerMatchComponent } from './manager-match/manager-match.component';
import { SearchPlayerComponent } from './search-player/search-player.component';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    PlayerDetailComponent,
    LoginComponent,
    ContactComponent,
    ManagerComponent,
    ManagerMatchComponent,
    SearchPlayerComponent
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