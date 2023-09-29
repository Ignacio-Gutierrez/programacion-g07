import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './pages/home/home.component';
import { LoginComponent } from './pages/login/login.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { NavcloseComponent } from './components/navclose/navclose.component';
import { PlanificacionComponent } from './components/planificacion/planificacion.component';
import { VistaPlanificacionComponent } from './pages/vista-planificacion/vista-planificacion.component';
import { ListaUsuariosComponent } from './components/lista-usuarios/lista-usuarios.component';
import { PerfilComponent } from './components/perfil/perfil.component';
import { VistaPerfilComponent } from './pages/vista-perfil/vista-perfil.component';
import { VistaInicioComponent } from './pages/vista-inicio/vista-inicio.component';
import { VistaErrorComponent } from './pages/vista-error/vista-error.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    NavcloseComponent,
    PlanificacionComponent,
    VistaPlanificacionComponent,
    PerfilComponent,
    VistaPerfilComponent,
    VistaInicioComponent,
    ListaUsuariosComponent,
    VistaErrorComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }