import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute, Params } from '@angular/router';
import { PlanificacionService } from 'src/app/services/planificacion.service';
import { UsuariosService } from 'src/app/services/usuarios.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-planificacion',
  templateUrl: './planificacion.component.html',
  styleUrls: ['./planificacion.component.css']
})
export class PlanificacionComponent implements OnInit {
  planifForm!: FormGroup
  selectedRole = localStorage.getItem('role');

  UserPlanif: any

  DataPlanif: any = {
    "descripcion": null,
    "fecha": null,
    "lunes": null,
    "martes": null,
    "miercoles": null,
    "jueves": null,
    "viernes": null,
    "sabado": null,
    "alumno_dni": null,
    "profesor_dni": null
  };

  private parametrosOcultos: any;

  PlanifID: any = Number;

  userDNI: any = Number;
  perfilDni: any = Number;

  allProf: any[] = [];

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private planificacionService: PlanificacionService,
    private usuariosService: UsuariosService,
    private formBuilder: FormBuilder,
  ) {
    this.planifForm = this.formBuilder.group({
      descripcion: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(200)]],
      fecha: ['', [Validators.required]],
      lunes: ['', [Validators.maxLength(100)]],
      martes: ['', [Validators.maxLength(100)]],
      miercoles: ['', [Validators.maxLength(100)]],
      jueves: ['', [Validators.maxLength(100)]],
      viernes: ['', [Validators.maxLength(100)]],
      sabado: ['', [Validators.maxLength(100)]],
      alumno_dni: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
      profesor_dni: ['', [Validators.required, Validators.pattern(/^[0-9]+$/)]],
    });
  }

  ngOnInit(): void {
    this.userDNI = this.usuariosService.getUserDNIFromToken();
    this.parametrosOcultos = history.state;

    this.route.params.subscribe((params: Params) => {
      this.perfilDni = this.parametrosOcultos.dni;
    });
    
    this.usuariosService.getAllProf().subscribe(
      (data) => {
        this.allProf = data;
        console.log('Datos de profesores:', this.allProf);
      },
      (error) => {
        console.error('Error al obtener datos de profesores:', error);
      }
    );

    this.planificacionService.getPlanif(this.perfilDni).subscribe(
      (userPlanif) => {
        this.UserPlanif = userPlanif;
        console.log('UserPlanif: ', this.UserPlanif);

        if (Array.isArray(userPlanif) && userPlanif.length > 0) {
          const planif = userPlanif[0];
          this.planifForm = this.formBuilder.group({
            descripcion: [planif.descripcion, Validators.required],
            fecha: [planif.fecha, Validators.required],
            lunes: planif.lunes,
            martes: planif.martes,
            miercoles: planif.miercoles,
            jueves: planif.jueves,
            viernes: planif.viernes,
            sabado: planif.sabado,
            alumno_dni: [planif.alumno.dni, Validators.required],
            profesor_dni: [planif.profesor.dni, Validators.required]
          })

          this.PlanifID = planif.id
          this.DataPlanif = {
            "descripcion": planif.descripcion,
            "fecha": planif.fecha,
            "lunes": planif.lunes,
            "martes": planif.martes,
            "miercoles": planif.miercoles,
            "jueves": planif.jueves,
            "viernes": planif.viernes,
            "sabado": planif.sabado,
            "alumno_dni": planif.profesor_dni,
            "profesor_dni": planif.profesor_dni
          };
        }
      }
    );
  }

  crearPlanificacion(dataPLanif: any = {}) {
    this.planificacionService.createPlanif(dataPLanif).subscribe(
      (response) => {
        console.log('Planificación creada con éxito', response);
      },
    );
  }
  editarPlanificacion(dataPlanif: any = {}) {
    this.planificacionService.updatePlanif(this.PlanifID, dataPlanif).subscribe(
      (response) => {
        console.log('Planificación actualizada con éxito', response);
      }
    );
  }

  eliminarPlanificacion() {
    this.planificacionService.deletePlanif(this.PlanifID).subscribe(
      (response) => {
        console.log('Planificación eliminada con éxito', response);
      }
    );
  }
  submit() {
    const fechaParts = this.planifForm.value.fecha.split('-');
    const fechaFormatted = `${fechaParts[0]}-${fechaParts[1]}-${fechaParts[2]}`;
    this.planifForm.value.fecha = fechaFormatted;
  
    const formatoFecha = /^\d{4}-\d{2}-\d{2}$/;

    if (this.planifForm.valid && formatoFecha.test(this.planifForm.value.fecha)) {
      console.log("Datos planificación:", this.planifForm.value);
  
      const profesorDni = this.planifForm.value.profesor_dni;
      if (profesorDni !== null && profesorDni !== "") {
        this.planificacionService.getPlanif(this.perfilDni).subscribe(
          (planifData) => {
            if (Array.isArray(planifData) && planifData.length > 0) {
              this.editarPlanificacion(this.planifForm.value);
            } else {
              this.planifForm.value.alumno_dni = Number(this.perfilDni);
              this.crearPlanificacion(this.planifForm.value);
            }
          },
          (error) => {
            console.error('Error para obtener datos de planificación:', error);
          },
          () => {
            window.location.reload();
          }
        );
      } else {
        alert('El campo Profesor es requerido. Por favor, seleccione un profesor.');
      }
    } else {
      console.log("Formulario inválido", this.planifForm);
      alert('Formulario inválido');
    }
  }
  
  
  shouldEditPlanif(): boolean {
    return this.DataPlanif !== null && Object.values(this.DataPlanif).some((value) => value !== null && value !== '');
  }

  borrarPlanifiacacion(){
    this.eliminarPlanificacion();
    window.location.reload();
  }

  verPerfil(dni: number) {
    const parametrosOcultos = {
      dni: dni
    };
    this.router.navigate(['/vPerfil'], { state: parametrosOcultos });
  }
}
