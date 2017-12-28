import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from './guards/auth.guard';

import { RankingComponent } from './ranking/ranking.component'
import { PlayerDetailComponent } from './player-detail/player-detail.component'
import { ContactComponent } from './contact/contact.component'
import { LoginComponent } from './login/login.component';
import { UserPanelComponent } from './user-panel/user-panel.component';

const routes: Routes = [
  { path: '', component: RankingComponent },
  { path: 'login', component: LoginComponent },
  {
    path: 'user',
    component: UserPanelComponent,
    canActivate: [AuthGuard],
    data: { expectedRole: 'user' }
  },
  { path: 'player/:id', component: PlayerDetailComponent },
  { path: 'contact', component: ContactComponent },
  
  // redirect other path to home
  { path: '**', redirectTo: '' }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}