import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { MaterialModule } from './material.module';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { SignUpComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { HeaderComponent } from './components/header/header.component';
import { LayoutComponent } from './components/layout/layout.component';
import { FooterComponent } from './components/footer/footer.component';
import { LogoutComponent } from './components/logout/logout.component';
import { AboutUsComponent } from './components/about-us/about-us.component';

import { AuthService } from './services/auth.service';
import { HttpClientModule } from '@angular/common/http';
import { TournamentManageComponent } from './components/tournament-manage/tournament-manage.component';
import { CreateTournamentMenuComponent } from './components/create-tournament-menu/create-tournament-menu.component';
import { TournamentScheduleViewComponent } from './components/tournament-schedule-view/tournament-schedule-view.component';

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
    TournamentScheduleViewComponent
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
    AuthService
  ],
  entryComponents: [CreateTournamentMenuComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
