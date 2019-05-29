import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { SignUpComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { TournamentManageComponent } from './components/tournament-manage/tournament-manage.component';
import { TournamentScheduleViewComponent } from './components/tournament-schedule-view/tournament-schedule-view.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent },
  { path: 'about-us', component: AboutUsComponent },
  { path: 'signup', component: SignUpComponent },
  { path: 'login/:role', component: LoginComponent },
  { path: 'tournament-manage', component: TournamentManageComponent},
  { path: 'tournament-schedule-view', component: TournamentScheduleViewComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
