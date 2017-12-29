import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { RankingComponent } from './ranking/ranking.component'
import { PlayerDetailComponent } from './player-detail/player-detail.component'
import { ContactComponent } from './contact/contact.component'
import { LoginComponent } from './login/login.component';
import { UserPanelComponent } from './user-panel/user-panel.component';
import { UserMatchPanelComponent } from './user-match-panel/user-match-panel.component';

const routes: Routes = [
  // Home page (ranking)
  { path: '', component: RankingComponent },
  
  // Login page
  { path: 'login', component: LoginComponent },
  
  // General user panel 
  {
    path: 'user',
    component: UserPanelComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'user' }
  },

  // User panel for managing match
  {
    path: 'user/match/:id',
    component: UserMatchPanelComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'user' }
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