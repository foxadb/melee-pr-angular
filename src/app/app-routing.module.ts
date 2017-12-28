import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { RankingComponent } from './ranking/ranking.component'
import { PlayerDetailComponent } from './player-detail/player-detail.component'
import { ContactComponent } from './contact/contact.component'
import { LoginComponent } from './login/login.component';

const routes: Routes = [
  { path: '', component: RankingComponent },
  { path: 'login', component: LoginComponent },
  { path: 'player/:id', component: PlayerDetailComponent },
  { path: 'contact', component: ContactComponent },
  { path: '**', redirectTo: ''}
]

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}