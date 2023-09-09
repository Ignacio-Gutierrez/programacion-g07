import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VistaAdminComponent } from './pages/vista-admin/vista-admin.component';
import { VistaAdminPerfilProfesorComponent } from './pages/vista-admin-perfil-profesor/vista-admin-perfil-profesor.component';
import { VistaAlumnoPlanificacionComponent } from './pages/vista-alumno-planificacion/vista-alumno-planificacion.component';
import { VistaAlumnoComponent } from './pages/vista-alumno/vista-alumno.component';
import { VistaProfesorComponent } from './pages/vista-profesor/vista-profesor.component';
import { NavbarComponent } from './pages/navbar/navbar.component';
import { NavcloseComponent } from './pages/navclose/navclose.component';
import { VistaAdminPerfilAlumnoComponent } from './pages/vista-admin-perfil-alumno/vista-admin-perfil-alumno.component';
import { VistaAdminPlanificacionComponent } from './pages/vista-admin-planificacion/vista-admin-planificacion.component';
import { VistaProfesorPlanificacionComponent } from './pages/vista-profesor-planificacion/vista-profesor-planificacion.component';
import { VistaProfesorPerfilAlumnoComponent } from './pages/vista-profesor-perfil-alumno/vista-profesor-perfil-alumno.component';
import { PlanificacionComponent } from './pages/planificacion/planificacion.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    VistaAdminComponent,
    VistaAdminPerfilProfesorComponent,
    VistaAlumnoPlanificacionComponent,
    VistaAlumnoComponent,
    VistaProfesorComponent,
    NavbarComponent,
    NavcloseComponent,
    VistaAdminPerfilAlumnoComponent,
    VistaAdminPlanificacionComponent,
    VistaProfesorPlanificacionComponent,
    VistaProfesorPerfilAlumnoComponent,
    PlanificacionComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
