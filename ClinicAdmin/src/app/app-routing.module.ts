import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './admin/components/login/login.component';
import { HomeComponent } from './admin/components/home/home.component';
import { DashboardComponent } from './admin/components/dashboard/dashboard.component';
import { MainComponent } from './admin/components/main/main.component';
import { PatientComponent } from './admin/components/patient/patient.component';
import { ColaborationComponent } from './admin/components/colaboration/colaboration.component';
import { PatientsComponent } from './admin/components/patients/patients.component';

import { AdminGuard } from './guards/admin.guard';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard/agenda',
    pathMatch: 'full'
  },
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent, canActivate: [AdminGuard] },
  {
    path: 'dashboard', component: MainComponent, children:
      [
        {
          path: '',
          redirectTo: 'agenda',
          pathMatch: 'full'
        },
        { path: 'agenda', component: DashboardComponent, canActivate: [AdminGuard] },
        { path: 'colaboration', component: ColaborationComponent, canActivate: [AdminGuard] },
        { path: 'patients', component: PatientsComponent, canActivate: [AdminGuard] },
        { path: 'patient/:id', component: PatientComponent, canActivate: [AdminGuard] }
      ]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
