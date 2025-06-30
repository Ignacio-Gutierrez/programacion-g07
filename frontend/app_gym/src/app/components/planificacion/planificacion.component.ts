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
      profesor_dni: ['', [Validators.required]],
    });
  }

  ngOnInit(): void {
    this.userDNI = this.usuariosService.getUserDNIFromToken();
    this.parametrosOcultos = history.state;

    this.route.params.subscribe((params: Params) => {
      this.perfilDni = this.parametrosOcultos.dni;
      // Establecer alumno_dni automáticamente una vez que tenemos perfilDni
      this.planifForm.patchValue({ alumno_dni: Number(this.perfilDni) });
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
          this.planifForm.patchValue({
            descripcion: planif.descripcion,
            fecha: planif.fecha,
            lunes: planif.lunes || '',
            martes: planif.martes || '',
            miercoles: planif.miercoles || '',
            jueves: planif.jueves || '',
            viernes: planif.viernes || '',
            sabado: planif.sabado || '',
            alumno_dni: planif.alumno.dni,
            profesor_dni: planif.profesor.dni
          });

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
            "alumno_dni": planif.alumno.dni,
            "profesor_dni": planif.profesor.dni
          };
        } else {
          // No hay planificación existente, inicializar DataPlanif como objeto vacío
          this.DataPlanif = {
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
        }
      },
      (error) => {
        console.error('Error al obtener planificación:', error);
        // En caso de error, también inicializar DataPlanif
        this.DataPlanif = {
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
      }
    );
  }

  crearPlanificacion(dataPLanif: any = {}) {
    this.planificacionService.createPlanif(dataPLanif).subscribe(
      (response) => {
        console.log('Planificación creada con éxito', response);
        // Recargar solo cuando sea exitoso
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.error('Error al crear planificación:', error);
      }
    );
  }
  editarPlanificacion(dataPlanif: any = {}) {
    // Ya no es necesario limpiar los datos aquí si se hace en submit()
    console.log("Enviando para editar:", dataPlanif);
    this.planificacionService.updatePlanif(this.PlanifID, dataPlanif).subscribe(
      (response) => {
        console.log('Planificación actualizada con éxito', response);
        // Recargar solo cuando sea exitoso
        setTimeout(() => {
          window.location.reload();
        }, 1000);
      },
      (error) => {
        console.error('Error al actualizar planificación:', error);
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
    this.debugFormulario();

    if (this.planifForm.valid) {
      // ✅ Objeto con los datos limpios y con tipos correctos
      const datosParaEnviar = {
        ...this.planifForm.value,
        alumno_dni: Number(this.planifForm.value.alumno_dni),    // <-- Convertir a número
        profesor_dni: Number(this.planifForm.value.profesor_dni) // <-- Convertir a número (por seguridad)
      };

      console.log("✅ Datos limpios a enviar:", datosParaEnviar);

      if (this.shouldEditPlanif()) {
        this.editarPlanificacion(datosParaEnviar);
      } else {
        this.crearPlanificacion(datosParaEnviar);
      }
    } else {
      console.log("Formulario inválido");
      alert('Formulario inválido. Revisa los campos marcados en rojo.');
    }
  }
  
  
  shouldEditPlanif(): boolean {
    return this.UserPlanif && Array.isArray(this.UserPlanif) && this.UserPlanif.length > 0;
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

  debugFormulario() {
    console.log('=== DEBUG FORMULARIO ===');
    console.log('Formulario válido:', this.planifForm.valid);
    console.log('Valores del formulario:', this.planifForm.value);
    console.log('perfilDni:', this.perfilDni);
    
    Object.keys(this.planifForm.controls).forEach(key => {
      const control = this.planifForm.get(key);
      console.log(`${key}:`, {
        value: control?.value,
        valid: control?.valid,
        errors: control?.errors,
        dirty: control?.dirty,
        touched: control?.touched
      });
    });
    console.log('=== FIN DEBUG ===');
  }
}
