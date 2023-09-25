import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { VistaInicioComponent } from './pages/vista-inicio/vista-inicio.component';
import { VistaPerfilComponent } from './pages/vista-perfil/vista-perfil.component';
import { VistaPlanificacionComponent } from './pages/vista-planificacion/vista-planificacion.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'login', component: LoginComponent },
  { path: 'vInicio', component: VistaInicioComponent},
  { path: 'vPerfil', component: VistaPerfilComponent },
  { path: 'vPlanif', component: VistaPlanificacionComponent },
  { path: '', redirectTo: "/home", pathMatch: "full" },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }