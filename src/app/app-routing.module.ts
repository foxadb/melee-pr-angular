import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { RankingComponent } from './ranking/ranking.component'
import { PlayerDetailComponent } from './player-detail/player-detail.component'
import { ContactComponent } from './contact/contact.component'
import { LoginComponent } from './login/login.component';
import { ManagerComponent } from './manager/manager.component';
import { ManagerMatchComponent } from './manager-match/manager-match.component';

const routes: Routes = [
  // Home page (ranking)
  { path: '', component: RankingComponent },
  
  // Login page
  { path: 'login', component: LoginComponent },
  
  // General user panel 
  {
    path: 'manager',
    component: ManagerComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'manager' }
  },

  // User panel for managing match
  {
    path: 'manager/match/:id',
    component: ManagerMatchComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'manager' }
  },

  // Player stats page
  { path: 'player/:id', component: PlayerDetailComponent },

  // Contact page
  { path: 'contact', component: ContactComponent },
  
  // Redirect other path to home
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}