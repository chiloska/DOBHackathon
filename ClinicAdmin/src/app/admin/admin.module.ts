import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AppRoutingModule } from '../app-routing.module';

import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import {
  MatGridListModule, MatCardModule, MatMenuModule, MatIconModule, MatButtonModule,
  MatToolbarModule, MatSidenavModule, MatListModule, MatSnackBarModule
} from '@angular/material';
import { LayoutModule } from '@angular/cdk/layout';
import { MainComponent } from './components/main/main.component';
import { PatientComponent } from './components/patient/patient.component';
import { ColaborationComponent } from './components/colaboration/colaboration.component';
import { PatientsComponent } from './components/patients/patients.component';
import { VideoComponent } from './components/video/video.component';
import { ChatComponent } from './components/chat/chat.component';

@NgModule({
  declarations: [HomeComponent, LoginComponent, DashboardComponent, MainComponent, PatientComponent, ColaborationComponent, PatientsComponent, VideoComponent, ChatComponent],
  imports: [
    CommonModule,
    AppRoutingModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule
    , MatSnackBarModule
  ]
})
export class AdminModule { }
