import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { RankingComponent } from './ranking/ranking.component'
import { PlayerDetailComponent } from './player-detail/player-detail.component'
import { TournamentDetailComponent } from './tournament-detail/tournament-detail.component'
import { ContactComponent } from './contact/contact.component'
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { PlayerManagerComponent } from './player-manager/player-manager.component';
import { MatchManagerComponent } from './match-manager/match-manager.component';
import { TournamentManagerComponent } from './tournament-manager/tournament-manager.component';

const routes: Routes = [
  // Home page (ranking)
  { path: '', component: RankingComponent },

  // Player stats page
  { path: 'player/:id', component: PlayerDetailComponent },

  // Tournament detail page
  { path: 'tournament/:id', component: TournamentDetailComponent },

  // Contact page
  { path: 'contact', component: ContactComponent },

  // Login page
  { path: 'login', component: LoginComponent },

  // General manager panel 
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'manager' }
  },

  // Player manager
  {
    path: 'manager/player/:id',
    component: PlayerManagerComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'manager' }
  },

  // Match manager
  {
    path: 'manager/match/:id',
    component: MatchManagerComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'manager' }
  },

  // Tournament manager
  {
    path: 'manager/tournament/:id',
    component: TournamentManagerComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'manager' }
  },

  // Redirect other path to home
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}