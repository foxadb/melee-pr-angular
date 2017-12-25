import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatAutocompleteModule, MatInputModule } from '@angular/material';

import { AppComponent } from './app.component';
import { RankingComponent } from './ranking/ranking.component';
import { PlayerComponent } from './player/player.component';

import { PlayerService } from './services/player.service';
import { MatchService } from './services/match.service';

@NgModule({
  declarations: [
    AppComponent,
    RankingComponent,
    PlayerComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule
  ],
  providers: [
    PlayerService,
    MatchService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
