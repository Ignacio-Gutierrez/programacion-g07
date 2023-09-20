import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VistaAdminComponent } from './pages/vista-admin/vista-admin.component';
import { VistaAdminPerfilProfesorComponent } from './pages/vista-admin-perfil-profesor/vista-admin-perfil-profesor.component';
import { VistaAlumnoComponent } from './pages/vista-alumno/vista-alumno.component';
import { VistaAlumnoPlanificacionComponent } from './pages/vista-alumno-planificacion/vista-alumno-planificacion.component';
import { VistaAdminPerfilAlumnoComponent } from './pages/vista-admin-perfil-alumno/vista-admin-perfil-alumno.component';
import { VistaAdminPlanificacionComponent } from './pages/vista-admin-planificacion/vista-admin-planificacion.component';
import { VistaProfesorComponent } from './pages/vista-profesor/vista-profesor.component';
import { VistaProfesorPerfilAlumnoComponent } from './pages/vista-profesor-perfil-alumno/vista-profesor-perfil-alumno.component';
import { VistaProfesorPlanificacionComponent } from './pages/vista-profesor-planificacion/vista-profesor-planificacion.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vAdmin', component: VistaAdminComponent },
  { path: 'vAdminAlumno', component: VistaAdminPerfilAlumnoComponent },
  { path: 'vAdminPlanif', component: VistaAdminPlanificacionComponent },
  { path: 'vAlumno', component: VistaAlumnoComponent },
  { path: 'vProfe', component: VistaProfesorComponent },
  { path: 'vProfeAlumno', component: VistaProfesorPerfilAlumnoComponent },
  { path: 'vProfePlanif', component: VistaProfesorPlanificacionComponent },
  { path: 'vAdminPProfe', component: VistaAdminPerfilProfesorComponent },
  { path: 'vAlumnoPlanif', component: VistaAlumnoPlanificacionComponent },
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }