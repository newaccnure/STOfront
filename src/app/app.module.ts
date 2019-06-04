import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';

import { AuthService } from './services/auth.service';
import { TournamentManageService } from './services/tournament-manage.service';
import { TournamentScheduleService } from './services/tournament-schedule.service';
import { GameManageService } from './services/game-manage.service';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AboutUsComponent } from './components/about-us/about-us.component';
import { TournamentManageComponent } from './components/tournament-manage/tournament-manage.component';
import { CreateTournamentMenuComponent } from './components/create-tournament-menu/create-tournament-menu.component';
import { TournamentScheduleViewComponent } from './components/tournament-schedule-view/tournament-schedule-view.component';
import { GameManageComponent } from './components/game-manage/game-manage.component';
import { AddScoreMenuComponent } from './components/add-score-menu/add-score-menu.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    SignUpComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    LayoutComponent,
    LogoutComponent,
    AboutUsComponent,
    TournamentManageComponent,
    CreateTournamentMenuComponent,
    TournamentScheduleViewComponent,
    GameManageComponent,
    AddScoreMenuComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MaterialModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  exports: [
    LayoutComponent
  ],
  providers: [
    AuthService,
    TournamentManageService,
    TournamentScheduleService,
    GameManageService
  ],
  entryComponents: [CreateTournamentMenuComponent, AddScoreMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
